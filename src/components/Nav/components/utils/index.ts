import type { TooltipProps } from 'rc-tooltip/lib/Tooltip';

export const animations = {
  open:{
    rotate: 0.01,
    z: 0,
    opacity: 1,
  },
  closed:{
    rotate: -50,
    z: 0,
    opacity: 0,
  }
}

export const closeAnimation = {
  open: {
    display: "block",
  },
  closed: {
    display: "none",
    transition: {
      when: "afterChildren",
    },
  }
}

export function transformTemplate(props: { rotate: number, z: number}) {
  return `rotateX(${props.rotate}) translateZ(${props.z})`
}

export const tooltopOptions: Pick<TooltipProps, 'placement' | 'trigger' | 'motion'> = {
  placement: "bottom",
  trigger: ['hover'],
  motion: {
    motionName: 'zoom-big-fast',
    motionDeadline: 500,
  }
}