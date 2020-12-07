import { Effect, Reducer, Subscription, request } from 'umi';
import { login } from '@/services/login';
import { queryZD } from '@/services/cipher';
import { queryTotal } from '@/services/home';
export interface IndexModelState {
  catalogue: Array<string>;
  ZD: object;
  total: object;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    login: Effect;
    query: Effect;
    outerInit: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
  };
  subscriptions: { init: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',
  state: {
    catalogue: [],
    ZD: {},
    total: {},
  },
  effects: {
    *login({ type, payload, callback }, { put, call, select }) {
      const data = yield call(login, {
        username: 'admin',
        password: 'admin',
      });
      document.cookie = `JSESSIONID=${data.JSESSIONID}`;

      if (callback) callback();
    },
    *outerInit({ type, payload, callback }, { put, call }) {
      const data = yield call(outerInit);
      if (callback) callback(data.data);
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      const localData = ['外网数据首页'];
      // const localData = ['a', 'b', 'c'];

      const dataZD = yield call(queryZD);
      const total = yield call(queryTotal, {
        appType: 1,
      });
      console.log(total);

      yield put({
        type: 'save',
        payload: {
          catalogue: localData,
          ZD: dataZD.data,
          total,
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
        if (pathname === '/') {
          dispatch({
            type: 'login',
            callback: () => {
              dispatch({
                type: 'query',
              });
            },
          });
        }
      });
    },
  },
};

export default IndexModel;
