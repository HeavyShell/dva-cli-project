import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import {Alert} from 'antd';
import styles from './index.less';

function Index({home}) {
  return (
    <div className={styles.page}>
       <Alert message="Index Page" type="success" />
    </div>
  );
}

Index.propTypes = {

};

export default connect(({
  home
})=>({
  home
}))(Index);
