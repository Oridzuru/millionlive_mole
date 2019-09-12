<template>
  <div class="eventBox">
    <div class="event-content" v-if="Object.keys(eventInfo).length != 0">
        <div class="subTitile">活动基本信息</div>
        <div class="eventBaseInfo">
            <div class="eventImg">
                <img :src="filtPic()">
            </div>
            <div class="eventTitle">{{eventInfo.name}}</div>
            <div class="eventInfo">
                <div class="row">
                    <div class="item-lb">活动开始时间：</div>
                    <div class="item-ct">{{eventInfo.schedule.beginDate | formatDate }}</div>
                </div>
                <div class="row" v-if="eventInfo.schedule.boostBeginDate">
                    <div class="item-lb">后半战时间：</div>
                    <div class="item-ct">{{eventInfo.schedule.boostBeginDate | formatDate}} </div>
                </div>
                <div class="row">
                    <div class="item-lb">结束时间：</div>
                    <div class="item-ct">{{eventInfo.schedule.endDate | formatDate}}</div>
                </div>
                <div class="row">
                    <div class="item-lb">活动类型：</div>
                    <div class="item-ct">{{eventInfo.type | eventTypeFormat}}</div>
                </div>
                <div class="row" v-if="eventInfo.appealType">
                    <div class="item-lb">分数奖励属性：</div>
                    <div class="item-ct">
                        <span v-if="eventInfo.appealType==1" style="color:#ff5f5f;font-weight: bold">Vocal</span>
                        <span v-if="eventInfo.appealType==2" style="color:#4568ff;font-weight: bold">Dance</span>
                        <span v-if="eventInfo.appealType==3" style="color:#ffc045;font-weight: bold">Visual</span>
                    </div>
                </div>
                <div class="row" v-if="eventInfo.count">
                    <div class="item-lb">参与人数：</div>
                    <div class="item-ct">{{eventInfo.count || "--"}} 人</div>
                </div>
            </div>
            <div class="eventNoinfo"></div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    props:['eventInfo'],
    methods: {
        filtPic(){
            let curId:number | string = (this as any).eventInfo.id;
            curId = curId < 100? '0' + curId : curId;
            return `https://storage.matsurihi.me/mltd/event_bg/0${curId}.png`;
        }
    },
    filters:{
        formatDate:function(value:Date){
            if(value){
                let format = new Date (new Date(value).getTime() + 1000) 
                let year: number | string = format.getFullYear()
                let month: number | string = format.getMonth()+ 1
                let day :number | string = format.getDate()
                let dayCycle: number | string = format.getDay()
                let hour: number | string = format.getHours();
                let minutes:number | string = format.getMinutes();
                let second:number | string = format.getSeconds();

                month = month < 10 ? ('0' + month) : month;
                day = day < 10 ? ('0' + day) : day;
                hour = hour < 10 ? ('0' + hour) : hour;
                minutes = minutes < 10 ? ('0' + minutes) : minutes;

                let dayCycleArray = ["日", "一", "二", "三", "四", "五", "六"];
                for (let i = 0; i < 7; i++) {
                    if (dayCycle === i) {
                        dayCycle = dayCycleArray[i];
                    }
                }
                return (year + "年" + month + "月" + day + "日  " + hour + ":"+ minutes + " 星期" + dayCycle);
            }else{
                return '暂无数据'
            }
        },
        eventTypeFormat:function(value:number){
            // 1: THEATER SHOW TIME☆
            // 2: ミリコレ！
            // 3: プラチナスターシアター
            // 4: プラチナスターツアー
            // 5: 周年記念イベント
            // 6: MILLION LIVE WORKING☆
            // 7: エイプリルフール
            switch(value){
                case 1:
                    return "Theater Show Time☆"
                    break	
                case 2:
                    return "MillionLive Collection"
                    break	
                case 3:
                    return "Platinum Star Theater（传统活动）"
                    break	
                case 4:
                    return "Platinum Star Tour（巡回活动）"
                    break	
                case 5:
                    return "周年記念イベント"
                    break		
                case 6:
                    return "MILLION LIVE WORKING☆"
                    break		
                case 7:
                    return "エイプリルフール（愚人节活动）"
                    break		
                default:
                    return "Unknown Event"
                    break		
            }
        },
    },
    components: {

    },
})
export default class EventBaseInfo extends Vue {}
</script>

<style lang="css" scoped>
.eventBaseInfo {
    padding: 10px;
}
.eventBaseInfo .eventImg {
    margin-bottom: 10px;
    border-radius: 5px;
}
.eventBaseInfo .eventImg >img {
    width: 100%;
    border: 1px solid #eee;
    box-shadow: 2px 2px 8px #a0a0a0;
    border-radius: 5px;
}
.eventBaseInfo .eventTitle {
    display: flex;
    font-weight: bold;
    padding: 5px 5px 10px;
    color: #333;
    border-bottom: 2px solid #7ad0ff75;
}
.eventInfo{
    max-width: 400px;
    margin: 0 auto;
    padding: 10px 0;
}
.eventInfo .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
}
.eventInfo .row .item-lb {
    width: 8em;
    text-align: right;
    font-weight: bold;
}
.eventInfo .row .item-ct {
    width: calc(100% - 9em);
}
</style>
