import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import Source from './source/index';
import User from './user/user';
import Logs from './logs/logs';
import Cascade from './cascade/logs';
import Auth from './auth/auth';
import Confi from './confidential/confi';
import { findIndex } from 'lodash';

function Box(props) {
  const {
    reset,
    deptId,
    deptName,
    index,
    dispatch,
    ZD,
    child,
    resetTreeData,
  } = props;
  const [year, setYear] = useState([]);
  const [allYearData, setAllYearData] = useState([]);
  const [sum, setSum] = useState({});
  useEffect(() => {
    dispatch({
      type: 'manage/queryY',
      payload: {
        deptId,
      },
      callback: (y, sum) => {
        setAllYearData(
          Object.keys(y).map(item => {
            return { ...y[item], year: item.split('-')[0] };
          }),
        );
        setSum({ ...sum });
        setYear(
          Object.keys(y).map(item => {
            return item.split('-')[0];
          }),
        );
      },
    });
  }, [deptId]);
  // const index = '级联管理';
  return (
    <>
      {/* <Row className={styles.pt20}>
        <Col span={8}>
          <div className={styles.title}>{deptName}</div>
        </Col>
      </Row> */}
      <div>
        {index === '资源注册' ? (
          <Source
            resetTreeData={resetTreeData}
            deptName={deptName}
            deptId={deptId}
            reset={reset}
          />
        ) : index === '用户管理' ? (
          <User deptName={deptName} deptId={deptId} />
        ) : index === '系统日志' ? (
          <Logs />
        ) : index === '用户授权' ? (
          <Auth deptId={deptId} deptName={deptName} />
        ) : index === '密评登记' ? (
          <Confi
            child={child}
            index={index}
            deptName={deptName}
            deptId={deptId}
          />
        ) : index === '级联管理' ? (
          <Cascade />
        ) : null}
      </div>
    </>
  );
}

export default Box;
