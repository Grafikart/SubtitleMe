<style lang="scss">
  .checkbox{
    vertical-align: middle;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 22px;
    background-color: #000;
    border-radius: 22px;
    border: solid 2px rgba(#FFF, 0.4);
    transition-duration: 0.2s;

    &.is-active{
      background-color: #2AB759;
      border: solid 2px #2AB759;
    }
  }
  .checkbox__cursor{
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 22px;
    background-color: #A0A0A0;
    top: -2px;
    left: -2px;
    right: auto;
    transition-duration: 0.2s;

    .is-active &{
      background-color: #fff;
      left: 16px;
    }
  }
</style>

<template>
  <div class="checkbox" :class="{'is-active': checked}" @click="change">
    <div class="checkbox__cursor"></div>
  </div>
</template>

<script>
  export default {
    props: {
      checked: Boolean
    },
    methods: {
      change () {
        this.$emit('change', !this.checked)
      }
    }
  }
</script>
