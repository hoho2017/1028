import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import OuterNet from './outerNet/outer';

function Box(props) {
  const { index } = props;

  return (
    <>
      <Row style={{ marginBottom: '4%' }}>
        {index === 0 ? <OuterNet /> : <></>}
      </Row>
    </>
  );
}

export default Box;
