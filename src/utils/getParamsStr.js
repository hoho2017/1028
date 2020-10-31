export default params => {
  try {
    const _params = {};
    Object.keys(params).forEach(key => {
      if (typeof params[key] !== 'undefined' && params[key] !== '') {
        _params[key] = params[key];
      }
    });

    const result = Object.keys(_params)
      .map(item => `${item}=${_params[item]}`)
      .join('&');
    return result ? `?${result}` : '';
  } catch (ex) {
    return '';
  }
};
