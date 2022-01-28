import React, {useState} from "react";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";


//Creat context ..exported default
//------------------------------------------------------------------\\
const GlobalContext = React.createContext();



//CONTEXT WRAPPER...... .. to be inserted in Index.js or App.js
//------------------------------------------------------------------\\
export const ContextProvider = (props) => {

  // Set user (name) and token
  const [user, setUsername] = useState(Cookies.get("userName") || null);
  const [token, setToken] = useState(Cookies.get("Token") || null);
  const [searchStr, setSearchStr] = useState("");

  //Stripe use
const stripePromise = loadStripe(
  "pk_test_51JwQhQK1j5J3n5GuQS37xs3Vtobtqov7ByDU98UdzRfgl8yqxImWxX17sujBZ1jmsZMp0mYgi0hpKFJCYcj7f14V00M7hqvQ7t"
);

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



    return <GlobalContext.Provider value={{user, setUsername, token, setToken, searchStr, setSearchStr, setUser, logout, stripePromise}}>{props.children}</GlobalContext.Provider>


}


export default GlobalContext;


