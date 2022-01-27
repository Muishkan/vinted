import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await axios.post(
        "https://myvintedapi.herokuapp.com/user/login",
        { email: email, password: password }
      );
      if (user.data.token) {
        setUser(user.data);
        navigate(location.state?.fromPublish ? "/offer/publish" : "/");
      }
    } catch (error) {
      console.log(error);
      setFeedback(
        `Error Code: ${error.response.status}. \n Your credentials don't match with a user account.`
      );
    }
  };

  return (
    <div className="form-pan">
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          Connexion <FontAwesomeIcon icon="sign-in-alt" />
        </div>
        <input
          className="input-txt"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          className="input-txt"
          onChange={(evt) => setPassword(evt.target.value)}
          value={password}
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
        />{" "}
        <Link to="/user/signup">
          Pas de compte? inscris-toi <FontAwesomeIcon icon="user-plus" />
        </Link>
        <p className="newsletter">{feedback}</p>
        <button type="submit" className="btn-login">
          Connexion <FontAwesomeIcon icon="sign-in-alt" />
        </button>
      </form>
    </div>
  );
};

export default Login;
