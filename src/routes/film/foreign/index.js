import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import { Row, Col, Card, Icon, Spin, Pagination } from 'antd';
import styles from './index.less';
import InfiniteScroll from 'react-infinite-scroller';

const { Meta } = Card;

class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore:true,
      tempCurrent:1
    }
  }

  loadMore=()=>{
    
      const {dispatch,foreign} = this.props;
    
      const data = foreign.get('byId').toList();
      const total = foreign.get('total');
      
      this.setState({
          loading: true,
      });
      if(data.size>=total){
        this.setState({
            hasMore: false,
            loading: false,
        });
      }else{
        
        if(this.state.tempCurrent<foreign.get('current')+1){
          this.setState({
            tempCurrent:foreign.get('current')+1
          })
          dispatch({
              type: 'film/changeLoading',
              payload: {
                  value: true
              }
          });
          dispatch({
              type: 'film/query',
              payload: {
                  current: foreign.get('current')+1,
                  country:'foreign'
              }
          });
          
        }
        this.setState({
            loading: false,
        });
      }
  }

  render(){

    const {foreign} = this.props;
    const data=foreign.get('byId').toList().toJS();

    return (
      <div className={styles.page}>
        {/* <Spin tip="Loading..." spinning={data.length==0?true:false} style={{height:'100vh'}}> */}
          <div className={styles.scrollOut}>
            <InfiniteScroll
                pageStart={0}
                initialLoad={false}
                loadMore={this.loadMore}
                hasMore={!this.state.loading && this.state.hasMore}
                loader={
                    <div key={Math.random()} className={styles.scrollLoader}>
                        <Spin 
                            tip="Loading..."
                        />
                    </div>
                }
                useWindow={false}>
                <Row gutter={20}>
                {
                data.map((item,index)=>{
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
                })
                }
                </Row>
            </InfiniteScroll>
          </div>
        {/* </Spin> */}
      </div>
    );
  }
}

Index.propTypes = {

};

export default connect(({
  film
})=>({
  foreign:film.get('foreign')
}))(Index);
