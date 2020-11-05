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
  const { deptName, deptId, dispatch, sum, addYearData } = props;
  const [title, setTitle] = useState({});
  const [allMonthTotal, setAllMonthTotal] = useState({});
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
      callback: data => {
        setAllMonthTotal(
          Object.keys(data).map(item => {
            return {
              time: item.split('-')[1],
              value: data[item],
              number: data[item],
            };
          }),
        );
      },
    });
  }, []);
  const handleChange = value => {
    console.log(`selected ${value}`);
  };

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
                <Col span={12}>
                  <Chart2 allMonthTotal={allMonthTotal} />
                  <div style={{ textAlign: 'center' }}>近一年密码调用数量</div>
                </Col>
                <Col span={11} offset={1}>
                  <div
                    className={styles.innerbox}
                    style={{
                      padding: '15px',
                      borderRadius: '40px',
                      marginTop: '20px',
                    }}
                  >
                    <Chart3 />
                  </div>
                  <div
                    className={styles.innerbox}
                    style={{
                      padding: '15px',
                      borderRadius: '40px',
                      marginTop: '20px',
                    }}
                  >
                    <Chart4 />
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
                <Col span={8} offset={3}>
                  <div>
                    <span style={{ fontWeight: '600' }}>密码测评报告</span>
                    <Select
                      defaultValue="lucy"
                      style={{ width: 70 }}
                      onChange={handleChange}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled" disabled>
                        Disabled
                      </Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>{' '}
                    <Button
                      className={styles.dbtn}
                      type="primary"
                      shape="circle"
                      icon={<DownloadOutlined />}
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div>
                    <span style={{ fontWeight: '600' }}>历年风评报告</span>
                    <Select
                      defaultValue="lucy"
                      style={{ width: 70 }}
                      onChange={handleChange}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled" disabled>
                        Disabled
                      </Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>{' '}
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
