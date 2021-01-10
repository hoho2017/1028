import { message } from 'antd';
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
  appRegister,
  appModify,
  appDelete,
  orgDelete,
  orgRegister,
  orgModify,
  calcRegister,
  calcModify,
  calcDelete,
  thirdRegister,
  thirdModify,
  thirdDelete,
  queryTUser,
  queryTRole,
  queryTAuth,
  userSave,
  userModify,
  userDelete,
  roleRegister,
  roleModify,
  roleDelete,
  queryTree,
  queryTable2,
  upload,
  checkFile,
  confirmUp,
  down,
  queryLog,
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
    appRegister: Effect;
    appModify: Effect;
    appDelete: Effect;
    orgDelete: Effect;
    queryTAuth: Effect;
    orgRegister: Effect;
    orgModify: Effect;
    calcRegister: Effect;
    calcModify: Effect;
    calcDelete: Effect;
    thirdRegister: Effect;
    thirdModify: Effect;
    queryListCollect: Effect;
    queryTUser: Effect;
    thirdDelete: Effect;
    queryTRole: Effect;
    userSave: Effect;
    userDelete: Effect;
    userModify: Effect;
    roleRegister: Effect;
    roleModify: Effect;
    roleDelete: Effect;
    queryTable2: Effect;
    queryTree: Effect;
    upload: Effect;
    checkFile: Effect;
    confirmUp: Effect;
    down: Effect;
    queryLog: Effect;
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
    *login({ type, payload, callback }, { put, call, select }) {},
    *thirdRegister({ type, payload, callback }, { put, call, select }) {
      const data = yield call(thirdRegister, payload);
      if (callback) callback(data);
    },
    *queryLog({ type, payload, callback }, { put, call, select }) {
      console.log(payload);
      const { page } = yield call(queryLog, payload);
      if (callback) callback(page);
    },
    *down({ type, payload, callback }, { put, call, select }) {
      const data = yield call(down, payload);
      if (callback) callback(data);
    },
    *roleRegister({ type, payload, callback }, { put, call, select }) {
      const data = yield call(roleRegister, payload);
      if (callback) callback(data);
    },
    *appRegister({ type, payload, callback }, { put, call, select }) {
      const data = yield call(appRegister, payload);
      if (callback) callback(data);
    },
    *userSave({ type, payload, callback }, { put, call, select }) {
      const data = yield call(userSave, payload);
      if (callback) callback(data);
    },
    *orgRegister({ type, payload, callback }, { put, call, select }) {
      const data = yield call(orgRegister, payload);
      if (callback) callback(data);
    },
    *calcRegister({ type, payload, callback }, { put, call, select }) {
      const data = yield call(calcRegister, payload);
      if (callback) callback(data);
    },
    *queryTUser({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTUser, payload);
      if (callback) callback(data.data.page);
    },
    *confirmUp({ type, payload, callback }, { put, call, select }) {
      const data = yield call(confirmUp, payload);
      if (callback) callback(data);
    },
    *userModify({ type, payload, callback }, { put, call, select }) {
      const data = yield call(userModify, payload);
      if (callback) callback(data);
    },
    *appModify({ type, payload, callback }, { put, call, select }) {
      const data = yield call(appModify, payload);
      if (callback) callback(data);
    },
    *thirdDelete({ type, payload, callback }, { put, call, select }) {
      const data = yield call(thirdDelete, payload);
      if (callback) callback(data);
    },
    *thirdModify({ type, payload, callback }, { put, call, select }) {
      const data = yield call(thirdModify, payload);
      if (callback) callback(data);
    },
    *calcModify({ type, payload, callback }, { put, call, select }) {
      const data = yield call(calcModify, payload);
      if (callback) callback(data);
    },
    *roleModify({ type, payload, callback }, { put, call, select }) {
      const data = yield call(roleModify, payload);
      if (callback) callback(data);
    },
    *orgModify({ type, payload, callback }, { put, call, select }) {
      const data = yield call(orgModify, payload);
      if (callback) callback(data);
    },
    *queryTable2({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTable2, payload);
      if (callback) callback(data);
    },
    *userDelete({ type, payload, callback }, { put, call, select }) {
      const data = yield call(userDelete, payload);
      if (callback) callback(data);
    },
    *roleDelete({ type, payload, callback }, { put, call, select }) {
      const data = yield call(roleDelete, payload);
      if (callback) callback(data);
    },
    *orgDelete({ type, payload, callback }, { put, call, select }) {
      const data = yield call(orgDelete, payload);
      if (callback) callback(data);
    },
    *calcDelete({ type, payload, callback }, { put, call, select }) {
      const data = yield call(calcDelete, payload);
      if (callback) callback(data);
    },
    *appDelete({ type, payload, callback }, { put, call, select }) {
      const data = yield call(appDelete, payload);
      if (callback) callback(data);
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
      const data = yield call(queryYear, payload);
      if (data.code === 500) {
        return false;
      }
      if (callback) callback(data.year);
    },
    *checkFile({ type, payload, callback }, { put, call, select }) {
      const data = yield call(checkFile, payload);
      if (callback) callback(data);
    },
    *upload({ type, payload, params, callback }, { put, call, select }) {
      const data = yield call(upload, payload);
      if (callback) callback(data);
    },
    *queryTAuth({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTAuth, payload);
      if (callback) callback(data.data.page);
    },
    *queryTRole({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTRole, payload);
      if (callback) callback(data.data.page);
    },
    *queryTApp({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTApp, payload);
      if (callback) callback(data.page);
    },
    *queryTOrg({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTOrg, payload);
      if (data.code === 500) {
        message.error(data.msg);
        return false;
      }
      if (callback) callback(data.page);
    },
    *queryTree({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTree, payload);
      const tree = data.data;
      const treedata = tree.map(item => {
        item.key = item.menuId;
        return item;
      });
      if (callback) callback(treedata);
    },
    *queryTCalc({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTCalc, payload);
      if (callback) callback(data.data.page);
    },
    *queryTThird({ type, payload, callback }, { put, call, select }) {
      const data = yield call(queryTThird, payload);
      if (callback) callback(data.page);
    },
    *query({ type, payload }, { put, call, select }) {
      //请求tree data
      const list = localStorage.getItem('manage')?.split(',')
        ? localStorage.getItem('manage')?.split(',')
        : [];
      if (list === undefined) return;
      const localData = [];

      const temp = [
        '资源注册',
        '密评登记',
        '级联管理',
        '用户管理',
        '用户授权',
        '系统日志',
      ];
      if (list.includes('171')) {
        localData.push(temp[0]);
      }
      if (list.includes('130')) {
        localData.push(temp[1]);
      }
      if (list.includes('131')) {
        localData.push(temp[2]);
      }
      if (list.includes('137')) {
        localData.push(temp[3]);
      }
      if (list.includes('139')) {
        localData.push(temp[4]);
      }
      if (list.includes('140')) {
        localData.push(temp[5]);
      }
      // const localData = ['a', 'b', 'c'];

      const { data } = yield call(queryTreeM);
      const dataZD = yield call(queryZD);
      const arith = yield call(queryArith);
      const treeList = data.map(item => {
        item.title = item.name;
        item.key = item.name;
        return item;
      });
      const treeData = data;

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
          app_source_type: dataZD.data.app_source_type,
          app_type_id: dataZD.data.app_type_id,
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
            type: 'query',
          });
        }
      });
    },
  },
};

export default ManageModel;
