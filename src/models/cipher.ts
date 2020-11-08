import { Effect, Reducer, Subscription, request } from 'umi';
import { login } from '@/services/login';
import {
  queryTree,
  queryYear,
  queryTable,
  queryTitle,
  queryDouble,
  queryZD,
  queryListCollect,
  queryFlist,
} from '@/services/cipher';
import { treeMake } from '@/utils/translateFunc.js';
export interface CipherModelState {
  catalogue: Array<string>;
  treeData: Array<object>;
  treeList: Array<object>;
  ZD: object;
}

export interface CipherModelType {
  namespace: 'cipher';
  state: CipherModelState;
  effects: {
    login: Effect;
    query: Effect;
    queryY: Effect;
    queryTitle: Effect;
    queryDouble: Effect;
    queryTable: Effect;
    queryFlist: Effect;
    queryListCollect: Effect;
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
    treeData: [],
    treeList: [],
    ZD: {},
  },
  effects: {
    *login({ type, payload, callback }, { put, call, select }) {
      const data = yield call(login, {
        username: 'admin',
        password: 'admin',
      });
      document.cookie = 'JSESSIONID=79d1ad9c-7833-4cb6-b317-ea2c0a8ecaf3';
      if (callback) callback();
    },
    *queryFlist({ type, payload, callback }, { put, call, select }) {
      const { data } = yield call(queryFlist, payload);
      if (callback) callback(data);
    },
    *queryListCollect({ type, payload, callback }, { put, call, select }) {
      const { yearArith, monthArith, allYearTotal } = yield call(
        queryListCollect,
        payload,
      );
      if (callback) callback(yearArith, monthArith, allYearTotal);
    },
    *queryDouble({ type, payload, callback }, { put, call, select }) {
      const { allMonthTotal, percent, monthArith } = yield call(
        queryDouble,
        payload,
      );
      if (callback) callback(allMonthTotal, percent, monthArith);
    },
    *queryTitle({ type, payload, callback }, { put, call, select }) {
      const { page } = yield call(queryTitle, payload);
      if (callback) callback(page);
    },
    *queryY({ type, payload, callback }, { put, call, select }) {
      const { year, sum } = yield call(queryYear, payload);
      if (callback) callback(year, sum);
    },
    *queryTable({ type, payload, callback }, { put, call, select }) {
      const { data } = yield call(queryTable, payload);
      if (callback) callback(data);
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      const localData = ['应用概况', '密评详情', '调用详情'];
      // const localData = ['a', 'b', 'c'];

      const { data } = yield call(queryTree);
      const dataZD = yield call(queryZD);

      const treeList = data.map(item => {
        item.title = item.name;
        item.key = item.name;
        return item;
      });
      const treeData = treeMake(data);

      yield put({
        type: 'save',
        payload: {
          catalogue: localData,
          treeData,
          treeList,
          ZD: dataZD.data,
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

export default CipherModel;
