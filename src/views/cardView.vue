<template>
  <div class="cardView">
        <div class="idolname relativeBox">
            {{cardData[0].name||""}}
            <el-button
                size="mini"
                type="primary"
                plain class="ctrBtn"
                @click="backRoute">返回
            </el-button>
        </div>
        <el-card shadow="hover" style="margin:0 10px;font-size:14px">
            {{cardData[0].awakeningText}}
        </el-card>
        <cardInfo :cardData="cardData[0]" :type="0"></cardInfo>
        <cardInfo :cardData="cardData[0]" :type="1"></cardInfo>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import cardInfo from '@/components/idol/card_info.vue';

@Component({
    components:{
        cardInfo,
    }
})
export default class CardView extends Vue {
    private cardId:String = "";
    public cardInfo:Array<Object> = [];
    public cardData:Array<Object> = [];

    async created() {
        console.log(this.$route.params.id);
        this.cardId = this.$route.params.id;

        if(this.$store.getters.getIdolList.length === 0){
            try {
                const {data} = await Promise.race(
                    [
                        (this as any).axios(`http://api.serika.top/getData/cards.json`),
                        (this as any).axios(`cards`),
                    ]
                );
                this.cardInfo = data;
                this.$store.dispatch('setIdolList', data);
            } catch (error) {
                this.$message("网络出错");
            }
        }else{
            this.cardInfo = this.$store.getters.getIdolList;
        }
        if(this.cardInfo.length>0){
            this.cardData = this.cardInfo.filter((item:any)=>{
                if(item.id == this.cardId){
                    return item;
                }
            })
        }
    }
    backRoute(){
        this.$router.go(-1)
    }
}
</script>

<style lang="less" scoped>
    .idolname{
        color: #1296db;
        padding: 12px 15px 10px;
        margin: 10px 10px 0;
        border-bottom: 2px solid #1296db;
        background: #fff;
        font-weight: bold
    }
    .relativeBox{
      position: relative;
      z-index: 10;
      .ctrBtn{
        position: absolute;
        top: 10px;
        right: 20px;
        z-index: 10;
      }
       @media (max-width: 600px){
            .ctrBtn{
                top: 10px;
            }
        }
    }
</style>