import { useContext } from "react";
import { motion } from "framer-motion";
import Tooltip from "rc-tooltip";
import { observer } from "mobx-react-lite";
import { useTheme } from "next-themes";
import { TypeBar, TypeLine, TypePie, TypeBubble, TypeFunnel, TypeSunBursh, DarkTypeBar, DarkTypeLine, DarkTypePie, DarkTypeFunnel } from "@/components/svgs";
import { useEchartStore } from "@/components/Echarts/StoreProvider";
import { CHART_TYPE } from "@/utils/echart";
import { AnimationContext } from "../Animation/context";
import { AnimationPanel } from "../Animation/AnimationPanel";
import { closeAnimation, animations, transformTemplate, tooltopOptions } from "../utils";

const IconMap: Record<string, any> = {
  [CHART_TYPE.BAR]: TypeBar,
  [CHART_TYPE.LINE]: TypeLine,
  [CHART_TYPE.PIE]: TypePie,
  [CHART_TYPE.FUNNEL]: TypeFunnel
}

const DarkIconMap: Record<string, any> = {
  [CHART_TYPE.BAR]: DarkTypeBar,
  [CHART_TYPE.LINE]: DarkTypeLine,
  [CHART_TYPE.PIE]: DarkTypePie,
  [CHART_TYPE.FUNNEL]: DarkTypeFunnel
}

export const Type = observer(function Type() {
  const { theme, setTheme } = useTheme();
  const echartsStore = useEchartStore();
  const { open } = useContext(AnimationContext);
  const modeIcon = theme === 'dark' ? IconMap : DarkIconMap;

  const handleChangeType = (type: string) => () => {
    echartsStore.setType(type);
  }

  const getCls = (type: string) => {
    const baseCls = 'flex bg-white dark:bg-slate-900 w-10 h-10 items-center justify-center rounded-md border transition-all ease-linear dark:hover:border-slate-100 hover:border-igraph-500';
    if (type === echartsStore?.type) {
      return baseCls + ' border-igraph-500 dark:border-slate-100'
    }
    return baseCls + ' border-slate-200 dark:border-slate-500'
  }

  return (
    <AnimationPanel>
      <motion.div variants={closeAnimation} animate={open ? "open" : "closed"} className="absolute z-50 pt-2 left-1/2 top-full -translate-x-2/4" style={{ perspective: 600, display: 'none' }}>
        <motion.div variants={animations} transformTemplate={transformTemplate} style={{ opacity: 1, transform: 'rotateX(-50deg) translateZ(0px)' }}>
          <div className="origin-center-top">
            <div className="p-1 relative inline-grid grid-cols-type justify-center items-center rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-500">
              
              {Object.entries(CHART_TYPE).map((type: string[]) => {
                const [_, name] = type;
                const TypeICon = modeIcon[name];
                return (
                  <div key={name}>
                    <div className="relative p-1">
                      <Tooltip overlay={<span>Bar chart</span>} {...tooltopOptions}>
                        <div onClick={handleChangeType(name)} className={getCls(name)}>
                          <TypeICon />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                )
              })}

              {/* <div>
                <div className="relative p-1">
                  <Tooltip overlay={<span>Bubble chart</span>} {...tooltopOptions}>
                    <div className={cls(itemCls, { ['border-slate-100']: isCurrentType('bubble') })}>
                      <TypeBubble />
                    </div>
                  </Tooltip>
                </div>
              </div> */}

              {/* <div>
                <div className="relative p-1">
                  <Tooltip overlay={<span>SunBursh chart</span>} {...tooltopOptions}>
                    <div className={cls(itemCls, { ['border-slate-100']: isCurrentType('sunburst') })}>
                      <TypeSunBursh />
                    </div>
                  </Tooltip>
                </div>
              </div> */}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimationPanel>
  )
})