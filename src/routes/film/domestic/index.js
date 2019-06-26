import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import { Row, Col, Card, Icon, Spin, Pagination } from 'antd';
import styles from './index.less';

const { Meta } = Card;

function Index({dispatch,domestic}) {

  const data=domestic.get('list').map(item=>domestic.getIn(['byId',item])).toJS();

  return (
    <div className={styles.page}>
      <Spin tip="Loading..." spinning={data.length==0?true:false} style={{height:'100vh'}}>
        <Row gutter={20}>
          {data.map((item,index)=>{
            return <Col span={4} key={index} style={{margin:'0 0 20px 0'}}>
            <Card
              hoverable
              // loading
              cover={<img alt="example" width="168" height="234" src={item.cover} />}
            >
              <Meta
                title={item.title}
                description={
                  <div>
                    <p>评分：{item.rate}</p>
                    <p><Icon type={'star'} />：{item.star}</p>
                  </div>
                }
              />
            </Card>
          </Col>
          })}
        </Row>
        {data.length==0?
        null
        :
        <Row>
          <Col style={{textAlign:'right'}}>
            <Pagination 
              total={domestic.get('total')} 
              pageSize={domestic.get('pageSize')}
              current={domestic.get('current')}
              pageSizeOptions={['6','12','18','24']}
              onChange={(page, pageSize)=>{
                dispatch({
                  type:'film/query',
                  payload:{
                    current:page,
                    country:'domestic'
                  }
                })
              }}
              onShowSizeChange={(page, pageSize)=>{
                dispatch({
                  type:'film/query',
                  payload:{
                    pageSize:pageSize,
                    country:'domestic'
                  }
                })
              }}
              showSizeChanger 
              showQuickJumper
            />
          </Col>
        </Row>
        }
      </Spin>
    </div>
  );
}

Index.propTypes = {

};

export default connect(({
  film
})=>({
  domestic:film.get('domestic')
}))(Index);
