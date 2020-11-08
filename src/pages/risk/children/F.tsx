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
  Progress,
} from 'antd';
import Home from './img/home.png';
import Inter from './img/inter.png';
import V from './img/v.png';
import Chart4 from './chart4';
import { DownloadOutlined } from '@ant-design/icons';
const { Option } = Select;

function F(props) {
  const {
    deptName,
    deptId,
    dispatch,
    sum,
    addYearData,
    ZD: { arith },
  } = props;
  const [avg, setAvg] = useState();
  const [max, setMax] = useState(1);
  const [down, setDown] = useState([]);
  const [stop, setStop] = useState([]);
  const [wrong, setWrong] = useState([]);
  useEffect(() => {
    dispatch({
      type: 'risk/queryDouble',
      payload: {
        deptId: 9,
      },
      callback: avgTime => {
        let obj = {};
        let max = 1;
        Object.keys(avgTime).forEach(item => {
          if (avgTime[item] > max) {
            max = avgTime[item];
          }
          arith.forEach(a => {
            if (a.id == item) {
              obj[a.value] = avgTime[item];
            }
          });
        });
        setAvg(obj);
        setMax(max);
      },
    });
    dispatch({
      type: 'risk/details',
      payload: {
        deptId: 9,
        appTypes: 1,
      },
      callback: list => {
        setDown(list);
      },
    });
    dispatch({
      type: 'risk/details',
      payload: {
        deptId: 9,
        appTypes: 2,
      },
      callback: list => {
        setStop(list);
      },
    });
    dispatch({
      type: 'risk/details',
      payload: {
        deptId: 9,
        appTypes: '1,2',
      },
      callback: list => {
        setWrong(list);
      },
    });
  }, []);
  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col span={10} offset={1}>
          <div className={styles.content3}>
            <div className={styles.innerTitle3}>应用密评概况</div>
            {avg &&
              Object.keys(avg).map((item, index) => {
                let percent = (avg[item] / max) * 100;
                return (
                  <Row style={{ padding: '20px' }}>
                    <Col>
                      <div className={styles.sb}>{item}平均处理时长 </div>
                    </Col>
                    <Col span={15} style={{ marginLeft: '3px' }}>
                      <Progress
                        strokeColor={index % 2 === 0 ? '#FF5B2B' : '#0067E7'}
                        percent={percent}
                        format={percent => `${avg[item]} ms`}
                        status="active"
                      />
                    </Col>
                  </Row>
                );
              })}
          </div>
        </Col>
        <Col span={10} style={{ height: '100%' }}>
          <div className={styles.content3}>
            <div
              className={styles.innerTitle3}
              style={{ marginBottom: '1rem' }}
            >
              密码算法调用趋势预警
            </div>
            {down.map(item => {
              const txt = (item.appName + item.appTypeName).split('下降');
              console.log(txt);
              return (
                <div style={{ padding: '2px' }}>
                  {txt[0]}
                  <span style={{ color: '#1CC30A' }}>下降</span>
                  {txt[1]}
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
      <Row style={{ width: '100%' }}>
        <Col span={10} style={{ height: '100%' }} offset={1}>
          <div className={styles.content3}>
            <div
              className={styles.innerTitle3}
              style={{ marginBottom: '1rem' }}
            >
              密码算法调用趋势预警
            </div>
            {down.map(item => {
              const txt = (item.appName + item.appTypeName).split('停止');
              console.log(txt);
              return (
                <div style={{ padding: '2px' }}>
                  {txt[0]}
                  <span style={{ color: '#DF2B22' }}>停止</span>
                  {txt[1]}
                </div>
              );
            })}
          </div>
        </Col>
        <Col span={10} style={{ height: '100%' }}>
          <div className={styles.content3}>
            <div
              className={styles.innerTitle3}
              style={{ marginBottom: '1rem' }}
            >
              密码算法调用趋势预警
            </div>
            {down.map(item => {
              const txt = (item.appName + item.appTypeName).includes('故障')
                ? (item.appName + item.appTypeName).split('故障')
                : (item.appName + item.appTypeName).split('延时');
              console.log(txt);
              return (
                <div style={{ padding: '2px' }}>
                  {txt[0]} ·
                  {(item.appName + item.appTypeName).includes('故障') ? (
                    <span style={{ color: '#DF2B22' }}>故障</span>
                  ) : (
                    <span style={{ color: '#FFC521' }}>延时</span>
                  )}
                  {txt[1]}
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default F;
