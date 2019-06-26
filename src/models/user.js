import pathToRegexp from 'path-to-regexp';
import {Map, List, fromJS} from 'immutable';
import {routerRedux} from 'dva/router';
import {query,queryItem,modifyItem,deleteItem} from '../services/user';

export default {

  namespace: 'user',

  state: Map({
    byId:Map(),
    list:List(),
    pageSize:10,
    current:1,
    total:0

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
      
      const userList = yield select(_=>_.app.getIn(['menu','byId','user','path']));
      const userEdit = yield select(_=>_.app.getIn(['menu','byId','user-edit','path']));

      if(pathToRegexp(userList).exec(pathname)){
        yield put({
          type: 'query',
          payload:{
            
          }
        });
      }else if(pathToRegexp(userEdit.substring(0,userEdit.lastIndexOf('?'))).exec(pathname)){
        const pathArray = pathToRegexp(userEdit.substring(0,userEdit.lastIndexOf('?'))).exec(pathname);
        const id=pathArray[1];
        yield put({
          type: 'queryItem',
          payload:{
            id
          }
        });
      }

    },
    * query({ payload }, { call, put, select }) {
      
      const pageSize = yield payload&&payload.pageSize || select(_=>_.user.getIn(['pageSize']));
      const current = yield payload&&payload.current || select(_=>_.user.getIn(['current']));

      const data = yield call(query, {pageSize,current,...payload});
      
      if(data.success){
        yield put({ 
            type: 'setList',
            payload: { 
              list: data.data,
              pageSize,
              current,
              total:data.headers['total']
            } 
        });  
      }else{
        throw data;
      }
      
    }, 
    * queryItem({ payload }, { call, put, select }) {
      
      const data = yield call(queryItem, {...payload});
      
      if(data.success){
        yield put({ 
          type: 'setInfo',
          payload: { 
            list: data.data.data
          } 
        });  
      }else{
        throw data;
      }
      
    }, 
    * modifyItem({ payload }, { call, put, select }) {
      
      const data = yield call(modifyItem, {...payload});
      
      if(data.success){
        yield put(routerRedux.goBack());
      }else{
        throw data;
      }
      
    }, 
    * deleteItem({ payload }, { call, put, select }) {
      
      const data = yield call(deleteItem, {...payload});
      
      if(data.success){
        yield put({ 
            type: 'query'
        });  
      }else{
        throw data;
      }
      
    }, 

  },

  reducers: {
    setList(state, { payload:{list,pageSize,current,total} }) {
      
      let ids = List();
      list.map(item=>{
        state = state.setIn(['byId', item.id + ''], fromJS({...item, key: item.id}));
        ids = ids.push(item.id + '');
      })
   
      return state.setIn(['list'], ids)
             .setIn(['pageSize'], pageSize)
             .setIn(['current'], current)
             .setIn(['total'], total)
    },
    setInfo(state, { payload:{list} }) {
   
      return state = state.setIn(['byId', list.id + ''], fromJS({...list, key: list.id}));
    },

  },

};
