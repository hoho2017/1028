import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, Select, Table } from 'antd';

const { Option } = Select;
const columns = [
  {
    title: '密码应用控制点',
    dataIndex: 'splitTypeDescOne',
    key: 'splitTypeDescOne',
    colSpan: 3,
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      obj.props.rowSpan = 100;

      if (value === '技术要求' && index > 0) {
        obj.props.rowSpan = 0;
      }
      return obj;
    },
  },
  {
    title: 'hide',
    colSpan: 0,
    dataIndex: 'splitTypeDescTwo',
    key: 'splitTypeDescTwo',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      obj.props.rowSpan = 1;
      return obj;
    },
  },
  {
    title: 'hide',
    colSpan: 0,
    dataIndex: 'splitTypeDescThree',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      obj.props.rowSpan = 1;
      return obj;
    },
  },
  {
    title: 'levelMsg',
    colSpan: 1,
    dataIndex: 'levelMsg',
    key: 'levelMsg',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      obj.props.rowSpan = 1;
      return obj;
    },
  },
  {
    title: 'resultType',
    colSpan: 1,
    dataIndex: 'resultType',
    key: 'resultType',
    render: text => <div>{text}</div>,
  },
  {
    title: 'resultType',
    colSpan: 1,
    dataIndex: 'resultType',
    key: 'resultType',
    render: text => <div>{text}</div>,
  },
];

function Sec(props) {
  const { yearData, dispatch, deptId } = props;
  const [tableData, setTableData] = useState([]);
  const [year, setYear] = useState(yearData[0]);
  useEffect(() => {
    setYear(yearData[0]);
  }, [yearData]);
  useEffect(() => {
    if (year) {
      dispatch({
        type: 'cipher/queryTable',
        payload: {
          year,
          deptId: 9,
        },
        callback: data => {
          setTableData(data);
        },
      });
    }
  }, [year]);
  const handleChange = value => {
    setYear(value);
  };
  const pagination = {
    current: 1,
    pageSize: 1000,
    hideOnSinglePage: true,
  };
  return (
    <>
      <div className={styles.content}>
        <Row>
          <Col span={5}>
            <div className={styles.innerTitle}>{year}年风评详情</div>
          </Col>
          <Col offset={15}>
            <Select
              value={year}
              size="small"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              {yearData.map(item => {
                return (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Row>
          <Table
            style={{ width: '100%', marginTop: '2%', padding: '3%' }}
            columns={columns}
            dataSource={tableData}
            pagination={pagination}
            bordered
          />
        </Row>
      </div>
    </>
  );
}

export default Sec;
