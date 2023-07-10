import { useContext } from "react";
import { motion } from "framer-motion";
import { observer } from 'mobx-react-lite';
import { useEchartStore } from "@/components/Echarts/StoreProvider";
import { AnimationContext } from "../Animation/context";
import { AnimationPanel } from "../Animation/AnimationPanel";
import { BACKGROUND_THEMES, getBackgroundLinear } from "@/utils";
import { closeAnimation, animations, transformTemplate } from "../utils";

export const BackgroundColor = observer(() => {
  const { open } = useContext(AnimationContext);
  const echartStore = useEchartStore();

  const getCls = (themeIndex: number) => {
    const baseCls = 'flex w-10 h-10 items-center justify-center rounded-md border transition-all ease-linear dark:hover:border-slate-100 hover:border-igraph-500 dark:bg-slate-900 bg-white';

    if (themeIndex === echartStore.background) {
      return baseCls + ' border-igraph-500 dark:border-slate-100'
    }
    return baseCls + ' border-slate-200 dark:border-slate-500'
  }

  const handleSelectBackground = (index: number) => () => {
    echartStore.setBackground(index);
  }

  return (
    <AnimationPanel>
      <motion.div variants={closeAnimation} animate={open ? "open" : "closed"} className="absolute z-50 pt-2 left-1/2 top-full -translate-x-2/4" style={{ perspective: 600, display: 'none' }}>
        <motion.div variants={animations} transformTemplate={transformTemplate} style={{ opacity: 1, transform: 'rotateX(-50deg) translateZ(0px)'}}>
          <div className="origin-center-top">
            <div className="p-1 relative inline-grid grid-cols-background-color justify-center items-center rounded-md bg-white dark:bg-slate-700 border dark:border-slate-500 border-slate-100">

              {BACKGROUND_THEMES.map((theme: string[], themeIndex: number) => {
                return (
                  <div key={themeIndex}>
                    <div className="relative p-1">
                      <div className={getCls(themeIndex)} onClick={handleSelectBackground(themeIndex)}>
                        <div className="relative w-6 h-6 rounded-full border-2 dark:border-slate-100 border-igraph-200 shadow-slate-600" style={{ backgroundImage: getBackgroundLinear(themeIndex)}}></div>
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
