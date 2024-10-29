import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
// import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../api"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      console.log("SENDOTP API ERROR............", error.message)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...") //? Shows a loading notification
    dispatch(setLoading(true))  //? Updates state to show a loading indicator

    try {
      //? Sends the signup request to the backend using API POST call

      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      //? If the signup was unsuccessful, throws an error

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      //? Signup is successful

      toast.success("Signup Successful") //? Shows success notification
      navigate("/login") //? Redirects the user to the login page after successful signup
    } catch (error) {
      //? Logs the error and shows an error notification in case of failure
      console.log("First name : ", firstName)
      console.log("Last name : ", lastName)
      console.log("Email : ", email)
      console.log("Password: ", password)
      console.log("OTP : ", otp)
      toast.error("Signup Failed") //? Shows error notification
      console.log("SIGNUP API ERROR............", error)
      navigate("/signup") //? Redirects the user back to the signup page in case of failure
    }
        //? Ends loading state and removes the loading notification

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, { //? call login api in auth controllers of backend
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))

      localStorage.setItem("token", JSON.stringify(response.data.token))
          //? Error resolving : setUser(null) sets the user to null so in profile page, user is undefined as its data does not persist, hence, it is stored in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("email : ", email)
      console.log("password : ", password)
      toast.error("Login Failed")
      console.log("LOGIN API ERROR............", error)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


/*
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    // ? until backend call is not completed, show 'Loading'
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email, }) //? must be careful of the 2nd parameter
      //? in backend, resetPasswordToken() controller needs only email from request's body, hence, only {email} is passed to body

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      //? In case of success :
      toast.success("Reset Email Sent");
      setEmailSent(true); //? Show the 'Check email' page(as now emailSent = true)
    }
    catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
      //? toast.success() or toast.error() is responsible for showing pop up error message on UI
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });

      console.log("RESET Password RESPONSE ... ", response);


      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}
  */