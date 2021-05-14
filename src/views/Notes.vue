<template>
  <div class="sidebar">
    <h3>{{ selectedCategory.categoryName }}</h3>
    
    <div class="">
      <input type="text">
    </div>

    <div :key="note" v-for="note in selectedCategory.notes" class="note">
      <h4>{{ note.noteTitle }}</h4>
      <p>{{ note.noteBody }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "Notes",
  props: ['selectedCategory'],
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 20em;
  height: 100%;
  background-color: #f5f7f8;


  .note {
    padding: 0 10px;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: #b6bec2;
    }
  }
}
</style>