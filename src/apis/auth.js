import req from './https';

const auth = {
  register(params) {
    return req('post', '/register', params);
  },
  login(params) {
    return req('post', '/login', params);
  },
};

export default auth;
