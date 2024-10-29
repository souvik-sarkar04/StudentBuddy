import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home";
import "./index.css";
import VerifyEmail from "./pages/VerifyEmail";
// import {useForm} from 'react-hook-form'
function App() {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
// const form = useForm()
  // const { user } = useSelector((state) => state.profile)


  return (
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

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
            </Routes>
      </div>
    </>
  );
}

export default App;
