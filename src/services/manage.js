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
