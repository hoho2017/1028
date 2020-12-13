import React from 'react';
import { Chart, Interval, Tooltip, Axis, Coordinate, Legend } from 'bizcharts';

function Chart5(props) {
  const { data } = props;
  let all = 0;
  data.totalList.forEach(item => {
    all += item.value;
  });
  data.totalList = data.totalList.map(item => {
    item.values = (item.value / all).toFixed(2) * 100 + '%';
    return item;
  });
  const cols = {
    value: {
      formatter: val => {
        val = (val / all).toFixed(2) * 100 + '%';
        return val;
      },
    },
  };
  return (
    <Chart data={data.totalList} scale={cols} autoFit>
      <Legend position="left" />
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="value"
        adjust="stack"
        color="key"
        style={{
          lineWidth: 5,
          stroke: '#fff',
        }}
      />
    </Chart>
  );
}
export default Chart5;
