import React, { useEffect, useState } from 'react';
import { PieChart } from 'bizcharts';

function Chart3(props) {
  const { zd, percent } = props;
  const [data1, setData] = useState([]);
  let sum = 0;

  useEffect(() => {
    Object.keys(percent).forEach(item => {
      sum += percent[item];
    });
    let data = [];

    zd.forEach(item => {
      data.push({
        type: item.value,
        count: percent[item.code],
        value: (percent[item.code] / sum).toFixed(2),
      });
    });
    setData(data);
  }, [percent]);

  return (
    <PieChart
      data={data1}
      radius={0.8}
      angleField="value"
      colorField="type"
      label={{
        visible: false,
        type: 'outer',
        offset: 20,
      }}
    />
  );
}

export default Chart3;
