import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import J from './J.tsx';
import F from './F.tsx';

function Box(props) {
  const { deptId, deptName, index, dispatch, ZD } = props;
  const [year, setYear] = useState([]);
  const [allYearData, setAllYearData] = useState([]);
  const [sum, setSum] = useState({});
  useEffect(() => {}, [deptId]);

  return (
    <>
      <Row
        className={styles.pt20}
        style={{ display: index === 0 ? 'none' : 'block' }}
      >
        <Col span={15}>
          <div className={styles.title}>{deptName}</div>
        </Col>
      </Row>
      <Row style={{ marginBottom: '4%' }}>
        {index === '风险概况' ? (
          <J
            ZD={ZD}
            addYearData={allYearData}
            deptName={deptName}
            sum={sum}
            dispatch={dispatch}
            deptId={deptId}
          />
        ) : index === '警示详情' ? (
          <F
            ZD={ZD}
            addYearData={allYearData}
            deptName={deptName}
            sum={sum}
            dispatch={dispatch}
            deptId={deptId}
          />
        ) : null}
      </Row>
    </>
  );
}

export default Box;
