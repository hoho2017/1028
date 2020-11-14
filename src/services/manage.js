import request from '@/utils/request';
import { requestRaw } from '@/utils/request';
import getParamsStr from '@/utils/getParamsStr';

export async function queryArith(params) {
  return requestRaw(`/sys/dict/arith-list`);
}

export async function queryTCalc(params) {
  return requestRaw(`/sys/dict/arith-list`);
}

export async function queryTApp(params) {
  return request(`/sys/subapplication/list${getParamsStr(params)}`, {
    method: 'POST',
  });
}
export async function queryTOrg(params) {
  return request(`/sys/dept/list-page${getParamsStr(params)}`, {
    method: 'POST',
  });
}

export async function queryTThird(params) {
  return request(`/sys/subapptypeconfig/list${getParamsStr(params)}`, {
    method: 'POST',
  });
}

export async function appRegister(params) {
  return request(`/sys/subapplication/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function orgRegister(params) {
  return request(`/sys/dept/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function thirdRegister(params) {
  return request(`/sys/subapptypeconfig/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function calcRegister(params) {
  return request(`/sys/dict/arith-save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function appModify(params) {
  return request(`/sys/subapplication/update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function calcModify(params) {
  return request(`/sys/dict/update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function orgModify(params) {
  return request(`/sys/dept/update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function thirdModify(params) {
  return request(`/sys/subapptypeconfig/update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function calcDelete(params) {
  return request(`/sys/dict/write-off${getParamsStr(params)}`, {
    method: 'POST',
  });
}
export async function appDelete(params) {
  return request(`/sys/subapplication/write-off${getParamsStr(params)}`, {
    method: 'POST',
  });
}
export async function orgDelete(params) {
  return request(`/sys/dept/write-off${getParamsStr(params)}`, {
    method: 'POST',
  });
}
export async function thirdDelete(params) {
  return request(`/sys/subapptypeconfig/write-off${getParamsStr(params)}`, {
    method: 'POST',
  });
}
