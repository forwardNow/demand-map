import echarts from './common/echarts/echarts';
import data, { maxPv, maxSim } from './common/asset/mock/mock';
import { findTheCircleThatOverlapsAnotherCircle } from './common/utils/collision';
import { getRandomInteger, getRandomMinusSign } from './common/utils/random';
import './style.less';


const demandMapEcharts = echarts.init(document.getElementById('demand-map'), {});

function getSeries(items) {
  const list = items.map((item) => {
    const {x, y, label, value, fillColor, symbolSize, borderColor, isUp} = item;
    return [x, y, {label, value, fillColor, symbolSize, borderColor, isUp}];
  });

  const upList = list.filter(item => item[2].isUp);
  const downList = list.filter(item => !item[2].isUp);

  return [
    {
      zlevel: 20,
      type: 'scatter',
      symbol: 'circle',
      symbolSize: function (data) {
        return data[2].symbolSize;
      },
      itemStyle: {
        color: function (param) {
          return param.data[2].fillColor;
        },
        borderWidth: 6,
        borderColor: upList[0][2].borderColor,
        opacity: 1,
      },
      label: {
        show: true,
        position: 'bottom', // 'inside',
        color: "#828385", // #828385
        fontSize: 12,
        formatter: function (param) {
          return param.data[2].label;
        },
      },

      data: upList,
    },
    {
      type: 'scatter',
      symbol: 'circle',
      symbolSize: function (data) {
        return data[2].symbolSize;
      },
      itemStyle: {
        color: function (param) {
          return param.data[2].fillColor;
        },
        borderWidth: 6,
        borderColor: downList[0][2].borderColor,
        opacity: 1,
      },
      label: {
        show: true,
        position: 'bottom', // 'inside',
        color: "#828385", // #828385
        fontSize: 12,
        formatter: function (param) {
          return param.data[2].label;
        },
      },

      data: downList,
    },
  ]
}

function getSymbolSize(pv) {
  return Math.max(16, 30 * (pv / maxPv));
}

const pointList = [];

function getPoint(index) {
  const radius = index / 24 * 40 + 10;

  let x = 0;
  let y = 0;

  const getRandomPoint = () => {
    let yLen = getRandomInteger(0, radius > 25 ? 25 : radius);
    let xLen = Math.sqrt(radius * radius - yLen * yLen);

    x = getRandomMinusSign(xLen);
    y = getRandomMinusSign(yLen);

    const overlapCircle = findTheCircleThatOverlapsAnotherCircle({ x, y, r: 6 }, pointList);

    if (overlapCircle) {
      const {x: x2, y: y2} = overlapCircle;
      console.log('overlapCircle:', x2, y2, x, y);
      getRandomPoint();
    }
  };

  getRandomPoint();

  pointList.push({x, y});

  // y = 0;
  // x = radius

  return {x, y};
}

const series = getSeries(data.map((item, index) => {
  const {
    word, // "4G",
    pv, // 9966, 访问量 控制 大小
    ratio, // 98,
    sim, // 1994 相似度 控制 半径
  } = item;

  const symbolSize = getSymbolSize(pv);

  const isUp = ratio > 100;

  const fillColor =  isUp ? '#f8907c' : '#42c1a2'; // 大于 100 为上升
  const borderColor = isUp ? 'rgba(247,143,124,0.2)' : 'rgba(64,192,162,0.2)';

  let {x, y} = getPoint(index);

  return {x, y, label: word, value: `${word}<br>访问量 ${pv}<br/>相似度 ${sim}`, fillColor, symbolSize, borderColor, isUp }
}));

const option = {
  grid: {
    show: false,
    top: 15,
    left: 30,
    right: 30,
    bottom: 15,
  },
  xAxis: [
    {
      show: false,
      type: 'value',
      min: -50,
      max: 50,
    }
  ],
  yAxis: [{
    type: 'value',
    show: false,
    min: -25,
    max: 25,
  }],
  legend: {
    show: false,
  },
  tooltip: {
    showContent: true,
    formatter(param) {
      return param.data[2].value
    }
  },

  series: [
    {
      type: 'scatter',
      symbol: 'circle',
      symbolSize: function (data) {
        return data[2].symbolSize;
      },
      itemStyle: {
        color: function (param) {
          return param.data[2].fillColor;
        },
        opacity: 1,
      },
      label: {
        show: true,
        position: 'inside',
        color: "#fff", // #828385
        fontSize: 16,
        formatter: function (param) {
          return param.data[2].label;
        },
      },

      data: [
        [
          0, // x
          0, // y
          {
            label: "5g",
            value: '核心词',
            fillColor: "#5ccef9",
            symbolSize: 100,
          }
        ],
      ],
    },

    ...series
  ],
};

demandMapEcharts.setOption(option);

demandMapEcharts.on('click', (params) => {
  console.log('click node: ', params.data);
});