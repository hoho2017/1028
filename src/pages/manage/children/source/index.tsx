import { ConnectProps, connect, ManageModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import {Row,Col} from 'antd';

interface PageProps extends ConnectProps {
  manage: ManageModelState;
}
const Source: FC<PageProps> = ({ manage, dispatch }) => {
  return <>
    <div className={styles.content}>
    <Row>
      <Col>
123
      </Col>
    </Row>
    </div>
  </>;
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Source);
