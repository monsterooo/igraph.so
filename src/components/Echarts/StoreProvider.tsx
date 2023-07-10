import { createContext, useContext } from 'react'
import { Echart } from '@/stores';
import {
  EChartsOption,
} from 'echarts/types/dist/shared';
import { autorun } from 'mobx';

let store: Echart;
export const StoreContext = createContext<Echart>(new Echart());

export function useEchartStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useEchart Store must be used within StoreProvider')
  }

  return context
}

function initializeStore(initialData: { options: EChartsOption, initDataset: any}) {
  const _store = store ?? new Echart()

  autorun(() => {
    if (_store.type) {
      _store.setSeries();
    }
    if (_store.dataset) {
      _store.setDatasetSource();
    }
  })

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function StoreProvider({ children, initialState: initialData }: { children: JSX.Element, initialState: { options: EChartsOption, initDataset: any} }) {
  const store = initializeStore(initialData)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}