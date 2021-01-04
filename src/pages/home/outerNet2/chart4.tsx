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
  // const monthArith = JSON.parse(
  //   '{"2020-05":{"1":5,"2":5,"3":4,"4":5},"2020-06":{"1":6,"2":6,"3":5,"4":6},"2020-07":{"1":7,"2":4,"3":6,"4":7},"2020-08":{"1":4,"2":5,"3":8,"4":8},"2020-09":{"1":5,"2":6,"3":9,"4":9}}',
  // );
  // const zd = JSON.parse(
  //   '[{"id":1,"name":"算法","type":"arith","code":"1","value":"SM2","orderNum":1,"remark":"1","delFlag":0},{"id":2,"name":"算法","type":"arith","code":"2","value":"SM3","orderNum":2,"remark":"1","delFlag":0},{"id":3,"name":"算法","type":"arith","code":"3","value":"SM4","orderNum":3,"remark":"1","delFlag":0},{"id":4,"name":"算法","type":"arith","code":"4","value":"SM9","orderNum":4,"remark":"1","delFlag":0}]',
  // );
  // const id = 1;
  // let datas = Object.keys(monthArith).map(item => item.split('-')[1]);
  // let data = [];
  // Object.values(monthArith).forEach((item, index) => {
  //   data.push({
  //     keyword: zd[Number(id) - 1].value,
  //     dates: datas[index],
  //     first: item[id],
  //   });
  // });

  const cols = {
    // dates: {
    //   type: 'timeCat',
    // },
    first: {
      min: 0, // 这里要设置一个最小值, 否则可能图表中按照了 data 中的最小值设置Y轴最小值
    },
  };
  data.map(item => {
    item.keyword = 'SM2';
    return item;
  });
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
      <Axis
        name="date"
        {...axisConfig}
        label={
          {
            // offset: '0 0 20 0',
            // formatter(text, item, index) {
            //   let arr = text.split(' ');
            //   return `${text}`;
            // },
          }
        }
      />
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
