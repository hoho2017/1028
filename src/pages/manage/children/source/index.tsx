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
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: record => ({
    disabled: false, // Column configuration not to be checked
    name: record.name,
  }),
};
const Source: FC<PageProps> = ({ manage, dispatch }) => {
  const [no, setNo] = useState(0);
  const [selectionType, setSelectionType] = useState('checkbox');

  return (
    <>
      <div className={styles.content}>
        <Row>
          {titleArr.map((item, index) => {
            return (
              <Col
                onClick={() => setNo(index)}
                span={index === 3 ? '5' : '4'}
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
                <Col span={5} offset={i === '1' ? 1 : 0}>
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
        <Col span={17} offset={1}>
          <Table
            width="100%"
            rowSelection={{
              columnTitle: '操作',
              type: 'radio',
              ...rowSelection,
            }}
            bordered={true}
            columns={columns}
            dataSource={data}
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Source);
