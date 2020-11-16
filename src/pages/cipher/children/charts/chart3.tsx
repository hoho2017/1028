import React, { useEffect, useState } from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction,
  PieChart,
} from 'bizcharts';

function Chart3(props) {
  const { zd, percent } = props;
  if (JSON.stringify(percent) === '{}') {
    return false;
  }
  const [data1, setData] = useState([]);

  useEffect(() => {
    let sum = 0;

    Object.keys(percent).forEach(item => {
      sum += percent[item];
    });
    let data = [];

    zd.forEach(item2 => {
      data.push({
        type: item2.value,
        count: percent[item2.code] ? percent[item2.code] : 0,
        value: percent[item2.code] ? (percent[item2.code] / sum).toFixed(2) : 0,
      });
    });
    setData(data);
  }, [percent]);
  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      },
    },
  };
  return (
    // <Chart height={400} data={data1} scale={cols} autoFit>
    //   <Coordinate type="theta" radius={0.75} />
    //   <Tooltip showTitle={false} />
    //   <Axis visible={false} />
    //   <Interval
    //     position="percent"
    //     adjust="stack"
    //     color="item"
    //     style={{
    //       lineWidth: 1,
    //       stroke: '#fff',
    //     }}
    //     label={[
    //       'count',
    //       {
    //         content: data => {
    //           return `${data.item}: ${data.percent * 100}%`;
    //         },
    //       },
    //     ]}
    //   />
    //   <Interaction type="element-single-selected" />
    // </Chart>
    <PieChart
      data={data1}
      radius={0.8}
      angleField="value"
      colorField="type"
      tooltip={{
        formatter: (angleField, colorField) => {
          return {
            name: colorField,
            value: (angleField * 100).toFixed(2) + '%',
          };
        },
      }}
      label={{
        visible: false,
        type: 'outer',
        offset: 20,
      }}
    />
  );
}

export default Chart3;
