import { Effect, Reducer, Subscription, request } from 'umi';
import { login } from '@/services/login';
import {
  queryTreeM,
  queryYear,
  queryTable,
  queryTitle,
  queryDouble,
  queryZD,
  queryListCollect,
  queryFlist,
} from '@/services/cipher';
import {
  queryArith,
  queryTApp,
  queryTOrg,
  queryTCalc,
  queryTThird,
} from '@/services/manage';
import { treeMake } from '@/utils/translateFunc.js';
export interface ManageModelState {
  catalogue: Array<string>;
  treeData: Array<object>;
  treeList: Array<object>;
  ZD: object;
}

export interface ManageModelType {
  namespace: 'manage';
  state: ManageModelState;
  effects: {
    login: Effect;
    query: Effect;
    queryY: Effect;
    queryTitle: Effect;
    queryDouble: Effect;
    queryTable: Effect;
    queryFlist: Effect;
    queryTApp: Effect;
    queryTOrg: Effect;
    queryTCalc: Effect;
    queryTThird: Effect;
    queryListCollect: Effect;
  };
  reducers: {
    save: Reducer<ManageModelState>;
  };
  subscriptions: { init: Subscription };
}

const ManageModel: ManageModelType = {
  namespace: 'manage',
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
      document.cookie = `JSESSIONID=${data.JSESSIONID}`;
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
    *queryTApp({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTApp, payload);
      if (callback) callback(data.page.list);
    },
    *queryTOrg({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTOrg, payload);
      if (callback) callback(data.page.list);
    },
    *queryTCalc({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTCalc, payload);
      if (callback) callback(data.data.page.list);
    },
    *queryTThird({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTThird, payload);
      if (callback) callback(data.page.list);
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      const localData = [
        '资源注册',
        '密评登记',
        '级联管理',
        '用户管理',
        '用户授权',
        '系统日志',
      ];
      // const localData = ['a', 'b', 'c'];

      const { data } = yield call(queryTreeM);
      const dataZD = yield call(queryZD);
      const arith = yield call(queryArith);
      const treeList = data.map(item => {
        item.title = item.name;
        item.key = item.name;
        return item;
      });
      const treeData = treeMake(data);
      // const tableApp = yield call(queryTApp);
      // const tableOrg = yield call(queryTOrg);
      // const tableCalc = yield call(queryTCalc);
      // const tableThird = yield call(queryTThird);

      yield put({
        type: 'save',
        payload: {
          catalogue: localData,
          treeData,
          treeList,
          ZD: dataZD.data,
          arith: arith.data.page.list,
          app_source_type:dataZD.data.app_source_type
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
        if (pathname === '/manage') {
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

export default ManageModel;
