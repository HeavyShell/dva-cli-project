import React from 'react';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import {withRouter,Link} from 'dva/router';
import {injectIntl} from 'react-intl'
import Helmet from 'react-helmet';
import classnames from 'classnames';
import styles from './index.less';
import Tree from './tree';
import Auth from './auth';
import { Avatar, Button, Menu, Dropdown, Icon } from 'antd';

function Index({children,dispatch,menu,pathname,i18n,token,intl:{formatMessage}}) {

  const treeProps={
    menu,
    pathname,
  }

  const authProps={
    menu,
    token,
    pathname,
    dispatch
  }

  const loginPage = menu.getIn(['byId','login','path']);
  const menuById=menu.get('byId');
  const currentById=menuById.filter(item=>pathToRegexp(`${item.get('path')}`).exec(pathname)).toList().get(0);

  return (
    <Auth {...authProps}>
      <Helmet>
        <title>
          {formatMessage({id: currentById&&currentById.get('name')||'App.unknown'})}
        </title>
      </Helmet>
      {pathToRegexp(loginPage).exec(pathname)?
      children
      :
      <div className={classnames(styles.page)}>
        
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' />
          </div>
          <div className={styles.navbar}>
            <Dropdown 
              trigger={['click']} 
              overlay={
                <Menu selectedKeys={[i18n]} onClick={
                  (e)=>{
                    dispatch({
                      type:'app/changeLang',
                      payload:{
                        value:e.key
                      }
                    })
                  }
                }>
                  <Menu.Item key="zh_CN">中文</Menu.Item>
                  <Menu.Item key="en_US">English</Menu.Item>
                  <Menu.Item key="zh_HK">繁体</Menu.Item>
                </Menu>
              }>
              <Button type={'primary'} size={'small'} style={{marginRight:'10px'}} icon={'global'}>{formatMessage({id: 'App.lang'})}</Button>
            </Dropdown>
            <Button type={'primary'} size={'small'} icon={'logout'} onClick={()=>{
              dispatch({
                type:'app/logout',
                payload:{}
              })
            }}>{formatMessage({id: 'App.logout'})}</Button>
          </div>
        </div> 
        <div className={styles.body}>
          <div className={styles.left}>
            <Tree {...treeProps}/>
          </div>
          <div className={styles.main}>
            {children}
          </div>
        </div> 
      </div>
      }
    </Auth>
  );
}


export default withRouter(connect(({
  app,
  routing
})=>({
  app,
  menu: app.get('menu'),
  i18n: app.get('i18n'),
  token: app.get('token'),
  pathname: routing.location.pathname,
}))(injectIntl(Index)));
