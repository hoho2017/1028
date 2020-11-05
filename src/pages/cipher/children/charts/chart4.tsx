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

const data = {
  keywordTrend: [
    { keyword: '白超', dates: '1971-01-03 00:39:29', first: 1647 },
    { keyword: '白超', dates: '1975-04-29 01:53:35', first: 3647 },
    { keyword: '白超', dates: '1985-07-22 13:57:24', first: 3156 },
    { keyword: '白超', dates: '1994-10-10 19:40:08', first: 2166 },
    { keyword: '白超', dates: '1976-08-25 20:59:11', first: 2956 },
    { keyword: '白超', dates: '1980-03-20 16:28:32', first: 3571 },
    { keyword: '白超', dates: '2000-08-17 18:06:55', first: 2771 },
    { keyword: '谭艳', dates: '1971-01-03 00:39:29', first: 2302 },
    { keyword: '谭艳', dates: '1975-04-29 01:53:35', first: 1647 },
    { keyword: '谭艳', dates: '1985-07-22 13:57:24', first: 1709 },
    { keyword: '谭艳', dates: '1994-10-10 19:40:08', first: 1202 },
    { keyword: '谭艳', dates: '1976-08-25 20:59:11', first: 1867 },
    { keyword: '谭艳', dates: '1980-03-20 16:28:32', first: 1149 },
    { keyword: '谭艳', dates: '2000-08-17 18:06:55', first: 1149 },
  ],
  avgSpreadScore: [
    {
      key: '白超',
      value: 3100,
      checked: true,
      startDate: '1971-01-03 00:39:29',
      endDate: '2000-08-17 18:06:55',
    },
    {
      key: '谭艳',
      value: 1600,
      checked: true,
      startDate: '1971-01-03 00:39:29',
      endDate: '2000-08-17 18:06:55',
    },
  ],
};

const { keywordTrend, avgSpreadScore } = data;

const colors = ['#1890ff', '#2fc25b'];

const axisConfig = {
  label: {
    style: {
      textAlign: 'center',
    }, // 设置坐标轴文本样式
  },
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

function Chart4() {
  const cols = {
    dates: {
      range: [0, 1],
      type: 'timeCat',
    },
    first: {
      min: 0, // 这里要设置一个最小值, 否则可能图表中按照了 keywordTrend 中的最小值设置Y轴最小值
    },
  };

  return (
    <Chart
      height={200}
      data={keywordTrend}
      filter={[
        [
          'keyword',
          keyword => {
            return avgSpreadScore.find(d => d.key === keyword).checked;
          },
        ],
      ]}
      scale={cols}
      padding={[40, 80, 70, 80]}
      autoFit
    >
      <Legend
        onClick={ev => {
          console.log(ev);
          const key = ev.item.value;
          avgSpreadScore.find(d => d.key === key).checked = ev.checked;
          setTimeout(() => {
            this.setState({ avgSpreadScore });
          }, 0);
        }}
      />
      <Tooltip shared={true} showCrosshairs />
      <Axis name="dates" {...axisConfig} />
      <Axis name="first" {...axisConfig} label={{ offset: 10 }} />

      {/*shape="smooth" 可配置为曲线，不设置为折线*/}
      <LineAdvance
        point={{ size: 3 }}
        area
        shape="smooth"
        position="dates*first"
        size={1}
        color={['keyword', colors]}
        label="first"
      />
      {/*<Geom/> 和 <Guide/> 是独立控制的，可以通过chart filter来建立交互联动*/}
      <Guide>
        {avgSpreadScore.map((item, index) => {
          if (!item.checked) {
            return;
          }
          return (
            <Line
              top
              start={{ dates: item.startDate, first: item.value }}
              end={{ dates: item.endDate, first: item.value }}
              lineStyle={{
                lineWidth: 2,
                // 手动维护颜色
                stroke: colors[index],
                fill: colors[index],
              }}
              /** 调整位置 */
              text={{
                position: 'end',
                style: {
                  fill: colors[index],
                },
                offsetX: 5,
                content: `均值 ${item.key}`,
              }}
            />
          );
        })}
      </Guide>
    </Chart>
  );
}

export default Chart4;
