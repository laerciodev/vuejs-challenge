<template>
  <div
    :class="{ 'empty-card': content === null, 'card-over': isGrabbing }"
    draggable="true"
    @dragover.prevent
    @dragstart="dragStart($event, indexCard)"
    @dragover="dragOver"
    @dragleave="dragLeave"
    @drop="onDrop($event, indexCard)"
    class="container-card"
  >
    <header v-show="content !== null" class="header-card">
      <label class="label"></label>
      <h3>id: {{ id }}</h3>
      <button class="btn delete" @click="remove">
        <IconDelete title="remover card" />
      </button>
    </header>
    <input type="text" @blur="save" v-model.lazy="descTask" v-if="content !== null" class="content" />
    <p v-else>Adicione ou arraste um card.</p>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import IconDelete from "./IconDelete";

export default {
  components: {
    IconDelete
  },
  props: ["id", "title", "content", "indexColumn"],
  computed: {
    indexCard() {
      return this.$store.getters.columns[this.indexColumn].cards.findIndex(
        ({ id }) => id === this.id
      );
    }
  },
  data() {
    return {
      isGrabbing: false,
      descTask: this.content
    };
  },
  methods: {
    ...mapMutations(["removeCard", "reorderCards", "saveTask"]),
    save() {
      this.saveTask({ indexColumn: this.indexColumn, indexCard: this.indexCard, descTask: this.descTask });
    },

    dragStart(event, indexCard) {
      event.dataTransfer.effectAllowed = "move";
      const cardsInfo = JSON.stringify({
        indexCard,
        indexColumn: this.indexColumn
      });
      event.dataTransfer.setData("cardsInfo", cardsInfo);
    },

    dragOver() {
      this.isGrabbing = true;
    },

    dragLeave() {
      this.isGrabbing = false;
    },

    onDrop(event, indexCard) {
      event.stopPropagation();
      this.isGrabbing = false;
      const newIndex = indexCard;
      const { indexCard: oldIndex, indexColumn: oldIndexColumn } = JSON.parse(
        event.dataTransfer.getData("cardsInfo")
      );
      this.reorderCards({
        oldIndexColumn,
        newIndexColumn: this.indexColumn,
        oldIndex,
        newIndex
      });
      event.dataTransfer.clearData();
    },

    remove() {
      this.removeCard({
        id: this.id,
        indexColumn: this.indexColumn
      });
    }
  }
};
</script>

<style>
.header-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(230, 236, 245, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 20px);
  height: 30px;
}

.container-card {
  cursor: grabbing;
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
}

.content {
  font-weight: 500;
  line-height: 20px;
  margin-top: 40px;
  border: 0;
}

.label {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ff0000;
  border-radius: 50%;
}

.grabbing {
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 0;
  /* background: transparent; */
  box-shadow: none;
  cursor: grabbing;
  height: 90px;
}

.grabbing .header-card,
.grabbing .content {
  opacity: 0;
}

.btn.delete {
  background-color: transparent;
  width: 30px;
}

.empty-card {
  border: 1px dashed gray;
  background: none;
  height: 50px;
  text-align: center;
  line-height: 50px;
}

.card-over {
  border: 2px dashed gray;
}
</style>
