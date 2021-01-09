import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, Select, Table } from 'antd';

const { Option } = Select;

function Sec(props) {
  const { yearData, yearType, dispatch, deptId } = props;
  const [tableData, setTableData] = useState([]);
  const [index, setIndex] = useState(0);
  const [year, setYear] = useState(yearData[0]);
  const [title, setTitle] = useState({});

  // useEffect(() => {
  //   dispatch({
  //     type: 'cipher/queryTitle',
  //     payload: {
  //       deptId,
  //     },
  //     callback: data => {
  //       //appLevelName
  //     },
  //   });
  // }, []);
  useEffect(() => {
    setYear(yearData[0]);
  }, [yearData]);
  useEffect(() => {
    if (year) {
      dispatch({
        type: 'cipher/queryTable',
        payload: {
          year,
          deptId,
        },
        callback: data => {
          setTableData(data);
          setTitle(data[0]);
        },
      });
    }
  }, [year, deptId]);
  const handleChange = value => {
    setYear(value);
    let i = 0;
    yearData.forEach((item, index) => {
      if (item === value) {
        i = index;
      }
    });
    setIndex(i);
  };
  const pagination = {
    current: 1,
    pageSize: 1000,
    hideOnSinglePage: true,
  };
  const columns = [
    {
      title: '测评指标',
      dataIndex: 'splitTypeDescOne',
      key: 'splitTypeDescOne',
      colSpan: 2,
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        obj.props.rowSpan = 0;

        // if (value === '技术要求' && index > 0) {
        //   obj.props.rowSpan = 0;
        // }
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
        //splitTypeTwo
        if (row.splitTypeTwo !== 0) {
          obj.props.rowSpan = row.splitTypeTwo;
        } else {
          obj.props.rowSpan = 0;
        }
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
      title: title && title.appLevel ? '第' + title.appLevel + '级' : '-',
      colSpan: 1,
      width: '70px',
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
      title: '符合',
      colSpan: 1,
      dataIndex: 'conform',
      key: 'conform',
      render: text => <div>{text}</div>,
    },
    {
      title: '部分符合',
      colSpan: 1,
      dataIndex: 'partialConform',
      key: 'partialConform',
      render: text => <div>{text}</div>,
    },
    {
      title: '不符合',
      colSpan: 1,
      dataIndex: 'unConform',
      key: 'unConform',
      render: text => <div>{text}</div>,
    },
    {
      title: '不适用',
      colSpan: 1,
      dataIndex: 'inconformity',
      key: 'inconformity',
      render: text => <div>{text}</div>,
    },
    {
      title: '监控结果',
      colSpan: 1,
      dataIndex: 'resultType',
      key: 'resultType',
      render: text => <div>{text}</div>,
    },
    {
      title: '详细监控信息',
      colSpan: 1,
      dataIndex: 'resultTypeDesc',
      key: 'resultTypeDesc',
      render: text => <div>{text}</div>,
    },
  ];
  console.log(year);
  return (
    <>
      <div className={styles.content}>
        <Row>
          <Col span={5}>
            <div className={styles.innerTitle}>
              {year === undefined ? null : `${year}年${yearType[index]}详情`}
            </div>
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
