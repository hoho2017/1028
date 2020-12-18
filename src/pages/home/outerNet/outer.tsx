import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './outer.less';
import { Row, Col, Select, Button, Progress } from 'antd';
import { ConnectProps, connect, IndexModelState } from 'umi';
import Chart4 from './chart4';
import Chart5 from './chart5';
import Chart6 from './chart6';
import geo from '@/pages/home/geo.js';
import add from './add.png';
import minus from './minus.png';
const echarts = require('echarts');
const { Option } = Select;
interface PageProps extends ConnectProps {
  index: IndexModelState;
}

const OuterNet: FC<PageProps> = ({ index, dispatch }) => {
  const [chartNo, setChartNo] = useState(0);
  const [city, setCity] = useState([]);
  const [currentCity, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [totalData, setTotalData] = useState({
    charArray: [],
    currentData: [],
    ratioTotalCurrent: { totalList: [] },
  });

  useEffect(() => {
    dispatch!({
      type: 'index/outerInit',
      payload: { appType: 1 },
      callback: data => {
        setTotalData({ ...data.data });
        setCity([...data.city]);
      },
    });

    var myChart = echarts.init(document.getElementById('map'));
    echarts.registerMap('g', geo);

    myChart.setOption({
      series: [
        {
          name: '贵州',
          type: 'map',
          mapType: 'g', // 自定义扩展图表类型
          label: {
            show: true,
          },
        },
      ],
    });
    myChart.on('click', function(params) {
      console.log(params.dataIndex);
      setCurrent(params.dataIndex);
    });
  }, []);
  return (
    <>
      <div className={styles.content3} style={{ paddingBottom: '30px' }}>
        <div className={styles.title}>贵州省电子政务外网密码使用情况</div>
        <Row justify="space-around">
          {totalData.charArray.map((item, index) => {
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
      <div className={styles.content4} style={{ marginBottom: '0px' }}>
        <div className={styles.content5}>
          <img
            src={show ? minus : add}
            className={styles.add}
            onClick={() => setShow(!show)}
          />
          <div
            className={styles.detail}
            style={{ display: show ? 'block' : 'none' }}
          >
            <div className={styles.detailTitle}>
              <span style={{ fontWeight: '700' }}>贵阳市</span>-密码使用情况
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div>
                <span>密码设备数量&emsp;</span>
                <Progress
                  style={{ width: '75%' }}
                  showInfo={false}
                  percent={30}
                />
              </div>
              <div>
                <span>密码设备数量&emsp;</span>
                <Progress
                  style={{ width: '75%' }}
                  showInfo={false}
                  percent={30}
                />
              </div>
              <div>
                <span>密码设备数量&emsp;</span>
                <Progress
                  style={{ width: '75%' }}
                  showInfo={false}
                  percent={30}
                />
              </div>
              <div>
                <span>密码设备数量&emsp;</span>
                <Progress
                  style={{ width: '75%' }}
                  showInfo={false}
                  percent={30}
                />
              </div>
            </div>
          </div>
          <div className={styles.map} id="map"></div>
          <div style={{ maxWidth: '1150px' }}>
            <Row>
              {city.map((item, index) => {
                let max = 0;
                item.totalList.forEach(item => {
                  if (item.value > max) {
                    max = item.value;
                  }
                });
                return (
                  <Col
                    key={item.total.key}
                    span={2}
                    offset={index === 0 ? 1 : 0}
                  >
                    <div className={styles.progress}>
                      <Progress
                        percent={(item.totalList[0].value / max) * 100}
                        showInfo={false}
                        status="active"
                      />
                      <Progress
                        percent={(item.totalList[1].value / max) * 100}
                        strokeColor="#FA5A26"
                        showInfo={false}
                        status="active"
                      />
                    </div>
                    {item.total.key}
                  </Col>
                );
              })}
              <Col span={5} style={{ transform: 'translateY(-30px)' }}>
                <div>
                  <div
                    className={styles.progress}
                    style={{
                      width: '20px',
                      transform: 'rotate(270deg) translateX(-20px)',
                    }}
                  >
                    <Progress
                      percent={100}
                      strokeColor="#1890FF"
                      showInfo={false}
                    />
                  </div>
                  <span>应用调用密码算法的总次数</span>
                </div>
                <div>
                  <div
                    className={styles.progress}
                    style={{
                      width: '20px',
                      transform: 'rotate(270deg) translateX(-20px)',
                    }}
                  >
                    <Progress
                      percent={100}
                      strokeColor="#FA5A26"
                      showInfo={false}
                    />
                  </div>
                  <span>通过密评的应用数量</span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({ index }))(
  OuterNet,
);
