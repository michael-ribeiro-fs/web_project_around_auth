import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({ email, isLoggedIn, onSignOut }) {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />
      {isLoggedIn && (
        <div className="header__user">
          <span className="header__email">{email}</span>
          <button className="header__signout" onClick={onSignOut} type="button">
            Sair
          </button>
        </div>
      )}
      {!isLoggedIn && isAuthRoute && (
        <Link
          className="header__link"
          to={location.pathname === "/signin" ? "/signup" : "/signin"}
        >
          {location.pathname === "/signin" ? "Inscrever-se" : "Entrar"}
        </Link>
      )}
    </header>
  );
}

export default Header;
