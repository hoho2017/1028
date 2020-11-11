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
  },{
    title: '应用标识',
    dataIndex: 'appDesc',
    key: 'appDesc',
  },{
    title: '所属机构',
    dataIndex: 'parentDeptName',
    key: 'parentDeptName',
  },{
    title: '所属网络',
    dataIndex: 'appTypeName',
    key: 'appTypeName',
  }
]
const columnsOrg = [
  {
    title: '机构名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '机构标识',
    dataIndex: 'deptId',
    key: 'deptId',
  },
  {
    title: '上级机构',
    dataIndex: 'parentName',
    key: 'parentName',
  },
]
const columnsCalc = [
  {
    title: '算法名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '算法ID',
    dataIndex: 'id',
    key: 'id',
  },
]
const columnsThird = [
  {
    title: '系统名称',
    dataIndex: 'thirdPartyName',
    key: 'thirdPartyName',
  },
  {
    title: '系统ID',
    dataIndex: 'id',
    key: 'id',
  },

  {
    title: '所属位置',
    dataIndex: 'modelPosition',
    key: 'modelPosition',
  },
  {
    title: '系统类别',
    dataIndex: 'typeId',
    key: 'typeId',
  },
  {
    title: '建设单位',
    dataIndex: 'parentDeptId',
    key: 'parentDeptId',
  },
  {
    title: '系统型号',
    dataIndex: 'modelNumber',
    key: 'modelNumber',
  },

]

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
  columnsThird
};
