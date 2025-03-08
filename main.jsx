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
import axios from 'axios'
import App from './App'

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

// Zakomentowane fragmenty dotyczące MirageJS
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

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} containerElement="div" />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
