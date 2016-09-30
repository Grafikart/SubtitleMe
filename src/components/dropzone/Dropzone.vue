<template>
  <div class="dropzone" :class="cls" v-show="isVisible">
    <div class="dropzone__area" :class="cls">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="dropIcon" x="0px" y="0px" width="66.5px" height="71px" viewBox="18 0 66.5 71" enable-background="new 18 0 66.5 71" xml:space="preserve" class="ng-scope">
				<path id="arrow" d="M65.975 32.197L53.389 44.874c-0.333 0.335-0.748 0.597-1.215 0.739 -0.096 0.03-0.192 0.053-0.289 0.075 -0.185 0.037-0.385 0.06-0.592 0.06 -0.496 0-0.963-0.119-1.371-0.344 -0.089-0.044-0.17-0.097-0.252-0.149 -0.082-0.052-0.163-0.112-0.245-0.179 -0.082-0.06-0.155-0.127-0.222-0.202L36.619 32.198c-1.156-1.165-1.156-3.061 0-4.225 1.163-1.165 3.037-1.165 4.192 0l7.519 7.585V4.097c0-1.65 1.333-2.986 2.963-2.986 1.637 0 2.963 1.336 2.963 2.986v31.459l7.525-7.585c1.156-1.165 3.029-1.165 4.193 0C67.13 29.136 67.13 31.033 65.975 32.197z" data-svg-origin="35.4630012512207 1.1110000610351562" style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);"></path>
				<path id="box" d="M77.392 67.777H25.201c-1.636 0-2.963-1.336-2.963-2.985V47.708c0-1.649 1.327-2.986 2.963-2.986s2.963 1.337 2.963 2.986v14.097h46.264V47.708c0-1.649 1.327-2.986 2.963-2.986 1.637 0 2.963 1.337 2.963 2.986v17.083C80.355 66.441 79.028 67.777 77.392 67.777z" data-svg-origin="22.238000869750977 44.72200012207031" style="transform: matrix(1, 0, 0, 1, 0, 0); opacity: 1;"></path>
			</svg>
        <div class="dropzone__title">DRAG AND DROP</div>
        <div class="dropzone__text">pour trouver les sous-titres</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['isDragging', 'hasSubtitles']),
      cls () { return {'is-hover': this.isDragging} },
      isVisible () { return this.isDragging || !this.hasSubtitles }
    }
  }
</script>

<style src="./dropzone.scss" lang="scss"></style>
