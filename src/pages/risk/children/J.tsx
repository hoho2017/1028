import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import {
  Row,
  Col,
  Select,
  Table,
  Button,
  Radio,
  List,
  Typography,
  Divider,
} from 'antd';
import Home from './img/home.png';
import Inter from './img/inter.png';
import V from './img/v.png';
import Chart4 from './chart4';
import { DownloadOutlined } from '@ant-design/icons';
const { Option } = Select;

function J(props) {
  const { deptName, deptId, dispatch, sum, addYearData, ZD } = props;
  const [monthArith, setMonthArith] = useState({});
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState({});
  const [total, setTotal] = useState(0);

  const [radio, setradio] = useState(ZD.arith[0].id);
  useEffect(() => {
    dispatch({
      type: 'cipher/queryDouble',
      payload: {
        deptId: 9,
      },
      callback: (allMonthTotal, percent, monthArith) => {
        setMonthArith(monthArith);
      },
    });

    dispatch({
      type: 'risk/queryReason',
      payload: {
        deptId: 9,
        limit: 5,
        page: 1,
      },
      callback: page => {
        setList(page.list);
        setTotal(page.totalCount);
        setDetail(page.list.length > 0 && page.list[0]);
      },
    });
  }, []);
  const onChange = e => {
    setradio(e.target.value); //1 2 3 4
  };
  const data = [
    'Racing car sprays burning .',
    'Japanese princess to wed r.',
    'Australian walks 100km   crash.',
    'Man charged over missing  .',
    'Los Angeles battles huge .',
  ];
  const pageTurning = num => {
    dispatch({
      type: 'risk/queryReason',
      payload: {
        deptId: 9,
        limit: 5,
        page: num,
      },
      callback: page => {
        setList(page.list);
        setTotal(page.totalCount);
      },
    });
  };
  console.log(detail);
  console.log(ZD.arith);
  console.log(ZD.arith[Number(detail.arithId)]);

  return (
    <>
      <div
        className={styles.content}
        style={{ padding: '15px', borderRadius: '40px', marginBottom: '2%' }}
      >
        <div className={styles.innerTitle}>调用风险预警</div>
        <Radio.Group
          style={{ width: '100%' }}
          onChange={onChange}
          value={radio}
        >
          {ZD.arith.map(item => {
            return (
              <Radio className={styles.radio} value={item.id}>
                <span>{item.value}</span>
              </Radio>
            );
          })}
        </Radio.Group>
        <Chart4 monthArith={monthArith} id={radio} zd={ZD.arith} />
        <div style={{ textAlign: 'center' }}>近一年各类算法使用趋势</div>
      </div>
      <div
        className={styles.content}
        style={{ padding: '15px', borderRadius: '40px', marginBottom: '2%' }}
      >
        <div className={styles.innerTitle}>调用风险预警</div>
        <Row style={{ marginTop: '10px', cursor: 'pointer' }}>
          <Col span={8} offset={1}>
            <List
              size="small"
              dataSource={list}
              pagination={{
                showSizeChanger: false,
                size: 'small',
                hideOnSinglePage: true,
                pageSize: 5,
                total: total,
                onChange: page => {
                  pageTurning(page);
                },
              }}
              renderItem={item => (
                <List.Item onClick={() => setDetail(item)}>
                  {item.appName +
                    ZD.arith[detail.arithId - 1].value +
                    item.appTypeName}
                </List.Item>
              )}
            />
          </Col>
          <Col span={14} offset={1}>
            <div className={styles.content2}>
              <Row>
                {detail.logDate},密码智能体调用
                {ZD.arith[Number(detail.arithId) - 1].value}出错
              </Row>
              <Row>错误代码:{detail.appWarnCode}</Row>
              <Row>错误原因:{detail.logMessage}</Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default J;
