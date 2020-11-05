import React, { useState, useEffect } from 'react';
import { Chart, Point, Line, Area, Tooltip, Coordinate } from 'bizcharts';
import DataSet from '@antv/data-set';
function Chart1(props) {
  const { sum } = props;
  let data = [];
  Object.keys(sum).forEach(item => {
    data.push({ item, value: sum[item] });
  });

  const { DataView } = DataSet;
  const dv = new DataView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['a'], // 展开字段集
    key: 'user', // key字段
    value: 'score', // value字段
  });
  return (
    <Chart
      height={320}
      data={data}
      autoFit
      scale={{
        value: {
          min: 0,
        },
      }}
    >
      <Coordinate type="polar" radius={0.8} />
      <Line position="item*value" size="2" color="#FB7C56" />
      <Area position="item*value" color="#FB7C56" />
    </Chart>
  );
}

export default Chart1;
