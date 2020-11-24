import Vue from "vue";
import Vuex from "vuex";
import moveInArray from "@/helpers/array";
import generateId from '@/helpers/generate_id';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    columns: []
  },

  getters: {
    columns: state => state.columns
  },

  mutations: {
    addColumn(state) {
      state.columns.push({ id: generateId(), cards: [] });
    },

    removeLastColumn(state) {
      state.columns.pop();
    },

    removeColumn(state, index) {
      state.columns.splice(index, 1);
    },

    addCard(state, payload) {
      const { indexColumn } = payload;
      state.columns[indexColumn].cards.push(payload);
    },

    removeCard(state, { indexColumn, id }) {
      const index = state.columns[indexColumn].cards.findIndex(
        card => card.id === id
      );
      state.columns[indexColumn].cards.splice(index, 1);
    },

    sortBy(state, { type, indexColumn }) {
      if (type === "asc") {
        state.columns[indexColumn].cards = state.columns[indexColumn].cards.sort((a, b) =>
          a.id < b.id ? -1 : a.id > b.id ? 1 : 0
        );
      }

      if (type === "desc") {
        state.columns[indexColumn].cards = state.columns[indexColumn].cards.sort((a, b) =>
          a.id > b.id ? -1 : a.id > b.id ? 1 : 0
        );
      }
    },

    reorderCards(state, payload) {
      let { oldIndex } = payload;
      const { newIndex, indexColumn } = payload;
      oldIndex = parseInt(oldIndex, 10);

      moveInArray(state.columns[indexColumn].cards, oldIndex, newIndex);
    },

    reorderColumns(state, payload) {
      let { oldIndex } = payload;
      const { newIndex } = payload;
      oldIndex = parseInt(oldIndex, 10);
      moveInArray(state.columns, oldIndex, newIndex);
    }
  },
  actions: {},
  modules: {}
});
