import memberB from './imgs/memberB.png';
import memberG from './imgs/memberG.png';
import authB from './imgs/authB.png';
import authG from './imgs/authG.png';

const titleArr = [
  { name: '角色管理', imgSrcB: memberB, imgSrcG: memberG },
  { name: '用户授权', imgSrcB: authB, imgSrcG: authG },
];
const operation = ['角色', '机构', '算法', '系统'];
const columnsRole = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    align: 'center',
    key: 'roleName',
  },
  {
    title: '所属机构',
    dataIndex: 'deptName',
    align: 'center',
    key: 'deptName',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    key: 'createTime',
  },
];
const columnsRoleJ = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    align: 'center',
    key: 'roleName',
  },
];
const columnsAuth = [
  {
    title: '用户姓名',
    dataIndex: 'username',
    align: 'center',
    key: 'username',
  },
  {
    title: '用户标识',
    dataIndex: 'uniqueUserId',
    align: 'center',
    key: 'uniqueUserId',
  },
  {
    title: '所属机构',
    align: 'center',
    dataIndex: 'deptName',
    key: 'deptName',
  },
  {
    title: '所属角色',
    dataIndex: 'ruleListStr',
    align: 'center',
    key: 'ruleListStr',
  },
];
const formHead = (
  arith: object[],
  app_source_type: object[],
  app_type_id: object[],
) => {
  return [
    [
      {
        label: '角色名称',
        name: 'roleName',
        type: 'input',
      },
      {
        label: '角色ID',
        name: 'roleId',
        type: 'input',
        disabled: '2',
      },
    ],
    [
      {
        label: '角色名称',
        name: 'roleName',
        type: 'input',
      },
      {
        label: '角色ID',
        name: 'roleId',
        type: 'input',
        disabled: '2',
      },
    ],
  ];
};

export {
  memberB,
  memberG,
  authG,
  authB,
  titleArr,
  operation,
  columnsRole,
  formHead,
  columnsAuth,
  columnsRoleJ,
};
