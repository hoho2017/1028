import { Effect, Reducer, Subscription, request } from 'umi';
import { login } from '@/services/login';
export interface CipherModelState {
  catalogue: Array<string>;
}

export interface CipherModelType {
  namespace: 'cipher';
  state: CipherModelState;
  effects: {
    login: Effect;
    query: Effect;
  };
  reducers: {
    save: Reducer<CipherModelState>;
  };
  subscriptions: { init: Subscription };
}

const CipherModel: CipherModelType = {
  namespace: 'cipher',
  state: {
    catalogue: [],
  },
  effects: {
    *login({ type, payload }, { put, call, select }) {
      const { msg } = yield call(login, {
        username: 'admin',
        password: 'admin',
      });
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      const localData = ['应用概况', '密评详情', '调用详情'];
      yield put({
        type: 'save',
        payload: {
          catalogue: localData,
        },
      });
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
    init({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/cipher') {
          dispatch({
            type: 'login',
          });
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default CipherModel;
