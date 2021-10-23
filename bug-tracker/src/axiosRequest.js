import axios from 'axios'


export const django = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  // xsrfHeaderName: 'X-CSRFToken',
  // xsrfCookieName: 'csrftoken',
});

export default django;