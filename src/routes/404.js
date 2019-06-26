import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import {Row, Col} from 'antd';
import pathToRegexp from 'path-to-regexp';
import {injectIntl,FormattedMessage} from 'react-intl'
import pic404 from '../assets/404.svg';

function IndexPage({menu}) {
  
  //路由取值
  const homePage=menu.getIn(['byId','home','path']);

  return (
    <div>
      <Row>
        <Col span={12} style={{lineHeight:'calc(100vh - 50px)',textAlign:'center'}}>
          <img src={pic404} />
        </Col>
        <Col span={12} style={{paddingTop:'35vh'}}>
          <h1 style={{fontSize:'48px',fontWeight:'bold'}}>404</h1>
          <h2>
            <FormattedMessage id={'App.page404Tip'} />，
            <Link to={pathToRegexp.compile(homePage)()}>
              <FormattedMessage id={'App.returnHome'} />
            </Link>
          </h2>
        </Col>
      </Row>
      
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(({
  app
})=>({
  menu:app.get('menu')
}))(injectIntl(IndexPage));
