import req from './https';

const auth = {
  register(params) {
    return req('post', '/register', params);
  },
  login(params) {
    return req('post', '/login', params);
  },
  me() {
    return req('get', '/me');
  },
};

export default auth;
