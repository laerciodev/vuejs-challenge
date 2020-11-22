<template>
  <fragment>
    <button>add column</button>
    <ul class="container-board">
      <List :title="'Tarefas'" />
    </ul>
  </fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import List from "./List.vue";
export default {
  components: {
    List,
    Fragment,
  },
  data() {
    return {
      titles: ["Tarefas", "Fazendo", "Pausado", "Concluído"],
    };
  },
};
</script>

<style>
.container-board {
  display: flex;
  padding: 30px 0;
  height: calc(100% - 80px);
}
</style>
