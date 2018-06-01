<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app {
    width: 100%;
    min-height: 100%;
    position: absolute;
    overflow: hidden;
    background: #f1f1f1;
  }
</style>
