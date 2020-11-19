import { ConnectProps, connect, ManageModelState } from 'umi';
import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './user.less';
import { Row, Col, Table, Form, Button, Select, message } from 'antd';
interface PageProps extends ConnectProps {
  manage: ManageModelState;
}
const layout = {
  labelCol: { span: 10, offset: 0 },
  wrapperCol: { span: 14, offset: 0 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const User: FC<PageProps> = props => {
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
  const tableRef = useRef();
  const boxRef = useRef();
  const queryTUser = page => {
    dispatch({
      type: 'manage/queryTUser',
      payload: {
        deptId,
        limit: 10,
        page: page,
      },
      callback: data => {
        const { list, totalCount } = data;
        setTotal(totalCount);
        setListApp(
          list.map(item => {
            item.key = item.userId;
            return item;
          }),
        );
        setTimeout(() => {
          if (boxRef.current !== undefined) {
            boxRef.current.style.minHeight =
              tableRef.current.offsetHeight + 170 + 'px';
          }
        }, 10);
      },
    });
  };

  useEffect(() => {
    queryTUser(current);
  }, [current, deptId]); //no -> 0 1 2 3
  useEffect(() => {
    setCurrent(1);
  }, [no]);
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
        values.password = '123456';
        values.deptId = deptId;
        dispatch({
          type: 'manage/userSave',
          payload: values,
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
              queryTUser(current);
            }
          },
        });
      } else if (showForm === '2') {
        //应用变更
        values.password = '123456';
        values.deptId = deptId;

        dispatch({
          type: 'manage/userModify',
          payload: values,
          callback: data => {
            if (data.code === 500) {
              message.error(data.msg);
            } else if (data.code === 0) {
              message.success('操作成功!');
              onReset();
              queryTUser(current);
            }
          },
        });
      }
      //重新查询
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
    if (i === '1') {
      // 注册设置所属结构
      form.setFieldsValue({ deptId: deptName });
    }
    if (i === '2') {
      // 变更设置所属结构
      form.setFieldsValue({ deptId: choose.deptName });
      form.setFieldsValue({ userId: choose.userId });
      form.setFieldsValue({ username: choose.username });
    }
    if (i === '3') {
      //注销
      dispatch({
        type: 'manage/userDelete',
        payload: {
          id: [choose.userId],
        },
        callback: data => {
          if (data.code === 500) {
            message.error(data.msg);
          } else if (data.code === 0) {
            message.success('操作成功!');
            onReset();
            queryTUser(current);
          }
        },
      });
    }
  };
  const changeCurrent = page => {
    setCurrent(page);
  };
  const operation = ['用户'];
  const columns = [
    {
      title: '用户姓名',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    },
    {
      title: '用户标识',
      dataIndex: 'userId',
      key: 'userId',
      align: 'center',
    },
    {
      title: '所属机构',
      dataIndex: 'deptName',
      key: 'deptName',
      align: 'center',
    },
  ];
  const formHead = [
    {
      label: '所属机构',
      name: 'deptId',
      type: 'input',
      disabled: true,
    },
    {
      label: '用户名称',
      name: 'username',
      type: 'input',
    },
    {
      label: '用户ID',
      name: 'userId',
      type: 'input',
      disabled: '2',
    },
  ];
  return (
    <>
      <Row style={{ position: 'relative', zIndex: '3', marginTop: '20px' }}>
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
                        {formHead.map(item => {
                          return (
                            <Form.Item
                              key={item.name}
                              name={item.name}
                              label={item.label}
                              rules={[{ required: true, message: '此项必填' }]}
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
                        })}
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
        ref={tableRef}
        style={{ position: 'absolute', top: '15rem', width: '65%' }}
      >
        <Col span={22} offset={1}>
          <Table
            pagination={{
              total,
              current,
              onChange: page => changeCurrent(page),
            }}
            rowSelection={{
              columnTitle: '选择',
              type: 'radio',
              ...rowSelection,
            }}
            bordered={true}
            columns={columns}
            dataSource={listApp}
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(User);
