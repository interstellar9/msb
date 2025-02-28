const API_ROOT = 'https://conduit.productionready.io/api';

console.log("VITE_CEIDG_API_KEY w agent.js:", import.meta.env.VITE_CEIDG_API_KEY);

const responseBody = (response) => response.data;

const requests = {
  post: (url, body) =>
    fetch(`${API_ROOT}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => res.json()),
};

const Articles = {
  create: (article) => requests.post('/articles', { article }),
};

const agent = {
  Articles, // Dodajemy Articles do głównego obiektu
};

export default agent; // Eksportujemy domyślnie
