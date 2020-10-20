import coaches from './modules/coaches/index';
import requests from './modules//requests/index';
import { createStore } from 'vuex';

const store = createStore({
  modules: {
    coach: coaches,
    req: requests,
  },
  state() {
    return {
      userId: 'c3',
    };
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
  },
});

export default store;
