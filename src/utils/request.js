import fetch from 'dva/fetch';

// import environments from 'environments';
import { RequestError, StatusError, ServerError } from '../errors';
import processErrors from './processErrors';
import { message } from 'antd';
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
  // url = 'http://localhost:80/'+url
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
    if (newOptions.headers !== '1') {
      newOptions.headers = {
        ...newOptions.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else if (newOptions.headers === '1') {
      // newOptions.body is FormData
      newOptions.headers = {
        ...newOptions.headers,
        Accept: 'application/json',
        // 'Content-Type': "multipart/form-data;boundary=----WebKitFormBoundary3eeB9DbaBq6TH4yo"
      };
    }
  }
  if (newOptions.headers === '2') {
    delete newOptions.headers;
    return fetch(url, newOptions).then(res =>
      res.blob().then(blob => {
        const url = window.URL || window.webkitURL || window.moxURL;
        const downloadHref = url.createObjectURL(blob);
        let downloadLink = document.createElement('a');
        downloadLink.style.display = 'none';
        downloadLink.href = downloadHref;
        downloadLink.download = '报告.xls';
        downloadLink.click();
        window.URL.revokeObjectURL(downloadHref);
      }),
    );
  }
  if (newOptions.headers === '3') {
    delete newOptions.headers;
    return fetch(url, newOptions).then(res =>
      res.blob().then(blob => {
        const url = window.URL || window.webkitURL || window.moxURL;
        const downloadHref = url.createObjectURL(blob);
        let downloadLink = document.createElement('a');
        downloadLink.style.display = 'none';
        downloadLink.href = downloadHref;
        downloadLink.download = '密评风评方案模板.xlsx';
        downloadLink.click();
        window.URL.revokeObjectURL(downloadHref);
      }),
    );
  }
  // add token to header
  // const token = localStorage.getItem('auth_token');
  // if(token){
  //     newOptions.headers = {
  //         ...newOptions.headers,
  //         // 'X-Auth-Token': token
  //     };
  // }
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
        if (json.code === 5001) {
          message.warning('登入过期！');
          window.localStorage.clear();
          document.cookie = 'JSESSIONID=""';
          window.location.href = window.location.origin + '/login.html';
          return null;
        } else if (json.code === 500) {
          // message.warning( json.msg , 2);
          //  window.location.reload();
          //   return null;
        }
        return { headers, data: json };
      });
    })
    .catch(ex => {
      processErrors(ex);
    });
}
