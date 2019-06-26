import {message} from 'antd';

export default {

  namespace: 'login',

  state: {
    name:'login page'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    * login ({
        payload
    }, {put, select}) {
        if(payload.values.username=='admin'&&payload.values.password=='123456'){
          //登录成功
          yield put({
            type:'app/loginOk',
            payload:{
              token:'123abc'
            }
          });
        }else{
          message.warning('用户名或密码不正确')
        }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
