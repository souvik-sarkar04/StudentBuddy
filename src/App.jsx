import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home";
// import "./index.css";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard"
// import MyProfile from "./components/core/Dashboard/MyProfile"
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings"
import EnrolledCourses from "./components/core/Dashboard/Classes/EnrolledCourses";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import AddCourse from "./components/core/Dashboard/AddCourse";
import Navbar from "./components/common/Navbar";
// import MyCourses from "./components/core/Dashboard/MyCourses";
import { useForm } from 'react-hook-form'
import MyGroups from "./components/core/Dashboard/MyGroups";
import ChallengePage from "./pages/ChallengePage";
import RewardsPage from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import Mentee from "./components/core/Dashboard/Mentees/Mentee";
import MyMentees from "./components/core/Dashboard/MyMentees";
// import Classshedule from "./pages/Deadlines";
import MainPage from "./pages/MainPage";
import Assignment from "./pages/Assignment";
import Deadlines from "./pages/Deadlines"
function App() {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const form = useForm()
  // const { user } = useSelector((state) => state.profile)


  return (
    <>
      {/*  bg-richblack-900 */}
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="signup"
            element={
              // <OpenRoute>
              <Signup />
              // </OpenRoute>
            }
          />
          <Route
            path="login"
            element={
              // <OpenRoute>
              <Login />
              // </OpenRoute>
            }
          />
          <Route
            path="verify-email"
            element={
              // <OpenRoute>
              <VerifyEmail />
              // </OpenRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <Dashboard />
            }
          >
            <Route path="my-profile" element={<MyProfile />} />

            <Route path="settings" element={<Settings />} />


            <Route path="enrolled-classes" element={<EnrolledCourses />} />


            <Route path="instructor" element={<Instructor />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="my-groups" element={<MyGroups />} />
            <Route path="my-challenges" element={<ChallengePage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="mentees" element={<MyMentees />} />
            <Route path="class-deadlines" element={<Deadlines />} />
            <Route path="deadlines" element={<MainPage />} />
            <Route path="assignments" element={<Assignment />} />
            {/* <Route path="my-courses" element={<MyCourses />} /> */}

          </Route>


          {/* <Route>
            <Route
            path="dashboard"
              element={
                // ! Change 1
                // <PrivateRoute>
                <Dashboard />
                // </PrivateRoute>
              }
            >
              <Route path="my-profile" element={<MyProfile />} />

              <Route path="settings" element={<Settings />} />


              <Route path="enrolled-courses" element={<EnrolledCourses />} />


              <Route path="instructor" element={<Instructor />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />

            </Route>
            </Route> */}
          {/* react-dropzone  video-react bar chart chart2 otp */}
        </Routes>
      </div>
    </>
  );
}

export default App;
