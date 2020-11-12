import { ConnectProps, connect, ManageModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col, Table, Radio, Divider } from 'antd';
import {
  appB,
  appG,
  calcB,
  calcG,
  orgB,
  orgG,
  thirdB,
  thirdG,
  titleArr,
  operation,
  columnsApp,
  columnsOrg,
  columnsCalc,
  columnsThird,
} from './store';
interface PageProps extends ConnectProps {
  manage: ManageModelState;
}

const columns = [
  {
    title: 'Name',
    align: 'center',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: false, // Column configuration not to be checked
    name: record.name,
  }),
};
const Source: FC<PageProps> = ( props) => {
  // const {deptId} = props;
  // console.log(deptId)
  console.log(props)
  const {manage , dispatch, deptId} = props
  const { arith } = manage;
  const [no, setNo] = useState(0);
  const [listApp, setListApp] = useState([]);
  const [listOrg, setListOrg] = useState([]);
  const [listCalc, setListCalc] = useState([]);
  const [listThird, setListThird] = useState([]);
  const [selectionType, setSelectionType] = useState('checkbox');
  const queryTApp = page => {
    dispatch({
      type: 'manage/queryTApp',
      payload: {
        deptId: 9,
        limit: 10,
        page: page,
      },
      callback: list => {
        setListApp([...list]);
      },
    });
  };
  const queryTOrg = page => {
    dispatch({
      type: 'manage/queryTOrg',
      payload: {
        deptId: 9,
        limit: 10,
        page: page,
      },
      callback: list => {
        setListOrg([...list]);
      },
    });
  };
  const queryTCalc = page => {
    dispatch({
      type: 'manage/queryTCalc',
      payload: {
        deptId: 9,
      },
      callback: list => {
        setListCalc([...list]);
      },
    });
  };
  const queryTThird = (page:Number) => {
    dispatch({
      type: 'manage/queryTThird',
      payload: {
        deptId: 9,
        limit: 10,
        page: page,
      },
      callback: list => {
        setListThird([...list]);
      },
    });
  };
  useEffect(() => {
    queryTApp(1);
    queryTOrg(1);
    queryTCalc(1);
    queryTThird(1);
  }, []);
  console.log(listOrg)
  return (
    <>
      <div className={styles.content}>
        <Row>
          {titleArr.map((item, index) => {
            return (
              <Col
                key={item.name}
                onClick={() => setNo(index)}
                span={index === 3 ? '6' : '5'}
                offset={index === 0 ? '1' : '0'}
              >
                <img
                  className={styles.titleImg}
                  src={no === index ? item.imgSrcB : item.imgSrcG}
                />
                <span
                  style={{
                    fontWeight: 600,
                    color: no === index ? '#056ace' : '#ccc',
                  }}
                >
                  &emsp;{item.name}
                </span>
              </Col>
            );
          })}
        </Row>
      </div>
      <Row>
        {operation.map((item, index) => {
          if (no === index) {
            return Array.from('123').map(i => {
              return (
                <Col key={i} span={5} offset={i === '1' ? 1 : 0}>
                  <div className={styles.content2}>
                    {item}
                    {i === '1' ? '注册' : i === '2' ? '变更' : '注销'}
                  </div>
                </Col>
              );
            });
          }
        })}
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={22} offset={1}>
          <Table
            rowSelection={{
              columnTitle: '操作',
              type: 'radio',
              ...rowSelection,
            }}
            bordered={true}
            columns={
              no === 0
                ? columnsApp.concat(
                    arith.map(item => {
                      return {
                        title: item.value,
                        dataIndex: item.value.toLowerCase(),
                        key: item.value.toLowerCase(),
                        align: 'center',
                      };
                    }),
                  )
                : no === 1
                ? columnsOrg
                : no === 2
                ? columnsCalc
                : columnsThird
            }
            dataSource={
              no === 0
                ? listApp
                : no === 1
                ? listOrg
                : no === 2
                ? listCalc
                : listThird
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Source);
