<template>
  <div v-if="this.currentNote.noteTitle" id="editor">
    <div class="editor-header">
      <input class="title" type="text" v-model="this.currentNote.noteTitle" />

      <span @click="$emit('edit-note', selectedCategory)"
        ><i class="far fa-save"></i
      ></span>

      <span @click="$emit('delete-note', this.currentNote.noteTitle)"
        ><i class="far fa-trash-alt"></i
      ></span>
    </div>
    <textarea v-model="this.currentNote.noteBody"></textarea>

    <div class="editor-footer">
      <div class="tags">
        <span
          :key="tag.tagName"
          v-for="tag in currentNote.noteTags"
          :style="{
            background: `${tag.tagColor} `,
          }"
          @dblclick="
            $emit(
              'delete-tag-from-note',
              this.currentNote,
              this.selectedCategory,
              tag
            )
          "
        >
          {{ tag.tagName }}
        </span>
      </div>

      <div class="actions">
        <div></div>
        <select name="tags" v-model="noteTag">
          <option
            :key="tag.tagName"
            v-for="tag in tags"
            :style="{
              background: `${tag.tagColor} `,
            }"
          >
            {{ tag.tagName }} {{ tag.tagColor }}
          </option>
        </select>

        <span
          @click="
            $emit(
              'add-tag-to-note',
              this.currentNote,
              this.selectedCategory,
              this.noteTag
            )
          "
          >+</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentNote", "selectedCategory", "tags"],
  data() {
    return {
      noteTag: {},
    };
  },
  methods: {},
};
</script>

<style lang="scss">
#editor {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100%;
  width: 70%;
  color: #333;
}

.editor-header {
  display: flex;
  background-color: #fafafa;

  input {
    width: 100%;
  }

  span {
    margin: auto 1em;
    cursor: pointer;
  }
}

.title {
  justify-content: left;
  padding-left: 0.5em;
  font-size: 16px;
  background-color: #fafafa;
  font-weight: 600;
  border-radius: 0;
  border-bottom: 1px solid grey;
  outline: none;
}

textarea {
  display: inline-block;
  height: 100%;
  width: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #fafafa;
  font-size: 14px;
  padding: 20px;
}

.editor-footer {
  display: flex;
  justify-content: space-between;

  .tags {
    display: flex;
    flex-wrap: wrap;
    span {
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
      margin: 0.5em;
    }
  }

  .actions {
    display: flex;

    span {
      padding: 5px 10px;
      border-radius: 5px;
      background-color: grey;
      cursor: pointer;
      color: #000;
      margin: auto 0.5em;
      height: 1.5em;
    }

    select {
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      margin: auto 0.5em;
      height: 2.5em;

      option {
        font-size: 16px;
      }
    }
  }
}
</style>