import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import styles from './index.less';

function Edit({music}) {
  return (
    <div className={styles.page}>
      music Edit Page
    </div>
  );
}

Edit.propTypes = {

};

export default connect(({
  music
})=>({
  music
}))(Edit);
