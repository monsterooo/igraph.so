import { useState } from 'react';
import { ChartOptionContext } from './context';
import { chartDefaultOption } from '@/utils';

export function ChartProvider(props: any) {
  const { children } = props;
  const [option, setOption] = useState<Record<any, any>>(chartDefaultOption);

  return (
    <ChartOptionContext.Provider value={{ option, setOption }}>
      {children}
    </ChartOptionContext.Provider>
  )
}
