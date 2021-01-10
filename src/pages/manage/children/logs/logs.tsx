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
    dataIndex: 'id',
    key: 'id',
    render: text => <div>{text}</div>,
  },
  {
    title: '日志类型',
    dataIndex: 'typeName',
    key: 'typeName',
    render: text => <div>{text}</div>,
  },
  {
    title: '操作时间',
    dataIndex: 'logDate',
    key: 'logDate',
    render: text => <div>{text}</div>,
  },
  {
    title: '操作人员',
    dataIndex: 'userName',
    key: 'userName',
    render: text => <div>{text}</div>,
  },
  {
    title: '人员角色',
    dataIndex: 'userRule',
    key: 'userRule',
    render: text => <div>{text}</div>,
  },
  {
    title: '操作内容',
    dataIndex: 'logMessage',
    key: 'logMessage',
    render: text => <div>{text}</div>,
  },
];
const { RangePicker } = DatePicker;
const { Option } = Select;
interface PageProps extends ConnectProps {
  manage: ManageModelState;
}
const Logs: FC<PageProps> = props => {
  const {
    manage: {
      ZD: { log_type },
    },
    dispatch,
  } = props;
  const [code, setCode] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);

  const handleChange = value => {
    setCode(value);
  };
  const timeChange = (date, dateString) => {
    console.log(date, dateString);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };
  const query = () => {
    dispatch!({
      type: 'manage/queryLog',
      payload: {
        logTypes: Array.isArray(code) && code.length === 0 ? undefined : code,
        startDate,
        endDate,
        page: current,
        limit: 10,
      },
      callback: page => {
        const { list, totalCount } = page;
        setData(list);
        setTotal(totalCount);
      },
    });
  };
  useEffect(() => {
    query();
  }, [current]);
  const changeCurrent = current => {
    setCurrent(current);
  };
  const { RangePicker } = DatePicker;
  return (
    <ConfigProvider locale={locale}>
      <div className={styles.content2}>
        <Row>
          <Col span={10} className={styles.padding10}>
            <span className={styles.title}>选择类型</span>
            <Select
              mode="multiple"
              style={{ width: 300 }}
              onChange={handleChange}
              maxTagCount={2}
              placeholder="请选择角色类型"
            >
              {log_type.map(item => {
                return <Option value={item.code}>{item.value}</Option>;
              })}
            </Select>
          </Col>
          <Col span={12} offset={0} className={styles.padding10}>
            <span className={styles.title}>时间范围</span>
            <RangePicker onChange={timeChange} />
          </Col>
          <Col span={2}>
            <div
              className={styles.sure}
              onClick={() => {
                query();
              }}
            >
              确定
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.content3}>
        <Table
          pagination={{
            total,
            current,
            onChange: page => changeCurrent(page),
          }}
          bordered
          columns={columns}
          dataSource={data}
        ></Table>
      </div>
    </ConfigProvider>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Logs);
