# Transition Component
Utility for easily apply transitions on React. All the credit belongs to [Adam Wathan](https://github.com/adamwathan/tailwind-ui-navbar-react/blob/master/components/Transition.js). I just wrote an API around his code.

## Deprecated
This project has been deprecated, use [@tailwindui/react](http://npmjs.com/package/@tailwindui/react)

## Props
| Name    | Type                | Desc                              |
|---      |---                  |---                                |
| show    | Boolean (optional)  |  Toggle between show/hide state   |
| appear  | Boolean (optional)  |  By default the child component does not perform the enter transition when it first mounts, regardless of the value of in. If you want this behavior, set both appear and in to true. |
| children | **ReactNode**      | Children to apply the classes and transitions. |
| enter     | String (optional) | Classes to apply on enter         |
| enterFrom | String (optional) | Classes to apply on enter start   |
| enterTo   | String (optional) | Classes to apply on enter end     |
| leave     | String (optional) | Classes to apply on leave         |
| leaveFrom | String (optional) | Classes to apply on leave start   |
| leaveTo   | String (optional) | Classes to apply on leave end     |
-----


## Usage (single animation):
```tsx
import { Transition } from 'transition-component'


export default () => {
  const [isOpen, setIsOpen] = useState(false)

  {/*
    Profile dropdown panel, show/hide based on dropdown state.
    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  */}
  <Transition
    show={isOpen}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
      ...
    </div>
  </Transition>
}
```

## Usage (multiple animation):
```tsx
import { Transition } from 'transition-component'


export default () => {
  const [isOpen, setIsOpen] = useState(false)

  <Transition show={isOpen}>
    {/* Shared parent */}
    <div>
      {/* Background overlay */}
      <Transition
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* ... */}
      </Transition>

      {/* Sliding sidebar */}
      <Transition
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {/* ... */}
      </Transition>
    </div>
  </Transition>
}
```
