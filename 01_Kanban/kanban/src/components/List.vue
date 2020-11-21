<template>
  <li :class="{ done: title === 'Concluído' }" class="container-list">
    <header class="header-list">
      <h2 class="title-task">{{ title }}</h2>
      <button v-if="title === 'Tarefas'" class="btn" type="button">
        <IconPlus />
      </button>
    </header>
    <Card />
  </li>
</template>

<script>
import IconPlus from "./IconPlus.vue";
import Card from "./Card.vue";

export default {
  components: {
    IconPlus,
    Card,
  },
  props: ["title"],
};
</script>

<style>
.container-list {
  padding: 0 15px;
  height: 100%;
  width: 100%;
}

.container-list:not(:first-child) {
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}

.header-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  margin-bottom: 30px;
}

.title-task {
  font-weight: 500;
  font-size: 16px;
  padding: 0 10px;
}

.done {
  opacity: 0.5;
}
</style>
