<template>
  <div class="">
    <div class="relativeBox">
      <character
       v-if="cardInfo.length > 0" :cardList="cardInfo"
       @getData="getSelectedIdolid"
       v-show="isOpen"></character>
      <el-button
        type="primary"
        size="mini"
        plain class="ctrBtn"
        v-show="!isOpen"
        @click="changeOpen">打开角色列表</el-button>
    </div>
    <cardList
      v-if="selectedIdolid !=0"
      :cardList="cardInfo"
      :idolId="selectedIdolid"></cardList>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue, Watch } from 'vue-property-decorator';
import { Loading , Button} from 'element-ui';
import cardList from '@/components/idol/card_list.vue';
import Character from '@/components/idol/character.vue';

@Component({
  components: {
      cardList,
      Character
  },
})
export default class Card extends Vue {
  private cardInfo = [];
  private isOpen:Boolean = true;
  public selectedIdolid:Number = 0;

  async created() {
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
    // console.log(this.cardInfo)
  }
  getSelectedIdolid(data:Number){
     this.selectedIdolid = data;
     this.isOpen = false;
  }
  changeOpen(){
    this.isOpen = !this.isOpen;
  }
  @Watch('$store.state.isLoading')
  loadingSomething(){
    if (this.$store.getters.loadingStatus) {
      Loading.service({
        text: '正在努力加载..',
      });
    } else {
      Loading.service({}).close();
    };
  }
}
</script>

<style lang="less">
    @primaryColor:#1296db;
    .baseBox{
      margin: 10px;
      padding: 10px;
      background: #fff;
      -webkit-transition: .2s;
      transition: .2s;
      
      .subTitle {
          position: relative;
          border-left: 5px solid #1296db;
          color: @primaryColor;
          padding: 5px 10px;
          margin-bottom: 10px;
      }
      .cardBox{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .cardItem{
              width: calc(25% - 10px);
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              padding: 5px 0;
              margin-bottom: 10px;
              border-radius: 5px;
          }
          @media (max-width: 600px){
              .cardItem {
                  display: flex;
                  justify-content: space-between;
                  width: calc(50% - 10px);
                  margin-bottom: 10px;
              }
          }
          .cardItem.active,.cardItem:hover{
              background-color: rgba(110, 204, 255, 0.2);
              .cardName{
                  color: @primaryColor;
              }
          }
          // .cardItem:nth-child(2n){
          //     margin-left: 10px;
          // }
          .cardItem:hover{
              opacity: (.8);
              transition: .3s
          }
          .cardImg{
              width: 50px;
              height: 50px;

              img{
                  width: 50px;
                  height: 50px;
                  // border-radius: 5px;
                  border-radius: 50%;
                  border: 2px solid #ccc;
              }
          }
          .cardName{
              margin-left: 10px;
              width: calc(100% - 50px);
              font-size: 15px;
              color: #333;
          }
      }
  }
</style>
<style lang="less" scoped>
    .relativeBox{
      position: relative;
      z-index: 10;
      .ctrBtn{
        position: absolute;
        top: 10px;
        right: 20px;
        z-index: 10;
      }
    }
</style>