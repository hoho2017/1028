[
  {
    deptId: 1,
    parentId: 0,
    name: '省委办公厅',
    parentName: '中共贵州省委',
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
  for(let i=0; i<data.length; i++){
    let temp = data[i];
    for(let j=1; j<(data.length-1); j++){
      console.log('w',j,data.length)
      while(temp.deptId){
        if(temp.deptId === data[j].parentId){
          if(temp.children){
            temp.children.push(data[j])
          }else{
            temp.children = [data[j]]
          }
          data.splice(j,1)
          // return temp
        }else{
          if(temp.children){
            temp = temp.children
          }else{
            // return temp
          }
        }
      }
      data.splice(i,1,temp)
    }
  }
  return data
}
