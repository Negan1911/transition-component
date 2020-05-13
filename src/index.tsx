import * as React from 'react'
import { CSSTransition as ReactCSSTransition } from 'react-transition-group'

type Context = {
  parent: {
    show?: boolean
    appear?: boolean
    isInitialRender?: boolean
  }
}

const TransitionContext = React.createContext<Context>({ parent: {} })

function useIsInitialRender() {
  const isInitialRender = React.useRef(true)
  React.useEffect(() => {
    isInitialRender.current = false
  }, [])
  return isInitialRender.current
}

type Props = {
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

function CSSTransition({
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

  return (
    <ReactCSSTransition
      appear={appear}
      unmountOnExit
      in={show}
      addEndListener={(node, done) => {
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
    </ReactCSSTransition>
  )
}

export function Transition({ show, appear, ...rest }: Props) {
  const { parent } = React.useContext<Context>(TransitionContext)
  const isInitialRender = useIsInitialRender()
  const isChild = show === undefined

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    )
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear
        }
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  )
}
