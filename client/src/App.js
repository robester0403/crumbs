import { Route, Routes } from "react-router-dom";
import './App.css';
import FrontPage from "./pages/FrontPage/FrontPage"
import UserHomePage from "./pages/UserHomePage/UserHomePage"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import BloggerDashboard from "./pages/BloggerDashboard/BloggerDashboard"
// import UserHomePage from "./pages/UserHomePage/UserHomePage"

document.title = "Crumbs: blogger mapper experience";

const App = () => {
  return (
    <>
      <main>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<FrontPage/>} />
          <Route path="/userhome" element={<UserHomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login/blogger/" element={<BloggerDashboard/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
