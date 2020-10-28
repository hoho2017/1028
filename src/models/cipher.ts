import { Effect, Reducer, Subscription, request } from 'umi';


export interface CipherModelState{
  catalogue: Array<string>;
}

export interface CipherModelType {
  namespace:'cipher';
  state:CipherModelState;
  effects:{
    query:Effect;
  }
  reducers: {
    save: Reducer<CipherModelState>;
  }
  subscriptions: { init: Subscription };
}

const CipherModel: CipherModelType = {
  namespace:'cipher',
  state:{
    catalogue:[],
  },
  effects: {
    *query({type, payload},{put, call, select}){
      const localData= [
        'a',
        'b',
        'c',
      ]
      yield put({
        type:'save',
        payload:{
        catalogue:localData
        }
      })
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  subscriptions: {
    init({dispatch, history}) {
      return history.listen(({pathname})=>{
        if(pathname === '/cipher'){
          dispatch({
            type: 'query'
          })
        }
      })
    }
  }
}

export default CipherModel;
