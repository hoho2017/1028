import React from 'react';
import { Chart, Interval, Tooltip, Axis, Coordinate, Legend } from 'bizcharts';

function Chart5(props) {
  const { data } = props;
  let total = 0;
  if (data.totalList !== undefined) {
    data.totalList.forEach(item => {
      total += item.value;
    });
  }
  const cols = {
    value: {
      formatter: val => {
        val = ((val / total) * 100).toFixed(1) + '%';
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
