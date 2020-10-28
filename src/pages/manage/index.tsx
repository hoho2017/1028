import React, { FC } from 'react';
import { connect, ManageModelState, ConnectProps } from 'umi';
import { Row, Col, Radio, Card } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import FreeManageItem from '@/components/FreeManageItem';

import styles from './manage.less';

const RadioGroup = Radio.Group;

interface PageProps extends ConnectProps {
  manage: ManageModelState;
}

const manageType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];

const Manage: FC<PageProps> = ({ manage, dispatch }) => {
  const { manages = [], filterKey = 0, freemanages = [], itemHover = 0 } = manage;
  console.log(freemanages)
  console.log(123)
  const onChange = (e: RadioChangeEvent) => {
    dispatch!({
      type: "manage/save", payload: {
        filterKey: e.target.value
      }
    })
  };
  const onItemHover = (index: number) => {
    dispatch!({
      type: 'manage/save',
      payload: {
        itemHover: index
      },
    });
  }

  return (
    <div className={styles.normal}>
      <div className={styles.info}>
        <Row className={styles.freemanage}>
          <Col span={24}>
            <p>周免英雄</p>
            <div>
              {
                Array.isArray(freemanages)&&freemanages.map((data, index) => (
                  <FreeManageItem
                    data={data}
                    itemHover={itemHover}
                    onItemHover={onItemHover}
                    thisIndex={index}
                    key={index}
                  />
                ))
              }
            </div>
          </Col>
        </Row>
      </div>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {manageType.map(data => (
            <Radio value={data.key} key={`manage-rodio-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>
      <Row>
        {manages.filter(item => filterKey === 0 || item.manage_type === filterKey).reverse().map(item => (
          <Col key={item.ename} span={3} className={styles.manageitem}>
            <img src={`https://game.gtimg.cn/images/yxzj/img201606/manageimg/${item.ename}/${item.ename}.jpg`} />
            <p>{item.cname}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default connect(({ manage }: { manage: ManageModelState }) => ({ manage }))(Manage);
