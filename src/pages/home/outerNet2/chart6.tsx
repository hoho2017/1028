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
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.data;
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
        <Tooltip shared={true} showCrosshairs>
          {(title, items) => {
            return <div style={{ padding: '3px' }}>数量:{items[0].value}</div>;
          }}
        </Tooltip>
        <Interval position="key*value" />
        <Axis name="number" visible={false} />
      </Chart>
    );
  }
}

export default Chart6;
