import React, { FC } from 'react';
import { connect, ManageModelState, ConnectProps } from 'umi';
import { Row, Col, Radio, Card } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import FreeManageItem from '@/components/FreeManageItem';

import styles from './index.less';

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
      123
    </div>
  );
}

export default connect(({ manage }: { manage: ManageModelState }) => ({ manage }))(Manage);
