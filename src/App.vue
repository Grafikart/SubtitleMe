<template>
  <div id="app">
    <topbar></topbar>
    <dropzone></dropzone>
    <div class="view">
      <loader></loader>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Topbar from './components/topbar/Topbar'
import Loader from './components/Loader'
import Dropzone from './components/dropzone/Dropzone.vue'

export default {
  components: {
    Topbar,
    Loader,
    Dropzone
  }
}
</script>

<style lang="scss" src="./css/app.scss"></style>
