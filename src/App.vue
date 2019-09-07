<template>
  <div id="app">
    <mainPage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import mainPage from '@/views/page.vue';
import './assets/base.css';
@Component({
  components: {
      mainPage,
  },
})
export default class App extends Vue {}
</script>

<style lang="less">

</style>
