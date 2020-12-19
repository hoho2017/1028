import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import OuterNet from './outerNet/outer';
import OuterNet2 from './outerNet2/outer';
import Province from './province/province';
import Inter from './inter/inter';
import Inter2 from './inter2/inter';

function Box(props) {
  const { index } = props;
  return (
    <>
      <Row style={{ marginBottom: '0%' }}>
        {index === 0 ? (
          <OuterNet />
        ) : index === 1 ? (
          <OuterNet2 />
        ) : index === 2 ? (
          <Inter />
        ) : index === 3 ? (
          <Inter2 />
        ) : (
          <></>
        )}
      </Row>
    </>
  );
}

export default Box;
