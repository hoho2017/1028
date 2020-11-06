import React from 'react';
import {
  PieChart
} from 'bizcharts';

function Chart3(props) {
  const {zd, percent} = props
  let data = [];
  let sum = 0;
  Object.keys(percent).forEach(item=>{
    sum+=percent[item]
  })
  zd.forEach(item=>{
    data.push({type:item.value, count:percent[item.code],value:(percent[item.code]/sum).toFixed(2)})
  })

  return (
    <PieChart
      data={data}
      title={{
        visible: true,
        text: '近一年各类算法调用占比',
      }}
      radius={0.8}
      angleField='value'
      colorField='type'
      label={{
        visible: false,
        type: 'outer',
        offset: 20,
      }}
    />
  );
}

export default Chart3;
