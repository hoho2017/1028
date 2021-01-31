import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import {
  Row,
  Col,
  Select,
  Table,
  Button,
  Radio,
  List,
  Typography,
  Divider,
  Empty,
} from 'antd';
import Home from './img/home.png';
import Inter from './img/inter.png';
import V from './img/v.png';
import Chart4 from './chart4';
import { DownloadOutlined } from '@ant-design/icons';
const { Option } = Select;

function J(props) {
  const { deptName, deptId, dispatch, sum, addYearData, ZD } = props;
  const [monthArith, setMonthArith] = useState({});
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState();
  const [total, setTotal] = useState(0);

  const [radio, setradio] = useState(ZD.arith[0].id);
  useEffect(() => {
    dispatch({
      type: 'cipher/queryDouble',
      payload: {
        deptId,
      },
      callback: (allMonthTotal, percent, monthArith) => {
        setMonthArith(monthArith);
      },
    });

    dispatch({
      type: 'risk/queryReason',
      payload: {
        deptId,
        limit: 5,
        page: 1,
      },
      callback: page => {
        setList(page.list);
        setTotal(page.totalCount);
        setDetail(page.list.length > 0 && page.list[0]);
      },
    });
  }, [deptId]);
  const onChange = e => {
    setradio(e.target.value); //1 2 3 4
  };
  const data = [
    'Racing car sprays burning .',
    'Japanese princess to wed r.',
    'Australian walks 100km   crash.',
    'Man charged over missing  .',
    'Los Angeles battles huge .',
  ];
  const pageTurning = num => {
    dispatch({
      type: 'risk/queryReason',
      payload: {
        deptId,
        limit: 5,
        page: num,
      },
      callback: page => {
        setList(page.list);
        setTotal(page.totalCount);
      },
    });
  };
  console.log(deptId);
  if (deptId === undefined) {
    return (
      <Empty
        style={{ width: '100%' }}
        description={<span>无数据，请选择机构</span>}
      />
    );
  }
  return (
    <>
      <div
        className={styles.content}
        style={{ padding: '15px', borderRadius: '40px', marginBottom: '2%' }}
      >
        <div className={styles.innerTitle}>调用风险预警</div>
        <Radio.Group
          style={{ width: '100%' }}
          onChange={onChange}
          value={radio}
        >
          {ZD.arith.map(item => {
            return (
              <Radio className={styles.radio} key={item.id} value={item.id}>
                <span>{item.value}</span>
              </Radio>
            );
          })}
        </Radio.Group>
        <Chart4 monthArith={monthArith} id={radio} zd={ZD.arith} />
        <div style={{ textAlign: 'center' }}>近一年各类算法使用趋势</div>
      </div>
      <div
        className={styles.content}
        style={{ padding: '15px', borderRadius: '40px', marginBottom: '2%' }}
      >
        <div className={styles.innerTitle}>调用风险预警</div>
        <Row style={{ marginTop: '10px', cursor: 'pointer' }}>
          <Col span={8} offset={1}>
            <List
              size="small"
              dataSource={list}
              pagination={{
                showSizeChanger: false,
                size: 'small',
                hideOnSinglePage: true,
                pageSize: 5,
                total: total,
                onChange: page => {
                  pageTurning(page);
                },
              }}
              renderItem={item => {
                const name =
                  item.arithId !== null
                    ? ZD.arith[item.arithId - 1].value
                    : ' ';
                return (
                  <List.Item onClick={() => setDetail(item)}>
                    {item.appName + name + item.appTypeName}
                  </List.Item>
                );
              }}
            />
          </Col>
          <Col span={14} offset={1}>
            <div className={styles.content2}>
              {detail ? (
                <>
                  <Row>
                    {detail ? detail.logDate : ''},密码智能体调用
                    {detail.arithId
                      ? ZD.arith[Number(detail ? detail.arithId : 1) - 1].value
                      : ' '}
                    出错
                  </Row>
                  <Row>错误代码:{detail ? detail.appWarnCode : ''}</Row>
                  <Row>错误原因:{detail ? detail.logMessage : ''}</Row>
                </>
              ) : (
                '无数据'
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default J;
