import axios from 'axios';
import store from '../store';
import router from '../router';

const errorHandle = (status) => {
  if (status === 401) {
    store.dispatch('auth/setAuth', {
      token: '',
    });

    router.replace('/');
  }
};

var instance = axios.create({
  baseURL: process.env.VUE_APP_PROXY_URL + '/',
});

instance.interceptors.request.use(
  (config) => {
    const token = store.state.auth.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      errorHandle(response.status);
    }
    return Promise.reject(error);
  }
);

export default function (method, url, data = null) {
  method = method.toLowerCase();
  if (method === 'post') {
    return instance.post(url, data);
  } else if (method === 'get') {
    return instance.get(url, { params: data });
  } else {
    console.error('not found method: ' + method);
    return false;
  }
}
