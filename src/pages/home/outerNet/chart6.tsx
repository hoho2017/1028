import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coordinate,
  Label,
  Legend,
  Interval,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

class Chart6 extends React.Component {
  render() {
    const data = [
      {
        country: '当年密评应用通过数量',
        number: 131744,
      },
      {
        country: '当年测评后在用应用数量',
        number: 104970,
      },
      {
        country: '当年密码调用总数',
        number: 29034,
      },
      {
        country: '当年密码算法调用构成',
        number: 23489,
      },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.source(data).transform({
      type: 'sort',

      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a.population - b.population > 0;
      },
    });
    return (
      <Chart height={200} data={dv.rows} autoFit>
        <Coordinate transpose />
        <Interval position="country*number" />
        <Axis name="number" visible={false} />
      </Chart>
    );
  }
}

export default Chart6;
