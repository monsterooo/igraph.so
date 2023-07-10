import { createContext } from 'react';

interface IContext {
  option: Record<any, any>;
  setOption: (option: any) => void
}

const ChartOptionContext = createContext({} as IContext);

export {
  ChartOptionContext
}