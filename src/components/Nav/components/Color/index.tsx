import { useContext } from "react";
import { motion } from "framer-motion";
import { observer } from 'mobx-react-lite';
import { useEchartStore } from "@/components/Echarts/StoreProvider";
import { AnimationContext } from "../Animation/context";
import { AnimationPanel } from "../Animation/AnimationPanel";
import { closeAnimation, animations, transformTemplate } from "../utils";
import { THEMES } from "@/utils";
import { ZRColor } from "echarts/types/dist/shared";

export const Color = observer(function Color() {
  const { open } = useContext(AnimationContext);
  const echartStore = useEchartStore();

  const handleSelectColor = (index: number) => () => {
    echartStore.setTheme(index);
  }

  const getCls = (themeIndex: number) => {
    const baseCls = 'flex w-fit px-4 h-10 items-center justify-center rounded-md border transition-all ease-linear dark:hover:border-slate-100 hover:border-igraph-500 dark:bg-slate-900 bg-white';

    if (themeIndex === echartStore.theme) {
      return baseCls + ' border-igraph-500 dark:border-slate-100'
    }
    return baseCls + ' border-slate-200 dark:border-slate-500'
  }

  return (
    <AnimationPanel>
      <motion.div variants={closeAnimation} animate={open ? "open" : "closed"} className="absolute z-50 pt-2 left-1/2 top-full -translate-x-2/4" style={{ perspective: 600, display: 'none' }}>
        <motion.div variants={animations} transformTemplate={transformTemplate} style={{ opacity: 1, transform: 'rotateX(-50deg) translateZ(0px)'}}>
          <div className="origin-center-top">
            <div className="p-1 relative inline-grid grid-cols-color justify-center items-center rounded-md bg-white dark:bg-slate-700 border dark:border-slate-500">

              {THEMES.map((themes: ZRColor[], themeIndex: number) => {
                return (
                  <div key={themeIndex}>
                    <div className="relative p-1">
                      <div className={getCls(themeIndex)}>
                        {Array(echartStore.getSeriesLength()).fill('').map((series: any, index: number) => {
                          return (
                            <div key={index} onClick={handleSelectColor(themeIndex)} className="relative -mx-1 w-6 h-6 border-2 dark:border-slate-100 border-igraph-200 rounded-full shadow-slate-600" style={{ background: themes[index] as string, zIndex: index + 1}}></div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimationPanel>
  )
})
