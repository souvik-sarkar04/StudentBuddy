import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

// import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation() /// to apply yellow text to clicked option in Sidebar
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }
  //? Caution : function name should not be same as in-built function of JS or React, in that case, recursion takes space -> Error of maximum call stack size exceeded

  return (
    <NavLink
      to={link.path}
      onClick = {() =>  console.log(`We are clicking on ${link.path}`)}
    //   onClick={() => dispatch(resetCourseState())}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      {/* <div className="text-white">hi</div> */}
      {/* /// Left side border - show when link is clicked */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}