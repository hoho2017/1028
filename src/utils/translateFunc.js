[
  {
    deptId: 1,
    parentId: 0,
    name: 'basd',
    parentName: 'fs',
    orderNum: 0,
    delFlag: 0,
    open: null,
    list: null,
    type: 4,
    status: 1,
  },
  {
    deptId: 12,
    parentId: 3,
    name: '省人大办公厅',
    parentName: '省人大',
    orderNum: 0,
    delFlag: 0,
    open: null,
    list: null,
    type: 4,
    status: 1,
  },
];

export function treeMake(data) {
  let tempArr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].title === undefined) {
      data[i].title = data[i].name;
      data[i].key = data[i].name;
    }
    for (let j = 0; j < data.length; j++) {
      if (data[i].deptId === data[j].parentId) {
        if (data[i].children) {
          let isExist = true;
          data[i].children.forEach(item => {
            if (item.deptId === data[j].deptId) {
              isExist = false;
            }
          });
          if (isExist) {
            tempArr.push(j);
            data[i].children.push(data[j]);
          }
        } else {
          tempArr.push(j);
          data[i].children = [data[j]];
        }
      }
    }
  }
  // console.log(tempArr)
  // console.log(JSON.stringify(data))
  // tempArr.sort().forEach((item, index) => {
  //   data.splice(item - index, 1);
  // });
  return data.slice(0, 1);
}
