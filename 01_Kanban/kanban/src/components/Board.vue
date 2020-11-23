<template>
  <fragment>
    <button v-show="columns.length < 4" @click="addColumn">add column</button>
    <button v-show="columns.length >= 4" @click="removeLastColumn">remove last column</button>
    <ul v-if="columns.length > 0" class="container-board">
      <List v-for="(item, index) in columns" :indexColumn="index" :key="index" />
    </ul>
  </fragment>
</template>

<script>
import { mapMutations } from "vuex";
import { Fragment } from "vue-fragment";
import List from "./List.vue";
export default {
  components: {
    List,
    Fragment,
  },
  data() {
    return {
      columns: this.$store.getters.columns,
    }
  },
  methods: {
    ...mapMutations(["addColumn", "removeLastColumn"]),
    generateId() {
      let id = "";
      const possible = "1234567890";

      for (let i = 0; i < 12; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));

      return id;
    },
  }
}
</script>

<style>
.container-board {
  display: flex;
  padding: 30px 0;
  height: calc(100% - 80px);
}
</style>
