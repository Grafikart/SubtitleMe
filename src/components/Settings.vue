<template>
  <div class="config">
    <h2>Configuration</h2>
    <div class="form-group">
      <label for="filename" class="form-label">File name</label>
      <div>
        <input id="filename" class="form-control" v-model="filename">
        <div class="help-text">
          {name} - original filename<br>
          {ext} - original file extension
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Desktop Notifications</label>
      <checkbox :checked="settings.notifications" @change="toggleNotification"></checkbox>
    </div>
    <p>
      <router-link to="root" class="btn">Back</router-link>
    </p>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Checkbox from './ui/Checkbox.vue'
  import debounce from 'lodash/debounce'

  export default {
    computed: {
      ...mapGetters(['settings'])
    },
    components: { Checkbox },
    data () {
      return {
        filename: null
      }
    },
    mounted () {
      this.filename = this.settings.filename
    },
    methods: {
      toggleNotification (checked) {
        this.setSettings({notifications: checked})
      },
      ...mapActions(['setSettings'])
    },
    watch: {
      filename: debounce(function (value, oldValue) {
        if (oldValue != null) {
          this.setSettings({filename: value})
        }
      }, 1000)
    }
  }
</script>
