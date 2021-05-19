<template>
  <div id="editor">
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

<style>
#editor {
  margin: 0;
  height: 100%;
  width: 70%;
  color: #333;
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