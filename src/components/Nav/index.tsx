import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { observer } from 'mobx-react-lite';
import axios from 'axios'
import { saveAs } from 'file-saver'
import dayjs from 'dayjs'
import { useTheme } from "next-themes";
import { IconBar, IconTitle, DarkIconTitle, DarkIconDownload, IconColor, IconBackground, DarkMoon, Sun, IconDownload, IconShare, DarkIconBar } from "@/components/svgs";
import { getBackgroundLinear, b64toFile } from "@/utils";
import { useEchartStore } from "../Echarts/StoreProvider";
import { BackgroundColor } from "./components/BackgroundColor";
import { BACKGROUND_THEMES } from "@/utils";
import { Color } from "./components/Color";
import { IconCircle } from './components/IconCircle';
import Animation from "./components/Animation";
import { Type } from "./components/Type";
import { Mode } from "./components/Mode";
import { Title } from "./components/Title";
import { Aspect } from "./components/Aspect";
import { ThemeAspect } from "./components/Aspect";

export const Nav = observer(() => {
  const { theme } = useTheme();
  const [animate, setAnimate] = useState<Record<any, any>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const echartStore = useEchartStore();
  const backgroundColor = getBackgroundLinear(echartStore.getBackground());
  const AspectIcon = ThemeAspect[theme || 'dark'][echartStore.aspectRatio];

  const indicate = (el: Element) => {
    if (!containerRef.current) return;
    const bounds: DOMRect = el?.getBoundingClientRect();
    const parent: DOMRect = containerRef.current?.getBoundingClientRect();
    const x1 = bounds.left - parent?.left;
    const x2 = parent.right - bounds?.right;
    const y1 = bounds.top - parent?.top;
    const y2 = parent.bottom - bounds?.bottom;
    setAnimate({
      opacity: 0.08,
      width: el.clientWidth,
      inset: `${y1}px ${(x2)}px ${y2}px ${x1}px`,
    });
  };

  const handlePointerEnter = (e: Event) => {
    if (!e.target) return;
    const target: Element = e.target as Element;
    if (target.classList.contains("nav-item")) {
      indicate(target);
    }
  };

  const handlePointerLeave = () => {
    setAnimate({
      ...animate,
      opacity: 0,
    });
  };

  const handleDownload = async () => {
    const result = await axios.post(
      '/api/download',
      {
        options: {
          ...echartStore.toJS(),
          backgroundColor: '#1e293b'
        },
        background:
          BACKGROUND_THEMES[echartStore.background],
        aspectRatio: echartStore.aspectRatio
      }
    );
    const fileName = dayjs().format('YYYY-MM-DD HH_mm_ss')
    saveAs(b64toFile(result.data, fileName + '.png', 'image/png'));
  }

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.addEventListener(
      "pointerenter",
      handlePointerEnter,
      true
    );
    containerRef.current.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (!containerRef.current) {
        return;
      }
      containerRef.current.removeEventListener(
        "pointerenter",
        handlePointerEnter,
        true
      );
      containerRef.current.removeEventListener("pointerleave", handlePointerLeave);
    }
  }, [animate]);

  return (
    <div className="flex justify-center select-none">
      <div className="h-16 text-xs border rounded-md bg-igraph-25 border-slate-100 dark:bg-slate-700 dark:border-slate-500">
        <div className="flex h-full">
          <div className="left relative flex h-full" ref={containerRef}>
            <Animation>
              <div className="nav-item relative h-full w-20 mr-2.5 flex items-center justify-center flex-col cursor-pointer">
                {
                  theme === 'light' ? <IconBar /> : <DarkIconBar />
                }
                <div>
                  Chart Type
                </div>
                <Type />
              </div>
            </Animation>
            <Animation>
              <div className="nav-item relative h-full w-20 mr-2.5 flex items-center justify-center flex-col cursor-pointer">
                { theme === 'light' ? <IconTitle /> : <DarkIconTitle /> }
                Chart Title
                <Title />
              </div>
            </Animation>
            <Animation>
              <div className="nav-item relative h-full w-20 mr-2.5 flex items-center justify-center flex-col cursor-pointer">
                <IconCircle style={{ background: echartStore.getTheme() }} />
                Chart Color
                <Color />
              </div>
            </Animation>
            <Animation>
              <div className="nav-item relative h-full w-20 mr-2.5 flex items-center justify-center flex-col cursor-pointer">
                <IconCircle style={{ background: backgroundColor }} />
                Background
                <BackgroundColor />
              </div>
            </Animation>
            <Animation>
              <div className="nav-item relative h-full w-20 mr-2.5 flex items-center justify-center flex-col cursor-pointer">
                <div className="w-8 h-8 flex items-center justify-center">
                  <AspectIcon />
                </div>
                Aspect ratio
                <Aspect />
              </div>
            </Animation>
            <Animation>
              <div className="nav-item relative h-full w-20 mr-2.5 flex items-center justify-center flex-col cursor-pointer">
                { theme === 'light' ? <Sun /> : <DarkMoon /> }
                Dark mode
                <Mode />
              </div>
            </Animation>
            <div className="h-3/5 w-px dark:bg-slate-500 bg-slate-100 relative top-1/2 -translate-y-2/4"></div>
            <div
              className="nav-item h-full w-20 ml-2.5 flex items-center justify-center flex-col cursor-pointer"
              onClick={handleDownload}
            >
              { theme === 'dark' ? <IconDownload /> : <DarkIconDownload /> }
              Download
            </div>
            {/* <div className="nav-item h-full w-20 ml-2.5 flex items-center justify-center flex-col cursor-pointer">
              <IconShare />
              Share
            </div> */}
            <motion.div
              animate={animate}
              className="absolute pointer-events-none opacity-0 bg-igraph-500 dark:bg-white h-full"
              ref={indicatorRef}
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  );
})
