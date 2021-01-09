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
  const { monthArith, zd, id } = props;

  let datas = Object.keys(monthArith).map(item => item);
  let data = [];
  Object.values(monthArith).forEach((item, index) => {
    data.push({
      keyword: zd[Number(id) - 1].value,
      dates: datas[index],
      first: item[id],
    });
  });

  const cols = {
    dates: {
      type: 'timeCat',
    },
    first: {
      min: 0, // 这里要设置一个最小值, 否则可能图表中按照了 data 中的最小值设置Y轴最小值
    },
  };
  console.log(data);
  return (
    <Chart
      width="100%"
      height={200}
      data={data}
      // scale={cols}
      padding={[10, 10, 30, 10]}
      autoFit
    >
      <Tooltip shared={true} showCrosshairs />
      <Legend visible={false} />
      <Axis
        name="dates"
        {...axisConfig}
        label={{
          offset: 10,
          formatter(text, item, index) {
            let arr = text.split(' ');
            return `${text}月`;
          },
        }}
      />
      <Axis name="first" {...axisConfig} label={{ offset: 10 }} />
      <LineAdvance
        area
        shape="smooth"
        position="dates*first"
        size={1}
        color={['keyword', colors]}
      />
    </Chart>
  );
}

export default Chart4;
