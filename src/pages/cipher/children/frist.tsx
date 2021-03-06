import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, Select, Table, Button, Empty, message } from 'antd';
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
  const [left, setLeft] = useState();
  const [right, setRight] = useState();
  useEffect(() => {
    dispatch({
      type: 'cipher/queryTitle',
      payload: {
        deptId,
      },
      callback: data => {
        setTitle(data.list[0]);
      },
    });
    dispatch({
      type: 'cipher/queryTitle',
      payload: {
        deptId,
      },
      callback: data => {
        setTitle(data.list[0]);
      },
    });
    dispatch({
      type: 'cipher/queryDouble',
      payload: {
        deptId,
      },
      callback: (allMonthTotal, percent, monthArith) => {
        setMonthArith(monthArith);
        setPercent(percent);
        setAllMonthTotal(
          Object.keys(allMonthTotal).map(item => {
            return {
              time: item,
              value: allMonthTotal[item],
              number: allMonthTotal[item],
            };
          }),
        );
      },
    });
  }, [deptId]);
  const handleChangeL = value => {
    setValue1(value.split('*')[0]);
    setLeft(value.split('*')[1]);
  };
  const handleChangeR = value => {
    setValue2(value.split('*')[0]);
    setRight(value.split('*')[1]);
  };
  useEffect(() => {
    const v1 = addYearData.filter(item => {
      return item.assessmentType === 2;
    });
    v1.length > 0 && setValue1(v1[0].year);
    v1.length > 0 && setLeft(v1[0].id);
    const v2 = addYearData.filter(item => {
      return item.assessmentType === 1;
    });
    v2.length > 0 && setValue2(v2[0].year);
    v2.length > 0 && setRight(v2[0].id);
  }, [addYearData]);
  const down = zm => {
    if (zm === 'L') {
      if (left === undefined || left === 'undefined') {
        message.warn('暂无数据可下载');
        return null;
      }
      //use left
      dispatch({
        type: 'cipher/down',
        payload: {
          left,
        },
      });
    } else {
      if (right === undefined || right === 'undefined') {
        message.warn('暂无数据可下载');
        return null;
      }
      // use right
      dispatch({
        type: 'cipher/down',
        payload: {
          right,
        },
      });
    }
  };

  return (
    <div className={styles.frist}>
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
              所属机构:
              <span style={{ color: '#000' }}>
                {title ? title.parentDeptName : ''}
              </span>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.innerTitle}>
              <img src={Inter} className={styles.homeImg} />
              所属网络:
              <span style={{ color: '#000' }}>
                {title ? title.appTypeName : ''}
              </span>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.innerTitle}>
              <img src={V} className={styles.homeImg} />
              安全等级:
              <span style={{ color: '#000' }}>
                {title ? title.appLevelName : ''}
              </span>
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

              {JSON.stringify(sum) === '{}' ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : (
                <Chart1 sum={sum} />
              )}

              <Row style={{ fontSize: '12px' }}>
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
                {/* {JSON.stringify(addYearData) === '{}'? */}
                <>
                  <Col span={9} offset={1}>
                    <div>
                      <span style={{ fontWeight: '600' }}>密码测评报告</span>
                      <Select
                        value={value1}
                        style={{ width: 75, marginLeft: '8px' }}
                        onChange={handleChangeL}
                      >
                        {addYearData.map(item => {
                          if (item.assessmentType === 2) {
                            let year = item.assessmentDate.split('-')[0];
                            return (
                              <Option
                                key={item.id}
                                value={year + '*' + item.id}
                              >
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
                        onClick={() => down('L')}
                        icon={<DownloadOutlined />}
                      />
                    </div>
                  </Col>
                  <Col span={9}>
                    <div>
                      <span style={{ fontWeight: '600' }}>历年风评报告</span>
                      <Select
                        value={value2}
                        style={{ width: 75, marginLeft: '8px' }}
                        onChange={handleChangeR}
                      >
                        {addYearData.map(item => {
                          if (item.assessmentType === 1) {
                            let year = item.assessmentDate.split('-')[0];
                            return (
                              <Option key={year} value={year + '*' + item.id}>
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
                        onClick={() => down('R')}
                        icon={<DownloadOutlined />}
                      />
                    </div>
                  </Col>
                </>
                {/* :<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />} */}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Frist;
