<template>
  <div class="">
		<div class="neo-card" style="width: auto;">
			<div class="subTitile">关于</div>
			<div class="neo-content">
				<p>活动数据来源：<a href="https://matsurihi.me">https://matsurihi.me</a> 、<a href="https://si.ster.li">https://si.ster.li</a></p>
				<p>The event data is provided by <a href="https://matsurihi.me">https://matsurihi.me</a> 、<a href="https://si.ster.li">https://si.ster.li</a></p>
			</div>
		</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PageFooter extends Vue {

}
</script>

<style lang="css" scoped>
.neo-card {
    width: 100%;
    margin: 10px 10px 5px;
    padding: 10px;
    background: #fff;
}
.neo-card .neo-content {
    padding: 10px;
    border-top: 1px solid #eee;
}
.neo-card .anotherTips {
    margin-top: 10px;
    padding-top: 10px;
    text-align: center;
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
}
.anotherTips .tipsRow {
    width: 100%;
}
.neo-card .neo-content img {
    width: 90%;
    margin: 10px 5%;
}
</style>
