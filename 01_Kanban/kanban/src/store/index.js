import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [],
  },
  getters: {
    cards: (state) => state.cards,
  },
  mutations: {
    addCard(state, payload) {
      state.cards.push(payload);
    },
    removeCard(state, payload) {
      const index = state.cards.findIndex((card) => card.id === payload);
      state.cards.splice(index, 1);
    },
  },
  actions: {},
  modules: {},
});
