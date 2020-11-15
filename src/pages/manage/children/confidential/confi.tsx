import { ConnectProps, connect, ManageModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './confi.less';
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

const { Option } = Select;
const columns = [
  {
    title: '密码应用控制点',
    dataIndex: 'splitTypeDescOne',
    key: 'splitTypeDescOne',
    colSpan: 3,
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      obj.props.rowSpan = 100;

      if (value === '技术要求' && index > 0) {
        obj.props.rowSpan = 0;
      }
      return obj;
    },
  },
  {
    title: 'hide',
    colSpan: 0,
    dataIndex: 'splitTypeDescTwo',
    key: 'splitTypeDescTwo',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      //splitTypeTwo
      if (row.splitTypeTwo !== 0) {
        obj.props.rowSpan = row.splitTypeTwo;
      } else {
        obj.props.rowSpan = 0;
      }
      return obj;
    },
  },
  {
    title: 'hide',
    colSpan: 0,
    dataIndex: 'splitTypeDescThree',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      obj.props.rowSpan = 1;
      return obj;
    },
  },
  {
    title: '第一级',
    colSpan: 1,
    dataIndex: 'resultType',
    key: 'resultType',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      obj.props.rowSpan = 1;
      return obj;
    },
  },
  {
    title: '监控结果',
    colSpan: 1,
    dataIndex: 'resultType',
    key: 'resultType',
    render: text => <div>{text}</div>,
  },
  {
    title: '详细监控信息',
    colSpan: 1,
    dataIndex: 'levelMsg',
    key: 'levelMsg',
    render: text => <div>{text}</div>,
  },
];
const Confi: FC<PageProps> = props => {
  const { deptId, deptName, manage } = props;
  const [isAll, setIsAll] = useState(false);

  const pagination = {
    current: 1,
    pageSize: 1000,
    hideOnSinglePage: true,
  };
  return (
    <>
      <div style={{ marginTop: '1rem' }}>
        <span className={styles.title}>
          {deptName}OA系统 &emsp; 密评登记结果
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.title2}>历年登记情况</div>
        <Row style={{ marginTop: '15px' }}>
          <Col span={1} offset={7}>
            <div className={styles.colorr}></div>
          </Col>
          <Col span={2}>
            <span>登记失败</span>
          </Col>
          <Col span={1} offset={1}>
            <div className={styles.colorg}></div>
          </Col>
          <Col span={2}>
            <span>登记成功</span>
          </Col>
          <Col span={1} offset={1}>
            <div className={styles.colorb}></div>
          </Col>
          <Col span={2}>
            <span>未登记</span>
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={1}>
            <div className={styles.yearbox2}>
              <Row className={styles.yearbox}>
                <Col span={2}>
                  <span className={styles.head}>年份</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  {' '}
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
              </Row>
              <Row>
                <Col span={2} offset={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  {' '}
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
              </Row>
              <Row>
                <Col span={2} offset={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  {' '}
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
                <Col span={2}>
                  <span className={styles.yearNum}>2011</span>
                </Col>
              </Row>
            </div>
          </Col>
          <Col offset={1}>
            <div className={styles.all}>全</div>
          </Col>
        </Row>
        {/* <Table
            style={{ width: '100%', marginTop: '2%', padding: '3%' }}
            columns={columns}
            dataSource={tableData}
            pagination={pagination}
            bordered
          /> */}
      </div>
      <div className={styles.content}>
        <div className={styles.title2}>新增登记</div>
        <Row>
          <Col offset={1}>
            <span style={{ padding: '5px' }}>导入登记信息</span>
            <Select size="small" defaultValue="lucy" style={{ width: 70 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>{' '}
          </Col>
          <Col offset={5}>
            <Button style={{ color: '#0085e8' }} size="small" shape="round">
              导入文件
            </Button>
          </Col>
          <Col offset={1}>
            <Button style={{ color: '#0085e8' }} size="small" shape="round">
              查看导入文件
            </Button>
          </Col>
          <Col offset={1}>
            <Button style={{ color: '#0085e8' }} size="small" shape="round">
              确定导入
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Confi);
