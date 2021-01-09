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
import { Empty } from 'antd';

function Chart3(props) {
  const { zd, percent } = props;

  if (Object.values(percent)[0] === null) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
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
