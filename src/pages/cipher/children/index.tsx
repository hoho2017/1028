import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import Sec from './sec.tsx';
import Frist from './frist.tsx';
import Third from './third.tsx';

function Box(props) {
  const { deptId, deptName, index, dispatch, ZD, catalogue } = props;
  const [year, setYear] = useState([]);
  const [yearType, setYearType] = useState([]);
  const [allYearData, setAllYearData] = useState([]);
  const [sum, setSum] = useState({});
  useEffect(() => {
    dispatch({
      type: 'cipher/queryY',
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
        setYearType(
          Object.values(y).map(item => {
            return item.assessmentType === 1 ? '风评' : '密评';
          }),
        );
      },
    });
  }, [deptId]);

  return (
    <>
      <Row className={styles.pt20}>
        <Col span={24}>
          <div className={styles.title}>{deptName}</div>
        </Col>
        {/* {catalogue.includes('应用概况') ? (
          <Col span={4} offset={4}>
            <div
              className={styles.tabs}
              style={{ backgroundColor: index !== 0 ? '#D6D6D6' : '#0085E8' }}
            >
              应用概况
            </div>
          </Col>
        ) : null}
        {catalogue.includes('密评详情') ? (
          <Col span={4}>
            <div
              className={styles.tabs}
              style={{ backgroundColor: index !== 1 ? '#D6D6D6' : '#0085E8' }}
            >
              密评详情
            </div>
          </Col>
        ) : null}
        {catalogue.includes('调用详情') ? (
          <Col span={4}>
            <div
              className={styles.tabs}
              style={{ backgroundColor: index !== 2 ? '#D6D6D6' : '#0085E8' }}
            >
              调用详情
            </div>
          </Col>
        ) : null} */}
      </Row>
      <Row>
        {index === '应用概况' ? (
          <Frist
            ZD={ZD}
            addYearData={allYearData}
            deptName={deptName}
            sum={sum}
            dispatch={dispatch}
            deptId={deptId}
          />
        ) : index === '密评详情' ? (
          <Sec
            yearData={year}
            yearType={yearType}
            dispatch={dispatch}
            deptId={deptId}
          />
        ) : index === '调用详情' ? (
          <Third deptId={deptId} ZD={ZD} dispatch={dispatch} />
        ) : null}
      </Row>
    </>
  );
}

export default Box;
