import { action, observable, computed, runInAction, makeObservable, toJS } from 'mobx'
import get from 'lodash/get'
import set from 'lodash/set'
import unset from 'lodash/unset'
import { enableStaticRendering } from 'mobx-react-lite'
import {
  EChartsOption,
} from 'echarts/types/dist/shared';
import { seriesTemplate, CHART_TYPE, THEMES } from '@/utils/echart';
import { tooltip_map } from '@/utils';

enableStaticRendering(typeof window === 'undefined')

export class Echart {
  options: EChartsOption = {};
  dataset: any[][] = [];
  initDataset: any[][] = [];
  type: string = 'bar';
  theme: number = 0;
  background: number = 0;
  aspectRatio: number = 0;

  constructor() {
    makeObservable(this, {
      options: observable,
      dataset: observable,
      aspectRatio: observable,
      initDataset: observable,
      type: observable,
      theme: observable,
      background: observable,
      setDataSet: action,
      setDatasetSource: action,
      setSeries: action,
      setType: action,
      setAxis: action,
      setTooltip: action,
      setAspectRatio: action,
    })
  }

  get title(): string {
    return get(this.options, 'title.text') as string;
  }

  setTitle(title: string) {
    set(this.options, 'title.text', title);
  }

  setDataSet(dataset: any[][]) {
    this.dataset = dataset;
  }

  setTheme(theme: number) {
    this.theme = theme;
    set(this.options, 'color', THEMES[theme])
  }

  getTheme() {
    return THEMES[this.theme][0]
  }

  setBackground(theme: number) {
    this.background = theme;
  }

  getBackground() {
    return this.background;
  }

  setAspectRatio(index: number) {
    this.aspectRatio = index;
  }

  getAspectRatio() {
    return this.aspectRatio;
  }

  // 表格数据变更自动执行这里
  // 从表格变更数据后设置options的dataset.source数据
  setDatasetSource() {
    let finalData: any = this.dataset;
    if (this.type === CHART_TYPE.FUNNEL) {
      const funnelData = this.dataset.slice(1).map((data: any) => ({ value: data[1], name: data[0] }))
      finalData = funnelData;
    }
    set(this.options, 'dataset.source', finalData);
    this.setSeries();
  }

  getSeriesLength() {
    return get(this.options, 'series.length', 1)
  }

  setType(type: string) {
    this.type = type;
    this.setAxis();
    this.setTooltip();
    this.setSeries();
    // 类型更改后要重置默认数据，因为不同的图表数据可能不同
    this.setDatasetSource()
  }

  set legendData(data: Record<any, any>) {
    set(this.options, 'legend.data', data);
  }

  // 类型变更设置series
  setSeries() {
    const seriesSeed = seriesTemplate[this.type || 'bar'];
    let seriesNumber = 0;
    let seriesArr = [];
    // 如果数据是多维度，则需要设置多个series
    switch(this.type) {
      case CHART_TYPE.BAR:
      case CHART_TYPE.LINE:
        seriesArr = get(this.dataset, '[0]', []).slice(1);
        seriesNumber = get(seriesArr, 'length', 0);
        break;
      case CHART_TYPE.PIE:
        seriesNumber = get(this.dataset, 'length', 0);
        break;
      case CHART_TYPE.FUNNEL:
        // 漏斗图需要去掉第一行的系列
        seriesNumber = get(this.dataset, 'length', 1) - 1;
        break;
    }
    set(this.options, 'series', Array(seriesNumber).fill('').map(() => seriesSeed));
  }

  setAxis() {
    switch(this.type) {
      case CHART_TYPE.LINE:
      case CHART_TYPE.BAR:
        set(this.options, 'xAxis', {
          type: 'category',
        });
        set(this.options, 'yAxis', {
          type: 'value',
          splitLine: {
            lineStyle: {
              cap: 'round',
              type: [2, 3],
              dashOffset: 10
            }
          }
        })
        break;
      case CHART_TYPE.PIE:
      case CHART_TYPE.FUNNEL:
        unset(this.options, 'xAxis');
        unset(this.options, 'yAxis');
        break;
    }
  }

  setTooltip() {
    const tooltip = tooltip_map[this.type];

    set(this.options, 'tooltip', tooltip);
  }

  /**
   * 设置默认图例数据，根据不同的数据类型获取里面显示的图例
   * @param name 
   */
  defaultLegendData(name: string) {
    const dataset: any = get(this.options, 'dataset.source', []);
    let data: Record<any, any> = [];
    switch(name) {
      case CHART_TYPE.BAR:
      case CHART_TYPE.LINE:
        data = get(dataset, '[0]', []).slice(1);
        break;
      case CHART_TYPE.PIE:
      case CHART_TYPE.FUNNEL:
        data = dataset.map((data: Record<any, any>) => data.name);
        break;
      default:
        data = [];
        break;
    }
    set(this.options, 'legend.data', data);
  }

  /**
   * 设置默认系列
   * @param name 
   */
  defaultSeries(name: string) {
    console.log('设置系列')
    let length;
    switch(name) {
      case CHART_TYPE.FUNNEL:
      case CHART_TYPE.PIE:
        length = 1;
        break;
      default:
        length = get(this.options, 'dataset.source[0].length', 1) as number - 1;
        break;
    }
    const series = Array(length).fill('').map(() => seriesTemplate[name]);

    set(this.options, 'series', series);
  }

  setOptions(obj: any, path: string, data: Record<any, any>) {
    set(obj, path, data);
    this.options = {...this.options };
  }

  hydrate = ({ type, options, initDataset}: { type?: string; options: EChartsOption, initDataset: any[][]}) => {
    if (!options || !initDataset) return

    this.options = options
    // this.type = type || 'bar'
    this.initDataset = initDataset
  }

  toJS(): EChartsOption {
    return toJS(this.options);
  }
}
