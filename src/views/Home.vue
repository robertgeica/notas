<template>
  <Sidebar
    :categories="categories"
    :tags="tags"
    @get-category="getSelectedCategory"
    @add-category="addNewCategory"
    @add-tag="addNewTag"
    @delete-tag="deleteTag"
  />
  <Notes
    :selectedCategory="selectedCategory"
    :tags="tags"
    @add-note="addNewNote"
    @get-note="getCurrentNote"
    @delete-category="deleteCategory"
    @edit-category="editCategory"
  />
  <NoteEditor
    :selectedCategory="selectedCategory"
    :currentNote="currentNote"
    :tags="tags"
    @delete-note="deleteNote"
    @edit-note="editNote"
    @add-tag-to-note="addTagToNote"
    @delete-tag-from-note="deleteTagNote"
  />
</template>

<script>
import Sidebar from "./Sidebar";
import Notes from "./Notes";
import NoteEditor from "./NoteEditor";

export default {
  name: "App",

  components: {
    Sidebar,
    Notes,
    NoteEditor,
  },
  data() {
    return {
      categories: [],
      tags: [],
      selectedCategory: {},
      currentNote: {},
      renderMarkdown: false,
    };
  },
  methods: {
    async getCategories() {
      const res = await fetch("http://localhost:5000/category");
      const data = await res.json();
      return data;
    },

    async getTags() {
      const res = await fetch("http://localhost:5000/tags");
      const data = await res.json();

      return data;
    },

    async getSelectedCategory(id) {
      const res = await fetch(`http://localhost:5000/category/${id}`);
      const data = await res.json();

      this.selectedCategory = await data;

      return data;
    },

    async addNewCategory(newCategoryName) {
      if (!newCategoryName) {
        alert("Add a name");
        return;
      }

      const newCategory = {
        categoryName: newCategoryName,
        notes: [],
      };

      const res = await fetch("http://localhost:5000/category", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      const data = await res.json();
      this.categories = [...this.categories, data];
      this.$swal.fire({
        icon: "success",
        title: `Category ${newCategory.categoryName} was added.`,
        timer: 500,
      });
    },

    async addNewTag(newTagObj) {
      console.log(newTagObj);
      if (!newTagObj.tagName) {
        alert("Add a tag name");
        return;
      }

      const res = await fetch("http://localhost:5000/tags", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTagObj),
      });

      const data = await res.json();
      this.tags = [...this.tags, data];
      this.$swal.fire({
        icon: "success",
        title: `Tag ${newTagObj.tagName} was added.`,
        timer: 500,
      });
    },
    getCurrentNote(note) {
      this.currentNote = note;
      this.renderMarkdown = true;
    },
    async addNewNote(category, newNote, noteTag) {
      if (!newNote.noteTitle) {
        alert("Add a title for this note");
        return;
      }

      noteTag = noteTag.split(/(?<=^\S+)\s/);
      const newTag = {
        tagName: noteTag[0],
        tagColor: noteTag[1],
      };

      newNote.noteTags = [newTag];

      const newCategory = {
        ...category,
        notes: [...category.notes, newNote],
      };

      const res = await fetch(`http://localhost:5000/category/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      const data = await res.json();
      this.selectedCategory = data;
      const allCategories = await this.getCategories();
      this.categories = allCategories;
      this.$swal.fire({
        icon: "success",
        title: `Note ${newNote.noteTitle} was added.`,
        timer: 500,
      });
    },
    async deleteCategory(id) {
      const res = await fetch(`http://localhost:5000/category/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      this.selectedCategory = {};
      const allCategories = await this.getCategories();
      this.categories = allCategories;
      this.$swal.fire({
        icon: "success",
        title: `Category was deleted.`,
        timer: 500,
      });
    },

    async deleteTag(id) {
      const res = await fetch(`http://localhost:5000/tags/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      const allTags = await this.getTags();
      this.tags = allTags;
      this.$swal.fire({
        icon: "success",
        title: `Tag was deleted.`,
        timer: 500,
      });
    },

    async deleteNote(noteTitle) {
      const categoryId = this.selectedCategory.id;
      const newCategory = {
        ...this.selectedCategory,
        notes: this.selectedCategory.notes.filter(
          (note) => note.noteTitle !== noteTitle
        ),
      };

      const res = await fetch(`http://localhost:5000/category/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      this.selectedCategory = newCategory;
      this.currentNote = {};

      const allCategories = await this.getCategories();
      this.categories = allCategories;
      this.$swal.fire({
        icon: "success",
        title: `Note was deleted.`,
        timer: 500,
      });
    },

    async editNote(category) {
      const res = await fetch(`http://localhost:5000/category/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(category),
      });
      this.$swal.fire({
        icon: "success",
        title: `Note was updated.`,
        timer: 500,
      });
    },

    async editCategory(category) {
      const res = await fetch(`http://localhost:5000/category/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(category),
      });
      this.$swal.fire({
        icon: "success",
        title: `Category was updated.`,
        timer: 500,
      });
    },

    async addTagToNote(note, category, tag) {
      tag = tag.split(/(?<=^\S+)\s/);
      const newTag = {
        tagName: tag[0],
        tagColor: tag[1],
      };

      let tagAlreadyAdded = false;
      note.noteTags.forEach((tag) => {
        if (tag.tagName === newTag.tagName) {
          tagAlreadyAdded = true;
        }
      });

      if (!tagAlreadyAdded) {
        const newNoteObj = {
          ...note,
          noteTags: [...note.noteTags, newTag],
        };

        const objIndex = category.notes.findIndex(
          (obj) => obj.noteTitle === note.noteTitle
        );

        category.notes[objIndex] = newNoteObj;
        console.log(category.notes[objIndex]);

        await fetch(`http://localhost:5000/category/${category.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(category),
        });

        this.selectedCategory = category;
        this.currentNote = newNoteObj;
      }
      this.$swal.fire({
        icon: "success",
        title: `Tag was added.`,
        timer: 500,
      });
    },
    async deleteTagNote(note, category, tag) {
      // console.log(note, category, tag)
      const newTags = note.noteTags.filter(
        (tagEl) => tagEl.tagName !== tag.tagName
      );
      const newNoteObj = {
        ...note,
        noteTags: newTags,
      };

      const objIndex = category.notes.findIndex(
        (obj) => obj.noteTitle === note.noteTitle
      );

      category.notes[objIndex] = newNoteObj;

      await fetch(`http://localhost:5000/category/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(category),
      });

      this.selectedCategory = category;
      this.currentNote = newNoteObj;
      this.$swal.fire({
        icon: "success",
        title: `Tag was deleted.`,
        timer: 500,
      });
    },
  },
  async created() {
    this.categories = await this.getCategories();
    this.tags = await this.getTags();
  },
};
</script>