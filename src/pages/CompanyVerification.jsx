import React, { Component } from 'react';
import axios from 'axios';

class CompanyVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nip: '',
      status: null,
      loading: false,
      error: ''
    };
  }

  // Funkcja do sprawdzenia, czy NIP jest poprawny
  validateNIP = (nip) => {
    const nipRegex = /^\d{10}$/;  // NIP składa się z 10 cyfr
    return nipRegex.test(nip);
  };

  // Funkcja do sprawdzenia firmy po numerze NIP
  sprawdzFirme = async () => {
    const { nip } = this.state;

    // Walidacja numeru NIP
    if (!this.validateNIP(nip)) {
      this.setState({ error: 'NIP musi składać się z 10 cyfr.' });
      return;
    }

    this.setState({ loading: true, error: '', status: null });

    try {
      // Sprawdzenie, czy MirageJS jest włączony i przekierowanie requestu
      // const isMirageEnabled = process.env.NODE_ENV === 'development' && window.server;
      // const baseURL = isMirageEnabled 
      //   ? '/api/firmy' 
      //   : 'https://api.ceidg.gov.pl/ceidg/publiczny/firmy';

      const baseURL = 'https://cors-anywhere.herokuapp.com/https://dane.biznes.gov.pl/api/ceidg/v2/firmy';


      const response = await axios.get(`${baseURL}/${nip}`);

      if (response.status === 200) {
        const firma = response.data.firma;

        // Sprawdzanie statusu firmy i miasta
        if (firma.status === 'działająca' && firma.adres.miasto === 'Łódź') {
          this.setState({ status: 'Firma jest aktywna i zarejestrowana w Łodzi.' });
        } else if (firma.status !== 'działająca') {
          this.setState({ status: 'Firma nie jest aktywna.' });
        } else {
          this.setState({ status: 'Firma nie jest zarejestrowana w Łodzi.' });
        }
      } else {
        this.setState({ error: 'Błąd połączenia z API. Spróbuj ponownie.' });
      }
    } catch (err) {
      console.error(err);
      // Obsługa błędów związanych z zapytaniem
      if (err.response && err.response.status === 404) {
        this.setState({ error: 'Nie znaleziono firmy o podanym NIP.' });
      } else {
        this.setState({ error: 'Wystąpił błąd. Upewnij się, że numer NIP jest poprawny.' });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  // Obsługa zmiany wartości w polu NIP
  handleInputChange = (event) => {
    this.setState({ nip: event.target.value });
  };

  render() {
    const { nip, status, loading, error } = this.state;

    return (
      <div>
        <h2>Weryfikacja Firmy</h2>
        <input
          type="text"
          placeholder="Wprowadź numer NIP"
          value={nip}
          onChange={this.handleInputChange}
        />
        <button onClick={this.sprawdzFirme} disabled={loading || !nip}>
          {loading ? 'Ładowanie...' : 'Sprawdź Firmę'}
        </button>

        {status && <p>{status}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
}

export default CompanyVerification;
