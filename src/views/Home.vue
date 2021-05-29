<template>
  <Sidebar :allCategories="useCategoryState.state.allCategories" :allTags="useTagState.state.allTags" />
</template>

<script>
import { inject } from "vue";
import Sidebar from "./Sidebar";
import Notes from "./Notes";
import NoteEditor from "./NoteEditor";

export default {
  name: "Home",

  components: {
    Sidebar,
    Notes,
    NoteEditor,
  },

  setup() {
    const useCategoryState = inject("useCategoryState");
    const useTagState = inject("useTagState");
    const getCategories = () => useCategoryState.getAllCategories();
    const getTags = () => useTagState.getAllTags();

    getCategories();
    getTags();
    return { useCategoryState, useTagState };
  },
};
</script>