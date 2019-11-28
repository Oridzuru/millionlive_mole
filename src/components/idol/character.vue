<template>
  <div class="baseBox">
      <div class="subTitle">角色列表</div>
      <div class="cardBox">
          <div class="cardItem" 
          :class="item.id==selectedIdol?'active':''" 
          @click="selectiDol(item.id)"
          v-for="item in character" 
          :key="item.id"
          >
              <div class="cardImg"><img :src="item.header" /></div>
              <div class="cardName">
                    {{item.name}}
              </div>
            </div>
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

    private character = [];
    public selectedIdol:Number = 0;

    async created() {
        if(this.cardList.length>0){
            try {
                const {data} = await (this as any).axios(`http://api.serika.top/getData/character.json`);
                let tmpCardList =  [...this.cardList].reverse()
                data.forEach((item:any)=>{
                    let tmpObj:any = tmpCardList.find((item2:any)=>{
                        if(item.id === item2.idolId && item2.rarity===4 && item2.extraType!=7){
                            return item2;
                        }
                    })
                    item.header = `http://static.serika.top/icon_l/${item.id}/${tmpObj.resourceId}_1.png` 
                })
                this.character = data;
            } catch (error) {
                this.$message("网络出错");
            }
        }
    }
    selectiDol(id:Number){
        this.selectedIdol = id;
        this.$emit('getData', this.selectedIdol);
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
<style lang="less" scoped>
    
</style>
