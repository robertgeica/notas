<template>
        <Sidebar :allCategories="useCategoryState.state.allCategories" />


</template>

<script>
import { inject } from 'vue';
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
    const getCategories = () => useCategoryState.getAllCategories();


    getCategories();
    return { useCategoryState }
  }
};
</script>