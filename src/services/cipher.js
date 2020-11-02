import request from '@/utils/request';
import { requestRaw } from '@/utils/request';
import getParamsStr from '@/utils/getParamsStr';

export async function queryTree(params){
    return requestRaw(`/sys/dept/list-app${getParamsStr(params)}`);
}

export async function deptSumTotal(params) {
  return request(`/sys/subappassessmentsplit/info/dept-sum-total${getParamsStr(params)}`, {
    method: 'POST',
  });
}

