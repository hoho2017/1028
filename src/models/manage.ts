import { Effect, Reducer, Subscription, request } from 'umi';

export interface ManageProps {

}
export interface ManageModelState {
  name: string;
  manages: ManageProps[];
  freemanages: ManageProps[];
  filterKey: number;
  itemHover: number;
}

export interface ManageModelType {
  namespace: 'manage';
  state: ManageModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ManageModelState>;
  };
  subscriptions: { setup: Subscription };
}

const ManageModel: ManageModelType = {
  namespace: 'manage',

  state: {
    name: 'manage',
    manages: [],
    freemanages: [],
    filterKey: 0,
    itemHover: 0
  },

  effects: {
    *fetch({ type, payload }, { put, call, select }) {


      yield put({
        type: 'save',
        payload: {
          
        },
      });
    },
    *query({ payload }, { call, put }) {

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
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/manage') {
          dispatch({
            type: 'fetch'
          })
        }
      });
    }
  },
};

export default ManageModel;
