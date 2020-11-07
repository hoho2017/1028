import request from '@/utils/request';
import { requestRaw } from '@/utils/request';
import getParamsStr from '@/utils/getParamsStr';

export async function queryReason(params) {
  return request(`/sys/subappwarnlog/list${getParamsStr(params)}`, {
    method: 'POST',
  });
}
