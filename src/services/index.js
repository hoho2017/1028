import request from '@/utils/request';
import { requestRaw } from '@/utils/request';
import getParamsStr from '@/utils/getParamsStr';

export async function outerInit() {
  return request(`/sys/subapplogcollect/total`, {
    method: 'POST',
    body: {},
  });
}
