import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './outer.less';
import { Row, Col, Select, Button, Divider } from 'antd';
import { ConnectProps, connect, IndexModelState } from 'umi';
import Chart4 from './chart4';
import Chart5 from './chart5';
import Chart6 from './chart6';
const { Option } = Select;

interface PageProps extends ConnectProps {
  index: IndexModelState;
}

const Inter: FC<PageProps> = ({ index, dispatch }) => {
  const [chartNo, setChartNo] = useState(0);
  const [totalData, setTotalData] = useState({
    charArray: [],
    currentData: [],
    ratioTotalCurrent: { totalList: [] },
  });

  useEffect(() => {
    dispatch!({
      type: 'index/interDataInit',
      payload: { appType: 2 },
      callback: data => {
        setTotalData({ ...data.data });
      },
    });
  }, []);

  return (
    <>
      <div className={styles.content3} style={{ paddingBottom: '30px' }}>
        <div className={styles.title}>贵州省电子政务外网密码使用情况</div>
        <Row justify="space-around">
          {totalData.charArray.map((item, index) => {
            return (
              <Col key={item.total.key} span={4}>
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
      <div className={styles.content4}>
        <Row>
          <Col span={15}>
            <div className={styles.content5} style={{ marginRight: '40px' }}>
              <Row>
                <Col span={1}>
                  <div className={styles.textTitle}>当年密码调用分布</div>
                </Col>
                <Col offset={2} span={10}>
                  <Chart5 data={totalData.ratioTotalCurrent} />
                </Col>
                <Col offset={1} span={10}>
                  <Chart6 data={totalData.currentData} />
                </Col>
              </Row>
            </div>
          </Col>
          <Col offset={1} span={8}>
            <div className={styles.content5} style={{ padding: '0 15%' }}>
              <div className={styles.textTitle}>风险控制</div>
              <div>2020年10月7日SM2停止调用</div>
              <Divider
                style={{ margin: '12px 0', minWidth: '0', width: '100%' }}
              />
              <div>2020年10月17日SM2停止调用</div>
              <Divider
                style={{ margin: '12px 0', minWidth: '0', width: '100%' }}
              />
              <div>2020年10月27日SM2停止调用</div>
              <Divider
                style={{ margin: '12px 0', minWidth: '0', width: '100%' }}
              />
              <div>2020年10月29日SM2停止调用</div>
              <Divider
                style={{ margin: '12px 0', minWidth: '0', width: '100%' }}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div
        className={styles.content1}
        style={{ paddingBottom: '30px', paddingTop: '30px' }}
      >
        <Row>
          <Col span={24}>
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
        </Row>
      </div>
    </>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(
  Inter,
);
