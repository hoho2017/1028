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
} from './store';
interface PageProps extends ConnectProps {
  manage: ManageModelState;
}

const { Option } = Select;

const layout = {
  labelCol: { span: 8, offset: 1 },
  wrapperCol: { span: 14, offset: 1 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: false, // Column configuration not to be checked
    name: record.name,
  }),
};
const Source: FC<PageProps> = props => {
  const { manage, dispatch, deptId } = props;
  const [form] = Form.useForm();
  const { arith } = manage;
  const [no, setNo] = useState(0);
  const [listApp, setListApp] = useState([]);
  const [listOrg, setListOrg] = useState([]);
  const [listCalc, setListCalc] = useState([]);
  const [listThird, setListThird] = useState([]);
  const [selectionType, setSelectionType] = useState('checkbox');
  const queryTApp = page => {
    dispatch({
      type: 'manage/queryTApp',
      payload: {
        deptId: 9,
        limit: 10,
        page: page,
      },
      callback: list => {
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
        deptId: 9,
        limit: 10,
        page: page,
      },
      callback: list => {
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
        deptId: 9,
      },
      callback: list => {
        setListCalc(
          list.map(item => {
            item.key = item.deptId;
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
        deptId: 9,
        limit: 10,
        page: page,
      },
      callback: list => {
        setListThird(
          list.map(item => {
            item.key = item.deptId;
            return item;
          }),
        );
      },
    });
  };
  useEffect(() => {
    queryTApp(1);
    queryTOrg(1);
    queryTCalc(1);
    queryTThird(1);
  }, []);
  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div className={styles.content}>
        <Row>
          {titleArr.map((item, index) => {
            return (
              <Col
                key={item.name}
                onClick={() => setNo(index)}
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
      <Row>
        {operation.map((item, index) => {
          if (no === index) {
            return Array.from('123').map(i => {
              return (
                <Col key={i} span={5} offset={i === '1' ? 1 : 0}>
                  <div className={styles.content2}>
                    <div className={styles.miniTitle}>
                      {item}
                      {i === '1' ? '注册' : i === '2' ? '变更' : '注销'}
                    </div>{' '}
                    <Form
                      {...layout}
                      size="small"
                      form={form}
                      name="control-hooks"
                      onFinish={onFinish}
                    >
                      <Form.Item
                        name="note"
                        label="Note"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="note"
                        label="Note"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="note"
                        label="Note"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="note"
                        label="Note"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                          Reset
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </Col>
              );
            });
          }
        })}
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={22} offset={1}>
          <Table
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
