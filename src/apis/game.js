import req from './https';

const game = {
  getTask(id) {
    return req('get', '/getTask/' + id);
  },
  verify(type, params) {
    return req('post', '/verify/' + type, params);
  },
};

export default game;
