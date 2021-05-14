<template>
  <Sidebar :categories="categories" :tags="tags" @get-category="getSelectedCategory" />
  <Notes :selectedCategory="selectedCategory" />
</template>

<script>
import Sidebar from "./Sidebar";
import Notes from "./Notes";

export default {
  name: "App",

  components: {
    Sidebar,
    Notes,
  },
  data() {
    return {
      categories: [],
      tags: [],
      selectedCategory: {},
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
  },
  async created() {
    this.categories = await this.getCategories();
    this.tags = await this.getTags();
  },
};
</script>