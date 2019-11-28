<template>
  <div class="baseBox">
      <div class="subTitle">{{findIdolList[findIdolList.length -1].name}}</div>
      <div class="cardBox">
          <router-link 
          tag="div"
          class="cardItem" 
          v-for="item in findIdolList" 
          :key="item.resourceId"
          :to="{path: `/cardview/${item.id}`}"
          >
            <div class="cardImg"><img :src="`http://static.serika.top/icon_l/${item.idolId}/${item.resourceId}_1.png`" /></div>
            <div class="cardName">
                  {{item.name}}
              </div>
          </router-link>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch , Vue, Prop } from 'vue-property-decorator';
import { Loading } from 'element-ui';

@Component({

})
export default class Character extends Vue {
    @Prop({required: true})
    cardList!: Array<Object>;

    @Prop({required: true})
    idolId!: Number;

    private findIdolList:Array<Object> = [];

    async created() {
      this.getIdolArray()
    }
    getIdolArray(){
      if(this.cardList.length>0 && this.idolId!=0){
        this.findIdolList = this.cardList.filter((item:any)=>{
          if(item.idolId === this.idolId){
            return item;
          }
        })
      }
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

    @Watch('idolId')
    idolIdChange(){
      this.getIdolArray()
    }
    
}
</script>

<style lang="css" scoped>
  .cardBox{
    display: flex;
    flex-wrap: wrap;
  }
  .cardBox .cardItem{
    width: calc(50% - 10px)!important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 5px 0;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  @media (max-width: 600px){
      .cardBox .cardItem {
          display: flex;
          justify-content: space-between;
          width: 100%!important;;
          margin-bottom: 10px;
      }
  }
</style>
