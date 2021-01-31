import { ConnectProps, connect, CipherModelState } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Tabs, Tree, Input, Tooltip, Empty } from 'antd';
import Box from './children/index.tsx';
import produce from 'immer';

const { TabPane } = Tabs;
const { Search } = Input;

interface PageProps extends ConnectProps {
  cipher: CipherModelState;
}

const Cipher: FC<PageProps> = ({ cipher, dispatch }) => {
  const { catalogue, treeData, treeList, ZD } = cipher;
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [deptId, setDeptId] = useState();
  const [deptName, setDeptName] = useState();
  useEffect(() => {
    setExpandedKeys(treeList.map(item => item.name));
    // setDeptId(treeList[1]?treeList[1].deptId:'')
    // setDeptName(treeList[1]?treeList[1].name:'')
    // treeList.forEach(item => {
    //   if (item.type === 99) {
    //     setDeptId(item.deptId);
    //     setDeptName(item.name);
    //   }
    // });
  }, [treeList]);

  const onSelect = (selectedKeys: any, info: any) => {
    let deptId, deptName;
    treeList.forEach(item => {
      if (item.deptId === selectedKeys[0]) {
        deptId = item.deptId;
        deptName = item.name;
      }
    });
    setDeptId(deptId);
    setDeptName(deptName);
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
      const temp = produce(item, draft => {
        draft;
      });
      const eight =
        temp.title.length > 8 ? temp.title.substr(0, 8) + '..' : temp.title;
      const beforeStr = eight.substr(0, index);
      const afterStr = eight.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <Tooltip title={temp.title}>
            <span>
              {beforeStr}
              <span className={styles.choosed}>{searchValue}</span>
              {afterStr}
            </span>
          </Tooltip>
        ) : (
          <Tooltip title={temp.title}>{eight}</Tooltip>
        );
      if (item.children) {
        return {
          title,
          key: item.key,
          children: loop(item.children),
          disabled: item.disabled,
        };
      }

      return {
        title,
        key: item.key,
        disabled: item.disabled,
      };
    });
  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };
  if (deptId === '') {
    return '';
  }
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
                    defaultExpandAll
                    showLine={{ showLeafIcon: false }}
                    showIcon={false}
                    onExpand={onExpand}
                    // expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onSelect={onSelect}
                    selectedKeys={[deptId]}
                    treeData={loop(treeData)}
                  />
                  <Search
                    style={{ marginBottom: 8 }}
                    placeholder="输入关键字搜索"
                    onChange={onChange}
                    enterButton
                  />
                </div>
                <div className="content">
                  {deptId === undefined ? (
                    <Empty description={<span>无数据，请选择机构</span>} />
                  ) : (
                    <Box
                      ZD={ZD}
                      deptId={deptId}
                      dispatch={dispatch}
                      deptName={deptName}
                      index={item}
                      catalogue={catalogue}
                    />
                  )}
                </div>
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
