import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import styles from './index.less';

function Edit({film}) {
  return (
    <div className={styles.page}>
      film domestic Edit Page
    </div>
  );
}

Edit.propTypes = {

};

export default connect(({
  film
})=>({
  film
}))(Edit);
