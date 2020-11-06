import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, Select, Table, Button } from 'antd';
import Home from './img/home.png';
import Inter from './img/inter.png';
import V from './img/v.png';
import Chart1 from './charts/chart1';
import Chart2 from './charts/chart2';
import Chart3 from './charts/chart3';
import Chart4 from './charts/chart4';
import { DownloadOutlined } from '@ant-design/icons';
const { Option } = Select;

function Frist(props) {
  const { deptName, deptId, dispatch, sum, addYearData, ZD } = props;
  const [title, setTitle] = useState({});
  const [allMonthTotal, setAllMonthTotal] = useState({});
  const [percent, setPercent] = useState({});
  const [monthArith, setMonthArith] = useState({});
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  useEffect(() => {
    dispatch({
      type: 'cipher/queryTitle',
      payload: {
        deptId: 9,
      },
      callback: data => {
        setTitle(data.list[0]);
      },
    });
    dispatch({
      type: 'cipher/queryTitle',
      payload: {
        deptId: 9,
      },
      callback: data => {
        setTitle(data.list[0]);
      },
    });
    dispatch({
      type: 'cipher/queryDouble',
      payload: {
        deptId: 9,
      },
      callback: (allMonthTotal, percent, monthArith) => {
        setMonthArith(monthArith);
        setPercent(percent);
        setAllMonthTotal(
          Object.keys(allMonthTotal).map(item => {
            return {
              time: item.split('-')[1],
              value: allMonthTotal[item],
              number: allMonthTotal[item],
            };
          }),
        );
      },
    });
  }, []);
  const handleChange = value => {
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    const v1 = addYearData.filter(item => {
      return item.assessmentType === 1;
    });
    v1.length > 0 && setValue1(v1[0].year);
    const v2 = addYearData.filter(item => {
      return item.assessmentType === 2;
    });
    v2.length > 0 && setValue2(v2[0].year);
  }, [addYearData]);
  console.log(value1);

  return (
    <>
      <div
        className={styles.content}
        style={{ padding: '15px', borderRadius: '40px', marginBottom: '2%' }}
      >
        <Row>
          <Col span={4}>
            <div className={styles.innerTitle}>系统概况</div>
          </Col>
          <Col offset={2} span={6}>
            <div className={styles.innerTitle}>
              <img src={Home} className={styles.homeImg} />
              所属机构:<span style={{ color: '#000' }}>{title.appName}</span>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.innerTitle}>
              <img src={Inter} className={styles.homeImg} />
              所属网络:
              <span style={{ color: '#000' }}>{title.appTypeName}</span>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.innerTitle}>
              <img src={V} className={styles.homeImg} />
              安全等级:
              <span style={{ color: '#000' }}>{title.appLevelName}</span>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.disbox}>
        <Row>
          <Col span={8}>
            <div
              className={styles.innerbox}
              style={{ padding: '15px', borderRadius: '40px', height: '100%' }}
            >
              <div className={styles.innerTitle}>应用密评概况</div>
              <Chart1 sum={sum} />
              <Row>
                {addYearData.map(item => {
                  return (
                    <>
                      <Col span={12}>
                        <div className={styles.txt}>
                          <span style={{ fontWeight: 600 }}>
                            {item.assessmentType === 1
                              ? '风险评估'
                              : '密评时间'}
                            :
                          </span>
                          <span style={{ color: '#056ace' }}>
                            &emsp;{item.year}年
                          </span>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className={styles.txt}>
                          <span style={{ fontWeight: 600 }}>
                            {item.assessmentType === 1
                              ? '风险评估'
                              : '密评结果'}
                            :
                          </span>
                          {item.status === 1 ? (
                            <span style={{ color: 'green' }}>&emsp;通过</span>
                          ) : (
                            <span style={{ color: 'red' }}>&emsp;不通过</span>
                          )}
                        </div>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </div>
          </Col>
          <Col span={15} offset={1}>
            <div
              className={styles.innerbox}
              style={{ padding: '15px', borderRadius: '40px' }}
            >
              <div className={styles.innerTitle}>应用密码调用概况</div>
              <Row>
                <Col span={12} style={{ marginTop: '40px' }}>
                  <Chart2 allMonthTotal={allMonthTotal} />
                  <div style={{ textAlign: 'center' }}>近一年密码调用数量</div>
                </Col>
                <Col span={12}>
                  <div
                    className={styles.innerbox}
                    style={{
                      padding: '15px',
                      borderRadius: '40px',
                      marginTop: '30px',
                      height: '30%',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      近一年各类算法调用占比
                    </div>
                    <Chart3 percent={percent} zd={ZD.arith} />
                  </div>
                  <div
                    className={styles.innerbox}
                    style={{
                      paddingTop: '15px',
                      borderRadius: '40px',
                      marginTop: '20px',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      近一年各类算法调用趋势
                    </div>
                    <Chart4 monthArith={monthArith} zd={ZD.arith} />
                  </div>
                </Col>
              </Row>
            </div>
            <div
              className={styles.innerbox}
              style={{
                padding: '15px',
                borderRadius: '40px',
                marginTop: '20px',
              }}
            >
              <Row>
                <Col span={5}>
                  <div className={styles.innerTitle}>报告下载</div>
                </Col>
                <Col span={9} offset={1}>
                  <div>
                    <span style={{ fontWeight: '600' }}>密码测评报告</span>
                    <Select
                      value={value2}
                      style={{ width: 75, marginLeft: '8px' }}
                      onChange={handleChange}
                    >
                      {addYearData.map(item => {
                        if (item.assessmentType === 2) {
                          let year = item.assessmentDate.split('-')[0];
                          return (
                            <Option key={year} value={year}>
                              {year}
                            </Option>
                          );
                        }
                      })}
                    </Select>
                    <Button
                      className={styles.dbtn}
                      type="primary"
                      shape="circle"
                      icon={<DownloadOutlined />}
                    />
                  </div>
                </Col>
                <Col span={9}>
                  <div>
                    <span style={{ fontWeight: '600' }}>历年风评报告</span>
                    <Select
                      value={value1}
                      style={{ width: 75, marginLeft: '8px' }}
                      onChange={handleChange}
                    >
                      {addYearData.map(item => {
                        if (item.assessmentType === 1) {
                          let year = item.assessmentDate.split('-')[0];
                          return (
                            <Option key={year} value={year}>
                              {year}
                            </Option>
                          );
                        }
                      })}
                    </Select>
                    <Button
                      className={styles.dbtn}
                      type="primary"
                      shape="circle"
                      icon={<DownloadOutlined />}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Frist;
