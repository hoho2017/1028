import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import Source from './source/index.tsx'

function Box(props) {
  const { deptId, deptName, index, dispatch, ZD } = props;
  const [year, setYear] = useState([]);
  const [allYearData, setAllYearData] = useState([]);
  const [sum, setSum] = useState({});
  useEffect(() => {
    dispatch({
      type: 'cipher/queryY',
      payload: {
        deptId: 9,
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
          <div className={styles.title}>{deptName}OA系统</div>
        </Col>
      </Row> */}
      <div>
        {
          index===0?<Source/>:''
        }
      </div>
    </>
  );
}

export default Box;
