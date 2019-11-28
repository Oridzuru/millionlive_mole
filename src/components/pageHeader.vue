<template>
  <div class="">
      <div class="mltd-header">
        <div class="iconImgBox">
            <div class="icon"></div>
        </div>
        <div class="ert-content">
            <div class="header-title">偶像大师MLTD 摸鱼站</div>
        </div>
        <div class="about"></div>
    </div>
    <div class="navBox">
        <router-link  tag="div" class="nav-item" to="/">当前活动</router-link>
        <router-link tag="div" class="nav-item" to="/eventSearch">历史活动</router-link>
        <router-link tag="div" class="nav-item" to="/card">卡片查询</router-link>
        <!-- <router-link tag="div" class="nav-item" to="/cardview">测试</router-link> -->
        <div class="nav-item disable">测试..</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({

})
export default class PageHeader extends Vue {}
</script>

<style lang="css" scoped>
.mltd-header{
    position: relative;
    height: 100px;
    background-image: url(../assets/images/bg.jpg);
    background-size: cover;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
.mltd-header>.iconImgBox{
    width: 80px;
    height: 80px;
    /* border: 1px solid #eee; */
    border-radius: 10px;    
}
.mltd-header>.iconImgBox>.icon{
    width: 100%;
    height: 100%;
    box-shadow:2px 2px 8px #a0a0a0;
    border-radius: 10px;
    background-image: url(../assets/images/icon/icon.png);
    background-size: 100% 100%;
}
.mltd-header>.ert-content{
    width: calc(100% - 100px);
}
.mltd-header>.ert-content >.header-title{
    font-size: 16px;
    font-weight: bold;
    padding: 5px 0
}
.mltd-header>.ert-content >.header-title-sub{
    font-size: 12px;
    color:#1296db;
    font-weight: bold;
}
.mltd-header>.about{
    position: absolute;
    right: 15px;
    bottom: 5px;
    font-size: 12px;
    color:#555;
    font-weight: bold
}

.subTitile{
    position: relative;
    border-left: 5px solid #1296db;
    color:#1296db;
    /* font-weight: bold; */
    padding: 5px 10px;
    margin-bottom: 10px;
}
.navBox{
    border-top: 2px solid #7ad1ff;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #eee;
}
.navBox >.nav-item{
    width: 25%;
    font-size: 14px;
    text-align: center;
    padding: 5px 0;
    border-right: 1px solid #eee;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.navBox >.nav-item:hover{
    background-color: #7ad1ff;
    color:#fff;
    transition: .5s
}
.navBox >.nav-item.active,.router-link-exact-active{
    background-color: #7ad1ff;
    color:#fff
}
.navBox >.nav-item.disable{
    background-color: #ddd;
    color:#fff;
    cursor: not-allowed; 
}

</style>
