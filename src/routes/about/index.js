import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import {Timeline} from 'antd';
import styles from './index.less';

function Index({about}) {
  return (
    <div className={styles.page}>
      <h3 style={{marginBottom:'15px'}}>历史版本：</h3>
      <Timeline>
        <Timeline.Item color={'green'}>version:dva-cli2018-08-09</Timeline.Item>
        <Timeline.Item>version:dva-cli2018-08-07</Timeline.Item>
        <Timeline.Item>version:dva-cli2018-08-06</Timeline.Item>
        <Timeline.Item>version:dva-cli2018-08-05-v2</Timeline.Item>
        <Timeline.Item>version:dva-cli2018-08-05</Timeline.Item>
        <Timeline.Item>version:dva-cli2018-07-31</Timeline.Item>
        <Timeline.Item>version:dva-cli2018-07-29</Timeline.Item>
      </Timeline>
    </div>
  );
}

Index.propTypes = {

};

export default connect(({
  about
})=>({
  about
}))(Index);
