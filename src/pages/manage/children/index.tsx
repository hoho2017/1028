import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import Source from './source/index';
import User from './user/user';
import Logs from './logs/logs';
import Auth from './auth/auth';
import Confi from './confidential/confi';
import { findIndex } from 'lodash';

function Box(props) {
  const { deptId, deptName, index, dispatch, ZD, resetTreeData, child } = props;
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

  return (
    <>
      {/* <Row className={styles.pt20}>
        <Col span={8}>
          <div className={styles.title}>{deptName}</div>
        </Col>
      </Row> */}
      <div>
        {index === 0 ? (
          <Source deptName={deptName} deptId={deptId} resetTreeData={resetTreeData} />
        ) : index === 3 ? (
          <User deptName={deptName} deptId={deptId} resetTreeData={resetTreeData} />
        ) : index === 5 ? (
          <Logs />
        ) : index === 4 ? (
          <Auth resetTreeData={resetTreeData} />
        ) : index === 1 ? (
          <Confi child={child} index={index} deptName={deptName} deptId={deptId} resetTreeData={resetTreeData} />
        ) : null}
      </div>
    </>
  );
}

export default Box;
