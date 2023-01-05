import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../Redux/user";
import airplane from '../../utils/flight.png'

import "./navbar.css";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(LOGOUT());
    navigate("/");
  };

  const handleClick = (e) => {
    navigate(`/${e.target.id}`);
  };

  return (
    <div className="container">
      <div className="navContainer">
        <img
          className="logo"
          src={airplane}
          alt="logo"
          
          onClick={() => navigate("/")}
        />
        <div className="buttons">
          {user.userName !== "undefined" && user.userName != null ? (
            <>
              {/* <button className="btn" onClick={()=>console.log(user.isAdmin)}> */}
              <button className="btn" onClick={()=> user.isAdmin ? navigate('/adminPanel') : navigate('/userPanel')}>
               My Account
              </button>
              <button className="btn" onClick={handleLogout}>
               Log Out
              </button>
            </>
          ) : (
            <>
              <button className="btn" id="signin" onClick={handleClick}>
                Sign In
              </button>
              <button className="btn" id="login" onClick={handleClick}>
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
