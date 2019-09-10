<template>
    <div class="">
        <div class="scoreBox">
            <div class="subTitile">活动统计与分析</div>
            <div class="viewScore">
                <div class="chartview">
                    <div class="chart" id="chart_1"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    props:['cureventId','eventScore','eventBaseInfo'],
    async created() {
        (this as any).resetDate(
            new Date((this as any).eventBaseInfo.schedule.beginDate).getTime() + 1800000,
            new Date((this as any).eventBaseInfo.schedule.endDate).getTime()
            );
        (this as any).boostBeginDate = (this as any).setChartDate(new Date((this as any).eventBaseInfo.schedule.boostBeginDate));
        (this as any).scoreArr = (this as any).setScoreData();
    },
    data() {
        return {
            chartDate: [],
            scoreArr: [],
            boostBeginDate: null,
        }
    },
    methods: {
        resetDate(startDate:number, endDate:number):void{
            let tempAyy = [];
            let cutMin = 1800000; 
            let countMin = (endDate - startDate + 1000) / cutMin 
            let tempDate = startDate;
            tempAyy.push((this as any).setChartDate(new Date(tempDate)));
            for (let i = 0; i < countMin; i++) {
                tempDate += cutMin;
                tempAyy.push((this as any).setChartDate(new Date(tempDate)));
            }
            (this as any).chartDate = tempAyy;
        },
        setChartDate(date:Date):string {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour:number | string = date.getHours();
            let minutes:number | string = date.getMinutes();
            let second = date.getSeconds();
            hour = hour < 10 ? ('0' + hour) : hour;
            minutes = minutes < 10 ? ('0' + minutes) : minutes;
            return (month + "-" + day + " " + hour + ":" + minutes);
        },
        setScoreData(){
            let scoreArr = []
            for(let key in (this as any).eventScore){
                let tmp = []
                for(let i in (this as any).eventScore[key].data){
                    tmp.push((this as any).eventScore[key].data[i].score)
                }
                scoreArr.push(tmp)
            }
            let scoreMaxLength =  scoreArr[0].length;
            scoreArr = scoreArr.map(item=>{
                if(item.length<scoreMaxLength){
                    let diff = scoreMaxLength - item.length
                    item.splice(0,0,...Array(diff).fill(0))
                }
                return item
            })
            return scoreArr;
        },
    },
    mounted() {
        const ele = document.getElementById('chart_1');
        const chart: any = (this as any).$echarts.init(ele);
        chart.setOption(
            {
                title: {
                    text: (this as any).eventBaseInfo.name,
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#008acd'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    left: 45,
                    right: 15,
                    borderColor: '#eee'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: (this as any).chartDate,
                    axisLabel: {
                        color: '#008acd'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#008acd',
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: function (value:any) {
                            if (value >= 1000 && value < 10000000) {
                                value = value / 1000 + "K";
                            }
                            return value;
                        },
                        color: '#008acd'
                    },
                    axisPointer: {
                        snap: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#008acd',
                        }
                    },
                },
                series: [{
                    name: '2500位',
                    type: 'line',
                    smooth: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        color: '#2ec7c9',
                    },
                    lineStyle: {
                        color: '#2ec7c9',
                        width: 3,
                    },
                    data: (this as any).scoreArr[1],
                    markArea: {
                        data: [
                            [{
                                name: '后半战',
                                xAxis: (this as any).boostBeginDate
                            }, {
                                xAxis: (this as any).chartDate[(this as any).chartDate.length - 1]
                                
                            }]
                        ]
                    },
                    markLine: {
                        label: {
                            position: "middle"
                        },
                        data: [{
                            type: 'max',
                            name: '当前值'
                        }]
                    }
                }, {
                    name: '5000位',
                    type: 'line',
                    smooth: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        color: '#b6a2de',
                    },
                    lineStyle: {
                        color: '#b6a2de',
                        width: 3,
                    },
                    data: (this as any).scoreArr[2],
                    markLine: {
                        label: {
                            position: "middle"
                        },
                        data: [{
                            type: 'max',
                            name: '当前值'
                        }]
                    }
                }, {
                    name: '10000位',
                    type: 'line',
                    smooth: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        color: '#5ab1ef',
                    },
                    lineStyle: {
                        color: '#5ab1ef',
                        width: 3,
                    },
                    data: (this as any).scoreArr[3],
                    markLine: {
                        label: {
                            position: "middle"
                        },
                        data: [{
                            type: 'max',
                            name: '当前值'
                        }]
                    }
                }, {
                    name: '25000位',
                    type: 'line',
                    smooth: true,
                    data: (this as any).scoreArr[4],
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        color: '#ffb980',
                    },
                    lineStyle: {
                        color: '#ffb980',
                        width: 3,
                    },
                    markLine: {
                        label: {
                            position: "middle"
                        },
                        data: [{
                            type: 'max',
                            name: '当前值'
                        }]
                    }
                }, {
                    name: '50000位',
                    type: 'line',
                    smooth: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        color: '#fa7a82',
                    },
                    lineStyle: {
                        color: '#fa7a82',
                        width: 3,
                    },
                    data: (this as any).scoreArr[5],
                    markLine: {
                        label: {
                            position: "middle"
                        },
                        data: [{
                            type: 'max',
                            name: '当前值'
                        }]
                    }
                }],
            }
        );
    },  
})
export default class EventScoreChart extends Vue {

}
</script>

<style lang="css" scoped>
.viewScore {
    padding: 5px 0;
}
.viewScore .chart {
    width: 100%;
    height: 400px;
    border-bottom: 1px solid #eee;
}
</style>
