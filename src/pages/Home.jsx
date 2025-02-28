import classNames from 'classnames'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'  // Importujemy NavLink
// import { PopularTags } from '../components'
import { useAuth } from '../hooks'

const initialFilters = { tag: '', offset: null, feed: false }

function Home() {
  const { isAuth } = useAuth() // Hook do sprawdzania statusu logowania
  const [, setFilters ] = React.useState({ ...initialFilters, feed: isAuth })

  React.useEffect(() => {
    setFilters({ ...initialFilters, feed: isAuth })
  }, [isAuth])

  // function onTagClick(tag) {
  //   setFilters({ ...initialFilters, tag })
  // }

  return (
    <div className="home-page">
      {/* Banner */}
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">Miejska Sieć Biznesowa</h1>
          <p>Dla biznesu, dla mieszkańców, dla miasta</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          {/* Główna sekcja z artykułami */}
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isAuth && (
                  <li className="nav-item">
                    <button type="button" className={classNames('nav-link')}>
                      Pierwsza zakładka
                    </button>
                  </li>
                )}
                {isAuth && (
                  <li className="nav-item">
                    <button type="button" className={classNames('nav-link')}>
                      Druga zakładka
                    </button>
                  </li>
                )}
                {isAuth && (
                  <li className="nav-item">
                    <button type="button" className={classNames('nav-link')}>
                      Trzecia zakładka
                    </button>
                  </li>
                )}
              </ul>
            </div>
            {/* Możesz umieścić <ArticleList filters={filters} /> */}
          </div>

          {/* Sekcja z popularnymi tagami */}
          {/* <div className="col-md-3">
            <PopularTags onTagClick={onTagClick} />
          </div> */}
        </div>

        {/* Sekcja logowania/rejestracji */}
        {!isAuth && (
          <div className="login-section">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel orci sit amet urna convallis varius sit amet non nisi. Nulla facilisi. Sed euismod dui magna, a tempor lorem scelerisque nec.
            </p>
            <div className="auth-buttons">
              {/* Przycisk logowania */}
              <NavLink to="/login" className="btn btn-primary">
                Zaloguj się
              </NavLink>
              {/* Przycisk rejestracji */}
              <NavLink to="/terms" className="btn btn-secondary">
                Zarejestruj się
              </NavLink>
              {/* Odnośnik do regulaminu */}
              <p>
                <Link to="/terms" className="text-muted">Przeczytaj nasz regulamin</Link>
              </p>
            </div>
          </div>
        )}

        {/* Pusta sekcja z linkami */}
        <div className="links-section">
          <p>Partnerzy</p>
          <a href="#" className="link-item">Link 1</a>
          <a href="#" className="link-item">Link 2</a>
          <a href="#" className="link-item">Link 3</a>
          <a href="#" className="link-item">Link 4</a>
        </div>
      </div>
    </div>
  )
}

export default Home
