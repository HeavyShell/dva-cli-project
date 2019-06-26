import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import {Table, Avatar, Tag, Button} from 'antd';
import pathToRegexp from 'path-to-regexp'
import styles from './index.less';

function Index({dispatch, user, menu}) {
  //路由取值
  const userEdit=menu.getIn(['byId','user-edit','path']);
  const data=user.get('list').map(item=>user.getIn(['byId',item])).toJS();
  const columns=[
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, record) => (
        <Avatar size={36} icon="user" src={text} />
      )
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    // {
    //   title: '地址',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    {
      title: '喜爱颜色',
      dataIndex: 'love_color',
      key: 'love_color',
      render: (text, record) => (
        <div>
          <Tag color={text}>{text}</Tag>
        </div>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <Link to={pathToRegexp.compile(userEdit)({id:record.id})}>
            <Button size='small' type='primary' icon='edit' />
          </Link>
          <Button size='small' type='primary' icon='delete' style={{marginLeft:'8px'}} onClick={()=>deleteItem(record.id)} />
        </div>
      )
    },
  ];

  function deleteItem(id){
    dispatch({
      type:'user/deleteItem',
      payload:{
        id
      }
    })
  }
  
  return (
    <div className={styles.page}>
      <Table 
        title={()=>(
          <Link to={pathToRegexp.compile(userEdit)()}>
            <Button size='small' type='primary' icon={'plus-circle-o'}>新增用户</Button>
          </Link>
        )}
        dataSource={data}
        columns={columns}
        pagination={{
          total:parseInt(user.get('total')),
          current:parseInt(user.get('current')),
          pageSize:parseInt(user.get('pageSize')),
          onChange:(page, pageSize)=>{
            dispatch({
              type:'user/query',
              payload:{
                current:page
              }
            })
          }
        }}
      />
    </div>
  );
}

Index.propTypes = {

};

export default connect(({
  user,
  app
})=>({
  user,
  menu:app.get('menu')
}))(Index);
