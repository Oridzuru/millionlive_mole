<template>
  <div class="">
    <div class="scoreBox" v-if="idol.length > 0">
        <div class="subTitile">活动角色</div>
        <div class="viewidol">
            <div class="idolCt" v-for="item in idol" :key="item.id">
                <img class="idolHead" :src="item.headSrc">
                <div class="idolInfo">
                    <div class="idolName">{{item.name}}</div>
                    <div class="idolTxt">{{item.flavorText}}</div>
                </div>
            </div>
        </div>
    </div>	
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    props:['cureventId','addIdolDate'],
    async created() {
        (this as any).getData();
    },
    data() {
        return {
            idol:[]
        }
    },
    watch:{
        'addIdolDate': function(){
            (this as any).getData();
        }
    },
    methods: {
        async getData(){
            let curEventId = (this as any).cureventId;
            let idata;
            (this as any).idol = [];
            console.log(this.$store.getters.getIdolList.length)
            if(this.$store.getters.getIdolList.length === 0){
                try {
                    const {data} = await Promise.race(
                        [
                            (this as any).axios(`http://api.serika.top/getData/cards.json`),
                            (this as any).axios(`cards`),
                        ]
                    );
                    idata = data;
                    this.$store.dispatch('setIdolList', data);
                } catch (error) {
                    this.$message("网络出错");
                }
            }else{
                idata = this.$store.getters.getIdolList;
            }
            if(idata){
                idata.forEach((item:any) => {
                    if(item.addDate === (this as any).addIdolDate){
                        // item.headSrc = `https://storage.matsurihi.me/mltd/icon_l/${item.resourceId}_1.png`;
                        item.headSrc = `http://static.serika.top/icon_l/${item.idolId}/${item.resourceId}_1.png`;
                        item.flavorText = item.flavorText.replace('{$P$}','Producer');
                        (this as any).idol.push(item);
                    }
                });
            }
        }
    },
})
export default class EventIdol extends Vue {

}
</script>

<style lang="css" scoped>
.viewidol {
    padding: 10px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.viewidol >.idolCt {
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin-bottom: 10px;
}
.viewidol >.idolCt >.idolHead {
    width: 70px;
    height: 70px;
    border-radius: 5px;
}
.viewidol >.idolCt >.idolInfo {
    width: calc(100% - 80px);
    font-size: 15px;
}
.idolTxt {
    padding: 5px 0;
    color: #555;
    font-size: 12px;
}
@media (max-width: 600px){
    .viewidol >.idolCt {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>
