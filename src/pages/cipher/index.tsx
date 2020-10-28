import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC } from 'react';
import styles from './index.less';
import {} from 'antd';

interface PageProps extends ConnectProps {
  cipher: CipherModelState;
}

const Cipher: FC<PageProps> = ({ cipher, dispatch }) => {
  const { catalogue } = cipher;

  return(<div>
    

  </div>);
};

export default connect(({ cipher }: { cipher: CipherModelState }) => ({
  cipher,
}))(Cipher);
