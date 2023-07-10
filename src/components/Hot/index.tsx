import { useState, useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import throttle from 'lodash/throttle'
import { motion } from 'framer-motion';
import { HotTable } from '@handsontable/react'
import { getElementTop } from '@/utils';
import { getJSData } from '@/utils/editorData';
import { useEchartStore } from '../Echarts/StoreProvider';
import { useUiStore } from '@/provider/ui';
import { TABLE_SIZE } from '@/constants';
import { Header } from "./components/Header"
import 'handsontable/dist/handsontable.full.css'

function Hot() {
  const hotRef = useRef<HotTable>(null);
  const [ height, setHeight ] = useState('100%');
  const echartStore = useEchartStore();
  const uiStore = useUiStore();

  const processTableData = throttle(() => {
    const hotInstance = hotRef.current?.hotInstance;
    if (!hotInstance) return;
    // TODO 行设置到100时耗时去到了1.8s，需要优化
    // console.time('~~getJSData~~')
    const jsData = getJSData(hotInstance);
    echartStore.setDataSet(jsData);
    // console.timeEnd('~~getJSData~~')

    console.log('jsData', jsData)
  }, 50)

  const handleChange = (value: any) => {
    processTableData();
  }

  const getHeight = () => {
    const bodyHeight = window.document.body.clientHeight;
    const canvas = document.querySelector('#canvas') as HTMLElement;
    const offsetTop = getElementTop(canvas);
    return bodyHeight - (offsetTop + 60);
  }

  useEffect(() => {
    const hotInstance = hotRef.current?.hotInstance;
    if (!hotInstance) return;
    hotInstance.updateData(echartStore.initDataset);
  }, [echartStore.initDataset])

  useEffect(() => {
    if (uiStore.tableSize === TABLE_SIZE.MIN) {
      setHeight('100%');
    } else {
      setHeight(`${getHeight()}px`);
    }
  }, [uiStore.tableSize])

  useEffect(() => {
    if (!hotRef.current) return;
    uiStore.setHotTable(hotRef.current)
  }, [])

  return (
    <motion.div animate={{ height }} className="absolute dark:bg-slate-800 bg-white w-full bottom-0 left-0" style={{ height: '100%' }}>
      <div className="w-4/5 flex-col flex h-full m-auto border dark:border-slate-500 border-slate-200 rounded-md">
        <Header />
        <HotTable
          className="graph-table"
          minRows={50}
          minCols={15}
          ref={hotRef}
          width='100%'
          height='100%'
          afterChange={handleChange}
          colWidths={100}
          copyPaste
          licenseKey="non-commercial-and-evaluation"
        />
      </div>
    </motion.div>
  );
}

export default observer(Hot);