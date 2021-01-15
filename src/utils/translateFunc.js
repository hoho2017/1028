export function treeMake(data, arr = []) {
  let tempArr = [];
  for (let i = 0; i < data.length; i++) {
    if (!arr.includes(data[i].type)) {
      data[i].disabled = true;
    }
    if (data[i].title === undefined) {
      data[i].title = data[i].name;
      data[i].key = data[i].deptId;
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

  // tempArr.sort().forEach((item, index) => {
  //   data.splice(item - index, 1);
  // });
  return data.slice(0, 1);
}

export function treeMake2(data) {
  let tempArr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].title === undefined) {
      data[i].title = data[i].name;
    }
    for (let j = 0; j < data.length; j++) {
      if (data[i].menuId === data[j].parentId) {
        if (data[i].children) {
          let isExist = true;
          data[i].children.forEach(item => {
            if (item.menuId === data[j].menuId) {
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
  tempArr
    .sort((a, b) => {
      return a - b;
    })
    .forEach((item, index) => {
      data.splice(item - index, 1);
    });
  return data;
}
