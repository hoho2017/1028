import request from '@/utils/request';
import { requestRaw } from '@/utils/request';
import getParamsStr from '@/utils/getParamsStr';

export async function queryTotal(params) {
  return request(`/sys/subapplogcollect/total`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function outerInit(params) {
  return request(`/sys/subapplogcollect/city-total`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function interDataInit(params) {
  return request(`/sys/subapplogcollect/total`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
