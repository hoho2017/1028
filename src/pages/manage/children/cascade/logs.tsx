import { ConnectProps, connect, ManageModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './logs.less';
import {
  Row,
  Col,
  Table,
  Form,
  Button,
  Select,
  message,
  DatePicker,
  ConfigProvider,
} from 'antd';
import rowB from './imgs/rowB.png';
import rowG from './imgs/rowG.png';
import colB from './imgs/colB.png';
import colG from './imgs/colG.png';
import locale from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';

interface PageProps extends ConnectProps {
  manage: ManageModelState;
}
const Cascade: FC<PageProps> = props => {
  const { dispatch } = props;
  const [flag, setFlag] = useState(true);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: text => <div>{text}</div>,
    },
    {
      title: '级联对象',
      dataIndex: 'cascadeName',
      align: 'center',
      key: 'cascadeName',
      render: text => <div>{text}</div>,
    },
    {
      title: '级联状态',
      dataIndex: 'cascadeStatusName',
      align: 'center',
      key: 'cascadeStatusName',
      render: text => <div>{text}</div>,
    },
    {
      title: '级联情况',
      align: 'center',
      dataIndex: 'cascadeStatusName',
      key: 'cascadeStatusName',
      render: (record, text) => (
        <Button type="primary" shape="round" onClick={() => queryDetail(text)}>
          查看详情
        </Button>
      ),
    },
  ];
  const queryDetail = record => {
    console.log(record);
    dispatch!({
      type: 'manage/queryDetailCascade',
      payload: {
        id: record.id,
      },
      callback: data => {
        console.log(data);
      },
    });
  };
  useEffect(() => {
    queryTrue();
  }, []);
  const queryTrue = () => {
    dispatch!({
      type: 'manage/queryListCascade',
      payload: {
        cascadeType: flag ? '1' : '2',
        page: current,
        limit: 10,
      },
      callback: data => {
        setList([...data.list]);
        setTotal(data.totalCount);
      },
    });
  };
  useEffect(() => {
    queryTrue();
  }, [current, flag]);
  return (
    <div>
      <div className={styles.content2}>
        <Row>
          <Col span={4} onClick={() => setFlag(true)}>
            <img className={styles.w22} src={flag ? colB : colG} />{' '}
            <span
              className={styles.f1l3}
              style={{ color: flag ? '#056ACE' : '#ccc' }}
            >
              纵向级联
            </span>
          </Col>
          <Col span={4} onClick={() => setFlag(false)}>
            <img className={styles.w22} src={!flag ? rowB : rowG} />{' '}
            <span
              className={styles.f1l3}
              style={{ color: !flag ? '#056ACE' : '#ccc' }}
            >
              横向级联
            </span>
          </Col>
        </Row>
      </div>
      <div className={styles.content2}>
        <Table
          pagination={{
            total,
            current,
            onChange: page => setCurrent(page),
          }}
          columns={columns}
          style={{ padding: '2%' }}
          bordered
          dataSource={list}
        />
      </div>
    </div>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Cascade);
