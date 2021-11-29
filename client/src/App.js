import { Route, Routes } from "react-router-dom";
import './App.css';
import FrontPage from "./pages/FrontPage/FrontPage"
import UserHomePage from "./pages/UserHomePage/UserHomePage"
// import UserHomePage from "./pages/UserHomePage/UserHomePage"

document.title = "Crumbs: blogger mapper experience";

const App = () => {
  return (
    <>
      <main>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<FrontPage/>} />

          {/* Stage 1: route to default map & list of reviews from foodiemamaStage 2: route to a user's specific account */}
          <Route path="/userhome/" element={<UserHomePage/>} />
          
        </Routes>
      </main>
    </>
  );
}

export default App;
