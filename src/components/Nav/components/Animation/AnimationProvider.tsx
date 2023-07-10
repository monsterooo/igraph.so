import { useState } from 'react';
import { AnimationContext } from './context';

function AnimationProvider(props: any) {
  const { children } = props;
  const [open, setOpen] = useState(false);

  return (
    <AnimationContext.Provider value={{ open, setOpen}}>
      {children}
    </AnimationContext.Provider>
  )
}

export default AnimationProvider;
