import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

// import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/api"
import { ACCOUNT_TYPE } from "../../utils/constants"
// import ProfileDropdown from "../core/Auth/ProfileDropDown"
import ProfileDropdown from "../core/Auth/ProfileDropdown"
function Navbar() {
  //? useSelector() to extract Redux store state's specific parts -> format : state.(slice_name).(attributes)

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
const [XP, setXP] = useState(0)

//   useEffect(() => {
//     ; (async () => {
//       setLoading(true)
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API)
//         setSubLinks(res.data.data)
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)
//       }
//       setLoading(false)
//     })()
//   }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* /// Logo */}
        <Link to="/">
          {/* <img src={logo} alt="Logo" width={160} height={32} loading="lazy" /> */}
        </Link>
        {/* /// Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                        }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      {/* /// group used to apply changes on hovering */}

                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        {/* /// Diamond shaped div to make the dropdown shape is the following div */}

                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          /// 'loading' is true, then show 'Loading' message otherwise show the sublinks as Catalog categories

                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  /// the following is the entire route where the user is directed

                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                  {/* ///Name of the sublinks are displayed   */}

                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (

                  /// Other options than Catalog option(send to link.path) :
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path) /// Clicked option is turned to yellow
                          ? "text-yellow-25"
                          : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
          {/* Login / Signup / Dashboard:
        We need data of user is logged in or not -> token needed, 
        Cart items needed -> state management -> Redux slices
        const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart) */}
        <div className="hidden items-center gap-x-4 md:flex">
          {/* {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && ( //? ACCOUNT_TYPE from utils/constants file(cart icon for instructor is baseless) */}
       
            // <Link to="/dashboard/cart" className="relative">
              {/* <AiOutlineShoppingCart className="text-2xl text-richblack-100" />   */}
              {/* //? obtained from React icons  */}
              {/* {totalItems > 0 && (  
                // ? if total Items are more than 0, then only it is displayed 
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )} */}
            // </Link>
          {/* )} */}
         <Link to = '/dashboard/leaderboard'>
         <div className="text-white flex bg-yellow-500 px-2 py-2 rounded-lg">
<button>{`XP: ${XP}`}</button>
          </div>
         </Link>
          {token === null && (  //? if user is logged out, then login button is shown
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (  //? if user is logged out, then signup button is shown
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}  
          {/* //? if user exists, profile dropdown is shown to user where he can access his profile data */}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default Navbar

//? Custom hook(ref) can be used to close the Profile dropdown menu when we create something outside 