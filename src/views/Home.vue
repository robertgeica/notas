<template>
  <Suspense>
    <template #default>
        <Sidebar />

    </template>
    <template #fallback>
      <span>Loading ...</span>
    </template>
  </Suspense>
</template>

<script>
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
};
</script>