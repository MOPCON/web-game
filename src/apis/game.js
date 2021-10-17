import req from './https';
import reqBlob from './download';

const game = {
  getTask(id) {
    return req('get', '/getTask/' + id);
  },
  verify(type, params) {
    return req('post', '/verify/' + type, params);
  },
  download(url) {
    return reqBlob('get', url);
  },
};

export default game;
