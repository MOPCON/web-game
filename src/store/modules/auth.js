export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    SET_AUTH(state, options) {
      state.token = options.token;
    },
  },
  actions: {
    setAuth(context, options) {
      context.commit('SET_AUTH', {
        token: options.token,
      });
    },
  },
};
