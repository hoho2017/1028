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
import { queryReason } from '@/services/risk';
import { treeMake } from '@/utils/translateFunc.js';
export interface RiskModelState {
  catalogue: Array<string>;
  treeData: Array<object>;
  treeList: Array<object>;
  ZD: object;
}

export interface RiskModelType {
  namespace: 'risk';
  state: RiskModelState;
  effects: {
    login: Effect;
    queryReason: Effect;
    query: Effect;
  };
  reducers: {
    save: Reducer<RiskModelState>;
  };
  subscriptions: { init: Subscription };
}

const RiskModel: RiskModelType = {
  namespace: 'risk',
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
      document.cookie = 'JSESSIONID=0b5864d1-d843-4ee7-986d-2a66f7f3d1e7';
      if (callback) callback();
    },
    *queryReason({ type, payload, callback }, { put, call, select }) {
      const { page } = yield call(queryReason, payload);
      if (callback) callback(page);
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      const localData = ['风险概况', '警示详情'];
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
        if (pathname === '/risk') {
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

export default RiskModel;
