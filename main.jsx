// import React from 'react'
// import ReactDOM from 'react-dom'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
// import { createServer } from 'miragejs'
// import axios from 'axios'
// import App from './App'
// import makeServer from './server'

// // if (process.env.NODE_ENV === 'development') { // changed from 'production' by Marcela Gladys 18th Feb
// //   //axios.defaults.baseURL = 'https://api.realworld.io/api' // commented by Marcela Gladys 18th Feb
// //   console.log('Aplikacja działa w trybie deweloperskim'); // added by Marcela Gladys 18th Feb
// // }


// if (process.env.NODE_ENV === 'development') {
//   import('./server').then(() => {
//     console.log('MirageJS jest włączone');
//   });
// }




// const defaultQueryFn = async ({ queryKey }) => {
//   const { data } = await axios.get(queryKey[0], { params: queryKey[1] })
//   return data
// }

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       queryFn: defaultQueryFn,
//       staleTime: 300000,
//     },
//   },
// })

// if (window.Cypress && process.env.NODE_ENV === 'test') {
//   const cyServer = createServer({
//     routes() {
//       ;['get', 'put', 'patch', 'post', 'delete'].forEach((method) => {
//         this[method]('/*', (schema, request) => window.handleFromCypress(request))
//       })
//     },
//   })
//   cyServer.logging = false
// } else if(process.env.NODE_ENV === 'development') {
//   makeServer({ environment: 'development' })
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//       <ReactQueryDevtools initialIsOpen={false} containerElement="div" />
//     </QueryClientProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// )

import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
//import { createServer } from 'miragejs'
import axios from 'axios'
import App from './App'
//import makeServer from './server'

// // Sprawdzenie trybu deweloperskiego
// if (process.env.NODE_ENV === 'development') {
//   console.log('Aplikacja działa w trybie deweloperskim');

//   // Uruchomienie MirageJS tylko w trybie development
//   makeServer({ environment: 'development' });

  // Opcjonalnie można ustawić bazowy URL dla axios (jeśli potrzebne)
  // axios.defaults.baseURL = 'https://api.testowe.pl/api'
//}

// Domyślna funkcja pobierania danych dla react-query
const defaultQueryFn = async ({ queryKey }) => {
  try {
    const { data } = await axios.get(queryKey[0], { params: queryKey[1] });
    return data;
  } catch (error) {
    console.error('Błąd pobierania danych z API:', error);
    throw error;
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 300000, // Cache na 5 minut
    },
  },
});

// MirageJS dla Cypressa w trybie testowym
// if (window.Cypress && process.env.NODE_ENV === 'test') {
//   const cyServer = createServer({
//     routes() {
//       ['get', 'put', 'patch', 'post', 'delete'].forEach((method) => {
//         this[method]('/*', (schema, request) => window.handleFromCypress(request));
//       });
//     },
//   });
//   cyServer.logging = false;
// }



// MirageJS dla Cypressa w trybie testowym
if (window.Cypress && process.env.NODE_ENV === 'test') {
  // Jeśli testy z Cypressem są używane, można dodać mockowanie zapytań
  // Można to zrobić, jeśli jest taka potrzeba
}


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} containerElement="div" />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
