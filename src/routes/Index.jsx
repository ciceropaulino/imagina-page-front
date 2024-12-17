import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import PeopleView from "../pages/people/PeopleView";
import Contact from "../pages/contact/Contact";
import NotFound from "../pages/not_found/NotFound";


const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/people" element={<PeopleView />} />
        <Route path="/contact" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};


export default PageRoutes;

