import { useContext } from "react";
import { motion } from "framer-motion";
import { observer } from 'mobx-react-lite';
import { useTheme } from "next-themes";
import { useEchartStore } from "@/components/Echarts/StoreProvider";
import { AnimationContext } from "../Animation/context";
import { AnimationPanel } from "../Animation/AnimationPanel";
import { ASPECT_RATIO } from "@/utils";
import { DarkAspect1, DarkAspect2, DarkAspect3, DarkAspect4, Aspect1, Aspect2, Aspect3, Aspect4 } from "@/components/svgs";
import { closeAnimation, animations, transformTemplate } from "../utils";

export const DarkMap: Record<number, any> = {
  0: DarkAspect1,
  // 1: DarkAspect2,
  1: DarkAspect3,
  2: DarkAspect4,
}

export const LightMap: Record<number, any> = {
  0: Aspect1,
  // 1: Aspect2,
  1: Aspect3,
  2: Aspect4
}

export const ThemeAspect: Record<any, any> = {
  dark: DarkMap,
  light: LightMap
}

export const Aspect = observer(() => {
  const { open } = useContext(AnimationContext);
  const { theme, setTheme } = useTheme();
  const echartStore = useEchartStore();
  const AspectMap = ThemeAspect[theme || 'dark'];

  const getCls = (index: number) => {
    const baseCls = 'flex w-10 h-10 items-center justify-center rounded-md border transition-all ease-linear dark:hover:border-slate-100 hover:border-igraph-500 dark:bg-slate-900 bg-white';

    if (index === echartStore.aspectRatio) {
      return baseCls + ' border-igraph-500 dark:border-slate-100'
    }
    return baseCls + ' border-slate-200 dark:border-slate-500'
  }

  const handleSelectAspect = (index: number) => () => {
    echartStore.setAspectRatio(index);
  }

  return (
    <AnimationPanel>
      <motion.div variants={closeAnimation} animate={open ? "open" : "closed"} className="absolute z-50 pt-2 left-1/2 top-full -translate-x-2/4" style={{ perspective: 600, display: 'none' }}>
        <motion.div variants={animations} transformTemplate={transformTemplate} style={{ opacity: 1, transform: 'rotateX(-50deg) translateZ(0px)'}}>
          <div className="origin-center-top">
            <div className="p-1 relative inline-grid grid-cols-background-color justify-center items-center rounded-md bg-white dark:bg-slate-700 border dark:border-slate-500 border-slate-100">

              {ASPECT_RATIO.map((aspect: Record<string, any>, index: number) => {
                const Icon = AspectMap[index];
                return (
                  <div key={index}>
                    <div className="relative p-1">
                      <div className={getCls(index)} onClick={handleSelectAspect(index)}>
                          <Icon />
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
