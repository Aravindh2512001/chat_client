// import { useEffect } from 'react';
// import apiClient from './apiInstance';

// const Interceptor = ({ children }) => {
//   useEffect(() => {
//     const responseInterceptor = apiClient.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401) {
//           console.error('Unauthorized! Redirecting to login...');
//           window.location.href = '/login';  
//         }
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup interceptors on unmount
//     return () => {
//       apiClient.interceptors.response.eject(responseInterceptor);
//     };
//   }, []);

//   return children;
// };

// export default Interceptor;
