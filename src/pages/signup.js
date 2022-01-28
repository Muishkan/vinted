import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GlobalContext from "../store/context-store";


const Signup = () => {

//extract setUser function from context store
  const {setUser} = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setNewUserName] = useState("");
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      if (password.length < 6 || phone.length < 6 || password !== password2) {
        setFeedback(
          "OOOOPS... Minimum password and phone length 8..Fill all fields.. Both passwords must match. .."
        );
      } else {
        const user = await axios.post(
          "https://mymarvelapi.herokuapp.com/user/signup",
          {
            email: email,
            username: userName,
            phone: phone,
            password: password,
          }
        );
        if (user.data.token) {
          setUser(user.data);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setFeedback(
        `Error Code: ${error.response.status}. \n OOOOPSSS.. Something went wrong on the server side.`
      );
    }
  };

  return (
    <div className="form-pan">
      <form onSubmit={handleSignup} className="login-form" action="">
        <div>
          S'inscrire <FontAwesomeIcon icon="user-plus" />
        </div>
        <input
          onChange={(evt) => setEmail(evt.target.value)}
          className="input-txt"
          required
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          onChange={(evt) => setNewUserName(evt.target.value)}
          required
          className="input-txt"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
        <input
          onChange={(evt) => setPhone(evt.target.value)}
          required
          minLength="8"
          className="input-txt"
          type="phone"
          name="phone"
          id="phone"
          placeholder="Téléphone"
        />
        <input
          onChange={(evt) => setPassword(evt.target.value)}
          required
          minLength="8"
          className="input-txt"
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
        />
        <input
          onChange={(evt) => setPassword2(evt.target.value)}
          required
          minLength="8"
          className="input-txt"
          type="password"
          name="password2"
          id="password2"
          placeholder="Confirmer votre mot de passe"
        />
        <div className="newsletter">
          <p>{feedback}</p>
        </div>

        <button className="btn-login">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
