<template>
  <div class="mui-content">
    <pageHeader></pageHeader>
    <router-view></router-view>
    <pageFooter></pageFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import pageHeader from '@/components/pageHeader.vue';
import pageFooter from '@/components/pageFooter.vue';

@Component({
  components: {
      pageHeader,
      pageFooter,
  },
})
export default class MainPage extends Vue {}
</script>

<style lang="css" scoped>
</style>
