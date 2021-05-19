<template>
  <div id="editor">
    <div class="editor-header">
      <input class="title" type="text" :value="this.currentNote.noteTitle">

      <span @click="$emit('delete-note', this.currentNote.noteTitle)"><i class="fas fa-trash-alt"></i></span>
    </div>
    <textarea :value="this.currentNote.noteBody"></textarea>
  </div>
</template>

<script>
export default {
  props: ["currentNote"],
  data() {
    return {
    };
  },
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
  padding-left: .5em;
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


</style>