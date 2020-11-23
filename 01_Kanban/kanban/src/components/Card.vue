<template>
  <div
    draggable="true"
    @dragover.prevent
    @dragstart="dragStart($event, id)"
    @dragend="dragEnd"
    @drop="onDrop($event)"
    class="container-card"
  >
    <header class="header-card">
      <label class="label"></label>
      <h3>id: {{ id }}</h3>
      <button class="btn delete" @click="remove">
        <IconDelete title="remover card" />
      </button>
    </header>
    <p class="content">{{ content }}</p>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import IconDelete from "./IconDelete";

export default {
  components: {
    IconDelete,
  },
  props: ["id", "title", "content", "indexColumn"],
  methods: {
    ...mapMutations(["removeCard"]),
    dragStart(event, id) {
      event.dataTransfer.setData("itemId", id);
    },

    dragEnd() {},

    onDrop(event) {
      console.log(this.isGrabbing);
      console.log(event.dataTransfer.getData("itemId"));
    },

    remove() {
      this.removeCard({ id: this.id, indexColumn: this.indexColumn })
    }
  },
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
  background: transparent;
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
</style>
