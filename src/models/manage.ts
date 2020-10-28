import { Effect, Reducer, Subscription, request } from 'umi';

export interface ManageProps {
  ename: number;
  cname: string;
  title: string;
  new_type: number;
  manage_type: number;
  skin_name: string;
}
export interface ManageModelState {
  name: string;
  manages: ManageProps[];
  freemanages: ManageProps[];
  filterKey: number;
  itemHover: number;
}

export interface ManageModelType {
  namespace: 'manage';
  state: ManageModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ManageModelState>;
  };
  subscriptions: { setup: Subscription };
}

const ManageModel: ManageModelType = {
  namespace: 'manage',

  state: {
    name: 'manage',
    manages: [],
    freemanages: [],
    filterKey: 0,
    itemHover: 0
  },

  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      const data = yield request('/web201605/js/managelist.json');
      const freemanages = yield request('mock/freemanages.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          number: 10,
        }),
      });
      const localData = [
        {
          ename: 105,
          cname: '廉颇',
          title: '正义爆轰',
          new_type: 0,
          manage_type: 3,
          skin_name: '正义爆轰|地狱岩魂',
        },
        {
          ename: 106,
          cname: '小乔',
          title: '恋之微风',
          new_type: 0,
          manage_type: 2,
          skin_name: '恋之微风|万圣前夜|天鹅之梦|纯白花嫁|缤纷独角兽',
        },
      ];
      yield put({
        type: 'save',
        payload: {
          manages: data || localData,
          freemanages
        },
      });
    },
    *query({ payload }, { call, put }) {

    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/manage') {
          dispatch({
            type: 'fetch'
          })
        }
      });
    }
  },
};

export default ManageModel;
