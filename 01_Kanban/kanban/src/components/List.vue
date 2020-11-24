<template>
  <li class="container-list">
    <div class="container-border">
      <button @click="removeColumn(indexColumn)" class="btn remove-column">
        <IconChess />
      </button>
      <header class="header-list">
        <button @click="createCard" class="btn" type="button">
          <IconPlus />
        </button>
        <button class="btn" @click="sortBy({ type: 'asc', indexColumn })">
          <IconSortAsc />
        </button>
        <button class="btn" @click="sortBy({ type: 'desc', indexColumn })">
          <IconSortDesc />
        </button>
      </header>
      <ul v-if="columns[indexColumn].length > 0" class="container-cards">
        <li v-for="card in columns[indexColumn]" :key="card.id">
          <Card
            :id="card.id"
            :title="card.title"
            :content="card.content"
            :indexColumn="indexColumn"
          />
        </li>
      </ul>
      <div v-else>Adicione um card.</div>
    </div>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import Card from "./Card.vue";
import IconSortAsc from "./IconSortAsc.vue";
import IconSortDesc from "./IconSortDesc.vue";
import IconPlus from "./IconPlus.vue";
import IconChess from "./IconChess.vue";

export default {
  components: {
    IconPlus,
    IconChess,
    IconSortAsc,
    IconSortDesc,
    Card
  },
  props: ["index", "indexColumn"],
  data() {
    return {
      columns: this.$store.getters.columns
    };
  },
  methods: {
    ...mapMutations(["addCard", "sortBy", "removeColumn"]),
    createCard() {
      const cardId = this.generateId();
      this.addCard({
        id: cardId,
        indexColumn: this.indexColumn,
        indexCard: this.columns[this.indexColumn].length,
        title: "Digite uma tarefa",
        content: "Descrição da tarefa"
      });
    },
    generateId() {
      let id = "";
      const possible = "1234567890";

      for (let i = 0; i < 12; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));

      return id;
    }
  }
};
</script>

<style>
.container-list {
  padding: 0 15px;
  height: 100%;
  width: 100%;
  max-width: 300px;
}

.container-border {
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
}

.container-list:not(:first-child) {
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}

.header-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 42px;
  margin-bottom: 30px;
}

.title-task {
  font-weight: 500;
  font-size: 16px;
  padding: 0 10px;
}

.btn.remove-column {
  margin-left: auto;
  background-color: transparent;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.sort-icon {
  fill: #fff;
  width: 20px;
}
</style>
