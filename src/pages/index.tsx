import { ConnectProps, connect, IndexModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Tabs, Tree, Input } from 'antd';
import Box from './home/index';

const { TabPane } = Tabs;
const { Search } = Input;

interface PageProps extends ConnectProps {
  index: IndexModelState;
}

const Index: FC<PageProps> = ({ index, dispatch }) => {
  const { catalogue, ZD } = index; //二级目录

  const minHeight = document.body.clientHeight - 136 + 'px';
  console.log('catalogue', catalogue);

  return (
    <>
      <div className="tabs">
        <Tabs tabPosition="left" size="large" style={{ minHeight }}>
          {catalogue.map((item, index) => {
            return (
              <TabPane tab={item} key={index}>
                <div
                  className={styles.tree}
                  style={{
                    minHeight,
                    height: '100%',
                    display: index === 0 ? 'none' : 'block',
                  }}
                ></div>
                <div className="content">
                  <Box ZD={ZD} index={item} />
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </>
  );
};

export default connect(({ index }: { index: RiskModelState }) => ({
  index,
}))(Index);
