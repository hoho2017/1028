import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC, useState } from 'react';
import styles from './index.less';
import { Tabs, Tree } from 'antd';
import {
  CarryOutOutlined,
  FormOutlined,
  PlusOutlined,
  DownOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs;

interface PageProps extends ConnectProps {
  cipher: CipherModelState;
}

const Cipher: FC<PageProps> = ({ cipher, dispatch }) => {
  const { catalogue } = cipher; //二级目录
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      icon: <CarryOutOutlined />,
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
            {
              title: (
                <>
                  <div>multiple line title</div>
                </>
              ),
              key: '0-0-0-1',
              icon: <CarryOutOutlined />,
            },
            { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> },
          ],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
            {
              title: 'leaf',
              key: '0-0-2-1',
              icon: <CarryOutOutlined />,
            },
          ],
        },
      ],
    },
    {
      title: 'parent 2',
      key: '0-1',
      icon: <CarryOutOutlined />,
      children: [
        {
          title: 'parent 2-0',
          key: '0-1-0',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
            { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
          ],
        },
      ],
    },
  ];
  const onSelect = (selectedKeys: any, info: any) => {
    console.log('selected', selectedKeys, info);
  };
  const minHeight = document.body.clientHeight - 136 + 'px';

  return (
    <>
      <div className="tabs">
        <Tabs tabPosition="left" size="large" style={{ minHeight }}>
          {catalogue.map((item, index) => {
            return (
              <TabPane tab={item} key={index}>
                <div className={styles.tree} style={{ minHeight }}>
                  <Tree
                    // switcherIcon={<P ·78h'b  lusOutlined />}
                    // showLine={false}
                    showLine={{ showLeafIcon: false }}
                    showIcon={false}
                    defaultExpandedKeys={['0-0-0']}
                    onSelect={onSelect}
                    treeData={treeData}
                  />
                </div>
                <div className="content">123</div>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </>
  );
};

export default connect(({ cipher }: { cipher: CipherModelState }) => ({
  cipher,
}))(Cipher);
