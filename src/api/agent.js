// const API_ROOT = 'https://conduit.productionready.io/api';

// console.log("VITE_CEIDG_API_KEY w agent.js:", import.meta.env.VITE_CEIDG_API_KEY);

// const responseBody = (response) => response.data;

// const requests = {
//   post: (url, body) =>
//     fetch(`${API_ROOT}${url}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body),
//     }).then((res) => res.json()),
// };

// const Articles = {
//   create: (article) => requests.post('/articles', { article }),
// };

// const agent = {
//   Articles, // Dodajemy Articles do głównego obiektu
// };

// export default agent; // Eksportujemy domyślnie


// const API_ROOT = 'http://localhost:5000/api'; // Adres backendu

// console.log("VITE_CEIDG_API_KEY w agent.js:", import.meta.env.VITE_CEIDG_API_KEY);

// const requests = {
//   post: (url, body) =>
//     fetch(`${API_ROOT}${url}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body),
//     }).then((res) => res.json()),

//   get: (url) =>
//     fetch(`${API_ROOT}${url}`).then((res) => res.json()),
// };

// const Auth = {
//   register: (userData) => requests.post('/register', userData),
// };

// const agent = { Auth };

// export default agent;


const API_ROOT = 'http://localhost:5000/api'; // Adres backendu

console.log("VITE_CEIDG_API_KEY w agent.js:", import.meta.env.VITE_CEIDG_API_KEY);

const requests = {
  post: (url, body) =>
    fetch(`${API_ROOT}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => res.json()),

  get: (url) =>
    fetch(`${API_ROOT}${url}`).then((res) => res.json()),
};

const Auth = {
  // @ts-ignore
  message: console.log('ok'),
  register: (userData) => requests.post('/register', userData),
};

const Ads = {
  getAll: () => requests.get('/ads'), // Pobieranie ogłoszeń
  create: (adData) => requests.post('/ads', adData), // Dodawanie ogłoszenia
};

const agent = { Auth, Ads };

export default agent;