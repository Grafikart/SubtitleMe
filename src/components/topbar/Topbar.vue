<template>
  <div class="topbar">
    <h1 class="topbar__title">Sous-titres</h1>
    <div class="topbar__actions">
      <a class="topbar__minimize icon" @click="minimize"></a>
      <a class="topbar__maximize icon" @click="maximize"></a>
      <a class="topbar__close icon" @click="close"></a>
    </div>
  </div>
</template>

<script>
  const {ipcRenderer} = window.require('electron')

  export default {
    methods: {
      minimize () { ipcRenderer.send('minimize') },
      maximize () { ipcRenderer.send('maximize') },
      close () { ipcRenderer.send('close') }
    }
  }
</script>

<style lang="scss" src="./topbar.scss"></style>
