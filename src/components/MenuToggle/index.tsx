import { useEffect } from 'react';
import { motion } from "framer-motion";
import { observer } from 'mobx-react-lite';
import { useTheme } from "next-themes";
import { hasParentWithClass } from "@/utils";
import { useUiStore } from '@/provider/ui';

const Path = (props: Record<any, any>) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const themeMap: Record<string, string> = {
    light: '#1e293b',
    dark: 'white'
  }
  
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke={themeMap[theme as string || 'dark']}
      strokeLinecap="round"
      {...props}
    />
  )
}

export const MenuToggle = observer(() => {
  const uiStore = useUiStore();

  const handleToggle = () => {
    uiStore.menuOpen = !uiStore.menuOpen
  }

  const handleWindowClick = (e: any) => {
    // 点击按钮不执行关闭逻辑
    if (hasParentWithClass(e.target, 'toggle-menu', true)) {
      return
    }
    if (hasParentWithClass(e.target, 'toggle-item', true)) {
      uiStore.menuOpen = true;
      return
    }
    uiStore.menuOpen = false;
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    }
  }, [])

  return (
    <div onClick={handleToggle} className="cursor-pointer">
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" }
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" }
          }}
        />
      </svg>
    </div>
  )
})
