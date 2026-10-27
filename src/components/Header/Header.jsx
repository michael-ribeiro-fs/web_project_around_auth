import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({ email, isLoggedIn, onSignOut }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthRoute =
    location.pathname === "/signin" || location.pathname === "/signup";

  const authLinkText =
    location.pathname === "/signin" ? "Inscrever-se" : "Faça Login";
  const authLinkTo = location.pathname === "/signin" ? "/signup" : "/signin";

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSignOutClick = () => {
    setIsMenuOpen(false);
    onSignOut();
  };

  return (
    <header className="header page__section">
      {isLoggedIn && isMenuOpen && (
        <div className="header__mobile-menu">
          <span className="header__mobile-email">{email}</span>
          <button
            className="header__mobile-signout"
            onClick={handleSignOutClick}
            type="button"
          >
            Sair
          </button>
        </div>
      )}

      <div className="header__bar">
        <img
          alt="Logotipo Around The U.S."
          className="header__logo"
          src={logo}
        />

        {isLoggedIn && (
          <div className="header__user">
            <span className="header__email">{email}</span>
            <button
              className="header__signout"
              onClick={handleSignOutClick}
              type="button"
            >
              Sair
            </button>
          </div>
        )}

        {isLoggedIn && (
          <button
            className="header__hamburger"
            onClick={toggleMenu}
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6H21M3 12H21M3 18H21"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        )}

        {!isLoggedIn && isAuthRoute && (
          <Link className="header__link" to={authLinkTo}>
            {authLinkText}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
