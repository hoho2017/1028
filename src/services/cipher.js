import request from '@/utils/request';

export async function lizi(params) {
  return request(`/flowCharts/add`, {
    method: 'POST',
    body: {
      token: '',
      params: { ...params },
    },
  });
}
