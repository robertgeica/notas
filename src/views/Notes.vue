<template>
  <div class="sidebar">
    <h3>{{ selectedCategory.categoryName }}</h3>

    <div class="note-actions">
      <input type="text" />
      <button>Add note</button>
    </div>

    <div :key="note" v-for="note in selectedCategory.notes" class="note">
      <h4>{{ note.noteTitle }}</h4>
      <span
        :key="tag"
        v-for="tag in note.noteTags"
        :style="{
          background: `${tag.tagColor} `,
        }"
      >
        {{ tag.tagName }}
      </span>
      <p>{{ note.noteBody.substr(0, 100) }} ...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notes",
  props: ["selectedCategory"],
  data() {
    return {};
  },
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

  .note-actions {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;

    input {
      margin: 10px 0;
    }

    input, button {
      padding: 10px 0;
      border-radius: 5px;
      border: none;
    }

    button {
      cursor: pointer;
      margin: 0 0 15px;
    }
  }

  .note {
    padding: 0 10px;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: #b6bec2;
    }

    span {
      margin: 0 10px 0 0;
      padding: 5px;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>