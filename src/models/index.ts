import { Effect, Reducer, Subscription, request } from 'umi';
import { login, getMenu } from '@/services/login';
import { queryZD } from '@/services/cipher';
import { details } from '@/services/risk';

import { queryTotal, outerInit, interDataInit } from '@/services/home';
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
    interDataInit: Effect;
    details: Effect;
    getMenu: Effect;
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
    *getMenu({ type, callback }, { put, call, select }) {
      const { menuList } = yield call(getMenu);
      if (callback) callback(menuList);
    },
    *details({ type, payload, callback }, { put, call, select }) {
      const { page } = yield call(details, payload);
      if (callback) callback(page.list);
    },
    *outerInit({ type, payload, callback }, { put, call }) {
      const data = yield call(outerInit, payload);
      if (callback) callback(data);
    },
    *interDataInit({ type, payload, callback }, { put, call }) {
      const data = yield call(interDataInit, payload);
      if (callback) callback(data);
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      const localData = [
        '互联网数据首页',
        '政务外网数据首页',
        '互联网数据首页',
        '政务外网数据首页',
      ];
      // const localData = ['a', 'b', 'c'];

      const dataZD = yield call(queryZD);
      // const total = yield call(queryTotal, {
      //   appType: 1,
      // });

      yield put({
        type: 'save',
        payload: {
          catalogue: localData,
          ZD: dataZD.data,
          // total,
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
