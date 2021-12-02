import { Route, Routes } from "react-router-dom";
import './App.css';
import FrontPage from "./pages/FrontPage/FrontPage"
import UserHomePage from "./pages/UserHomePage/UserHomePage"
import LogIn from "./pages/LogIn/LogIn"
import SignUp from "./pages/SignUp/SignUp"
import BloggerDashboard from "./protectedcomponents/BloggerDashboard/BloggerDashboard"
import BloggerUpload from "./protectedpages/BloggerUpload/BloggerUpload"


document.title = "Crumbs: blogger mapper experience";

const App = () => {
  return (
    <>
      <main>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<FrontPage/>} />
          <Route path="/userhome" element={<UserHomePage/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login/blogger/:userId" element={<BloggerDashboard/>} />
          <Route path="/login/blogger/Upload" element={<BloggerUpload/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
