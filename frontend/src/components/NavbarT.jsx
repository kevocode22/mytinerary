import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import '../styles/styles.css'
import { Link as LinkRouter } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import userActions from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import Logo from '../../src/assets/LogoMy.png'
import Avatar from '../assets/avatar.png';


const navigation = [
  { name: 'Home', to: "/", current: true },
  { name: 'Cities', to: "cities", current: false },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Example() {
  const dispatch = useDispatch()

  const loginUser = useSelector(store => store.userReducer.user)


  return (
    <Disclosure as="nav" className="navbar" style={{ position: "sticky", top: 0, zIndex: 20, width: "100%" }}>
      {({ open }) => (
        <>
          <div className=" max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex items-center justify-between h-20 ">
              <div className="inset-y-1 left-0 flex items-center sm:hidden fixed">
                {/* Mobile menu button*/}
                <Disclosure.Button className="disclosure fixed inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className=" flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center h-10">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={Logo}
                    alt="Logo Mytinerary"
                  />
                  <img
                    className="hidden lg:block h-16 w-auto"
                    src={Logo}
                    alt="Logo Mytinerary"
                  />
                  <h3 className='text-logo'>Mytinerary</h3>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <LinkRouter to={item.to}
                        key={item.name}
                        className={classNames(
                          item.current ? 'text-white hover:bg-blue-600 hover:text-white' : 'text-white hover:bg-blue-600 hover:text-white',
                          'px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </LinkRouter>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-2 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}

                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className=" bg-blue-600 flex text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-blue-600 focus:ring-blue">
                      <span className="sr-only">Open user menu</span>

                           
                      {loginUser?.success ? <img
                        src={loginUser?.user.photoUser}
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 rounded-full "
                        alt={loginUser?.user.firstName}
                      /> : <img
                        className="h-10 w-10 rounded-full "
                        src={Avatar}
                        alt="avatar"
                      />}

                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="menuD menu-avatar origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {loginUser.success ? "" : <Menu.Item>
                        {({ active }) => (
                          <LinkRouter
                            to="/signup"
                            className={classNames(active ? 'bg-blue-600' : '', 'block px-4 py-2 text-sm text-white')}
                          >

                            Sign up

                          </LinkRouter>
                        )}
                      </Menu.Item>}


                      {loginUser?.success ? <Menu.Item>
                        {({ active }) => (
                          <LinkRouter onClick={() => {
                            toast("👋 Thanks for your visit")
                            dispatch(userActions.SignOutUser());

                          }}
                            to="/"
                            className={classNames(active ? 'bg-blue-600' : '', 'block px-4 py-2 text-sm text-white')}
                          >
                            Log out
                          </LinkRouter>
                        )}
                      </Menu.Item> : <Menu.Item>
                        {({ active }) => (
                          <LinkRouter
                            to="login"
                            className={classNames(active ? 'bg-blue-600' : '', 'block px-4 py-2 text-sm text-white')}
                          >
                            Log in
                          </LinkRouter>
                        )}
                      </Menu.Item>}

                    </Menu.Items>
                  </Transition>
                </Menu>

              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <LinkRouter to={item.to} key={item.name}>
                  <Disclosure.Button

                    href={item.to}
                    className={classNames(
                      item.current ? 'text-white hover:bg-blue-600 hover:text-white' : 'text-white hover:bg-blue-600 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </LinkRouter>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}