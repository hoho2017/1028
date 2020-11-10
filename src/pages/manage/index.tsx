import React, { FC } from 'react';
import { connect, ManageModelState, ConnectProps } from 'umi';
import { Row, Col, Radio, Card } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import FreeManageItem from '@/components/FreeManageItem';

import styles from './index.less';


interface PageProps extends ConnectProps {
  manage: ManageModelState;
}

const Manage: FC<PageProps> = ({ manage, dispatch }) => {
  const { manages = [], filterKey = 0, freemanages = [], itemHover = 0 } = manage;


  return (
    <div className={styles.normal}>
      123
    </div>
  );
}

export default connect(({ manage }: { manage: ManageModelState }) => ({ manage }))(Manage);
