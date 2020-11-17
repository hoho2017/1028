import { ConnectProps, connect, ManageModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import {
  Row,
  Col,
  Table,
  Divider,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  message,
} from 'antd';
import {
  appB,
  appG,
  calcB,
  calcG,
  orgB,
  orgG,
  thirdB,
  thirdG,
  titleArr,
  operation,
  columnsApp,
  columnsOrg,
  columnsCalc,
  columnsThird,
  formHead,
} from './store';
interface PageProps extends ConnectProps {
  manage: ManageModelState;
}

const { Option } = Select;

const layout = {
  labelCol: { span: 10, offset: 0 },
  wrapperCol: { span: 14, offset: 0 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const Source: FC<PageProps> = props => {
  const { manage, dispatch, deptId, deptName } = props;
  const [form] = Form.useForm();
  const { arith, app_source_type, app_type_id } = manage;
  const [no, setNo] = useState(0);
  const [listApp, setListApp] = useState([]);
  const [listOrg, setListOrg] = useState([]);
  const [listCalc, setListCalc] = useState([]);
  const [listThird, setListThird] = useState([]);
  const [showForm, setShowForm] = useState('0');
  const [choose, setChoose] = useState({});
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [selectionType, setSelectionType] = useState('checkbox');
  const queryTApp = page => {
    dispatch({
      type: 'manage/queryTApp',
      payload: {
        parentDeptId: deptId,
        limit: 10,
        page: page,
      },
      callback: data => {
        const { list = [], totalCount = 0 } = data;
        setTotal(totalCount);
        setListApp(
          list.map(item => {
            item.key = item.deptId;
            return item;
          }),
        );
      },
    });
  };
  const queryTOrg = page => {
    dispatch({
      type: 'manage/queryTOrg',
      payload: {
        parentId: deptId,
        limit: 10,
        page: page,
      },
      callback: data => {
        const { list = [], totalCount = 0 } = data;
        setTotal(totalCount);

        setListOrg(
          list.map(item => {
            item.key = item.deptId;
            return item;
          }),
        );
      },
    });
  };
  const queryTCalc = page => {
    dispatch({
      type: 'manage/queryTCalc',
      payload: {
        deptId,
      },
      callback: data => {
        const { list = [], totalCount = 0 } = data;
        setTotal(totalCount);

        setListCalc(
          list.map(item => {
            item.key = item.code;
            return item;
          }),
        );
      },
    });
  };
  const queryTThird = (page: Number) => {
    dispatch({
      type: 'manage/queryTThird',
      payload: {
        deptId,
        limit: 10,
        page: page,
      },
      callback: data => {
        const { list = [], totalCount = 0 } = data;
        setTotal(totalCount);

        setListThird(
          list.map(item => {
            item.key = item.id;
            return item;
          }),
        );
      },
    });
  };
  useEffect(() => {
    no === 0 && queryTApp(current);
    no === 1 && queryTOrg(current);
    no === 2 && queryTCalc(current);
    no === 3 && queryTThird(current);
  }, [deptId, no, current]); //no -> 0 1 2 3
  useEffect(() => {
    setCurrent(1);
    setChoose({})
  }, [no,deptId]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChoose({ ...Object.values(selectedRows)[0] });
    },
    getCheckboxProps: record => ({
      disabled: false, // Column configuration not to be checked
      name: record.name,
    }),
  };
  const onFinish = values => {
    if (no === 0) {
      if (showForm === '1') {
        //应用注册
        values.arithList = values.arithList.toString();
        values.parentDeptId = deptId;
        dispatch({
          type: 'manage/appRegister',
          payload: values,
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
            }
          },
        });
      } else if (showForm === '2') {
        //应用变更
        values.arithList = values.arithList.toString();
        values.parentDeptId = deptId;
        values.appId = choose.appId;
        dispatch({
          type: 'manage/appModify',
          payload: values,
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
            }
          },
        });
      }
      //重新查询
      queryTApp(current);
    } else if (no === 1) {
      if (showForm === '1') {
        //应用注册
        // values.arithList = values.arithList.toString();
        values.parentId = deptId;
        dispatch({
          type: 'manage/orgRegister',
          payload: values,
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
            }
          },
        });
      } else if (showForm === '2') {
        //应用变更
        values.parentId = deptId;
        dispatch({
          type: 'manage/orgModify',
          payload: values,
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
            }
          },
        });
      }
      //重新查询
      queryTOrg(current);
    } else if (no === 2) {
      if (showForm === '1') {
        //应用注册
        values.value = values.name;
        dispatch({
          type: 'manage/calcRegister',
          payload: values,
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
            }
          },
        });
      } else if (showForm === '2') {
        //应用变更
        values.value = values.name;
        values.id = choose.id;
        values.type = choose.type;
        dispatch({
          type: 'manage/calcModify',
          payload: values,
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
            }
          },
        });
      }
      //重新查询
      queryTCalc(current);
    } else if (no === 3) {
      if (showForm === '1') {
        //应用注册
        values.parentDeptId = deptId;
        dispatch({
          type: 'manage/thirdRegister',
          payload: values,
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
              //重新查询
              queryTThird(current);
            }
          },
        });
      } else if (showForm === '2') {
        //应用变更
        values.parentDeptId = deptId;
        dispatch({
          type: 'manage/thirdModify',
          payload: values,
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
              //重新查询
              queryTThird(current);
            }
          },
        });
      }
    }
  };

  const onReset = () => {
    form.resetFields();
    setShowForm('0');
  };
  const showFormFunc = (i: string) => {
    if (
      (JSON.stringify(choose) === '{}' && i === '2') ||
      (JSON.stringify(choose) === '{}' && i === '3')
    ) {
      //勾选操作
      message.warn('请先勾选目标！');
      return false;
    }
    setShowForm(showForm === '0' ? i : '0');
    if (showForm !== '0') {
      //关闭清除数据
      form.resetFields();
    }
    if (no === 0) {
      if (i === '1') {
        // 注册设置所属结构
        form.setFieldsValue({ parentDeptId: deptName });
      }
      if (i === '2') {
        // 变更设置所属结构
        form.setFieldsValue({ parentDeptId: deptName });
        form.setFieldsValue({ uniqueAppId: choose.uniqueAppId });
      }
      if (i === '3') {
        //注销
        dispatch({
          type: 'manage/appDelete',
          payload: {
            appId: choose.appId,
          },
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
              queryTApp(current);
            }
          },
        });
      }
    } else if (no === 1) {
      if (i === '1') {
        // 注册设置所属结构
        form.setFieldsValue({ parentId: deptName });
      }
      if (i === '2') {
        // 变更设置所属结构
        form.setFieldsValue({ parentId: deptName });
        form.setFieldsValue({ deptId: choose.deptId });
      }
      if (i === '3') {
        //注销
        dispatch({
          type: 'manage/orgDelete',
          payload: {
            id: choose.deptId,
          },
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
              queryTApp(current);
            }
          },
        });
      }
    } else if (no === 2) {
      if (i === '2') {
        // 变更设置所属结构
        form.setFieldsValue({ code: choose.code });
      }
      if (i === '3') {
        //注销
        dispatch({
          type: 'manage/calcDelete',
          payload: {
            id: choose.id,
          },
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
              queryTCalc(current);
            }
          },
        });
      }
    } else if (no === 3) {
      if (i === '1') {
        // 变更设置所属结构
        form.setFieldsValue({ parentDeptId: deptName });
      }
      if (i === '2') {
        // 变更设置所属结构
        form.setFieldsValue({ parentDeptId: deptName });
        form.setFieldsValue({ id: choose.id });
      }
      if (i === '3') {
        //注销
        dispatch({
          type: 'manage/thirdDelete',
          payload: {
            id: choose.id,
          },
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
              queryTThird(current);
            }
          },
        });
      }
    }
  };
  const changeCurrent = page => {
    setCurrent(page);
  };
  return (
    <>
      <div className={styles.content}>
        <Row>
          {titleArr.map((item, index) => {
            return (
              <Col
                key={item.name}
                onClick={() => {
                  setNo(index);
                  setChoose({});
                }}
                span={index === 3 ? '6' : '5'}
                offset={index === 0 ? '1' : '0'}
              >
                <img
                  className={styles.titleImg}
                  src={no === index ? item.imgSrcB : item.imgSrcG}
                />
                <span
                  style={{
                    fontWeight: 600,
                    color: no === index ? '#056ace' : '#ccc',
                  }}
                >
                  &emsp;{item.name}
                </span>
              </Col>
            );
          })}
        </Row>
      </div>
      <Row style={{ position: 'relative', zIndex: '3' }}>
        {operation.map((item, index) => {
          if (no === index) {
            return Array.from('123').map(i => {
              return (
                <Col key={i} span={5} offset={i === '1' ? 1 : 0}>
                  <div className={styles.content2}>
                    <div
                      className={
                        (i === '1' && showForm === '1') ||
                        (i === '2' && showForm === '2')
                          ? styles.miniTitle
                          : styles.miniTitle2
                      }
                      onClick={() => showFormFunc(i)}
                    >
                      {item}
                      {i === '1' ? '注册' : i === '2' ? '变更' : '注销'}
                    </div>
                    {(i === '1' && showForm === '1') ||
                    (i === '2' && showForm === '2') ? (
                      <Form
                        {...layout}
                        size="small"
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                      >
                        {formHead(arith, app_source_type, app_type_id)[no].map(
                          item => {
                            return (
                              <Form.Item
                                key={item.name}
                                name={item.name}
                                label={item.label}
                                rules={[
                                  { required: true, message: '此项必填' },
                                ]}
                              >
                                {item.type === 'input' ? (
                                  <input
                                    disabled={
                                      item.disabled === i ||
                                      item.disabled === true
                                        ? true
                                        : false
                                    }
                                  />
                                ) : item.type === 'Select' ? (
                                  <Select mode={item.mode ? item.mode : ''}>
                                    {item.options.map(item => {
                                      return (
                                        <Select.Option
                                          key={item.code}
                                          value={item.code}
                                        >
                                          {item.value}
                                        </Select.Option>
                                      );
                                    })}
                                  </Select>
                                ) : null}
                              </Form.Item>
                            );
                          },
                        )}
                        <Form.Item {...tailLayout}>
                          <Button htmlType="button" onClick={onReset}>
                            取消
                          </Button>
                          <Button type="primary" htmlType="submit">
                            确认
                          </Button>
                        </Form.Item>
                      </Form>
                    ) : null}
                  </div>
                </Col>
              );
            });
          }
        })}
      </Row>
      <Row
        // style={
        //   showForm === '0'
        //     ? { marginTop: '43px' }
        //     : { position: 'absolute', width: '65.1%', top: '250px' }
        // }
        style={{position:'fixed',top:'250px',width:'67%'}}
      >
        <Col span={22} offset={1}>
          <Table
            pagination={{
              total,
              current,
              onChange: page => changeCurrent(page),
            }}
            rowSelection={{
              columnTitle: '操作',
              type: 'radio',
              ...rowSelection,
            }}
            bordered={true}
            columns={
              no === 0
                ? columnsApp.concat(
                    arith.map(item => {
                      return {
                        title: item.value,
                        dataIndex: item.value.toLowerCase(),
                        key: item.value.toLowerCase(),
                        align: 'center',
                        render:(key)=>{
                          return key?'是':'否'
                        }
                      };
                    }),
                  )
                : no === 1
                ? columnsOrg
                : no === 2
                ? columnsCalc
                : columnsThird
            }
            dataSource={
              no === 0
                ? listApp
                : no === 1
                ? listOrg
                : no === 2
                ? listCalc
                : listThird
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Source);
