<template>
  <div class="">
    <div class="scoreBox">
        <div class="subTitile">活动highScore</div>
        <div class="currentEventScore">
            <div class="scoreHeader">
                <div class="item">档线</div>
                <div class="item">当前分数</div>
                <div class="item">30分钟前</div>
                <div class="item">24小时前</div>
            </div>
            <div class="scoreBody">
                <div class="scoreRow" v-for="item in highScore" :key="item.rank">
                    <div class="item">{{item.rank}}位</div>
                    <div class="item">{{item.nowScore}}</div>
                    <div class="item">+ {{item.someAgo}}</div>
                    <div class="item">+ {{item.dayAgo}}</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface oHandled{ 
  rank?: number | string;
  nowScore?: number | string;
  someAgo?: number | string;
  dayAgo?: number | string;
}

@Component({
   props:['cureventId'],
   async created() {
       let curEventId = (this as any).cureventId;
       try {
           const {data} = await (this as any).axios(`events/${curEventId}/rankings/logs/highScore/1,2,3,100,2000`);
           if(data.length > 0){
                let handledArry:any = []
                data.forEach((item:any) => {
                    let handled:oHandled = {}
                    if(data.length > 1){
                        handled.rank = item.rank;
                        handled.nowScore = item.data[item.data.length -1].score
                    }else{
                        handled.nowScore = '暂无数据'
                    }
                    if(item.data.length > 2){
                        handled.someAgo = item.data[item.data.length -1].score - item.data[item.data.length -2].score
                    }else{
                        handled.someAgo = '暂无数据'
                    }
                    if(item.data.length > 48){
                        handled.dayAgo = item.data[item.data.length -1].score - item.data[item.data.length -48].score
                    }else{
                        handled.dayAgo = '暂无数据'
                    }
                    handledArry.push(handled)
                });
                (this as any).highScore = handledArry
           }
       } catch (error) {
           this.$message("出现未知错误");
           console.log(error);
       }
   },
   data() {
       return {
           highScore: [],
       }
   },
})
export default class HighScore extends Vue {

}
</script>

<style lang="css" scoped>
</style>
