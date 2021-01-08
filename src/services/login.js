import request from '@/utils/request';
import { requestRaw } from '@/utils/request';
import getParamsStr from '@/utils/getParamsStr';

// export async function login(params){
//     return requestRaw(`/sys/login${getParamsStr(params)}`);
// }

export async function login(params) {
  return request(`/sys/login${getParamsStr(params)}`, {
    method: 'POST',
  });
}
export async function getMenu() {
  return request(`/sys/menu/nav`, {
    method: 'GET',
  });
}
