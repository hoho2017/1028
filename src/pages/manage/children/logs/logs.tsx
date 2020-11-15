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
import locale from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
const columns = [
  {
    title: '日志ID',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '日志类型',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '操作时间',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '操作人员',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '人员角色',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '操作内容',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
];
const { Option } = Select;
interface PageProps extends ConnectProps {
  manage: ManageModelState;
}
const Logs: FC<PageProps> = props => {
  const handleChange = value => {};
  const onChange = (date, dateString) => {};

  return (
    <ConfigProvider locale={locale}>
      <div className={styles.content2}>
        <Row>
          <Col span={6} className={styles.padding10}>
            <span className={styles.title}>选择类型</span>
            <Select
              size="small"
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">角色</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Col>
          <Col span={6} offset={4} className={styles.padding10}>
            <span className={styles.title}>开始时间</span>
            <DatePicker showTime size="small" onChange={onChange} />
          </Col>
          <Col span={6} className={styles.padding10}>
            <span className={styles.title}>截止时间</span>
            <DatePicker showTime size="small" onChange={onChange} />
          </Col>
          <Col span={2}>
            <div className={styles.sure}>确定</div>
          </Col>
        </Row>
      </div>
      <div className={styles.content3}>
        <Table bordered columns={columns}></Table>
      </div>
    </ConfigProvider>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Logs);
