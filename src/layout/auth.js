import React from 'react';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import {Link,router} from 'dva/router';
import {injectIntl} from 'react-intl'
import { Menu, Icon } from 'antd';


const Index=({dispatch,children,token,menu,pathname})=>{
  
  const loginPage = menu.getIn(['byId','login','path']);
  if(!token&&!pathToRegexp(loginPage).exec(pathname)){
    dispatch({
      type:'app/logout',
      payload:{}
    })
  }else if(token&&pathToRegexp(loginPage).exec(pathname)){
    dispatch({
      type:'app/loginOk',
      payload:{
        token:token
      }
    })
  }

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}


export default injectIntl(Index);
