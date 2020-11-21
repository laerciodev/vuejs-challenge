<template>
  <li :class="{ done: title === 'Concluído' }" class="container-list">
    <header class="header-list">
      <h2 class="title-task">{{ title }}</h2>
      <button
        @click="createCard"
        v-if="title === 'Tarefas'"
        class="btn"
        type="button"
      >
        <IconPlus />
      </button>
    </header>
    <ul v-if="cards.length > 0" class="container-cards">
      <li v-for="card in cards" :key="card.id">
        <Card :id="card.id" :title="card.title" :content="card.content" />
      </li>
    </ul>
    <div v-else>Adicione um card.</div>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import IconPlus from "./IconPlus.vue";
import Card from "./Card.vue";

export default {
  components: {
    IconPlus,
    Card,
  },
  props: ["title"],
  data() {
    return {
      cards: this.$store.getters.cards,
    };
  },
  methods: {
    ...mapMutations(["addCard"]),
    createCard() {
      const cardId = this.generateId();
      this.addCard({
        id: cardId,
        title: "Digite uma tarefa",
        content: "Descrição da tarefa",
      });
    },

    generateId() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    },
  },
};
</script>

<style>
.container-list {
  padding: 0 15px;
  height: 100%;
  width: 100%;
  max-width: 300px;
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
</style>
