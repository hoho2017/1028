import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
  LineAdvance,
} from 'bizcharts';

const { Line } = Guide;

const colors = ['#1249BB', '#2fc25b', '#6B99F9'];

const axisConfig = {
  line: {
    style: {
      stroke: '#ccc',
      lineDash: [3, 3],
    }, // 设置坐标轴线样式
  },
  grid: {
    line: {
      style: {
        stroke: '#ccc',
        lineDash: [3, 3],
      },
    }, // 设置坐标系栅格样式
  },
};

function Chart4(props) {
  const { data } = props;
  const { height = '200' } = props;
  data.map(item => {
    item.keyword = 'SM2';
    return item;
  });
  const cols = {
    first: {
      min: 0, // 这里要设置一个最小值, 否则可能图表中按照了 data 中的最小值设置Y轴最小值
    },
  };
  return (
    <Chart
      width="100%"
      height={height + 'px'}
      data={data}
      scale={{ value: { min: 0 } }}
      padding={[10, 10, 30, 40]}
      autoFit
    >
      {/* <Tooltip shared={true} showCrosshairs /> */}
      <Tooltip shared={true} showCrosshairs>
        {(title, items) => {
          return <div style={{ padding: '3px' }}>数量:{items[0].value}</div>;
        }}
      </Tooltip>
      <Legend visible={false} />
      <Axis name="date" {...axisConfig} />
      <Axis name="value" {...axisConfig} label={{ offset: 10 }} />
      <LineAdvance
        area
        shape="smooth"
        position="date*value"
        size={1}
        color={['keyword', colors]}
      />
    </Chart>
  );
}

export default Chart4;
