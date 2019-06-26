import React from 'react'
import { connect } from 'dva'
import { Row, Col, Form, Upload, message, Icon } from 'antd'
import {Map} from 'immutable'
import { injectIntl } from 'react-intl';
import styles from '../index.less';

const Dragger = Upload.Dragger;

class CommonConfigSelector extends React.Component {
    constructor(props) {
        super(props);
        const id = this.props.value || '';
        this.state = {
          id
        };
    }

    componentWillReceiveProps(nextProps) {
      // Should be a controlled component.
      if ('value' in nextProps) {
        const id = nextProps.value || '';
        this.setState({
          id
        });
      }
    }

    delete=()=>{
      this.setState({
        id:''
      })
      this.contentChange();
    }

    //内容有变化，实时保存
    contentChange=(content)=>{
      const onChange = this.props.onChange;
      if (onChange) {
        onChange(content);
      }
    }
    
    render() {
      const {intl: { formatMessage }} = this.props;
      const {id} = this.state;
     

      const props = {
        name: 'imgFile',
        fileList:[],
        listType:"picture-card",
        beforeUpload: (file) => {
          if (file.type && file.type.substring(0, 6) == 'image/') {
            if(file.size <= 512*1024){
              if(window.FileReader) {
                var fr = new FileReader();
                fr.onloadend = (e)=>{
                  this.setState({
                    id:e.target.result
                  })
                  this.contentChange(e.target.result);
                };
                fr.readAsDataURL(file);
              }
            }else{
              message.warning(formatMessage({ id: 'Teach.maxPictureMemoryIs512KB' }));
            }
          }else{
            message.warning(formatMessage({ id: 'whiteBoard.cntuploadFormat' }));
          }
          return false;
        }
        
      };

      return (
        <div className={styles.InputPicture}>
          <Dragger {...props}>
            {id?
            <img src={id} width="100x" height="100" />
            :
            <div>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或拖拽图片到此区域</p>
              <p className="ant-upload-hint">图片大小不能超过512KB</p>
            </div>
            }
          </Dragger>
          {id?<a className={styles.InputPictureDelete} onClick={this.delete}><Icon type="close-circle" /></a>:null}
        </div>
      );
    }
  }

  export default connect(({ 
    app
  }) => ({ 
    i18n:app.get('i18n')
  }))(injectIntl(Form.create()(CommonConfigSelector)))