<template>
  <div>
    <div class="subtitles">
      <transition-group name="subtitle" appear v-on:beforeEnter="beforeEnter" v-on:afterEnter="afterEnter">
        <div class="subtitle" @click="download(subtitle)" v-for="(subtitle, index) in subtitles" :key="subtitle" :data-index="index">
          <div class="subtitle__number">{{ episode(subtitle) }}</div>
          <div class="subtitle__name"><i class="icon" v-if="subtitle.exact">grade</i> {{ subtitle.name }}</div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import leftpad from 'left-pad'

  export default {
    computed: {
      ...mapGetters(['subtitles'])
    },
    methods: {
      ...mapActions(['download']),
      beforeEnter (el) {
        el.style.transitionDelay = (el.dataset.index * 0.1) + 's'
      },
      afterEnter (el) {
        el.style.transitionDelay = null
      },
      episode (subtitle) {
        console.log('==>', subtitle)
        return 'S' + leftpad(subtitle.season, 2, '0') + 'E' + leftpad(subtitle.episode, 2, '0')
      }
    }
  }
</script>

<style lang="scss">
  .dropzone__area {
    border: 1px solid #FF0000;
  }

  .subtitle-enter-active{
    transition-duration: 0.3s;
  }

  .subtitle-enter{
    opacity: 0;
    transform: translateY(20px)
  }

  .subtitle{
    cursor: pointer;
    border-bottom: 1px solid #000;
    border-top: 1px solid rgba(#FFFFFF, 0.1);
    padding: 20px 0;
    display: flex;
    align-items: center;
    &:hover{
      background-color: rgba(#FFFFFF, 0.02);
    }
    .icon{
      color: #fac536;
    }
  }

  .subtitle__number {
    opacity: 0.5;
    font-weight: bold;
    font-size: 1.2em;
    padding: 0 20px;
  }
</style>
