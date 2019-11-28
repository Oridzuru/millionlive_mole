<template>
  <div class="">
      <div class="cardInfo">
          <div class="subTitle">{{type===1?'特训后':'特训前'}}</div>
          <div class="infoBox">
              <div class="picBox">
                  <!-- <img :src="returnSrc(type,cardData.idolId,cardData.resourceId)" /> -->
                  <el-image 
                        class="img"
                        :src="returnSrc(type,cardData.idolId,cardData.resourceId)" 
                        :preview-src-list="returnSrcArr(type,cardData.idolId,cardData.resourceId)">
                  </el-image>
              </div>
              <div class="idoldata">
                    <div class="item onerow rare"><span class="lb">罕贵度</span>{{type===0?cardData.rarity:cardData.rarity+"+"}}</div>
                    <div class="item tiwrow level"><span class="lb">最大等级</span>{{type===0?cardData.levelMax:cardData.levelMaxAwakened}}</div>
                    <div class="item tiwrow master"><span class="lb">最大特训</span>4</div>
                    <!-- <div class="item tiwrow life"><span class="lb">生命值</span>{{cardData.life}}</div> -->
                    <div class="item tiwrow vocal"><span class="lb">Vocal值</span>{{type===0?cardData.vocalMax:cardData.vocalMaxAwakened}}</div>
                    <div class="item tiwrow dance"><span class="lb">Dance值</span>{{type===0?cardData.danceMax:cardData.danceMaxAwakened}}</div>
                    <div class="item tiwrow visual"><span class="lb">Visual值</span>{{type===0?cardData.visualMax:cardData.visualMaxAwakened}}</div>
                    <div class="item onerow appeal"><span class="lb">总Appeal</span>
                        {{type===0?
                            cardData.visualMax+cardData.danceMax+cardData.vocalMax:cardData.visualMaxAwakened+cardData.danceMaxAwakened+cardData.vocalMaxAwakened}}
                    </div>
                    <div class="item onerow ldSkillname "><span class="lb">队长技能</span>{{cardData.centerEffectName || "---" }}</div>
                    <div class="item onerow ldSkill"><span class="lb">技能效果</span>{{cardData.centerEffect?cardData.centerEffect.description || "---":"null"}}</div>
                    <div class="item onerow life"><span class="lb">技能</span>{{cardData.skillName}}</div>
                    <div class="item onerow life"><span class="lb">最大等级</span>{{cardData.skillLevelMax||"---"}}</div>
                    <div class="item onerow life"><span class="lb">技能效果</span>{{cardData.skill?cardData.skill.description || "--":"null"}}</div>
                    <div class="item onerow intro"><span class="lb">flavorText</span>{{cardData.flavorText.replace("{$P$}","Producer")}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    
})
export default class CardInfo extends Vue {
    @Prop({required: true})
    cardData!: any;

    @Prop({required: true})
    type!: Number;

    created() {
        switch (this.cardData.rarity) {
            case 1:
                this.cardData.rarity = "N"
                break;
            case 2:
                this.cardData.rarity = "R"
                break;
            case 3:
                this.cardData.rarity = "SR"
                break;
            case 4:
                this.cardData.rarity = "SSR"
                break;
            default:
                break;
        }
    }
    returnSrc(type:Number,id:Number,resId:String){
        if(type===0){
            return `http://static.serika.top/card/${id}/${resId}_0.png`;
        }else{
            return `http://static.serika.top/card/${id}/${resId}_1.png`;
        }
    }
    returnSrcArr(type:Number,id:Number,resId:String){
        if(type===0){
            return [`http://static.serika.top/card/${id}/${resId}_0.png`];
        }else{
            return [`http://static.serika.top/card/${id}/${resId}_1.png`];
        }
    }
}
</script>

<style lang="less" scoped>
    .cardInfo{
        margin: 0 10px 10px;
        padding: 20px;
        background: #fff;
        -webkit-transition: .2s;
        transition: .2s;

        .subTitle{
            position: relative;
            border-left: 5px solid #1296db;
            color: #1296db;
            padding: 5px 10px;
            margin-bottom: 10px;
        }
        .infoBox{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 20px;
            .picBox{
                width: 270px;
                text-align: center;

                img,.img{
                    width: 100%;
                    border-radius: 5px;
                }
            }
            @media (max-width: 600px){
              .picBox {
                  width: 90%;
                  margin: 0 auto;
                  text-align: center;
                  margin-bottom: 20px;
              }
          }
            .idoldata{
                display: flex;
                flex-wrap: wrap;
                width: calc(100% - 300px);
                .item{
                    display: flex;
                    align-items: baseline;
                    font-size: 15px;
                    margin-bottom: 8px;
                    .lb{
                        padding: 2px 10px;
                        margin-right: 8px;
                        min-width: 4.5em;
                        text-align: right;
                        background-color: #585858;
                        color: #fff;
                        border-radius: 5px;
                    }
                }
                .item.life{
                    .lb{
                        background-color: rgb(48, 189, 60);
                    }
                }
                .item.vocal{
                    .lb{
                        background-color: rgb(255, 79, 79);
                    }
                }
                .item.dance,.item.level{
                    .lb{
                        background-color: rgb(79, 105, 255);
                    }
                }
                .item.visual{
                    .lb{
                        background-color: rgb(255, 213, 75);
                    }
                }
                .item.master,.item.appeal{
                    .lb{
                        background-color: rgb(255, 130, 130);
                    }
                }
                .item.skill,.item.ldSkill,.item.ldSkillname,.item.ldskill,.item.skillname,.item.skilllevel{
                    .lb{
                        background-color: rgb(255, 144, 71);
                    }
                }
                .onerow{
                    width: 100%;
                }
                .tiwrow{
                    width: 50%;
                }
            }
            @media (max-width: 600px){
              .idoldata {
                  width: 90%;
                  margin: 0 auto!important;
              }
            }
        }
    }
</style>
