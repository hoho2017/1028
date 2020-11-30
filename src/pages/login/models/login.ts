import { Effect, Subscription, Reducer } from 'umi';
import {login} from '@/services/login';

export interface LoginModelState {
  user:object;
}

export interface LoginModelType {
  namespace: 'login';
  state:LoginModelState;
  effects:{
    login: Effect;
  };
  reducers:{
    save:Reducer<LoginModelState>;
  }
  subscription: { init: Subscription};
}

const LoginModel: LoginModelType = {
  namespace:'login',
  state:{
    user:{'a':1}
  },
  effects:{
    *login({ type, payload, callback }, { put, call, select }) {
      const data = yield call(login, {
        username: 'admin',
        password: 'admin',
      });
      document.cookie = `JSESSIONID=${data.JSESSIONID}`;
      if (callback) callback();
    },
  },
  reducers:{
    save(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
  subscription: {
    init({dispatch, history}) {
      return history.listen(({pathname})=>{
        if(pathname === '/login'){
          dispatch({
            type:'login',
            callback:()=>{

            }
          })
        }
      })
    }
  }
}

export default LoginModel
