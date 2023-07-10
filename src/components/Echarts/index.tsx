import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { observer } from 'mobx-react-lite';
import { useEchartStore } from './StoreProvider';
import dark from './themes/dark.json';

echarts.registerTheme('baseDark', dark.theme);

export const Echarts = observer(function Echarts() {
  const echartStore = useEchartStore();

  console.log('toJS:', echartStore.toJS())
  return (
    <div className="h-full w-full relative">
      <ReactECharts theme="baseDark" notMerge style={{ width: '100%', height: '100%', zIndex: 2 }} option={echartStore.toJS()} />
      <div className="h-full w-full absolute rounded-xl bg-white" style={{ left: -10, top: -10, opacity: 0.5, zIndex: 1, width: 'calc(100% + 20px)', height: 'calc(100% + 20px)' }} />
    </div>
  )
})
