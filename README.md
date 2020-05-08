# Transition Component
Utility for easily apply transitions on React. All the credit belongs to [Adam Wathan](https://github.com/adamwathan/tailwind-ui-navbar-react/blob/master/components/Transition.js). I just wrote an API around his code.

## Props
| Name    | Type                | Desc                              |
|---      |---                  |---                                |
| show    | Boolean (optional)  |  Toggle between show/hide state   |
| appear  | Boolean (optional)  |  By default the child component does not perform the enter transition when it first mounts, regardless of the value of in. If you want this behavior, set both appear and in to true. |
| timeout | Number (optional)   | Apply timeout to the transitions  |
| children | **ReactNode**      | Children to apply the classes and transitions. |
| enter     | String (optional) | Classes to apply on enter         |
| enterFrom | String (optional) | Classes to apply on enter start   |
| enterTo   | String (optional) | Classes to apply on enter end     |
| leave     | String (optional) | Classes to apply on leave         |
| leaveFrom | String (optional) | Classes to apply on leave start   |
| leaveTo   | String (optional) | Classes to apply on leave end     |
-----


## Usage:
```jsx
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