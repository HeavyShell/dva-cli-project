import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import {injectIntl} from 'react-intl'
import {Map} from 'immutable'
import moment from 'moment'
import {Row, Col, Form, Input, Button} from 'antd'
import styles from './index.less';
import InputPicture from './components/InputPicture';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

function Edit({dispatch,user,match,intl:{formatMessage},form}) {
  const {validateFields,getFieldDecorator} = form;
  
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };

  const info=user.getIn(['byId',match.params.id])||Map();

  function submitData(e){
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        
        if(match.params.id){
          values.id=match.params.id
        }
        values.create_time=moment().format('YYYY-MM-DD HH:mm:ss');
        
        dispatch({
          type:'user/modifyItem',
          payload:values
        })
      }
  });
  }

  return (
    <div className={styles.page}>
      <Form onSubmit={submitData}>
          <FormItem
            {...formItemLayout}
            label={'姓名'}
          >
            {getFieldDecorator('name', {
                initialValue:info.get('name'),
                rules: [{ 
                    required: true, 
                    message: formatMessage({id: 'App.enter'})
                }],
            })(
                <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'年龄'}
          >
            {getFieldDecorator('age', {
                initialValue:info.get('age'),
                rules: [{ 
                    required: true, 
                    message: formatMessage({id: 'App.enter'}) 
                }],
            })(
                <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'邮箱'}
          >
            {getFieldDecorator('email', {
                initialValue:info.get('email'),
                rules: [{ 
                    required: true, 
                    message: formatMessage({id: 'App.enter'}) 
                }],
            })(
                <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'地址'}
          >
            {getFieldDecorator('address', {
                initialValue:info.get('address'),
                rules: [{ 
                    required: true, 
                    message: formatMessage({id: 'App.enter'}) 
                }],
            })(
                <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'喜爱颜色'}
          >
            {getFieldDecorator('love_color', {
                initialValue:info.get('love_color')||'#FFFFFF'
            })(
                <Input type="color" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'头像'}
          >
            {getFieldDecorator('avatar', {
                initialValue:info.get('avatar'),
                // rules: [{ 
                //     required: true, 
                //     message: formatMessage({id: 'App.enter'}) 
                // }],
            })(
              <InputPicture />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'简介'}
          >
            {getFieldDecorator('description', {
                initialValue:info.get('description')
            })(
                <TextArea rows={6} />
            )}
          </FormItem>
          <FormItem>
              <Row>
                <Col offset={6}>
                  <Button type="primary" htmlType="submit">
                      提交
                  </Button>
                </Col>
              </Row>
          </FormItem>
      </Form>
    </div>
  );
}

Edit.propTypes = {

};

export default connect(({
  user
})=>({
  user
}))(injectIntl(Form.create()(Edit)));
