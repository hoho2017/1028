import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './outer.less';
import { Row, Col, Select, Button } from 'antd';
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
function OuterNet(props) {
  const { dispatch } = props;
  const [chartNo, setChartNo] = useState(0);
  return (
    <>
      <div className={styles.content3} style={{ paddingBottom: '30px' }}>
        <div className={styles.title}>贵州省电子政务外网密码使用情况</div>
        <Row justify="space-around">
          <Col span={4}>
            <div className={styles.content2} style={{ paddingBottom: '30px' }}>
              <div className={styles.number}>213个</div>
              <div className={styles.context}>通过密评的应用数量</div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.content2} style={{ paddingBottom: '30px' }}>
              <div className={styles.number}>213个</div>
              <div className={styles.context}>密评后在用应用数量</div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.content2} style={{ paddingBottom: '30px' }}>
              <div className={styles.number}>6980个</div>
              <div className={styles.context}>商密登录的用户数量</div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.content2} style={{ paddingBottom: '30px' }}>
              <div className={styles.number}>3500个</div>
              <div className={styles.context}>加密传输的终端数量</div>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.content2} style={{ paddingBottom: '30px' }}>
              <div className={styles.number}>58980次</div>
              <div className={styles.context}>应用调用密码总次数</div>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.content1} style={{ paddingBottom: '30px' }}>
        <div className={styles.title}>省级单位密码使用情况</div>
        <Row>
          <Col span={18}>
            <Chart4 />
            <div className={styles.title2}>{arrTitle[chartNo]}</div>
            <Row justify="space-around">
              {arrTitle.map((item, index) => {
                return (
                  <Col
                    span={4}
                    onClick={() => setChartNo(index)}
                    className={chartNo === index ? styles.choosed : ''}
                  >
                    <Chart4 height="100" />
                    <div className={styles.title3}>{arrTitle[index]}</div>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col span={6}>
            <div>
              <Chart5 />
            </div>
            <div>
              <Chart6 />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default OuterNet;
