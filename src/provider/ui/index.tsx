import { createContext, useContext } from 'react'
import { Ui } from '@/stores';
import { autorun } from 'mobx';

let store: Ui;
export const StoreContext = createContext<Ui>(new Ui());

export function useUiStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useUiStore Store must be used within UiProvider')
  }

  return context
}

function initializeStore() {
  const _store = store ?? new Ui()

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function UiProvider({ children }: { children: JSX.Element }) {
  const store = initializeStore()

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}