import { createContext } from 'react';

interface IContext {
  open: boolean;
  setOpen: (open: boolean) => void
}

const AnimationContext = createContext({} as IContext);

export {
  AnimationContext
}