import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import Sec from './sec.tsx';
import Frist from './frist.tsx';

function Box(props) {
  const { deptId, deptName, index, dispatch } = props;
  const [year, setYear] = useState([]);
  useEffect(() => {
    dispatch({
      type: 'cipher/queryY',
      payload: {
        deptId: 9,
      },
      callback: y => {
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
      <Row className={styles.pt20}>
        <Col span={8}>
          <div className={styles.title}>{deptName}OA系统</div>
        </Col>
        <Col span={4} offset={4}>
          <div
            className={styles.tabs}
            style={{ backgroundColor: index !== 0 ? '#D6D6D6' : '#0085E8' }}
          >
            应用概况
          </div>
        </Col>
        <Col span={4}>
          <div
            className={styles.tabs}
            style={{ backgroundColor: index !== 1 ? '#D6D6D6' : '#0085E8' }}
          >
            密评详情
          </div>
        </Col>
        <Col span={4}>
          <div
            className={styles.tabs}
            style={{ backgroundColor: index !== 2 ? '#D6D6D6' : '#0085E8' }}
          >
            调用详情
          </div>
        </Col>
      </Row>
      <Row>
        {index === 0 ? (
          <Frist deptName={deptName} />
        ) : index === 1 ? (
          <Sec yearData={year} dispatch={dispatch} deptId={deptId} />
        ) : null}
      </Row>
    </>
  );
}

export default Box;
