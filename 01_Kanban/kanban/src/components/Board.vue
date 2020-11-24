<template>
  <fragment>
    <button class="btn add-column" v-show="columns.length < 4" @click="addColumn">adicionar coluna</button>
    <button class="btn remove-last-column" v-show="columns.length >= 4" @click="removeLastColumn">
      remover coluna
    </button>
    <ul class="container-board">
      <List
        v-for="column in columns"
        :key="column.id"
        :cards="column.cards"
        :id="column.id"
      />
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
    Fragment
  },
  data() {
    return {
      columns: this.$store.getters.columns
    };
  },
  methods: {
    ...mapMutations(["addColumn", "removeLastColumn"]),
    dragStart(event, indexCard) {
      event.dataTransfer.setData("cardId", indexCard);
    },

    dragEnd() {},

    onDrop(event, indexCard) {
      const newIndex = indexCard;
      const oldIndex = event.dataTransfer.getData("cardId");
      this.reorderCards({
        indexColumn: this.indexColumn,
        oldIndex,
        newIndex
      });
      event.dataTransfer.clearData();
    }
  }
};
</script>

<style>
.container-board {
  display: flex;
  padding: 30px 0;
  height: calc(100% - 80px);
}

.btn.add-column,
.btn.remove-last-column {
  margin: 20px;
  border-radius: 20px;
  color: #fff;
  text-transform: uppercase;
  width: 200px;
}
</style>
