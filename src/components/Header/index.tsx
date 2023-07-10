import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useUiStore } from '@/provider/ui';
import { LightButton } from '../LightButton';
import { Mail, ExternalLink, BrandTwitter, LogoLetter } from '../svgs';
import dynamic from 'next/dynamic';

const Nav = dynamic(
  (() =>
      import('../Nav').then(({ Nav }) => Nav)),
  { ssr: false }
) as any;

const MenuToggle = dynamic(
  (() =>
      import('../MenuToggle').then(({ MenuToggle }) => MenuToggle)),
  { ssr: false }
) as any;

const animateVariants = {
  closed: { opacity: 0, scale: 0.8, display: 'none' },
  open: { opacity: 1, scale: 1, display: 'block' }
}

export const Header = observer(() => {
  const uiStore = useUiStore();

  return (
    <div className="h-16 relative flex justify-center">
      <div className="absolute left-0">
        <div className="flex items-center">
          <div className="mr-6">
            <motion.div
              initial={false}
              animate={uiStore.menuOpen ? "open" : "closed"}
              className="toggle-menu"
            >
              <MenuToggle />
            </motion.div>
            <motion.div
              style={{ opacity: 0, transform: 'scale(0.8)', display: 'none'}}
              className="toggle-item absolute w-64 rounded-md border top-12 py-2 px-2 border-slate-100 dark:border-slate-500 dark:bg-slate-800 z-10"
              animate={uiStore.menuOpen ? "open" : "closed"}
              variants={animateVariants}
            >
              <ul>
                <li className="py-1 px-2 rounded-md dark:hover:bg-slate-700 hover:bg-igraph-50 cursor-pointer">
                  <a href="mailto:igraph.so@gmail.com" className="flex items-center">
                    <Mail className="mr-2" />
                    Contact us
                  </a>
                </li>
                <li className="py-1 px-2 rounded-md dark:hover:bg-slate-700 hover:bg-igraph-50 cursor-pointer flex">
                  <a href="https://twitter.com/IGraphSo" target="_blank" className="flex items-center">
                    <BrandTwitter className="mr-2" />
                    Follow us
                  </a>
                </li>
                <li className="h-px dark:bg-slate-500 bg-slate-100 my-2" />
                <li className="py-1 px-2 rounded-md dark:hover:bg-slate-700 hover:bg-igraph-50 cursor-pointer flex">
                  <a href="#" className="flex items-center">
                    <ExternalLink className="mr-2" />
                    Privacy notice
                  </a>
                </li>
                <li className="py-1 px-2 rounded-md dark:hover:bg-slate-700 hover:bg-igraph-50 cursor-pointer flex">
                  <a href="#" className="flex items-center">
                    <ExternalLink className="mr-2" />
                    Terms of service
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
          <div>
            <div className="h-10 px-4 border dark:bg-slate-700 bg-igraph-25 border-slate-100 dark:border-slate-500 rounded-[19px] tracking-wider font-extrabold flex items-center justify-center">
              <LogoLetter className="logo" /> <span className="ml-1">Graph</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Nav />
      </div>
      <div className="absolute right-0">
        {/* <LightButton /> */}
      </div>
    </div>
  )
})
