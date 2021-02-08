import { ConnectProps, connect, ManageModelState } from 'umi';
import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './auth.less';
import { treeMake2 } from '@/utils/translateFunc.js';
import {
  Row,
  Col,
  Table,
  Form,
  Button,
  Select,
  message,
  Modal,
  Tree,
} from 'antd';
import {
  memberG,
  memberB,
  authB,
  authG,
  titleArr,
  operation,
  columnsRole,
  formHead,
  columnsAuth,
  columnsRoleJ,
} from './store';
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
const Auth: FC<PageProps> = props => {
  const { manage, dispatch, deptId, deptName } = props;
  const [form] = Form.useForm();
  const { arith, app_source_type, app_type_id } = manage;
  const [no, setNo] = useState(0);
  const [listApp, setListApp] = useState([]);
  const [listOrg, setListOrg] = useState([]);
  const [showForm, setShowForm] = useState('0');
  const [choose, setChoose] = useState({});
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [showAuth, setShowAuth] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [choose2, setChoose2] = useState({});
  const tableRef = useRef();
  const boxRef = useRef();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [authObj, setAuthObj] = useState({});
  const [selectionType, setSelectionType] = useState('checkbox');
  const [tree, setTree] = useState([]);
  const queryTApp = page => {
    dispatch({
      type: 'manage/queryTRole',
      payload: {
        deptId: deptId,
        limit: 10,
        page: page,
      },
      callback: data => {
        const { list, totalCount } = data;
        setTotal(totalCount);
        setListApp(
          list.map(item => {
            item.key = item.roleId;
            return item;
          }),
        );
        setTimeout(() => {
          if (boxRef && boxRef.current) {
            boxRef.current.style.height =
              tableRef.current.offsetHeight + 170 + 'px';
          }
        }, 10);
      },
    });
  };
  const queryTOrg = page => {
    dispatch({
      type: 'manage/queryTAuth',
      payload: {
        limit: 10,
        page: page,
        deptId,
      },
      callback: data => {
        const { list, totalCount } = data;
        setTotal(totalCount);

        setListOrg(
          list.map(item => {
            item.key = item.userId;
            return item;
          }),
        );
        setTimeout(() => {
          if (boxRef) {
            boxRef.current.style.height =
              tableRef.current.offsetHeight + 170 + 'px';
          }
        }, 10);
      },
    });
  };

  useEffect(() => {
    queryTApp(current);
    queryTOrg(current);

    // if (
    //   no === 0 &&
    //   localStorage
    //     .getItem('manage')
    //     ?.split(',')
    //     .includes('94')
    // ) {
    //   queryTApp(current);
    // } else {
    //   queryTOrg(current);
    // }
  }, [deptId, no, current]); //no -> 0 1 2 3
  useEffect(() => {
    setCurrent(1);
    setListOrg([]);
    // setListApp([]);
  }, [no]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChoose({ ...Object.values(selectedRows)[0] });
      setCheckedKeys(
        Object.values(selectedRows)[0].menuIdList !== null
          ? Object.values(selectedRows)[0].menuIdList
          : [],
      );
    },
    getCheckboxProps: record => ({
      disabled: false, // Column configuration not to be checked
      name: record.name,
    }),
  };
  const rowSelection2 = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      setChoose2([...selectedRowKeys]);
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
        values.deptId = deptId;
        values.deptIdList = [];
        values.menuIdList = [];
        dispatch({
          type: 'manage/roleRegister',
          payload: values,
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
      } else if (showForm === '2') {
        //应用变更
        values.deptId = deptId;
        values.deptIdList = [];
        values.menuIdList = [];
        dispatch({
          type: 'manage/roleModify',
          payload: values,
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
      //重新查询
    }
  };

  const onReset = () => {
    form.resetFields();
    setShowForm('0');
  };

  const showFormFunc = (i: string) => {
    if (deptId === undefined && i === '1') {
      message.warn('请先勾选部门！');
      return false;
    }
    if (i === '4') {
      //授权
      const userMenu = localStorage.getItem('userMenu');
      console.log(userMenu);
      if (userMenu === 'true') {
        message.warn('无权限修改');
        return false;
      }
    }
    if (
      (JSON.stringify(choose) === '{}' && i === '2') ||
      (JSON.stringify(choose) === '{}' && i === '4') ||
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
        form.setFieldsValue({ deptName });
      }
      if (i === '2') {
        // 变更设置所属结构
        form.setFieldsValue({ roleId: choose.roleId });
        form.setFieldsValue({ deptName: choose.deptName });
        form.setFieldsValue({ roleName: choose.roleName });
      }
      if (i === '3') {
        //注销
        dispatch({
          type: 'manage/roleDelete',
          payload: {
            id: choose.roleId,
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
      if (i === '4') {
        //授权
        dispatch({
          type: 'manage/queryTree',
          payload: {
            id: choose.id,
          },
          callback: data => {
            //list
            console.log(data);
            setTree(treeMake2(data));
            setShowTree(true);
          },
        });
      }
    }
  };
  const changeCurrent = page => {
    setCurrent(page);
  };
  const handleCancel = () => {
    setShowAuth(false);
  };
  const handleOk = () => {
    // values.password = '123456';
    // values.deptId = deptId;

    dispatch({
      type: 'manage/userModify',
      payload: {
        deptId: authObj.deptId,
        password: '123456',
        roleIdList: choose2,
        username: authObj.username,
        userId: authObj.userId,
      },
      callback: data => {
        if (data.code === 500) {
          message.error(data.msg);
        } else if (data.code === 0) {
          setShowAuth(false);
          message.success('操作成功!');
          onReset();
          queryTOrg(current);
        }
      },
    });
  };
  const showAuthFunc = record => {
    setAuthObj({ ...record });
    // setSelectedKeys([...record.roleIdList]);
    const a = record.roleIdList || [];
    setChoose2([...a]);
    setShowAuth(true);
  };
  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = checkedKeys => {
    setCheckedKeys(checkedKeys); //checked
  };

  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(selectedKeys);
  };
  const roleAuth = () => {
    // values.deptId = 1;
    // values.deptIdList = [];
    // values.menuIdList = [];
    dispatch({
      type: 'manage/roleModify',
      payload: {
        deptId: choose.deptId,
        roleId: choose.roleId,
        roleName: choose.roleName,
        deptIdList: [],
        menuIdList: checkedKeys.checked,
      },
      callback: data => {
        if (data.code === 500) {
          message.error(data.msg);
        } else if (data.code === 0) {
          setShowTree(false);
          message.success('操作成功!');
          onReset();
          queryTApp(current);
        }
      },
    });
  };
  const columnsAuth2 = columnsAuth.concat([
    {
      title: '操作',
      align: 'center',
      render: record => {
        return (
          <Button
            onClick={() => showAuthFunc(record)}
            type="default"
            shape="round"
            style={{ color: '#0085e8' }}
          >
            用户授权
          </Button>
        );
      },
    },
  ]);
  let arrPart = [];
  if (
    localStorage
      .getItem('manage')
      ?.split(',')
      .includes('94')
  ) {
    arrPart.push(titleArr[0]);
  }
  if (
    localStorage
      .getItem('manage')
      ?.split(',')
      .includes('95')
  ) {
    arrPart.push(titleArr[1]);
  }
  console.log(listOrg);
  return (
    <div ref={boxRef}>
      <div className={styles.content}>
        <Row>
          {arrPart.map((item, index) => {
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
      <Row style={{ position: 'relative', zIndex: '3', margin: '2rem' }}>
        {operation.map((item, index) => {
          if (
            no === index &&
            localStorage
              .getItem('manage')
              ?.split(',')
              .includes('94')
          ) {
            return Array.from('1234').map(i => {
              return (
                <Col key={i} span={5} offset={i === '1' ? 1 : 0}>
                  <div
                    className={styles.content2}
                    style={{
                      display: no === 1 ? 'none' : 'block',
                      position: 'absolute',
                    }}
                  >
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
                      {i === '1'
                        ? '注册'
                        : i === '2'
                        ? '变更'
                        : i === '3'
                        ? '注销'
                        : '授权'}
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
        ref={tableRef}
        style={{
          position: 'absolute',
          width: '65%',
          marginTop: '3rem',
        }}
      >
        <Col span={22} offset={1}>
          {no === 0 &&
          localStorage
            .getItem('manage')
            ?.split(',')
            .includes('94') ? (
            <Table
              pagination={{
                total,
                pageSize: 10,
                current,
                onChange: page => changeCurrent(page),
              }}
              rowSelection={{
                columnTitle: '操作',
                type: 'radio',
                ...rowSelection,
              }}
              bordered={true}
              columns={columnsRole}
              dataSource={listApp}
            />
          ) : localStorage
              .getItem('manage')
              ?.split(',')
              .includes('95') ? (
            <Table
              pagination={{
                total,
                pageSize: 10,
                current,
                onChange: page => changeCurrent(page),
              }}
              bordered={true}
              columns={columnsAuth2}
              dataSource={listOrg}
            />
          ) : null}
        </Col>
      </Row>
      <Modal
        closable={false}
        bodyStyle={{ textAlign: 'center' }}
        title={<div className={styles.modalTitle}>用户授权</div>}
        visible={showAuth}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            确定
          </Button>,
        ]}
      >
        <Table
          bordered={true}
          pagination={{
            hideOnSinglePage: true,
          }}
          rowSelection={{
            columnTitle: '选择',
            type: 'radio',
            selectedRowKeys: choose2,
            ...rowSelection2,
          }}
          columns={columnsRoleJ}
          dataSource={listApp}
        />
      </Modal>
      <Modal
        closable={false}
        visible={showTree}
        bodyStyle={{ textAlign: 'center' }}
        title={<div className={styles.modalTitle}>角色授权</div>}
        footer={[
          <Button key="back" onClick={() => setShowTree(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={roleAuth}>
            确定
          </Button>,
        ]}
      >
        <Tree
          checkStrictly
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={tree}
        />
      </Modal>
    </div>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Auth);
