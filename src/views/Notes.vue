<template>
  <div class="sidebar">
    <div class="note-actions">
      <h3></h3>
      <button class="button">Delete category</button>

      <button class="button">Edit category</button>

      <div>
        <Modal>
          <template v-slot:actions>
            <input type="text" class="input" placeholder="Category title" />

            <button>Edit note</button>
          </template>

          <p>Edit note</p>
        </Modal>
      </div>
    </div>

    <div class="note-actions">
      <input type="text" placeholder="search" />
      <button>Add note</button>
    </div>

    <div>
      <Modal>
        <template v-slot:actions>
          <input type="text" class="input" placeholder="Note title" />
          <input type="text" class="input" placeholder="Note Body" />

          <div>
            <select name="tags">
              <option></option>
            </select>
          </div>

          <button>Add note</button>
        </template>

        <p>Add new note</p>
      </Modal>
    </div>

    <div class="note">
      <h4></h4>
      <div class="tags">
        <span> </span>
      </div>
      <p>...</p>
    </div>
    <i class="fas fa-arrow-left toggle-arrow"></i>
  </div>
  <div class="toggle-notesbar-on">
    <i class="fas fa-arrow-right toggle-arrow"></i>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 20em;
  height: 100%;
  background-color: #f5f7f8;
  overflow-y: auto;

  .note-actions {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;

    input {
      margin: 10px 0;
    }

    input,
    button {
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

    .tags {
      display: flex;
      flex-wrap: wrap;
    }

    span {
      margin: 10px 10px 0 0;
      padding: 5px;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>