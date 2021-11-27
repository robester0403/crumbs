import { Route, Routes } from "react-router-dom";
import './App.css';
import FrontPage from "./pages/FrontPage/FrontPage"
// import UserHomePage from "./pages/UserHomePage/UserHomePage"

document.title = "Crumbs";

const App = () => {
  return (
    <>
      <Routes>
        {/* Landing page route */}
        <Route exact path="/" component={FrontPage} />

        {/* Stage 1: route to default map & list of reviews from foodiemamaStage 2: route to a user's specific account */}
        {/* <Route path="/userview/" component={UserHomePage} /> */}
        
      </Routes>
    </>
  );
}

export default App;
