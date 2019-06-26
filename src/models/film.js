import pathToRegexp from 'path-to-regexp';
import {Map, List, fromJS} from 'immutable';
import {query} from '../services/film';

export default {

  namespace: 'film',

  state: Map({
    domestic:Map({
      byId:Map(),
      list:List(),
      pageSize:12,
      current:1,
      total:180 //此处模拟总数180条数据
    }),
    foreign:Map({
      byId:Map(),
      list:List(),
      pageSize:12,
      current:1,
      total:180 //此处模拟总数180条数据
    })
    
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
      
      const filmDomesticList = yield select(_=>_.app.getIn(['menu','byId','film-domestic','path']));
      const filmForeignList = yield select(_=>_.app.getIn(['menu','byId','film-foreign','path']));
      
      if(pathToRegexp(filmDomesticList).exec(pathname)){
        yield put({
          type: 'query',
          payload:{
            country:'domestic'
          }
        });
      }else if(pathToRegexp(filmForeignList).exec(pathname)){
        yield put({
          type: 'query',
          payload:{
            country:'foreign'
          }
        });
      }

    },

    * query({ payload }, { call, put, select }) {
      
      const pageSize = yield payload&&payload.pageSize || select(_=>_.film.getIn(['domestic','pageSize']));
      const current = yield payload&&payload.current || select(_=>_.film.getIn(['domestic','current']));
      const countries = yield payload&&payload.country=='foreign'?'美国':'中国大陆';

      const data = yield call(query, {pageSize,current,countries,...payload});

      if(data.success){
        yield put({ 
            type: 'setList',
            payload: { 
              list: data.data.data,
              pageSize,
              current,
              country:payload&&payload.country||'domestic'
            } 
        });  
      }else{
        throw data;
      }
      
    }, 

  },

  reducers: {
    setList(state, { payload:{list,pageSize,current,country} }) {
      
      let ids = List();
      list.map(item=>{
        state = state.setIn([country,'byId', item.id + ''], fromJS({...item, key: item.id}));
        ids = ids.push(item.id + '');
      })
   
      return state.setIn([country,'list'], ids)
             .setIn([country,'pageSize'], pageSize)
             .setIn([country,'current'], current)
    },

  },

};
