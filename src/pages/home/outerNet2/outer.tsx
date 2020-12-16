import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './outer.less';
import { Row, Col, Select, Button } from 'antd';
import { ConnectProps, connect, IndexModelState } from 'umi';
import Chart4 from './chart4';
import Chart5 from './chart5';
import Chart6 from './chart6';
const { Option } = Select;
const arrTitle = [
  '历年密评应用系统数量',
  '历年密评应用在用数量',
  '历年商密认证用户',
  '历年加密传输的终端数',
  '历年应用调用密码次数',
];

interface PageProps extends ConnectProps {
  index: IndexModelState;
}

const OuterNet: FC<PageProps> = ({ index, dispatch }) => {
  const [chartNo, setChartNo] = useState(0);
  const [totalData, setTotalData] = useState({
    charArray: [],
    currentData: [],
    ratioTotalCurrent: { totalList: [] },
  });

  useEffect(() => {
    dispatch!({
      type: 'index/outerInit',
      payload: { appType: 2 },
      callback: data => {
        console.log(data);
        setTotalData({ ...data });
      },
    });
  }, []);

  return (
    <>
      <div className={styles.content3} style={{ padding: '30px' }}>
        <div className={styles.title}>贵州省电子政务外网密码使用情况</div>
        <Row justify="space-around">
          {totalData.charArray.map(item => {
            return (
              <Col span={4}>
                <div
                  className={styles.content2}
                  style={{ paddingBottom: '30px', paddingTop: '20px' }}
                >
                  <div className={styles.number}>
                    {item.total.value}
                    {index === 3 ? '台' : index === 4 ? '次' : '个'}
                  </div>
                  <div className={styles.context}>{item.total.key}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <div className={styles.content1} style={{ padding: '20px' }}>
        <div className={styles.title}>省级单位密码使用情况</div>
        <Row>
          <Col span={18}>
            <Chart4
              data={
                totalData.charArray.length > 0
                  ? totalData.charArray[chartNo].list
                  : []
              }
            />
            <div className={styles.title2}>
              {totalData.charArray.length > 0
                ? totalData.charArray[chartNo].detailName
                : ''}
            </div>
            <Row justify="space-around">
              {totalData.charArray.map((item, index) => {
                return (
                  <Col
                    key={index}
                    span={4}
                    onClick={() => setChartNo(index)}
                    className={chartNo === index ? styles.choosed : ''}
                  >
                    <Chart4 height="100" data={item.list} />
                    <div className={styles.title3}>{item.detailName}</div>
                  </Col>
                );
              })}
              {/* {arrTitle.map((item, index) => {
                return (
                  <Col
                    key={index}
                    span={4}
                    onClick={() => setChartNo(index)}
                    className={chartNo === index ? styles.choosed : ''}
                  >
                    <Chart4 height="100" />
                    <div className={styles.title3}>{arrTitle[index]}</div>
                  </Col>
                );
              })} */}
            </Row>
          </Col>
          <Col span={6}>
            <div>
              <Chart5 data={totalData.ratioTotalCurrent} />
            </div>
            <div>
              <Chart6 data={totalData.currentData} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(
  OuterNet,
);
