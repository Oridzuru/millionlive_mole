<template>
  <div class="">
       <div class="scoreBox">
            <div class="subTitile">活动查询</div>
            <el-alert
                title="摸了"
                type="warning"
                description="暂无法查询～花ざかりWeekend✿～及之前的活动数据（有空就摸完..）"
                show-icon
                style="margin-bottom:15px;">
            </el-alert>
            <el-row :gutter="20" type="flex" justify="center">
                <el-col :xs="20" :sm="20" :md="13" :lg="13" :xl="13">
                    <el-form label-width="85px">
                        <el-form-item label="请选择活动">
                            <el-select v-model="select" placeholder="请选择" v-if="eventList.length > 0">
                                <el-option
                                 v-for="item in eventList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                >
                                </el-option>
                            </el-select>
                            <!-- <select class="myselect" v-model="select">
                                <option  
                                v-for="item in eventList"
                                :key="item.id"
                                :value="item.id"
                                >{{item.name}}</option>
                            </select> -->
                        </el-form-item>
                        <el-form-item label="">                 
                            <el-button type="primary" @click="getResult()">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Loading } from 'element-ui';

@Component({
    async created() {
         try {
            let {data} = await (this as any).axios(`events`);
            data.forEach((item:any) => {
                item.name = item.name.replace('プラチナスターシアター','');
                item.name = item.name.replace('プラチナスターツアー','');
            });
            let arr = [];
            for(let i=0;i<data.length;i++){
                if(data[i].type === 3 || data[i].type === 4 || data[i].type === 5){
                    arr.push(data[i])
                }
            }
            (this as any).eventList = arr;
        } catch (error) {
            this.$message("网络错误");
            console.log(error);
        }
    },
    data() {
        return {
            eventList: [],
            select: null,
        }
    },
    methods: {
        getResult(){
            this.$emit('selectId', (this as any).select);
        }
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
})
export default class EventSelect extends Vue {

}
</script>

<style lang="css">
    .el-select-dropdown__list{
        max-width: 250px;
    }
</style>
<style lang="css" scoped>
    .myselect{
        width: 65%;
        height: 35px;
        padding: 3px 5px;
        border-radius: 3px;
        border: 1px solid #ddd;
        background-color: #fff;
    }
</style>
