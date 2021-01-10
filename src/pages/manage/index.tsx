import { ConnectProps, connect, ManageModelState } from 'umi';
import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './index.less';
import Box from './children/index.tsx';
import { Tabs, Tree, Input, Tooltip } from 'antd';
import { treeMake } from '@/utils/translateFunc.js';
import _ from 'lodash';
import produce from 'immer';

const { TabPane } = Tabs;
const { Search } = Input;

interface PageProps extends ConnectProps {
  manage: ManageModelState;
}

const Manage: FC<PageProps> = ({ manage, dispatch }) => {
  const { catalogue, treeData, treeList, ZD } = manage;
  const child = useRef({});
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [deptId, setDeptId] = useState();
  const [deptName, setDeptName] = useState();
  const [treeD, setTreeD] = useState([]);
  const [indexS, setIndexS] = useState('');
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
  useEffect(() => {
    setExpandedKeys(treeList.map(item => item.name));
  }, [treeList]);
  useEffect(() => {
    let data = _.cloneDeep(treeData);
    setTreeD(
      treeMake(
        data.filter(item => {
          return [1, 2, 3, 4].includes(item.type);
        }),
        [4],
      ),
    );
  }, [treeData]);
  const resetTreeData = (index = '', no = 0) => {
    //inex 0->source 1->mp 3->user 4->auth
    // index = Number(index);
    let data = _.cloneDeep(treeData);
    if (index === '资源注册') {
      if (no === 1) {
        setTreeD(
          treeMake(
            data.filter(item => {
              return [1, 2, 3].includes(item.type);
            }),
            [3],
          ),
        );
      } else {
        setTreeD(
          treeMake(
            data.filter(item => {
              return [1, 2, 3, 4].includes(item.type);
            }),
            [4],
          ),
        );
      }
    } else if (index === '密评登记') {
      setTreeD(treeMake(data, [99]));
    } else if (index === '用户管理' || index === '用户授权') {
      // setTreeD(
      //   treeMake(
      //     data.filter(item => {
      //       return [1, 2, 3, 4].includes(item.type);
      //     }),
      //     [1, 2, 3, 4],
      //   ),
      // );
      setTreeD(treeMake(data, [1, 2, 3, 4, 99]));
    } else {
      setTreeD(treeMake(data, [1, 2, 3, 4, 99]));
    }
  };
  useEffect(() => {
    resetTreeData(indexS);
  }, [indexS]);
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
  useEffect(() => {
    setIndexS(catalogue[0]);
  }, [catalogue]);
  return (
    <>
      <div className="tabs">
        <Tabs
          tabPosition="left"
          size="large"
          style={{ minHeight }}
          onChange={index => {
            setIndexS(catalogue[index]);
          }}
        >
          index
          {catalogue.map((item, index) => {
            return (
              <TabPane tab={item} key={index}>
                <div
                  className={styles.tree}
                  // style={{ minHeight, height: '100%'}}
                  style={{
                    minHeight,
                    height: '100%',
                    display: index === 5 ? 'none' : 'block',
                  }}
                >
                  <Tree
                    showLine={{ showLeafIcon: false }}
                    showIcon={false}
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onSelect={onSelect}
                    treeData={loop(treeD)}
                  />
                  <Search
                    style={{ marginBottom: 8 }}
                    placeholder="输入关键字搜索"
                    onChange={onChange}
                    enterButton
                  />
                </div>
                <div
                  className="content"
                  style={{ paddingLeft: index === 5 ? 0 : '268px' }}
                >
                  {/* <div className="content" style={{ paddingLeft:'268px' }}> */}
                  <Box
                    ZD={ZD}
                    child={child}
                    deptId={deptId}
                    dispatch={dispatch}
                    deptName={deptName}
                    index={item}
                    resetTreeData={resetTreeData}
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
