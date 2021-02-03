import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, Select, Table, Button } from 'antd';
import dataB from './img/dataB.png';
import dataG from './img/dataG.png';
import sceneG from './img/sceneG.png';
import sceneB from './img/sceneB.png';
import arrow from './img/arrow.png';
import Chart2 from './charts/chart2';

const { Option } = Select;

function Sec(props) {
  const {
    dispatch,
    deptId,
    ZD: { arith },
  } = props;
  const [id, setId] = useState(1);
  const [no, setno] = useState(0);
  const [cond, setcond] = useState(0);
  const [table, settable] = useState([]);
  const [table2, settable2] = useState([]);
  const [monthArith, setmonthArith] = useState([]);
  const [yearArith, setyearArith] = useState([]);
  const [lines, setlines] = useState({});
  const [ylines, setylines] = useState({});
  const [flist, setflist] = useState({});
  const columns = [
    {
      title: '算法',
      dataIndex: 'name',
      key: 'name',
      render: text => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: '累计使用次数',
      dataIndex: 'ytotal',
      key: 'ytotal',
      render: text => <div style={{ textAlign: 'center' }}> {text}</div>,
    },
    {
      title: '本月使用次数',
      dataIndex: 'mtotal',
      key: 'mtotal',
      render: text => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: '动作',
      dataIndex: 'name',
      key: 'name',
      render: name => {
        return (
          <Button shape="round" onClick={() => setno(name)}>
            查看曲线
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch({
      type: 'cipher/queryListCollect',
      payload: {
        deptId,
        start: '2008-01-01 00:00:00',
        end: '2022-01-01 00:00:00',
      },
      callback: (yearArith, monthArith, allYearTotal, allArithType) => {
        console.log(allArithType);
        if (JSON.stringify(yearArith) === '{}') return null;
        setmonthArith(monthArith);
        setyearArith(yearArith);
        let arr = [];
        let ydata = Object.values(yearArith)[
          Object.values(yearArith).length - 1
        ];
        let mdata = Object.values(monthArith)[
          Object.values(monthArith).length - 1
        ];
        arith.forEach(item => {
          arr.push({
            name: item.value,
            ytotal: allArithType[item.code] || '-',
            mtotal: mdata[item.code] || '-',
          });
        });
        settable(arr);
      },
    });
    dispatch({
      type: 'cipher/queryDouble',
      payload: {
        deptId,
      },
      callback: (allMonthTotal, percent, monthArith, allArithType) => {
        console.log(allArithType);
        let arr = [];
        let mdata = Object.values(monthArith)[
          Object.values(monthArith).length - 1
        ];
        arith.forEach(item => {
          arr.push({
            name: item.value,
            ytotal: allArithType[item.code] || '-',
            mtotal: mdata[item.code] || '-',
          });
        });
        console.log(arr);
        settable2(arr);
      },
    });
    dispatch({
      //箭头 图
      type: 'cipher/queryFlist',
      payload: {
        deptId,
        start: '2008-01-01 00:00:00',
        end: '2022-01-01 00:00:00',
      },
      callback: data => {
        setflist({ ...data });
      },
    });
  }, [deptId]);

  const pagination = {
    current: 1,
    pageSize: 1000,
    hideOnSinglePage: true,
  };
  useEffect(() => {
    // let datas = Object.keys(monthArith).map(item => item.split('-')[1]);
    let datas = Object.keys(monthArith).map(item => item);
    let data = [];
    Object.values(monthArith).forEach((item, index) => {
      Object.keys(item).forEach(name => {
        if (arith.filter(item => item.code === name).length === 0) return null;
        data.push({
          keyword: name,
          // keyword: arith.filter(item=>item.id===Number(name))[0].value,
          dates: datas[index],
          first: item[name],
          name: arith.filter(item => item.code === name)[0].value,
        });
      });
    });

    let obj = {};
    data.forEach(item => {
      if (obj[item.name]) {
        obj[item.name].push(item);
      } else {
        obj[item.name] = [item];
      }
    });
    setlines({ ...obj });
  }, [monthArith]);

  useEffect(() => {
    // let datas = Object.keys(monthArith).map(item => item.split('-')[1]);
    let datas = Object.keys(yearArith).map(item => item);
    let data = [];
    Object.values(yearArith).forEach((item, index) => {
      Object.keys(item).forEach(name => {
        if (arith.filter(item => item.code === name).length === 0) return null;
        data.push({
          // keyword: arith[Number(name) - 1].value,
          keyword: name,
          dates: datas[index],
          first: item[name],
          name: arith.filter(item => item.code === name)[0].value,
        });
      });
    });

    let obj = {};

    data.forEach(item => {
      if (obj[item.name]) {
        obj[item.name].push(item);
      } else {
        obj[item.name] = [item];
      }
    });
    setylines({ ...obj });
  }, [yearArith]);
  let toChinesNum = num => {
    let changeNum = [
      '零',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
    ];
    let unit = ['', '十', '百', '千', '万'];
    num = parseInt(num);
    let getWan = temp => {
      let strArr = temp
        .toString()
        .split('')
        .reverse();
      let newNum = '';
      for (var i = 0; i < strArr.length; i++) {
        newNum =
          (i == 0 && strArr[i] == 0
            ? ''
            : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
            ? ''
            : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
          newNum;
      }
      return newNum;
    };
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) {
      noWan = '0' + noWan;
    }
    return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num);
  };
  no === 0 ? Object.keys(cond === 1 ? ylines : lines)[no] : no;
  console.log(table, table2);
  return (
    <>
      <div
        className={styles.content}
        style={{ padding: '0', marginBottom: '1%' }}
      >
        <Row style={{ padding: '5px' }}>
          <Col span={5} offset={2}>
            <div className={styles.cur} onClick={() => setId(1)}>
              <img className={styles.titleImg} src={id === 1 ? dataB : dataG} />
              <span className={id === 1 ? styles.titleTxt : styles.titleTxt2}>
                调用数据
              </span>
            </div>
          </Col>
          <Col span={5} offset={2}>
            <div className={styles.cur} onClick={() => setId(2)}>
              <img
                className={styles.titleImg}
                src={id === 2 ? sceneB : sceneG}
              />
              <span className={id === 2 ? styles.titleTxt : styles.titleTxt2}>
                调用场景
              </span>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.content} style={{ padding: '10px' }}>
        <div style={{ display: id === 1 ? 'block' : 'none' }}>
          <Row>
            <Col span={8} offset={1}>
              <div className={styles.titleTxt}>
                {cond === 1 ? '历年' : cond === 2 ? '近一年' : '近一年'}
                的调用情况
              </div>
            </Col>
            <Col span={8} offset={7}>
              <Button
                type="primary"
                onClick={() => setcond(1)}
                shape="round"
                style={{
                  backgroundColor: cond === 1 ? '#1890ff' : '#ccc',
                  borderColor: cond === 1 ? '#1890ff' : '#ccc',
                }}
              >
                按年查询
              </Button>
              <Button
                type="primary"
                shape="round"
                onClick={() => setcond(2)}
                style={{
                  marginLeft: '10px',
                  backgroundColor: cond === 2 ? '#1890ff' : '#ccc',
                  borderColor: cond === 2 ? '#1890ff' : '#ccc',
                }}
              >
                按月查询
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ padding: '10px 10px 10px 5%' }}>
              <div>
                算法密码
                <span style={{ marginLeft: '8px' }}>
                  {no === 0 ? Object.keys(cond === 1 ? ylines : lines)[no] : no}
                </span>
              </div>
              <Chart2
                cond={cond}
                td={
                  no === 0
                    ? Object.values(cond === 1 ? ylines : lines)[no]
                    : cond === 1
                    ? ylines[no]
                    : lines[no]
                }
              />
            </Col>
            <Col span={12}>
              <div
                className={styles.innerbox}
                style={{
                  padding: '15px',
                  borderRadius: '40px',
                  marginTop: '20px',
                }}
              >
                <Table
                  pagination={pagination}
                  columns={columns}
                  dataSource={cond === 1 ? table : table2}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ display: id === 2 ? 'block' : 'none' }}>
          <Row>
            <Col span={8} offset={1}>
              <div className={styles.titleTxt}>应用调用密码典型场景</div>
            </Col>
          </Row>
          <Row>
            {Object.keys(flist).map((item, index) => {
              //item => 1，2，3
              return (
                <div
                  className={styles.innerbox2}
                  style={{
                    height:
                      Math.ceil(item.split('，').length / 5) * 3 + 3.5 + 'rem',
                  }}
                >
                  <Row>
                    <Col span={18} offset={1}>
                      <div className={styles.titleb}>
                        场景{toChinesNum(index + 1)}
                      </div>
                      <Row className={styles.mt} style={{ height: '36px' }}>
                        <Col span={4} style={{ margin: '0.4rem 0' }}>
                          <div className={styles.innerTitle2}>应用系统</div>
                        </Col>
                        <Col
                          span={2}
                          style={{ height: '100%', margin: '0.4rem 0' }}
                        >
                          <img
                            className={styles.arrow}
                            src={arrow}
                            style={{ height: '100%' }}
                          />
                        </Col>
                        {item.split('，').map((item2, index) => {
                          return (
                            <>
                              <Col span={2} style={{ margin: '0.4rem 0' }}>
                                <div className={styles.innerTitle2}>
                                  {arith[Number(item2) - 1]
                                    ? arith[Number(item2) - 1].value
                                    : item2}
                                </div>
                              </Col>
                              {index !== item.split('，').length - 1 ? (
                                <Col
                                  span={2}
                                  style={{ height: '100%', margin: '0.4rem 0' }}
                                >
                                  <img
                                    className={styles.arrow}
                                    src={arrow}
                                    style={{ height: '100%' }}
                                  />
                                </Col>
                              ) : null}
                            </>
                          );
                        })}
                      </Row>
                    </Col>
                    <Col span={5}>
                      <div className={styles.txtblue}>
                        约占
                        <span className={styles.big}>
                          {(flist[item] * 100).toFixed(0) + '%'}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Sec;
