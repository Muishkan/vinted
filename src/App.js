import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Product from "./pages/product";
import Header from "./components/header";
import Login from "./pages/login";
import Publish from "./pages/publish";
import Checkout from "./components/checkout";
import Footer from "./components/footer";


import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faKey,
  faSignOutAlt,
  faSignInAlt,
  faSortUp,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faBullhorn,
  faSmileWink,
  faUserPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faKey,
  faSignOutAlt,
  faSignInAlt,
  faSortUp,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faBullhorn,
  faSmileWink,
  faUserPlus,
  faShoppingCart
);



function App() {



  return (
    <div>
      <Router>
            <Header  />
            <Routes>
              <Route path="/" element={<Home  />} />
              <Route path="/user/signup" element={<Signup  />} />
              <Route path="/user/login" element={<Login  />} />
              <Route path="/offer/:id" element={<Product />} />
              <Route path="/offer/publish" element={<Publish  />} />
              <Route
                path="/offer/checkout/:id"
                element={<Checkout />}
                />
            </Routes>
            <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
