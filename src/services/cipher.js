import request from '@/utils/request';
import { requestRaw } from '@/utils/request';
import getParamsStr from '@/utils/getParamsStr';

export async function queryTree(params) {
  return requestRaw(`/sys/dept/list-app${getParamsStr(params)}`);
}

export async function queryYear(params) {
  return request(
    `/sys/subappassessmentsplit/info/dept-sum-total${getParamsStr(params)}`,
    {
      method: 'POST',
    },
  );
}
export async function queryTable(params) {
  return request(
    `/sys/subappassessmentsplit/info/by-year-deptId${getParamsStr(params)}`,
    {
      method: 'POST',
    },
  );
}
export async function queryTitle(params) {
  return request(`/sys/subapplication/list${getParamsStr(params)}`, {
    method: 'POST',
  });
}

export async function queryDouble(params) {
  return request(
    `/sys/subappalgorithmlogcollectarithtime/list-collect-last-year${getParamsStr(
      params,
    )}`,
    {
      method: 'POST',
    },
  );
}
export async function queryZD() {
  return request(
    `/sys/dict/list-map`,
    {
      method: 'POST',
      body:{}
    },
  );
}
