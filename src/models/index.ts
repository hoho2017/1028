import { Effect, Reducer, Subscription, request } from 'umi';
import { login, getMenu, userInfo } from '@/services/login';
import { queryZD } from '@/services/cipher';
import { details } from '@/services/risk';

import {
  queryTotal,
  outerInit,
  interDataInit,
  loginOut,
} from '@/services/home';
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
    loginOut: Effect;
    userInfo: Effect;
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
    *loginOut({ type, payload, callback }, { put, call, select }) {
      yield call(loginOut);
      if (callback) callback();
    },
    *login({ type, payload, callback }, { put, call, select }) {
      // const data = yield call(login, {
      //   username: 'anquan',
      //   password: '123456',
      // });
      // document.cookie = `JSESSIONID=${data.JSESSIONID}`;
      // if (callback) callback();
    },
    *getMenu({ type, callback }, { put, call, select }) {
      const { menuList } = yield call(getMenu);
      if (callback) callback(menuList);
      yield put({
        type: 'query',
      });
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
    *userInfo({ type, payload, callback }, { put, call, select }) {
      const infoList = yield call(userInfo);
      if (callback) callback(infoList);
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      const list = localStorage.getItem('home')?.split(',')
        ? localStorage.getItem('home')?.split(',')
        : [];
      if (list === undefined) return;
      const localData = [];
      const temp = [
        '密码局互联网首页',
        '密码局政务外网首页',
        '大数据局互联网首页',
        '大数据局政务外网首页',
      ];
      if (list.includes('82')) {
        localData.push(temp[0]);
      }
      if (list.includes('83')) {
        localData.push(temp[1]);
      }
      if (list.includes('84')) {
        localData.push(temp[2]);
      }
      if (list.includes('85')) {
        localData.push(temp[3]);
      }

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
        }
      });
    },
  },
};

export default IndexModel;
