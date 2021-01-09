import React from 'react';
import { notification, Tag } from 'antd';
import router from 'umi';
import * as errorTypes from '../config/errors';

export default ex => {
  const { url, status } = ex.response;
  const { error, message } = ex.data;
  const { method } = ex.reqOptions;

  switch (status) {
    // 401 means no session , we redirect to /login page
    case 401:
      const { pathname } = new URL(url);
      if (pathname == '/system/session' && method == 'GET') {
        // do not notify message
      } else {
        notifyError(error, status, url, message, method);
      }
      router.push('/login');
      throw ex;
    default:
      notifyError(error, status, url, message, method);
      throw ex;
  }
};

function notifyError(error, status, url, message, method) {
  notification.open({
    message: (
      <div style={{ fontWeight: 500, fontSize: '13px' }}>
        <Tag color="red" style={{ marginRight: 16 }}>
          {status}
        </Tag>{' '}
        {error}
      </div>
    ),
    description: (
      <div>
        <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: 16 }}>
          {message}
        </div>

        <div
          className={'word-break'}
          style={{
            marginTop: 16,
            borderTop: '1px solid #f5f5f5',
            fontSize: '12px',
            paddingTop: 8,
            color: 'rgba(0,0,0,0.45)',
          }}
        >
          {method} {url}
        </div>
      </div>
    ),
  });
}
