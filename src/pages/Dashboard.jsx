import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useRef } from "react"
import Sidebar from "../components/core/Dashboard/Sidebar"
import { useForm } from "react-hook-form"
function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  // console.log(profileLoading)
  const { loading: authLoading } = useSelector((state) => state.auth)
// const ref = useRef(null)
// const {register} = useForm()
  if (profileLoading || authLoading) {
    /// Add spinner(Loading...) if loading is taking place 
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard