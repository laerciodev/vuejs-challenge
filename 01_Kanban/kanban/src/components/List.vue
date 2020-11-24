<template>
  <li class="container-list">
    <div
      draggable="true"
      @dragover.prevent
      @dragstart="dragStart($event, indexColumn)"
      @dragend="dragEnd"
      @drop="onDrop($event, indexColumn)"
      class="container-border"
    >
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
      <ul v-if="cards.length > 0" class="container-cards">
        <li v-for="card in cards" :key="card.id">
          <Card
            :id="card.id"
            :title="card.title"
            :content="card.content"
            :indexColumn="indexColumn"
          />
        </li>
      </ul>
      <li v-else>
        <Card
          :id="null"
          :title="null"
          :content="null"
          :indexColumn="indexColumn"
        />
      </li>
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
import generateId from "@/helpers/generate_id";

export default {
  components: {
    IconPlus,
    IconChess,
    IconSortAsc,
    IconSortDesc,
    Card
  },
  props: ["cards", "id"],
  computed: {
    indexColumn() {
      return this.$store.getters.columns.findIndex(({ id }) => id === this.id);
    }
  },
  data() {
    return {
      isGrabbing: false
    };
  },
  methods: {
    ...mapMutations(["addCard", "sortBy", "removeColumn", "reorderColumns"]),
    createCard() {
      this.addCard({
        id: generateId(),
        indexColumn: this.indexColumn,
        title: "Digite uma tarefa",
        content: "Descrição da tarefa"
      });
    },

    dragStart(event, indexColumn) {
      event.dataTransfer.setData("indexColumn", indexColumn);
    },

    dragEnd() {},

    onDrop(event, indexColumn) {
      this.isGrabbing = true;
      const newIndex = indexColumn;
      const oldIndex = event.dataTransfer.getData("indexColumn");
      this.reorderColumns({
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
