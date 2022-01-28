import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import GlobalContext from "../store/context-store";

const Header = () => {

  //extract global state from context store..
  const {user, setSearchStr, logout} = useContext(GlobalContext);
  
  const navigate = useNavigate();
  //check if user is logged-in
  const handlePublish = () => {
    if (user) {
      navigate("/offer/publish");
    } else {
      navigate("/user/login", { state: { fromPublish: true } });
      // navigate("/user/login");
    }
  };

  return (
    <div className="header">
      <div className="nav">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="search-pan">
          <input
            className="search-bar"
            type="text"
            placeholder="Rechercher des articles"
            onChange={(event) => setSearchStr(event.target.value)}
          />
        </div>

        <div className="sign-in">
          <div className="login-ins">
            <Link to="/user/login" className={user ? "hide" : ""}>
              <button className="btn-login">
                Connexion || Inscription <FontAwesomeIcon icon="sign-in-alt" />
              </button>
            </Link>
            <span onClick={handlePublish}>
              <button className="btn-sale">
                Vends maintenant <FontAwesomeIcon icon="bullhorn" />
              </button>
            </span>
          </div>

          <div className={`user ${user ? "" : "hide"}`}>
            <span>
              <FontAwesomeIcon icon="smile-wink" /> Salut,{" "}
              <span className="username">{user}</span>
            </span>
            <Link to="/">
              {" "}
              <FontAwesomeIcon
                className="user"
                onClick={logout}
                icon="sign-out-alt"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
