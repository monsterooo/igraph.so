import {
  EChartsOption, TooltipOption,
} from 'echarts/types/dist/shared';
import { THEMES } from './echart';

// { d1: 'Month', d2: 'Pageviews 2021', d3: 'Pageviews 2022', d4: 'Pageviews 2023' },
//     { d1: 'Tue', d2: '439', d3: '3017', d4: '4681' },
//     { d1: 'Wed', d2: '508', d3: '3911', d4: '5175' },
//     { d1: 'Thu', d2: '766', d3: '4712', d4: '5802' },
//     { d1: 'Fri', d2: '901', d3: '5076', d4: '6259' },
//     { d1: 'Sat', d2: '1742', d3: '5812', d4: '6910' },
//     { d1: 'Sun', d2: '2883', d3: '4301', d4: '7491' },

// line 图表默认数据
// export const DATA_BAR_LINE_PIE = [
//   ['Month', 'Pageviews 2021', 'Pageviews 2022', 'Pageviews 2023'],
//   ['Tue', 439, 3017, 4681],
//   ['Wed', 508, 3911, 5175],
//   ['Thu', 766, 4712, 5802],
//   ['Fri', 901, 5076, 6259],
//   ['Sat', 1742, 5812, 6910],
//   ['Sun', 2883, 4301, 7491]
// ]

export const TABLE_BAR_LINE_PIE = [
  ['Month', 'Pageviews 2021', 'Pageviews 2022', 'Pageviews 2023'],
  ['Tue', 439, 3017, 4681],
  ['Wed', 508, 3911, 5175],
  ['Thu', 766, 4712, 5802],
  ['Fri', 901, 5076, 6259],
  ['Sat', 1742, 5812, 6910],
  ['Sun', 2883, 4301, 7491]
]

export const DATA_PIE = [
  { value: 60, name: 'Visit' },
  { value: 40, name: 'Inquiry' },
  { value: 20, name: 'Order' },
  { value: 80, name: 'Click' },
  { value: 100, name: 'Show' }
]

export const DATA_FUNNEL = [
  { value: 60, name: 'Visit' },
  { value: 40, name: 'Inquiry' },
  { value: 20, name: 'Order' },
  { value: 80, name: 'Click' },
  { value: 100, name: 'Show' }
]

const AXIOS_TOOLTIP: TooltipOption = {
  trigger: 'axis', // TODO 饼图要用 item
  axisPointer: {
    type: 'shadow'
  }
}

const ITEM_TOOLTIP: TooltipOption = {
  trigger: 'item', // TODO 饼图要用 item
}

export const tooltip_map: Record<string, TooltipOption> = {
  'bar': AXIOS_TOOLTIP,
  'line': AXIOS_TOOLTIP,
  'pie': ITEM_TOOLTIP,
  'funnel': ITEM_TOOLTIP
};

export const chartDefaultOption: EChartsOption = {
  color: THEMES[0],
  title: {
    text: 'User page view in 2022',
    borderRadius: 60,
    left: 'center',
    itemGap: 10,
    textStyle: {
      color: '#fff',
      fontSize: 22,
      lineHeight: 88
    }
  },
  grid: {
    containLabel: true,
    top: 108,
    right: 38,
    bottom: 48,
    left: 38
  },
  textStyle: {
    color: '#fff',
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        cap: 'round',
        type: [2, 3],
        dashOffset: 10
      }
    }
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      }
    }
  ],
  legend: {
    bottom: 10,
    textStyle: {
      color: '#fff',
    },
  },
  dataset: {
    source: []
  },
  tooltip: tooltip_map['bar'],
}