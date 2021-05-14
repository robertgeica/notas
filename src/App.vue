<template>
    <Sidebar />

  <router-view/>
</template>

<script>
import Sidebar from './views/Sidebar';

export default {
  name: "App",

  methods: {

  },
  components: {
    Sidebar
  }
}
</script>
<style lang="scss">
@import url('./assets/global.scss');


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
