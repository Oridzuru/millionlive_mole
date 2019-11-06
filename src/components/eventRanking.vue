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
            <div class="lastUpdated" v-if="rankData.length > 0">
                <span class="title">数据更新时间：</span>
                <span class="date">{{rankData[0].data[rankData[0].data.length - 1].summaryTime | formatDate}}</span>
            </div>
            <div class="errorBox" v-if="rankData.length == 0">
                <img src="../assets/images/status/error.jpg">
                <div class="tips">请稍等..</div>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    props:['cureventId'],
    async created() {
        (this as any).getData();
    },
    data() {
        return {
            rankData: [],
        }
    },
    methods: {
        async getData(){
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
        }
    },
    watch: {
        'cureventId': async function(){
            (this as any).getData();
        }
    },
    filters:{
        formatDate:function(value:Date){
            if(value){
                let format = new Date (new Date(value).getTime() + 1000);
                let year: number | string = format.getFullYear();
                let month: number | string = format.getMonth()+ 1;
                let day :number | string = format.getDate();
                let hour: number | string = format.getHours();
                let minutes:number | string = format.getMinutes();
                let second:number | string = format.getSeconds();

                month = month < 10 ? ('0' + month) : month;
                day = day < 10 ? ('0' + day) : day;
                hour = hour < 10 ? ('0' + hour) : hour;
                minutes = minutes < 10 ? ('0' + minutes) : minutes;

                return (year + "年" + month + "月" + day + "日  " + hour + ":"+ minutes);
            }else{
                return '暂无数据'
            }
        },
    }
})
export default class EventRanking extends Vue {

}
</script>

<style lang="css" scoped>
.lastUpdated{
    text-align: right;
    font-size: 15px;
    padding: 20px 20px 10px;
}
.lastUpdated .title{
    padding-right: 10px;
}
.lastUpdated .date{
    color: #1296db;
    font-weight: bold
}
</style>
