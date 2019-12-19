<template>
  <div>
      <eventBaseInfo :eventInfo="eventInfo" />
      <eventRanking 
        v-if="cureventId!=0 && (eventInfo.type==4 || eventInfo.type==3)" 
        :cureventId="cureventId"
        @putData="getScoreData"
      >
      </eventRanking>  
      <highScore 
        v-if="cureventId!=0 && (eventInfo.type==4 || eventInfo.type==3)" 
        :cureventId="cureventId"
      >
      </highScore>
      <eventIdol 
        v-if="cureventId!=0 && eventInfo.schedule.beginDate" 
        :cureventId="cureventId" 
        :addIdolDate="eventInfo.schedule.beginDate" 
      >
      </eventIdol>
      <eventScoreChart 
        v-if="cureventId!=0 && eventScore.length>0" 
        :cureventId="cureventId"
        :eventScore="eventScore" 
        :eventBaseInfo="eventInfo"
      >
      </eventScoreChart>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { Loading } from 'element-ui';
import eventBaseInfo from '@/components/eventBaseInfo.vue';
import eventRanking from '@/components/eventRanking.vue';
import highScore from '@/components/highScore.vue';
import eventIdol from '@/components/eventIdol.vue';
import eventScoreChart from '@/components/eventScoreChart.vue';

@Component({
  async created() {
    if(this.$store.getters.getEventList.length === 0){
      try {
        const {data} = await (this as any).axios(`events`);
        let data_count;
        if(data[data.length - 1].type === 3 || data[data.length - 1].id === 4){
          data_count = await (this as any).axios(`events/${data[data.length - 1].id}/rankings/summaries/eventPoint`);
          (this as any).eventInfo.count = data_count.data[data_count.data.length - 1].count;
        }
        this.$store.dispatch('changeCurEventId', data[data.length - 1].id);
        (this as any).cureventId = data[data.length - 1].id;
        (this as any).eventInfo = data[data.length - 1];
        this.$store.dispatch('changeEventList', data);
      } catch (error) {
        this.$message("网络错误");
        console.log(error);
      }
    }else{
      const data = this.$store.getters.getEventList;
      this.$store.dispatch('changeCurEventId', data[data.length - 1].id);
      (this as any).cureventId = data[data.length - 1].id;
      (this as any).eventInfo = data[data.length - 1];
    }
    
  },
  data() {
    return {
      eventInfo: {},
      cureventId: 0,
      eventScore:[],
    }
  },
  components: {
    eventBaseInfo,
    eventRanking,
    highScore,
    eventIdol,
    eventScoreChart,
  },
  watch: {
    '$store.state.isLoading': function() {
      if (this.$store.getters.loadingStatus) {
        Loading.service({
          text: '正在努力加载..',
        });
      } else {
        Loading.service({}).close();
      };
    },
  },
  methods: {
      ...mapActions(['changeCurEventId']),
      getScoreData(data){
        (this as any).eventScore = data;
      }
  },
})
export default class Event extends Vue {

}
</script>
