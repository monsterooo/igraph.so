import { ChangeEvent, useContext } from "react";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEchartStore } from "@/components/Echarts/StoreProvider";
import { AnimationContext } from "../Animation/context";
import { AnimationPanel } from "../Animation/AnimationPanel";
import { closeAnimation, animations, transformTemplate, tooltopOptions } from "../utils";

export const Title = observer(() => {
  const { open } = useContext(AnimationContext);
  const echsrtStore = useEchartStore();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    echsrtStore.setTitle(e.target.value);
  }

  return (
    <AnimationPanel>
      <motion.div variants={closeAnimation} animate={open ? "open" : "closed"} className="absolute z-50 pt-2 left-1/2 top-full -translate-x-2/4" style={{ perspective: 600, display: 'none' }}>
        <motion.div variants={animations} transformTemplate={transformTemplate} style={{ opacity: 1, transform: 'rotateX(-50deg) translateZ(0px)' }}>
          <div className="origin-center-top">
            <div className="p-2 relative inline-grid grid-cols-type justify-center items-center rounded-md bg-white dark:bg-slate-700 border dark:border-slate-500">
              <input value={echsrtStore.title} onChange={handleTitleChange} placeholder="Please enter your title" className="w-48 rounded-lg border dark:bg-slate-900 dark:border-slate-500 bg-white border-igraph-100 p-2 text-sm" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimationPanel>
  )
})
