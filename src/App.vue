<template>
  <Home />
</template>

<script>
import Home from "./views/Home";
import useCategoryState from '@/store/useCategoryState';
import useTagState from '@/store/useTagState';
import { provide } from 'vue';

export default {
  name: "App",
  components: {
    Home,
  },
  
  setup() {
    provide('useCategoryState', useCategoryState);
    provide('useTagState', useTagState);
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
