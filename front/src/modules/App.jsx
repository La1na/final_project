import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import HomePage from "../pages/HomePage/HomePage";
import ExplorePage from "../pages/ExplorePage/ExplorePage";
import MyProfile from "../pages/MyProfilePage/MyProfilePage";
import Error from "../pages/ErrorPage/ErrorPage";
import Edit from "../pages/EditProfilePage/EditPRofilePage";
import "/src/shared/styles/styles.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/editprofile" element={<Edit />} />

      <Route path="/" element={<LoginPage />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
