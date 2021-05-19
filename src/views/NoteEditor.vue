<template>
  <div id="editor">

    <input class="title" type="text" :value="this.currentNote.noteTitle">
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
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100%;
  width: 70%;
  color: #333;
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