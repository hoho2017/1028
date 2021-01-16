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
const temp = [
  {
    name: '贵阳市',
    data: [
      { name: '密码设备数量', value: '23', color: '#FC6030' },
      { name: '商密登录认证', value: '34', color: '#075AA0' },
      { name: '终端加密数量', value: '21', color: '#0263E5' },
      { name: '密评通过应用', value: '6', color: '#FC6030' },
      { name: '密评应用在用', value: '3', color: '#075AA0' },
      { name: '门禁合规数量', value: '35', color: '#0263E5' },
    ],
  },
  {
    name: '六盘水',
    data: [
      { name: '密码设备数量', value: '22', color: '#FC6030' },
      { name: '商密登录认证', value: '13', color: '#075AA0' },
      { name: '终端加密数量', value: '24', color: '#0263E5' },
      { name: '密评通过应用', value: '2', color: '#FC6030' },
      { name: '密评应用在用', value: '3', color: '#075AA0' },
      { name: '门禁合规数量', value: '21', color: '#0263E5' },
    ],
  },
  {
    name: '遵义市',
    data: [
      { name: '密码设备数量', value: '32', color: '#FC6030' },
      { name: '商密登录认证', value: '12', color: '#075AA0' },
      { name: '终端加密数量', value: '21', color: '#0263E5' },
      { name: '密评通过应用', value: '22', color: '#FC6030' },
      { name: '密评应用在用', value: '42', color: '#075AA0' },
      { name: '门禁合规数量', value: '12', color: '#0263E5' },
    ],
  },
  {
    name: '安顺市',
    data: [
      { name: '密码设备数量', value: '32', color: '#FC6030' },
      { name: '商密登录认证', value: '14', color: '#075AA0' },
      { name: '终端加密数量', value: '61', color: '#0263E5' },
      { name: '密评通过应用', value: '6', color: '#FC6030' },
      { name: '密评应用在用', value: '2', color: '#075AA0' },
      { name: '门禁合规数量', value: '24', color: '#0263E5' },
    ],
  },
  {
    name: '毕节市',
    data: [
      { name: '密码设备数量', value: '65', color: '#FC6030' },
      { name: '商密登录认证', value: '43', color: '#075AA0' },
      { name: '终端加密数量', value: '32', color: '#0263E5' },
      { name: '密评通过应用', value: '2', color: '#FC6030' },
      { name: '密评应用在用', value: '34', color: '#075AA0' },
      { name: '门禁合规数量', value: '23', color: '#0263E5' },
    ],
  },
  {
    name: '铜仁市',
    data: [
      { name: '密码设备数量', value: '32', color: '#FC6030' },
      { name: '商密登录认证', value: '33', color: '#075AA0' },
      { name: '终端加密数量', value: '21', color: '#0263E5' },
      { name: '密评通过应用', value: '23', color: '#FC6030' },
      { name: '密评应用在用', value: '35', color: '#075AA0' },
      { name: '门禁合规数量', value: '12', color: '#0263E5' },
    ],
  },
  {
    name: '黔西南',
    data: [
      { name: '密码设备数量', value: '12', color: '#FC6030' },
      { name: '商密登录认证', value: '34', color: '#075AA0' },
      { name: '终端加密数量', value: '4', color: '#0263E5' },
      { name: '密评通过应用', value: '6', color: '#FC6030' },
      { name: '密评应用在用', value: '2', color: '#075AA0' },
      { name: '门禁合规数量', value: '1', color: '#0263E5' },
    ],
  },
  {
    name: '黔东南',
    data: [
      { name: '密码设备数量', value: '5', color: '#FC6030' },
      { name: '商密登录认证', value: '12', color: '#075AA0' },
      { name: '终端加密数量', value: '3', color: '#0263E5' },
      { name: '密评通过应用', value: '6', color: '#FC6030' },
      { name: '密评应用在用', value: '12', color: '#075AA0' },
      { name: '门禁合规数量', value: '21', color: '#0263E5' },
    ],
  },
  {
    name: '黔南',
    data: [
      { name: '密码设备数量', value: '22', color: '#FC6030' },
      { name: '商密登录认证', value: '34', color: '#075AA0' },
      { name: '终端加密数量', value: '1', color: '#0263E5' },
      { name: '密评通过应用', value: '23', color: '#FC6030' },
      { name: '密评应用在用', value: '41', color: '#075AA0' },
      { name: '门禁合规数量', value: '1', color: '#0263E5' },
    ],
  },
];
const OuterNet: FC<PageProps> = ({ index, dispatch }) => {
  const color = [
    '#FC6030',
    '#075AA0',
    '#0263E5',
    '#FC6030',
    '#075AA0',
    '#0263E5',
  ];
  const [chartNo, setChartNo] = useState(0);
  const [city, setCity] = useState([]);
  const [current, setCurrent] = useState('贵阳');
  const [show, setShow] = useState(false);
  const [temp, setTemp] = useState({});
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
        let obj = {};
        data.city.forEach(item => {
          obj[item.total.key.substr(0, 2)] = item.totalList;
        });
        setTemp({ ...obj });
      },
    });

    var myChart = echarts.init(document.getElementById('map'));
    echarts.registerMap('g', geo);

    myChart.setOption({
      series: [
        {
          key: '贵州',
          type: 'map',
          mapType: 'g', // 自定义扩展图表类型
          label: {
            show: true,
          },
        },
      ],
    });
    myChart.on('click', function(params) {
      setCurrent(params.name.substr(0, 2));
      setShow(true);
    });
  }, []);
  const max =
    JSON.stringify(temp) !== '{}' &&
    temp[current]
      .map(item => {
        return Number(item.value);
      })
      .reduce((a, b) => {
        return Math.max(a, b);
      });
  return (
    <>
      <div className={styles.content3} style={{ paddingBottom: '30px' }}>
        <div className={styles.title}>贵州省互联网密码使用情况</div>
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
              <span style={{ fontWeight: '700' }}>{current}</span>
              -密码使用情况
            </div>
            <div style={{ float: 'left', width: '100%', padding: '10px' }}>
              {JSON.stringify(temp) !== '{}' &&
                temp[current].map((item, index) => {
                  return (
                    <div key={item.key}>
                      <Row style={{ padding: '5px' }}>
                        <Col span={9}>
                          <span>{item.key}&emsp;</span>
                        </Col>
                        <Col span={15}>
                          <Progress
                            style={{ width: '100%' }}
                            // showInfo={false}
                            percent={(Number(item.value) / max) * 100}
                            strokeColor={color[index]}
                            format={percent => {
                              return item.value;
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={styles.map} id="map"></div>
          <div style={{ maxWidth: '1150px' }}>
            <Row>
              {city.map((item, index) => {
                let max =
                  item.totalList[0].value > item.totalList[1].value
                    ? item.totalList[0].value
                    : item.totalList[1].value;
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
