import pathToRegexp from 'path-to-regexp';
import {Map, List, fromJS} from 'immutable';
import {query} from '../services/music';

export default {

  namespace: 'music',

  state: Map({
    byId:Map(),
    list:List(),
    pageSize:20,
    current:1,
    genre:0,
    total:180 //此处模拟总数180条数据

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
      
      const musicList = yield select(_=>_.app.getIn(['menu','byId','music','path']));
      
      if(pathToRegexp(musicList).exec(pathname)){
        yield put({
          type: 'query',
          payload:{
            
          }
        });
      }

    },

    * query({ payload }, { call, put, select }) {
      
      const pageSize = yield payload&&payload.pageSize || select(_=>_.music.getIn(['pageSize']));
      const current = yield payload&&payload.current || select(_=>_.music.getIn(['current']));
      const genre = yield payload&&payload.genre || select(_=>_.music.getIn(['genre']));

      const data = yield call(query, {pageSize,current,genre,...payload});

      if(data.success){
        yield put({ 
            type: 'setList',
            payload: { 
              list: data.data,
              pageSize,
              current,
              genre,
            } 
        });  
      }else{
        throw data;
      }
      
    }, 

  },

  reducers: {
    setList(state, { payload:{list,pageSize,current,genre} }) {
      
      let ids = List();
      list.map(item=>{
        state = state.setIn(['byId', item.id + ''], fromJS({...item, key: item.id}));
        ids = ids.push(item.id + '');
      })
   
      return state.setIn(['list'], ids)
             .setIn(['pageSize'], pageSize)
             .setIn(['current'], current)
             .setIn(['genre'], genre)
    },

  },

};
