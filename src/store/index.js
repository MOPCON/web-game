import { createStore } from 'vuex';
import auth from './modules/auth';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    auth,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer(val) {
        return {
          auth: val.auth,
        };
      },
    }),
  ],
});
