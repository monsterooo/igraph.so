import { Ref, useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimationProvider from "./AnimationProvider";
import { AnimationContext } from './context';
import { hasParentWithClass } from "@/utils";

function Provider(props: any) {
  return (
    <AnimationProvider>
      <Animation {...props} />
    </AnimationProvider>
  )
}

function Animation(props: any) {
  const { children } = props;
  const { setOpen, open } = useContext(AnimationContext);
  const containerRef: Ref<HTMLDivElement> = useRef(null);

  const handleTap = (e: any) => {
    // 如果点击的是panel则不关闭
    if (hasParentWithClass(e.target, 'animation-panel')) {
      return
    }
    setOpen(!open);
  }

  const handleWindowClick = (e: any) => {
    if (!containerRef.current || !containerRef.current.children) return;
    if (!e.target) return;
    const childNode = containerRef.current?.children?.item(0);

    // 点击item子元素
    if (containerRef.current.contains(e.target)) {
      return;
    }
    // 点击window窗口
    if (!e.target.contains(childNode)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    }
  }, [])

  return (
    <motion.div ref={containerRef} onTap={handleTap}>
      {children}
    </motion.div>
  )
}

export default Provider;
