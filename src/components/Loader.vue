<template>
  <div class="loader" v-if="isLoading">
    <div class="loader__bar"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters(['isLoading'])
  }
</script>

<style lang="scss">
  .loader{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    width: 100%;
    background: rgba(#FFFFFF, 0.1);
    z-index: 70;
  }

  .loader__bar{
    width: 20%;
    height: 2px;
    background: rgba(#FFFFFF, 0.3);
    animation: loading 1s infinite;
  }

  @keyframes loading{
    from{ transform: translateX(0); }
    to{ transform: translateX(100vw); }
  }
</style>
