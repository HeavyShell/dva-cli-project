import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import {Map} from 'immutable';
import {injectIntl} from 'react-intl'
import pathToRegexp from 'path-to-regexp'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

function Index({menu,pathname,intl:{formatMessage}}) {
  const menuById=menu.get('byId');
  const menuByPid=menu.get('byPid');
  const currentById=menuById.filter(item=>pathToRegexp(`${item.get('path')}`).exec(pathname)).toList().get(0)||Map();
  const currentMenu = menuById.filter(item=>pathToRegexp(`${item.get('path')}/:path*`).exec(pathname)).map(item=>item.get('id')).toArray();
  
  //平判断当前菜单下是否有自己菜单可显示
  function isHaveChild(arr){
    let flag=false;
    arr.map(item=>{
      if(menuById.getIn([item,'show'])){
        flag=true;
        return false;
      }
    })

    return flag;
  }
  
  //计算菜单方法支持无限级
  function CalChildMenu(item){
    
    if(menuById.getIn([item,'show'])){
        if(menuByPid.get(item)&&isHaveChild(menuByPid.get(item))){
        return <SubMenu key={item} title={<span><Icon type={menuById.getIn([item,'icon'])} /><span>{formatMessage({id: menuById.getIn([item,'name'])})}</span></span>}>
            {menuByPid.get(item).map(item2=>{
            return CalChildMenu(item2)
            })}
        </SubMenu>
        }else{
        return <Menu.Item key={item} to={menuById.getIn([item,'path'])}>
            <Link to={menuById.getIn([item,'path'])}><span><Icon type={menuById.getIn([item,'icon'])} /><span>{formatMessage({id: menuById.getIn([item,'name'])})}</span></span></Link>
        </Menu.Item>
        }
    }
  }

  return (
    <Menu
      selectedKeys={[!currentById.get('show')?currentById.get('pid'):currentById.get('id')]}
      defaultOpenKeys={currentMenu}
      mode="inline"
      theme="dark"
    > 
      {menuByPid.get('0').map(item=>{
        return CalChildMenu(item)          
      })}
    </Menu>
  );
}


export default injectIntl(Index);
