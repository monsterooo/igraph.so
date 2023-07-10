import get from 'lodash/get'
import set from 'lodash/set'
import slice from 'lodash/slice'
import cloneDeep from 'lodash/cloneDeep'
import { ZRColor } from 'echarts/types/dist/shared'
import {
  EChartsOption,
} from 'echarts/types/dist/shared';

const bgColor = 'rgb(30 41 59)';

export enum CHART_TYPE {
  BAR = 'bar',
  LINE = 'line',
  PIE = 'pie',
  FUNNEL = 'funnel'
}

const BASE_THEME: ZRColor[] = [
  "#B399FE",
  "#FC7E91",
  "#33B6E0",
  "#FFC849",
  "#25CDA5",
  "#FA9B65",
  "#D93C95",
  "#845FD8",
  "#3F8EEB",
  "#58C8D8",
  "#F35074",
  "#6EA0DA",
  "#D066D7"
];

export const THEMES: ZRColor[][] = BASE_THEME.map((_: ZRColor, index: number): ZRColor[] => {
  const first_theme = slice([...BASE_THEME], 0, index);
  const last_theme = slice([...BASE_THEME], index);
  return [...last_theme, ...first_theme];
})

// 图片背景色
export const BACKGROUND_THEMES: string[][] = [
  ['#8EC5FC', '#E0C3FC'],
  ['#FFDEE9', '#B5FFFC']
]

// 画布比例
export const ASPECT_RATIO = [
  { width: 1888, height: 1200 },
  // { width: 676, height: 1200 },
  { width: 1200, height: 1200 },
  { width: 3000, height: 1200 }
]

export const getBackgroundLinear = (themeIndex: number) => {
  const theme = BACKGROUND_THEMES[themeIndex]
  let percentage: string[] = [];
  let colorArr = [];

  if (theme.length === 2) {
    percentage = ['0%', '100%']
  } else if (theme.length === 3) {
    percentage = ['0%', '50%', '100%']
  }
  for(let i = 0; i < theme.length; i++) {
    colorArr.push(`${theme[i]} ${percentage[i]}`);
  }

  return `linear-gradient(320deg, ${colorArr.join(', ')})`
}

const DATA_BAR_LINE_PIE = [
  ['graph', '抹茶拿铁咖啡', '奶茶', '奶酪可可', '核桃布朗尼蛋糕'],
  ['2015', 43.3, 85.8, 93.7, 45.3],
  ['2016', 83.1, 73.4, 55.1, 57.4],
  ['2017', 86.4, 65.2, 82.5, 82.1],
  ['2018', 72.4, 53.9, 39.1, 79]
]
const DATA_PIE = [
  { value: 60, name: 'Visit' },
  { value: 40, name: 'Inquiry' },
  { value: 20, name: 'Order' },
  { value: 80, name: 'Click' },
  { value: 100, name: 'Show' }
]
const DATA_FUNNEL = [
  { value: 60, name: 'Visit' },
  { value: 40, name: 'Inquiry' },
  { value: 20, name: 'Order' },
  { value: 80, name: 'Click' },
  { value: 100, name: 'Show' }
]

export const DEFAULT_DATA: Record<any, any> = {
  bar: DATA_BAR_LINE_PIE,
  line: DATA_BAR_LINE_PIE,
  pie: DATA_PIE,
  funnel: DATA_FUNNEL
};


export const seriesTemplate: Record<any, any> = {
  bar: {
    type: 'bar',
    smooth: true,
    itemStyle: {
      borderRadius: [4, 4, 0, 0]
    }
  },
  line: {
    type: 'line',
    smooth: true,
    itemStyle: {
      borderRadius: [4, 4, 0, 0]
    }
  },
  pie: {
    type: 'pie',
    itemStyle: {
      borderRadius: 10,
      borderColor: bgColor,
      borderWidth: 2
    },
  },
  funnel: {
    type: 'funnel',
    left: '10%',
    top: 90,
    bottom: 60,
    width: '80%',
    // min: 0,
    // max: 100,
    minSize: '0%',
    maxSize: '100%',
    sort: 'descending',
    label: {
      show: true,
      position: 'inside'
    },
  }
}

export const setSeriesType = (option: Record<any, any>, type: string) => {
  const length = getDatasetLength(option);
  const series = Array(length).fill('').map(() => seriesTemplate[type]);
  return set(cloneDeep(option), 'series', series);
}

// export const setLegend = (option, )

export const setDataset = (option: Record<any, any>, dataset: Record<any, any>) => {
  return set(cloneDeep(option), 'dataset.source', dataset);
}

export const getChatType = (option: Record<any, any>): string => {
  return get(option, 'series[0].type', '');
}

export const getDatasetLength = (option: Record<any, any>): number => {
  return get(option, 'dataset.source[0].length', 1) - 1
}

// [
//   { d1: 'Month', d2: 'Pageviews 2021', d3: 'Pageviews 2022', d4: 'Pageviews 2023' },
//   { d1: 'Tue', d2: '439', d3: '3017', d4: '4681' },
//   { d1: 'Wed', d2: '508', d3: '3911', d4: '5175' },
//   { d1: 'Thu', d2: '766', d3: '4712', d4: '5802' },
//   { d1: 'Fri', d2: '901', d3: '5076', d4: '6259' },
//   { d1: 'Sat', d2: '1742', d3: '5812', d4: '6910' },
//   { d1: 'Sun', d2: '2883', d3: '4301', d4: '7491' },
// ]
// // line 图表默认数据
// export const DATA_BAR_LINE_PIE = [
//   ['Month', 'Pageviews 2021', 'Pageviews 2022', 'Pageviews 2023'],
//   ['Tue', 439, 3017, 4681],
//   ['Wed', 508, 3911, 5175],
//   ['Thu', 766, 4712, 5802],
//   ['Fri', 901, 5076, 6259],
//   ['Sat', 1742, 5812, 6910],
//   ['Sun', 2883, 4301, 7491]
// ]


// line dataset to table data
export const fromLineDatasetToTable = (data: any): Record<any, string>[] => {
  const result: Record<any, string>[] = [];

  data.forEach((x: string[], xi: number) => {
    const currData: Record<any, string> = {}
    result.push(currData)
    x.forEach((xValue: string, yi: number) => {
      currData[`d${yi}`] = xValue;
    })
  });

  return result;
}