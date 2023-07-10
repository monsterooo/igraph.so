import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useEchartStore } from '../Echarts/StoreProvider';
import { Echarts } from '../Echarts';
import { getBackgroundLinear, ASPECT_RATIO } from "@/utils";

const fixedHeight = 600;

export const Canva = observer(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(0);
  const echartStore = useEchartStore();
  const bgColor = getBackgroundLinear(echartStore.getBackground());
  const aspect = ASPECT_RATIO[echartStore.aspectRatio];

  // 指定宽高与指定高度的比例
  const ratioFixed = 2;
  const canvaRect = {
    width: aspect.width / ratioFixed,
    height: aspect.height / ratioFixed
  }

  const getWithWindowRatio = () => {
    const containerRect = containerRef.current?.getBoundingClientRect() as DOMRect;
    const hRatio = (containerRect?.height / canvaRect.height).toFixed(2);
    const wRatio = (containerRect?.width / canvaRect.width).toFixed(2);
    const finalRatio = hRatio < wRatio ? hRatio : wRatio;

    setRatio(+finalRatio);
  }

  useEffect(() => {
    if (!containerRef.current) return;
    getWithWindowRatio();

    window.addEventListener('resize', getWithWindowRatio);

    return () => {
      window.removeEventListener('resize', getWithWindowRatio);
    }
  }, [aspect])

  return (
    <div className="flex-1 flex flex-col justify-center py-8 min-h-30-rem">
      <div ref={containerRef} id="canvas" className="relative flex grow-10 shrink basis-0 w-full h-full justify-content">
        <div className="absolute top-1/2 left-1/2" style={{ transform: `translate(-50%, -50%) scale(${ratio})` }}>
          <motion.div style={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="rounded-md p-12" style={{ width: canvaRect.width, height: canvaRect.height, backgroundImage: bgColor }}>
              <Echarts />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
})
