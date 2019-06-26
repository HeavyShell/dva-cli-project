
import {Map} from 'immutable';
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';
import utils from '../utils';
const {config:{menuMap}} = utils;

export default {

  namespace: 'app',

  state: Map({
    i18n:'zh_CN',
    token:null,
    menu:menuMap
  }),

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        dispatch({type: 'dataInit', payload: {pathname}});
      });
    },
  },

  effects: {
    * dataInit({payload: {pathname}}, {put,call,select}){
      yield put({
        type:'updateToken',
        payload:{
          value:window.sessionStorage.getItem('token')
        }
      });

    },
    *changeLang({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ 
        type: 'updateLang',
        payload:payload
      });
    },
    * loginOk ({
        payload
    }, {put, select}) {
      const homePage=yield select(_=>_.app.getIn(['menu','byId','home','path']));
      window.sessionStorage.setItem('token',payload.token);
      
      yield put({
        type:'updateToken',
        payload:{
          value:payload.token
        }
      });
      yield put(routerRedux.push({
          pathname: homePage
      }));
    },
    *logout({ payload }, { call, put, select }) {  // eslint-disable-line
      window.sessionStorage.removeItem('token');
      const loginPage=yield select(_=>_.app.getIn(['menu','byId','login','path']));
      yield put(routerRedux.push({
        pathname: loginPage
      }));
      // window.location.href=loginPage;
    },
  },

  reducers: {
    updateToken (state, { payload:{value} }) {
      return state.set('token',value)
    },
    updateLang(state, { payload:{value} }) {
      return state.set('i18n',value);
    },
  },

};
