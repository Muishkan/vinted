import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import { useState } from "react";
import Product from "./pages/product";
import Header from "./components/header";
import Login from "./pages/login";
import Publish from "./pages/publish";
import Checkout from "./components/checkout";
import Cookies from "js-cookie";
import Footer from "./components/footer";
import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

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

//Stripe use
const stripePromise = loadStripe(
  "pk_test_51JwQhQK1j5J3n5GuQS37xs3Vtobtqov7ByDU98UdzRfgl8yqxImWxX17sujBZ1jmsZMp0mYgi0hpKFJCYcj7f14V00M7hqvQ7t"
);

function App() {
  // Set user (name) and token
  const [user, setUsername] = useState(Cookies.get("userName") || null);
  const [token, setToken] = useState(Cookies.get("Token") || null);
  const [searchStr, setSearchStr] = useState("");

  // User login handling function
  const setUser = (data) => {
    if (data.token) {
      Cookies.set("Token", data.token, { expires: 10 });
      Cookies.set("userName", data.account.username, { expires: 10 });
    } else {
      Cookies.remove("Token");
      Cookies.remove("userName");
    }
    setUsername(data.account.username);
    setToken(data.token);
  };

  //User logout handling
  const logout = (navigate) => {
    Cookies.remove("Token");
    Cookies.remove("userName");
    setToken(null);
    setUsername(null);
  };

  return (
    <div>
      <Router>
        <Header user={user} logout={logout} setSearchStr={setSearchStr} />
        <Routes>
          <Route path="/" element={<Home searchStr={searchStr} />} />
          <Route path="/user/signup" element={<Signup setUser={setUser} />} />
          <Route path="/user/login" element={<Login setUser={setUser} />} />
          <Route path="/offer/:id" element={<Product />} />
          <Route path="/offer/publish" element={<Publish token={token} />} />
          <Route
            path="/offer/checkout/:id"
            element={<Checkout stripePromise={stripePromise} />}
          />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
