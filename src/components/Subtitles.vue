<template>
  <div>
    <tabs animation="slide" :only-fade="false">
      <tab-pane :label="lang" :count="subtitles.length" v-for="(subtitles, lang) in subtitlesByLang">
        <div class="subtitles">
          <transition-group name="subtitle" appear v-on:beforeEnter="beforeEnter" v-on:afterEnter="afterEnter">
            <div class="subtitle" @click="download(subtitle)" v-for="(subtitle, index) in subtitles" :key="subtitle" :data-index="index">
              <div class="subtitle__number">{{ episode(subtitle) }}</div>
              <div class="subtitle__name"><i class="icon" v-if="subtitle.exact">grade</i> {{ subtitle.name }}</div>
            </div>
          </transition-group>
        </div>
      </tab-pane>
    </tabs>
  </div>
</template>

<script>
  import { Tabs, TabPane } from './tabs'
  import { mapGetters, mapActions } from 'vuex'
  import leftpad from 'left-pad'

  export default {
    components: { Tabs, TabPane },
    computed: {
      ...mapGetters(['langs', 'subtitlesByLang'])
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
        return 'S' + leftpad(subtitle.season, 2, '0') + 'E' + leftpad(subtitle.episode, 2, '0')
      }
    }
  }
</script>

<style lang="scss">
  .subtitle-enter-active{
    transition-duration: 0.3s;
  }

  .subtitle-enter{
    opacity: 0;
    transform: translateY(20px)
  }

  .subtitles{
    min-height:calc(100vh - 80px);
  }

  .subtitle{
    cursor: pointer;
    border-bottom: 1px solid rgba(#000, 0.4);
    border-top: 1px solid rgba(#FFFFFF, 0.1);
    padding: 20px 0;
    display: flex;
    align-items: center;
    &:first-child{
      border-top: none;
    }
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
