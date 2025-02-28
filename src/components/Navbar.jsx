import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

function Navbar() {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/" end>
          MSB
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>
          </li>
          {isAuth ? (
            <>
              <li className="nav-item">
                <NavLink to="/add-announcement" className="nav-link">
                  <i className="ion-compose"></i> Dodaj ogłoszenie
                </NavLink>
              </li>
              <li className="nav-item dropdown" ref={dropdownRef}>
                <button className="nav-link" onClick={() => setIsOpen(!isOpen)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                  Mój profil
                </button>
                {isOpen && (
                  <ul className="dropdown-menu" style={{ display: 'block', position: 'absolute', background: '#fff', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', borderRadius: '4px', padding: '10px', listStyle: 'none' }}>
                    <li><button className="dropdown-item" onClick={() => navigate('/settings')}>Ustawienia</button></li>
                    <li><button className="dropdown-item" onClick={() => navigate('/history')}>Historia ogłoszeń</button></li>
                    <li><button className="dropdown-item" onClick={() => navigate('/profile')}>Moje dane</button></li>
                    {/* <li><button className="dropdown-item" onClick={handleLogout}>Wyloguj</button></li> */}
                  </ul>
                )}
              </li>
              <li className="nav-item">
                 <button className="nav-link btn btn-link" onClick={handleLogout}>
                   Wyloguj
                 </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Logowanie
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Rejestracja
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;


