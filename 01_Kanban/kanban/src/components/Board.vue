<template>
  <ul class="container-board">
    <List :title="'Tarefas'" />
  </ul>
</template>

<script>
import List from "./List.vue";
export default {
  components: {
    List,
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
