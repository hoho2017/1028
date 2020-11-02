import { Effect, Reducer, Subscription, request } from 'umi';
import { login } from '@/services/login';
import { queryTree, deptSumTotal } from '@/services/cipher';
import {treeMake } from '@/utils/translateFunc.js';
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
    *login({ type, payload, callback }, { put, call, select }) {
      const data = yield call(login, {
        username: 'admin',
        password: 'admin',
      });
      document.cookie="JSESSIONID=3700c017-6085-4e45-a163-18b20897d391";
      if(callback) callback();
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      // const localData = ['应用概况', '密评详情', '调用详情'];
      const {data} = yield call(queryTree)
      console.log(data);
      const treeData = treeMake(data)
      console.log(treeData);

      // const treeData = yield call(deptSumTotal,{
      //   deptId:'9'
      // })
      const localData = ['a', 'b', 'c'];
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
