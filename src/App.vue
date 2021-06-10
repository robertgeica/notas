<template>
  <Home />
</template>

<script>
import { provide } from 'vue';
import { DefaultApolloClient } from "@vue/apollo-composable";
import useCategoryState from '@/store/useCategoryState';
import useTagState from '@/store/useTagState';
import useNoteState from '@/store/useNoteState';
import Home from "./views/Home";
import apolloClient from './apollo-server';

export default {
  name: "App",
  components: {
    Home,
  },
  
  setup() {
    provide(DefaultApolloClient, apolloClient);
    provide('useCategoryState', useCategoryState);
    provide('useTagState', useTagState);
    provide('useNoteState', useNoteState);
  },
};
</script>
<style lang="scss">
@import url("./assets/global.scss");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100%;
}
</style>
