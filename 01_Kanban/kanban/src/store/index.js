import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    columns: [],
  },
  getters: {
    columns: state => state.columns,
  },
  mutations: {
    addColumn(state) {
      state.columns.push([]);
    },
    removeLastColumn(state) {
      state.columns.pop();
    },
    removeColumn(state, index) {
      state.columns.splice(index, 1)
    },
    addCard(state, payload) {
      const { indexColumn } = payload;
      state.columns[indexColumn].push(payload)
    },
    removeCard(state, { indexColumn, id }) {
      const index = state.columns[indexColumn].findIndex(card => card.id === id);
      state.columns[indexColumn].splice(index, 1);
    },
    sortBy(state, { type, indexColumn }) {
      if (type === "asc") {
        state.columns[indexColumn] = state.columns[indexColumn].sort((a, b) =>
          a.id < b.id ? -1 : a.id > b.id ? 1 : 0
        );
      }

      if (type === "desc") {
        state.columns[indexColumn] = state.columns[indexColumn].sort((a, b) =>
          a.id > b.id ? -1 : a.id > b.id ? 1 : 0
        );
      }
    },
  },
  actions: {},
  modules: {},
});
