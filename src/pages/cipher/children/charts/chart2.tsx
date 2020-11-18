import { Chart, Tooltip, Legend, Point, Line, Interval, Axis } from 'bizcharts';
import React, { FC, useEffect, useState } from 'react';

function Chart2(props) {
  const { allMonthTotal, td, cond } = props;
  
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

  return (
    <Chart
      scale={scale}
      forceFit
      height={400}
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
            return `${text.includes('-')?text.split('-')[1]:text}月`;
          },
        }}
      />

      <Interval position="time*value" color={colors[0]} />
      <Line position="time*number" color={colors[1]} size={3} shape="smooth" />
      <Point position="time*number" color={colors[1]} size={3} shape="circle" />
    </Chart>
  );
}

export default Chart2;
