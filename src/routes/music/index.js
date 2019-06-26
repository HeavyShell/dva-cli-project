import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import { Row, Col, List, Icon, Spin, Avatar, Radio } from 'antd';
import styles from './index.less';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

function Index({dispatch,music}) {

  const data=music.get('list').map(item=>music.getIn(['byId',item])).toJS();

  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );  

  return (
    <div className={styles.page}>
      <Row>
        <Col>
          <RadioGroup 
            value={music.get('genre')} 
            buttonStyle="solid"
            onChange={(e)=>{
              dispatch({
                type:'music/query',
                payload:{
                  genre:e.target.value
                }
              })
          }}>
            <RadioButton value={0}>默认</RadioButton>
            <RadioButton value={2}>流行</RadioButton>
            <RadioButton value={3}>摇滚</RadioButton>
            <RadioButton value={4}>民谣</RadioButton>
            <RadioButton value={5}>原生</RadioButton>
            <RadioButton value={6}>轻音乐</RadioButton>
            <RadioButton value={7}>古典</RadioButton>
            <RadioButton value={8}>电子</RadioButton>
          </RadioGroup>
        </Col>
      </Row>
      <Spin tip="Loading..." spinning={data.length==0?true:false} >
        {data.length==0?
        <div style={{height:'100vh'}}></div>
        :
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[<IconText type="star-o" text={item.collected_count} />, <IconText type="like-o" text={item.duration} />, <IconText type="message" text={item.songs_count} />]}
              extra={<img width={300} height={200} alt="logo" src={item.cover} />}
            >
              <List.Item.Meta
                title={<a>{item.title}</a>}
                description={item.description||'-'}
              />
              创建者：
              <p><Avatar src={item.creator.picture} /></p>
              <p>{item.creator.name}</p>
            </List.Item>
          )}
        />
        }
      </Spin>
    </div>
  );
}

Index.propTypes = {

};

export default connect(({
  music
})=>({
  music
}))(Index);
