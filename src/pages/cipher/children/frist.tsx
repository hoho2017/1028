import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, Select, Table } from 'antd';
import Home from './img/home.png';
import Inter from './img/inter.png';
import V from './img/v.png';
import { Chart, Point, Line, Tooltip, Coordinate, Area } from 'bizcharts';
import DataSet from '@antv/data-set';

const { Option } = Select;
const data = [
  { item: 'Design', value: 70 },
  { item: 'Development', value: 60 },
  { item: 'Marketing', value: 50 },
  { item: 'Users', value: 40 },
];

function Frist(props) {
  const { deptName } = props;
  const { DataView } = DataSet;
  const dv = new DataView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['a'], // 展开字段集
    key: 'user', // key字段
    value: 'score', // value字段
  });
  return (
    <>
      <div
        className={styles.content}
        style={{ padding: '15px', borderRadius: '40px', marginBottom: '2%' }}
      >
        <Row>
          <Col span={2}>
            <div className={styles.innerTitle}>系统概况</div>
          </Col>
          <Col offset={7} span={4}>
            <div className={styles.innerTitle}>
              <img src={Home} className={styles.homeImg} />
              所属机构:<span style={{ color: '#000' }}>{deptName}</span>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.innerTitle}>
              <img src={Inter} className={styles.homeImg} />
              所属网络:<span style={{ color: '#000' }}>{deptName}</span>
            </div>
          </Col>
          <Col span={4}>
            <div className={styles.innerTitle}>
              <img src={V} className={styles.homeImg} />
              安全等级:<span style={{ color: '#000' }}>{deptName}</span>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.disbox}>
        <Row>
          <Col span={8}>
            <div
              className={styles.innerbox}
              style={{ padding: '15px', borderRadius: '40px' }}
            >
              <div className={styles.innerTitle}>应用密评概况</div>
              <Chart
                height={320}
                data={data}
                autoFit
                scale={{
                  value: {
                    min: 0,
                    max: 90,
                  },
                }}
              >
                <Coordinate type="polar" radius={0.8} />
                <Line position="item*value" size="2" />
                <Area position="item*value" color="#FB7C56" />
              </Chart>
              <Row>
                <Col span={12}>
                  <div className={styles.txt}>密评时间:2022年</div>
                </Col>
                <Col span={12}>
                  <div className={styles.txt}>密评时间:2022年</div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={15} offset={1}>
            <div
              className={styles.innerbox}
              style={{ padding: '15px', borderRadius: '40px' }}
            >
              <div className={styles.innerTitle}>应用密码调用概况</div>
            </div>
            <div
              className={styles.innerbox}
              style={{ padding: '15px', borderRadius: '40px' }}
            >
              <div className={styles.innerTitle}>应用密码调用概况</div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Frist;
