import React from 'react';
import ReactDOM from 'react-dom';
import { DonutChart } from 'bizcharts';
import Chart1 from '@/pages/cipher/children/charts/chart1';

// 数据源

function Chart5(props) {
  let { data } = props;
  let all = 0;
  if (data.totalList !== undefined) {
    data.totalList.forEach(item => {
      all += item.value;
    });
    data.totalList = data.totalList.map(item => {
      item.values = (item.value / all).toFixed(2) * 100 + '%';
      return item;
    });
  }

  return (
    <DonutChart
      statistic={{ visible: true }}
      height="200"
      data={data.totalList || []}
      forceFit
      radius={1}
      padding="auto"
      tooltip={{
        visible: true,
        offset: 10,
        formatter: (text, item, index) => {
          return {
            name: item + '比例',
            value: (text / all).toFixed(2) * 100 + '%',
          };
        },
      }}
      angleField="value"
      colorField="key"
      pieStyle={{ stroke: 'white', lineWidth: 5 }}
    />
  );
}

export default Chart5;
