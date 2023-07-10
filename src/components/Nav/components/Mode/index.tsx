import { useContext } from "react";
import { motion } from "framer-motion";
import Tooltip from "rc-tooltip";
import { useTheme } from "next-themes";
import { Moon, Sun, DarkSun, DarkMoon } from "@/components/svgs";
import { AnimationContext } from "../Animation/context";
import { AnimationPanel } from "../Animation/AnimationPanel";
import { closeAnimation, animations, transformTemplate } from "../utils";

export function Mode() {
  const { open } = useContext(AnimationContext);
  const { theme, setTheme } = useTheme();
  
  const handleChangeMode = (mode: string) => () => {
    setTheme(mode);
  }

  const getCls = (color: string) => {
    const baseCls = 'flex w-10 h-10 items-center justify-center rounded-md dark:bg-slate-900 bg-white border transition-all ease-linear dark:hover:border-slate-100 hover:border-igraph-500';

    if (theme === color) {
      return baseCls + ' border-igraph-500 dark:border-slate-100'
    }
    return baseCls + ' border-slate-200 dark:border-slate-500'
  }

  return (
    <AnimationPanel>
      <motion.div variants={closeAnimation} animate={open ? "open" : "closed"} className="absolute z-50 pt-2 left-1/2 top-full -translate-x-2/4" style={{ perspective: 600, display: 'none' }}>
        <motion.div variants={animations} transformTemplate={transformTemplate} style={{ opacity: 1, transform: 'rotateX(-50deg) translateZ(0px)'}}>
          <div className="origin-center-top">
              <div className="p-1 relative inline-grid grid-cols-type justify-center items-center rounded-md bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-500">
                <div>
                  <div className="relative p-1">
                    <Tooltip placement="bottom" trigger={['click']} overlay={<span>tooltip</span>}>
                      <div onClick={handleChangeMode('dark')} className={getCls('dark')}>
                        { theme === 'light' ? <Moon /> : <DarkMoon /> }
                      </div>
                    </Tooltip>
                  </div>
                </div>

                <div>
                  <div className="relative p-1">
                    <div onClick={handleChangeMode('light')} className={getCls('light')}>
                      { theme === 'light' ? <Sun /> : <DarkSun /> }
                    </div>
                  </div>
                </div>

              </div>
            </div>
        </motion.div>
      </motion.div>
    </AnimationPanel>
  )
}