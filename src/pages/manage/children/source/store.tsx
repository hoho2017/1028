import appB from './imgs/appB.png';
import appG from './imgs/appG.png';
import calcB from './imgs/calcB.png';
import calcG from './imgs/calcG.png';
import orgB from './imgs/orgB.png';
import orgG from './imgs/orgG.png';
import thirdB from './imgs/thirdB.png';
import thirdG from './imgs/thirdG.png';
const titleArr = [
  { name: '应用管理', imgSrcB: appB, imgSrcG: appG },
  { name: '机构管理', imgSrcB: orgB, imgSrcG: orgG },
  { name: '算法管理', imgSrcB: calcB, imgSrcG: calcG },
  { name: '第三方系统管理', imgSrcB: thirdB, imgSrcG: thirdG },
];
const operation = ['应用', '机构', '算法', '系统'];
const columnsApp = [
  {
    title: '应用名称',
    dataIndex: 'appName',
    key: 'appName',
    align: 'center',
  },
  {
    title: '应用标识',
    dataIndex: 'uniqueAppId',
    align: 'center',
    key: 'uniqueAppId',
  },
  {
    title: '所属机构',
    dataIndex: 'parentDeptName',
    align: 'center',
    key: 'parentDeptName',
  },
  {
    title: '所属网络',
    align: 'center',
    dataIndex: 'appTypeName',
    key: 'appTypeName',
  },
];
const columnsOrg = [
  {
    align: 'center',
    title: '机构名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '机构标识',
    align: 'center',
    dataIndex: 'deptId',
    key: 'deptId',
  },
  {
    title: '上级机构',
    dataIndex: 'parentName',
    align: 'center',
    key: 'parentName',
  },
];
const columnsCalc = [
  {
    title: '算法名称',
    align: 'center',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '算法ID',
    align: 'center',
    dataIndex: 'id',
    key: 'id',
  },
];
const columnsThird = [
  {
    title: '系统名称',
    dataIndex: 'thirdPartyName',
    align: 'center',
    key: 'thirdPartyName',
  },
  {
    title: '系统ID',
    dataIndex: 'id',
    align: 'center',
    key: 'id',
  },

  {
    title: '所属位置',
    align: 'center',
    dataIndex: 'modelPosition',
    key: 'modelPosition',
  },
  {
    title: '系统类别',
    align: 'center',
    dataIndex: 'typeId',
    key: 'typeId',
  },
  {
    align: 'center',
    title: '建设单位',
    dataIndex: 'parentDeptId',
    key: 'parentDeptId',
  },
  {
    align: 'center',
    title: '系统型号',
    dataIndex: 'modelNumber',
    key: 'modelNumber',
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
        label: '所属机构',
        name: 'parentDeptId',
        type: 'input',
        disabled: true,
      },
      {
        label: '所属网络',
        name: 'appType',
        type: 'Select',
        options: app_source_type,
      },
      {
        label: '应用名称',
        name: 'appName',
        type: 'input',
      },
      {
        label: '应用标识',
        name: 'uniqueAppId',
        type: 'input',
        disabled: '2',
      },
      {
        label: '使用算法',
        name: 'arithList',
        mode: 'multiple',
        type: 'Select',
        options: arith,
      },
    ],
    [
      {
        label: '上级机构',
        name: 'parentId',
        type: 'input',
        disabled: true,
      },
      {
        label: '机构名称',
        name: 'name',
        type: 'input',
      },
      {
        label: '机构ID',
        name: 'deptId',
        type: 'input',
        disabled: '2',
      },
    ],
    [
      {
        label: '算法名称',
        name: 'name',
        type: 'input',
      },
      {
        label: '算法ID',
        name: 'code',
        type: 'input',
        disabled: '2',
      },
    ],
    [
      {
        label: '系统名称',
        name: 'thirdPartyName',
        type: 'input',
      },
      {
        label: '系统ID',
        name: 'id',
        type: 'input',
        disabled: '2',
      },
      {
        label: '所属位置',
        name: 'modelPosition',
        type: 'input',
      },
      {
        label: '系统类别',
        name: 'typeId',
        type: 'Select',
        options: app_type_id,
      },
      {
        label: '建设单位',
        name: 'parentDeptId',
        type: 'input',
        disabled: true,
      },
      {
        label: '设备型号',
        name: 'modelNumber',
        type: 'input',
      },
    ],
  ];
};

export {
  appB,
  appG,
  calcB,
  calcG,
  orgB,
  orgG,
  thirdB,
  thirdG,
  titleArr,
  operation,
  columnsApp,
  columnsOrg,
  columnsCalc,
  columnsThird,
  formHead,
};
