import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importujemy useNavigate

const Terms = () => {
  const [isChecked, setIsChecked] = useState(false);  // Stan dla checkboxa
  const navigate = useNavigate();  // Hook do nawigacji

  // Funkcja obsługująca zmianę stanu checkboxa
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // Funkcja obsługująca kliknięcie przycisku "Continue"
  const handleContinue = () => {
    if (isChecked) {
      navigate('/register');  // Po zaakceptowaniu, przekierowanie do /dashboard
    }
  };

  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-12">
          <h1>Terms and Conditions</h1>
          <p>Please read the following terms and conditions carefully.</p>

          {/* Treść regulaminu */}
          <div className="terms-content">
            <h3>1. Introduction</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula nisl at nisi pretium, non
              volutpat felis pharetra. Nulla facilisi. Vivamus nec nulla orci. Vestibulum ante ipsum primis in faucibus
              orci luctus et ultrices posuere cubilia curae; Curabitur luctus suscipit nulla, vel ullamcorper nunc
              vehicula id. Vivamus vitae mi neque. Aenean nec nisi in risus fermentum vestibulum. Suspendisse potenti.
            </p>

            <h3>2. Usage</h3>
            <p>
              Duis et odio non leo posuere gravida. Integer maximus ligula at tincidunt scelerisque. Etiam
              scelerisque, nisl eget malesuada varius, urna felis vestibulum risus, ac lobortis lectus augue a augue.
              Nunc lacinia, turpis at efficitur mollis, libero orci tristique eros, non malesuada turpis purus vel risus.
            </p>

            <h3>3. Privacy Policy</h3>
            <p>
              Integer euismod, lectus ac scelerisque aliquam, purus sem tincidunt velit, id eleifend augue libero sit
              amet lorem. Nullam a tortor quis nunc convallis malesuada. Fusce suscipit neque quis mauris interdum, eu
              egestas mi feugiat. Sed tristique eros in turpis pharetra malesuada.
            </p>

            {/* Checkbox z akceptacją regulaminu */}
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <p>I have read and agree to the Terms and Conditions</p>
                <p>* Zatwierdzenie regulaminu jest wymagane, aby kontynuować rejestrację</p>
              </label>
            </div>

            {/* Przycisk kontynuacji - aktywny tylko po zaznaczeniu checkboxa */}
            <button
              className="btn btn-primary"
              onClick={handleContinue}
              disabled={!isChecked}  // Przycisk zablokowany, dopóki checkbox nie jest zaznaczony
            >
              Zarejestruj się
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
