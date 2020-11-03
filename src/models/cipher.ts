import { Effect, Reducer, Subscription, request } from 'umi';
import { login } from '@/services/login';
import { queryTree, deptSumTotal } from '@/services/cipher';
import {treeMake } from '@/utils/translateFunc.js';
export interface CipherModelState {
  catalogue: Array<string>;
  treeData: Array<object>;
  treeList: Array<object>;
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
    treeData:[],
    treeList:[]
  },
  effects: {
    *login({ type, payload, callback }, { put, call, select }) {
      const data = yield call(login, {
        username: 'admin',
        password: 'admin',
      });
      document.cookie="JSESSIONID=91656fd0-5c60-4b10-8b3d-011e1ed1c6a9";
      if(callback) callback();
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      // const localData = ['应用概况', '密评详情', '调用详情'];
      const {data} = yield call(queryTree)

      const treeList = data.map((item)=>{
        item.title = item.name
        item.key = item.name
        return item
      })
      const treeData = treeMake(data)

      const localData = ['a', 'b', 'c'];
      yield put({
        type: 'save',
        payload: {
          catalogue: localData,
          treeData,
          treeList
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
            callback:()=>{
              dispatch({
                type: 'query',
              });
            }
          });

        }
      });
    },
  },
};

export default CipherModel;
