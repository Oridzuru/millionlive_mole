<template>
  <div class="">
        <div class="scoreBox">
            <div class="subTitile">活动分数情况</div>
            <div class="currentEventScore">
                <div class="scoreHeader">
                    <div class="item">档线</div>
                    <div class="item">当前分数</div>
                    <div class="item">30分钟前</div>
                    <div class="item">24小时前</div>
                </div>
                <div class="scoreBody">
                    <div class="scoreRow" v-for="(item, index) in rankData" :key="item.id">
                        <div class="item">{{index}}档</div>
                        <div class="item">{{item.data[item.data.length-1].score}}</div>
                        <div class="item">+ {{item.someAgo}}</div>
                        <div class="item">+ {{item.dayAgo}}</div>
                    </div>
                </div>
            </div>
            <div class="errorBox" v-if="rankData.length == 0">
                <img src="../assets/images/status/error.jpg">
                <div class="tips">Sorry，暂无当前活动数据</div>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    props:['cureventId'],
    async created() {
        let curEventId = (this as any).cureventId;
        try {
            const {data} = await (this as any).axios(`events/${curEventId}/rankings/logs/eventPoint/100,2500,5000,10000,25000,50000`);
            if(data.length > 0){
                // (this as any).rankData = data
                for(let temp of data){
                    if(temp.data.length>1){
                        temp.someAgo = temp.data[temp.data.length-1].score - temp.data[temp.data.length-2].score
                    }else{
                        temp.someAgo = "暂无数据"
                    }
                    if(temp.data.length>48){
                        temp.dayAgo = temp.data[temp.data.length-1].score - temp.data[temp.data.length-49].score
                    }else{
                        temp.dayAgo = "暂无数据"
                    }
                }
                (this as any).rankData = data;
                this.$emit('putData', (this as any).rankData);
            }
        } catch (error) {
            this.$message("网络错误");
            console.log(error);
        }
        
    },
    data() {
        return {
            rankData: [],
        }
    },
})
export default class EventRanking extends Vue {

}
</script>

<style lang="css" scoped>
</style>
