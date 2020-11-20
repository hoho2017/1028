import request from '@/utils/request';
import { requestRaw } from '@/utils/request';
import getParamsStr from '@/utils/getParamsStr';

export async function queryTree(params) {
  return requestRaw(`/sys/dept/list-app${getParamsStr(params)}`);
}

export async function queryTreeM(params) {
  return requestRaw(`/sys/dept/list${getParamsStr(params)}`);
}

export async function down(params) {
  return requestRaw(`/sys/subappassessmentsplit/download/${(Object.values(params)[0])}`,{
    headers:'2'
  });
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
export async function queryListCollect(params) {
  return request(
    `/sys/subappalgorithmlogcollectarithtime/list-collect${getParamsStr(
      params,
    )}`,
    {
      method: 'POST',
    },
  );
}

export async function queryFlist(params) {
  return request(
    `/sys/subappalgorithmlogcollectpath/list-collect${getParamsStr(params)}`,
    {
      method: 'POST',
    },
  );
}
export async function queryZD() {
  return request(`/sys/dict/list-map`, {
    method: 'POST',
    body: {},
  });
}
