import { Route, Routes } from "react-router-dom";
import FrontPage from "./pages/FrontPage/FrontPage";
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import BloggerDashboard from "./protectedpages/BloggerDashboard/BloggerDashboard";
// import BloggerEditProfile from "./protectedpages/BloggerEditProfile/BloggerEditProfile";

document.title = "Crumbs: blogger mapper experience";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/userhome" element={<UserHomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login/blogger/:userId" element={<BloggerDashboard />} />
        <Route
          path="/login/blogger/:userId/Upload"
          element={<BloggerDashboard />}
        />
        {/* <Route path="/login/blogger/:userId/editprofile" element={<BloggerEditProfile/>} /> */}
      </Routes>
    </>
  );
};

export default App;
