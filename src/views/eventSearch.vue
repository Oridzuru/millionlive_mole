<template>
  <div class="">
    <eventSelect @selectId="getSelectId" />
    <eventBaseInfo 
        v-if="selectEventId != 0 && Object.keys(eventInfo).length !=0"
        :eventInfo="eventInfo"
    >
    </eventBaseInfo>
    <eventIdol 
        v-if="selectEventId!=0 && Object.keys(eventInfo).length !=0" 
        :cureventId="selectEventId" 
        :addIdolDate="eventInfo.schedule.beginDate" 
    >
    </eventIdol>
    <scoreAnalysis
        v-if="selectEventId!=0"
        :eventId="selectEventId"
    >
    </scoreAnalysis>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import eventSelect from '@/components/eventSearch/eventSelect.vue';
import eventBaseInfo from '@/components/eventBaseInfo.vue';
import eventIdol from '@/components/eventIdol.vue';
import scoreAnalysis from '@/components/eventSearch/scoreAnalysis.vue';
@Component({
    data() {
        return {
            selectEventId: 0,
            eventInfo: {},
        }
    },
    methods: {
        getSelectId(data){
            (this as any).selectEventId = data;
        },
    },
    watch: {
        'selectEventId': async function(){
            if (this.$store.getters.getSelectEventId != (this as any).selectEventId) {
                this.$store.dispatch('changeSelectEventId', (this as any).selectEventId);
                try {
                    const {data} = await (this as any).axios(`events/${(this as any).selectEventId}`);
                    (this as any).eventInfo = data;
                    // refresh
                    this.$forceUpdate();
                } catch (error) {
                    this.$message("网络错误");
                    console.log(error);
                }
            }
        }
    },
    components:{
        eventSelect,
        eventBaseInfo,
        eventIdol,
        scoreAnalysis,
    },
})
export default class EventSearch extends Vue {

}
</script>

<style lang="css" scoped>

</style>
