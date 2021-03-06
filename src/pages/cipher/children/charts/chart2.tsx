import { Chart, Tooltip, Legend, Point, Line, Interval, Axis } from 'bizcharts';
import React, { FC, useEffect, useState } from 'react';
import { Empty } from 'antd';
import moment from 'moment';

function Chart2(props) {
  const { allMonthTotal, td, cond } = props;
  // if(allMonthTotal!== undefined&&allMonthTotal.length === 0 || allMonthTotal === undefined){
  //   return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  // }
  let data = [];
  if (td) {
    td.forEach(item => {
      data.push({ time: item.dates, value: item.first, number: item.first });
    });
  } else {
    Array.isArray(allMonthTotal) &&
      allMonthTotal.forEach(item => {
        data.push(item);
      });
  }

  let chartIns = null;
  const scale = {
    number: {
      min: 0,
    },
    value: {
      min: 0,
    },
  };
  const colors = ['#6394f9', '#62daaa'];
  if (cond === 0) {
    while (data.length > 12) {
      data.shift();
    }
  }
  if (data.length > 0 && data[0].time.includes('-')) {
    data = data.filter(item => {
      if (
        Number(item.time.split('-')[0]) >= moment().year() - 1 &&
        Number(item.time.split('-')[1]) >= moment().month() + 1
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  return (
    <Chart
      scale={scale}
      forceFit
      height={400}
      minWidth={200}
      data={data}
      onGetG2Instance={chart => {
        chartIns = chart;
        chartIns.on('interval:mouseenter', e => {
          chartIns.geometries.forEach(g => {
            if (g.type === 'interval') {
              (g.getShapes() || []).forEach(s => {
                s.set('origin_fill', s.get('attrs').fill);
                s.attr('fill', '#056ace');
              });
            }
          });
        });
        chartIns.on('interval:mouseleave', e => {
          chartIns.geometries.forEach(g => {
            if (g.type === 'interval') {
              (g.getShapes() || []).forEach(s => {
                s.attr('fill', s.get('origin_fill'));
              });
            }
          });
        });
      }}
    >
      <Axis
        name="number"
        visible={false}
        label={{
          formatter(text, item, index) {
            return `${text}月`;
          },
        }}
      />
      <Axis
        name="time"
        visible={true}
        label={{
          formatter(text, item, index) {
            return `${
              text.includes('-') ? text.split('-')[1] + '月' : text + '年'
            }`;
          },
        }}
      />
      <Tooltip>
        {(title, items) => {
          // items 是个数组，即被触发tooltip的数据。
          // 获取items的颜色
          const color = items[0].color;
          return <div style={{ padding: '5px' }}>次数: {items[0].value}</div>;
        }}
      </Tooltip>
      <Interval position="time*value" color={colors[0]} />
      <Line position="time*number" color={colors[1]} size={3} shape="smooth" />
      <Point position="time*number" color={colors[1]} size={3} shape="circle" />
    </Chart>
  );
}

export default Chart2;
