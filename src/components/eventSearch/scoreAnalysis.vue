<template>
  <div class="">
    <div class="scoreBox">
      <div class="subTitile">每日增速分数</div>
      <div v-if="score.length > 0" class="cBox">
        <div class="cHead">
          <div class="item">档位</div>
          <div class="item" style="font-weight:bold" v-for="(item, index) in score[0].dayspeed" :key="index">第{{index}}天</div>
        </div>
        <div class="cBody">
          <div class="cRow" v-for="(item, index) in score" :key="index">
            <div class="item">{{index}}档</div>
            <div class="item" v-for="(item2, index2) in item.dayspeed" :key="index2">
              {{item2}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="score.length > 0" class="cBox">
        <div class="cHead" style="border-bottom: 2px solid #1296db;">
          <div class="ar_item">档位</div>
          <div class="ar_item_2" style="font-weight:bold" v-for="(item, index) in score[0]" :key="index">
            <div class="sar_item" v-if="index!='dayspeed'">{{index | formatName}}</div>
          </div>
        </div>
        <div class="cBody">
          <div class="cRow" v-for="(item, index) in score" :key="index">
            <div class="ar_item">{{index}}档</div>
            <div class="ar_item_2" v-for="(item2, index2) in item" :key="index2">
              <div class="sar_item" v-if="index2!='dayspeed'">{{item2}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props:["eventId", "eventScore"],
  created() {
    (this as any).getData((this as any).eventId)
  },
  data() {
    return {
      score: [],
    }
  },
  watch: {
    'eventId': async function(){
      (this as any).getData((this as any).eventId)
    }
  },
  methods: {
    async getData(eventId){
      if(!eventId){
        this.$message("活动ID错误");
        return 
      };
      let data:any[] = [];
      if(!(this as any).eventScore){
        try{
          let getData = await (this as any).axios(`events/${eventId}/rankings/logs/eventPoint/100,2500,5000,10000,25000,50000`);
          data = getData.data;
        }catch(error){
          this.$message("网络错误");
        }
      }
      let result:any[] = [];
			let currentDataArr = [];
			for(let key in data){
				let temp = []
				for(let i in data[key].data){
					temp.push(data[key].data[i].score)
				}
				currentDataArr.push(temp)
			};
			let scoreLength =  currentDataArr[0].length;
			currentDataArr = currentDataArr.map(item=>{
				if(item.length<scoreLength){
					let diff = scoreLength - item.length
					item.splice(0,0,...Array(diff).fill(0))
				}
				return item
			});
			let dayData = currentDataArr.map((item,index)=>{
				let tempArr = []
				for(let i=0;i<item.length-1;i++){
					if(i==0){
						let newArr = [...item.slice(i,20)]
						tempArr.push(newArr)
					}else{
						let pt = (i-1)*48+20
						let newArr = [...item.slice(pt,pt+48)]
						if(newArr.length>0){
							tempArr.push(newArr)
						}
					}
				}
				return tempArr
			});

			dayData.map((item, index)=>{
				let temp,temp2:any
				let arry:any = []
				item.forEach((item2,index) => {
					if(index==0){
						temp = item2[item2.length -1]
					}else{
						temp = item2[item2.length -1] - temp2
					}
					temp2 = item2[item2.length -1]
					arry.push(temp)
				})
        result[index] = {
          "dayspeed": arry,
          "max": 0,
          "min": 0,
          "average": 0,
          };
			});
			let diffArr = currentDataArr.map(item=>{
				let temparrs:any = [];
				item.unshift(0);
				item.reduce((temp,item2)=>{
					temparrs.push(item2 - temp);
					return item2;
				})
				item = temparrs;
				return item
			});
			let max = diffArr.map((item, index)=>{
				let maxNum
				item.reduce((temp,item2)=>{
					maxNum = Math.max(temp,item2)
					return maxNum
				})
        result[index].max = maxNum;
			});
			diffArr.map((item, index)=>{
				let minNum;
				item.reduce((temp,item2)=>{
					minNum = Math.min(temp,item2);
					return minNum;
				})
        result[index].min = minNum;
			});
			diffArr.map((item,index)=>{
				let length = item.length -1;
				let tempArr = item.reduce((temp,item2)=>{
					return temp + item2;
				})
        result[index].average = Math.ceil(tempArr/length);
			});
      
      (this as any).score = result;
    }
  },
  filters:{
        formatName:function(value:string){
          if (value === 'max'){
            return "每30分钟最大速度";
          }else if (value === 'min'){
            return "每30分钟最慢速度";
          }else if (value === 'average'){
            return "每30分钟平均速度";
          }
        },
  }
})
export default class ScoreAnalysis extends Vue {

}
</script>

<style lang="css" scoped>
.cBox{
  margin: 10px;
  overflow: auto;
}
.cBox .cHead{
  display: flex;
}
.cBox .cHead .item{
  min-width: 75px;
  font-size: 15px;
  text-align: center;
  color: #1296db;
  padding: 8px 10px;
  border-bottom: 2px solid #1296db;
}
.cRow{
  display: flex;
}
.cRow:nth-child(2n) .item{
  background-color: #eff9ff;
}
.cRow >div.item{
  min-width: 75px;
  text-align: center;
  padding: 12px 10px;
  color:#4d4d4e;
  border-bottom: 1px dashed #addef7;
}
.ar_item{
  min-width: 80px;
  font-size: 15px;
  text-align: center;
  color: #1296db;
  padding: 8px 0;
}
.ar_item_2{
  width: 100%;
  display: flex;
  font-size: 15px;
  text-align: center;
  color: #1296db;
  padding: 8px 0;
}
.cBody .ar_item,
.cBody .ar_item_2{
  border-bottom: 1px dashed #addef7;
}
</style>
