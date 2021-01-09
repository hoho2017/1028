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
import { queryReason, details } from '@/services/risk';
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
    details: Effect;
    queryDouble: Effect;
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
    *login({ type, payload, callback }, { put, call, select }) {},
    *details({ type, payload, callback }, { put, call, select }) {
      const { page } = yield call(details, payload);
      if (callback) callback(page.list);
    },
    *queryReason({ type, payload, callback }, { put, call, select }) {
      const { page } = yield call(queryReason, payload);
      if (callback) callback(page);
    },
    *queryDouble({ type, payload, callback }, { put, call, select }) {
      const { avgTime } = yield call(queryDouble, payload);
      if (callback) callback(avgTime);
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      const list = localStorage.getItem('fx')?.split(',')
        ? localStorage.getItem('fx')?.split(',')
        : [];
      if (list === undefined) return;
      const localData = [];
      const temp = ['风险概况', '警示详情'];
      // const localData = ['a', 'b', 'c'];
      if (list.includes('145')) {
        localData.push(temp[0]);
      }
      if (list.includes('146')) {
        localData.push(temp[1]);
      }
      const { data } = yield call(queryTree);
      const dataZD = yield call(queryZD);

      const treeList = data.map(item => {
        item.title = item.name;
        item.key = item.name;
        return item;
      });
      const treeData = treeMake(data, [99]);

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
            type: 'query',
          });
        }
      });
    },
  },
};

export default RiskModel;
