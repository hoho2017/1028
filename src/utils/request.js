import fetch from 'dva/fetch';
// import environments from 'environments';
import { RequestError, StatusError, ServerError } from '../errors';
import processErrors from './processErrors';

const checkStatus = (response, reqOptions) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return response.json().then(data => {
    throw new RequestError(response, data, reqOptions);
  });
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option]  The options we want to pass to "fetch"
 * @return {Promise<object>}  An object containing either "data" or "err"
 */
export default function request(url, option = { method: 'GET' }) {
  return requestRaw(url, option).then(result => {
    return result.data;
  });
}

export function requestRaw(url, option = { method: 'GET' }) {
  // if(!url.startsWith('http')){
  //     url = environments.endpoint + url;
  // }

  const defaultOptions = {
    // credentials: 'include'
  };

  const newOptions = { ...defaultOptions, ...option };

  if (newOptions.method === 'GET') {
    url += url.indexOf('?') === -1 ? '?' : '&';
    url += `t=${new Date().getTime()}`;
  } else if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        ...newOptions.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        ...newOptions.headers,
        Accept: 'application/json',
      };
    }
  }

  // add token to header
  // const token = localStorage.getItem('auth_token');
  // if(token){
  //     newOptions.headers = {
  //         ...newOptions.headers,
  //         // 'X-Auth-Token': token
  //     };
  // }
  console.log(url);
  return fetch(url, newOptions)
    .then(response => checkStatus(response, newOptions))
    .then(response => {
      const headers = {};
      response.headers.forEach((value, name) => {
        headers[name.toLowerCase()] = value;
      });

      if (option.method === 'DELETE' || response.status === 204) {
        return response.text().then(text => {
          return { headers, data: text };
        });
      }
      return response.json().then(json => {
        return { headers, data: json };
      });
    })
    .catch(ex => {
      processErrors(ex);
    });
}
