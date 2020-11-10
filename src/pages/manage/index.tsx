import { ConnectProps, connect, ManageModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import Box from './children/index.tsx';
import { Tabs, Tree, Input } from 'antd';

const { TabPane } = Tabs;
const { Search } = Input;

interface PageProps extends ConnectProps {
  manage: ManageModelState;
}

const Manage: FC<PageProps> = ({ manage, dispatch }) => {
  const { catalogue, treeData, treeList, ZD } = manage;

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [deptId, setDeptId] = useState(1);
  const [deptName, setDeptName] = useState('t');
  useEffect(() => {}, []);
  useEffect(() => {
    setExpandedKeys(treeList.map(item => item.name));
  }, [treeList]);

  const onSelect = (selectedKeys: any, info: any) => {
    let deptId = 1;
    treeList.forEach(item => {
      if (item.name === selectedKeys[0]) {
        deptId = item.deptId;
      }
    });
    setDeptId(deptId);
    setDeptName(selectedKeys[0]);
  };
  const minHeight = document.body.clientHeight - 136 + 'px';
  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };
  const onChange = e => {
    const { value } = e.target;
    const expandedKeys = treeList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };
  const loop = data =>
    data.map(item => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className={styles.choosed}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });
  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };
  return (
    <>
      <div className="tabs">
        <Tabs tabPosition="left" size="large" style={{ minHeight }}>
          {catalogue.map((item, index) => {
            return (
              <TabPane tab={item} key={index}>
                <div
                  className={styles.tree}
                  style={{ minHeight, height: '100%' }}
                >
                  <Tree
                    showLine={{ showLeafIcon: false }}
                    showIcon={false}
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onSelect={onSelect}
                    treeData={loop(treeData)}
                  />
                  <Search
                    style={{ marginBottom: 8 }}
                    placeholder="输入关键字搜索"
                    onChange={onChange}
                    enterButton
                  />
                </div>
                <div className="content" style={{paddingLeft:'268px'}}>
                  <Box
                    ZD={ZD}
                    deptId={deptId}
                    dispatch={dispatch}
                    deptName={deptName}
                    index={index}
                  />
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </>
  );
};

export default connect(({ manage }: { manage: ManageModelState }) => ({
  manage,
}))(Manage);
