import React from 'react';
import ReactDOM from 'react-dom';
import { DonutChart } from 'bizcharts';
import Chart1 from '@/pages/cipher/children/charts/chart1';

// 数据源
const data = [
  {
    type: '一级系统',
    value: 27,
  },
  {
    type: '二级系统',
    value: 25,
  },
  {
    type: '三级系统',
    value: 18,
  },
  {
    type: '四级系统',
    value: 15,
  },
];

function Chart5() {
  return (
    <DonutChart
      height="200"
      data={data || []}
      forceFit
      radius={0.8}
      padding="auto"
      angleField="value"
      colorField="type"
      pieStyle={{ stroke: 'white', lineWidth: 5 }}
    />
  );
}

export default Chart5;
