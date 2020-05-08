import * as React from 'react'
import { CSSTransition } from 'react-transition-group'

type Context = {
  shouldTransition: boolean
  parent: {
    isInitialRender?: boolean
    show?: boolean
    appear?: boolean
  }
}

const TransitionContext = React.createContext<Context>({
  parent: {},
  shouldTransition: true
})

type Props = {
  timeout?: number
  show?: boolean
  appear?: boolean
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
  children: React.ReactNode
}

export function Transition({
  timeout,
  show,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  appear,
  children
}: Props) {
  const enterClasses = enter.split(' ').filter(s => s.length)
  const enterFromClasses = enterFrom.split(' ').filter(s => s.length)
  const enterToClasses = enterTo.split(' ').filter(s => s.length)
  const leaveClasses = leave.split(' ').filter(s => s.length)
  const leaveFromClasses = leaveFrom.split(' ').filter(s => s.length)
  const leaveToClasses = leaveTo.split(' ').filter(s => s.length)

  function addClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.add(...classes)
  }

  function removeClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.remove(...classes)
  }

  const { parent, shouldTransition } = React.useContext<Context>(
    TransitionContext
  )
  const mounted = React.useRef(false)
  React.useEffect(() => {
    mounted.current = true
  }, [])

  const isParent = show !== undefined
  const isChild = !isParent
  const isInitialRender = mounted.current === false
  let entranceTransitionsEnabled =
    parent.isInitialRender && parent.show && !parent.appear ? false : true

  let childTransitionsEnabled = isParent
    ? isInitialRender && show && !appear
      ? false
      : true
    : shouldTransition

  return (
    <TransitionContext.Provider
      value={{
        shouldTransition: childTransitionsEnabled,
        parent: {
          show,
          isInitialRender,
          appear: isChild ? entranceTransitionsEnabled : appear
        }
      }}
    >
      <CSSTransition
        appear={isChild ? entranceTransitionsEnabled : appear}
        unmountOnExit
        in={isChild ? parent.show : show}
        addEndListener={(node, done) => {
          if (timeout) {
            setTimeout(done, timeout)
            return
          }
          node.addEventListener('transitionend', done, false)
        }}
        onEnter={node => {
          addClasses(node, [...enterClasses, ...enterFromClasses])
        }}
        onEntering={node => {
          removeClasses(node, enterFromClasses)
          addClasses(node, enterToClasses)
        }}
        onEntered={node => {
          removeClasses(node, [...enterToClasses, ...enterClasses])
        }}
        onExit={node => {
          addClasses(node, [...leaveClasses, ...leaveFromClasses])
        }}
        onExiting={node => {
          removeClasses(node, leaveFromClasses)
          addClasses(node, leaveToClasses)
        }}
        onExited={node => {
          removeClasses(node, [...leaveToClasses, ...leaveClasses])
        }}
      >
        {children}
      </CSSTransition>
    </TransitionContext.Provider>
  )
}
