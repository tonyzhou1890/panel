<template>
  <div class="detail">
    <div class="summary">
      <div class="title">
        <h2>摘要</h2>
      </div>
      <div class="chart" ref="summarychart"></div>
      <div class="chart" ref="summarychartv"></div>
    </div>
    <div class="cpu">
      <div class="title">
        <h2>cpu</h2>
      </div>
      <div class="chart" ref="cpuchart"></div>
    </div>
    <div class="hard-disk">
      <div class="title">
        <h2>硬盘读写</h2>
      </div>
      <div class="chart" ref="harddiskchart"></div>
    </div>
    <div class="memory">
      <div class="title">
        <h2>内存占用</h2>
      </div>
      <div class="chart" ref="memorychart"></div>
    </div>
    <div class="network">
      <div class="title">
        <h2>网络上传下载</h2>
      </div>
      <div class="chart" ref="networkchart"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      summary: [
        ['part','percent'],
        ['cpu',80],
        ['硬盘空间',50],
        ['内存',80],
        ['网络',30]
      ],
      cpu: [
        ['time','percent'],
        ['12:00',10],
        ['13:00',3],
        ['14:00',2],
        ['15:00',5],
        ['16:00',13],
        ['17:00',7],
        ['18:00',2]
      ],
      memory: [
        ['time','percent'],
        ['12:00',40],
        ['13:00',30],
        ['14:00',20],
        ['15:00',50],
        ['16:00',30],
        ['17:00',70],
        ['18:00',20],
        ['19:00',50]
      ],
      network: [
        ['time','upload','download'],
        ['12:00',40,10],
        ['13:00',30,3],
        ['14:00',20,0],
        ['15:00',50,12],
        ['16:00',30,6],
        ['17:00',70,0],
        ['18:00',20,10],
        ['19:00',50,20]
      ],
      
      el: {
        // summaryArea: this.$refs.summarychart
      }
    }
  },
  computed: {
    hardDisk: function(){
      let info = [['time','read','write']];
      for(let i = 0; i < 20; i++){
        info.push([
          12 + Math.floor(i*30/60) + ':' + (Array(2).join(0) + i*30%60).slice(-2), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)
        ])
      }
      return info;
    }
  },
  created(){
    // console.log(this.$refs.summarychart);
  },
  methods: {
    drawSummary(){
      // console.log(this.$refs.summarychart);
      let myChart = this.$echarts.init(this.$refs.summarychart);
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: this.summary
        },
        xAxis: [
          {
            type: 'category'
          }
        ],
        yAxis: {
          min: 0,
          max: 100,
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: 'gold'
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    drawSummaryV(){
      let myChart = this.$echarts.init(this.$refs.summarychartv);
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: this.summary
        },
        xAxis: {
          min: 0,
          max: 100,
        },
        yAxis: {
          type: 'category'
        },
        grid: {
          left: 60
        },
        series: [
          {
            name: 'percent',
            type: 'bar',
            itemStyle: {
              color: 'gold'
            },
            encode: {
              x: 'percent',
              y: 'part'
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    drawCpu(){
      let myChart = this.$echarts.init(this.$refs.cpuchart);
      let option = {
        legend: {},
        tooltip: {
          formatter: function(params){
            console.log(params);
            return params.data[1] + '%';
          }
        },
        dataset: {
          source: this.cpu
        },
        xAxis:{
          type: 'category'
        },
        yAxis: {},
        series: [
          {
            name: 'cpu 占用率',
            type: 'line',
            itemStyle: {
              color: 'blue'
            },
            symbolSize: 15
          }
        ]
      };
      myChart.setOption(option);
    },
    drawHardDisk(){
      // console.log(this.hardDisk);
      let myChart = this.$echarts.init(this.$refs.harddiskchart);
      let option = {
        legend: {},
        tooltip: {
          
        },
        dataset: {
          source: this.hardDisk
        },
        xAxis: [
          {
            type: 'category'
          }
        ],
        yAxis: {},
        series: [
          {
            name: '读取',
            type: 'line',
            itemStyle: {
              color: 'blue'
            },
            symbolSize: 15,
            tooltip: {
              formatter: function(params){
                return '读取<br>' + params.data[1] + 'K';
              }
            }
          },
          {
            name: '写入',
            type: 'line',
            itemStyle: {
              color: 'green'
            },
            symbolSize: 15,
            tooltip: {
              formatter: function(params){
                return '写入<br>' + params.data[2] + 'K';
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    drawMemory(){
      let myChart = this.$echarts.init(this.$refs.memorychart);
      let option = {
        title: {
          text: '内存占用比例',
          subtext: '百分比',
          x: 'center'
        },
        legend: {
          top: '12%'
        },
        tooltip: {
          formatter: "{a}<br /> {c}%"
        },
        dataset: {
          source: this.memory
        },
        series: [{
          name: '半径模式',
          type: 'pie',
          center: ['25%','40%'],
          radius: ['10%', '35%'],
          roseType: 'area'
        },
        {
          name: '面积模式',
          type: 'pie',
          center: ['75%','40%'],
          radius: ['10%','35%'],
          roseType: 'radius'
        }],
        color: ['#5959de','#7d7dec']
      };
      myChart.setOption(option);
    },
    drawNetwork(){
      // console.log(this.network);
      let myChart = this.$echarts.init(this.$refs.networkchart);
      
      let option = {
        backgroundColor: new this.$echarts.graphic.RadialGradient(.3, .3, .8, [{
          offset: 0,
          color: '#f7f8fa'
        },{
          offset: 1,
          color: '#cdd0d5'
        }]),
        title: {
          text: '网络上传下载',
          subtext: '单位：k',
          x: 'left'
        },
        legend: {
          x: 'right'
        },
        tooltip: {},
        dataset: {
          source: this.network
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {},
        series: [
          {
            name: 'upload',
            type: 'scatter',
            symbolSize: function(data){
              return data[1] + 20;
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(120,36,50,.5)',
              shadowOffsetY: 5,
              color: new this.$echarts.graphic.RadialGradient(.4, .3, 1, [{
                offset: 0,
                color: 'rgb(251,118,123)'
              },{
                offset: 1,
                color: 'rgb(204, 46,72)'
              }])
            },
            tooltip: {
              formatter: function(params){
                return params.seriesName + '<br />' + params.data[0] + ' : ' + params.data[1] + '%';
              }
            }
          },
          {
            name: 'download',
            type: 'scatter',
            symbolSize: function(data){
              return data[2] + 20;
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(25,100,150,.5)',
              shadowOffsetY: 5,
              color: new this.$echarts.graphic.RadialGradient(.4, .3, 1, [{
                offset: 0,
                color: 'rgb(129,227,238)'
              },{
                offset: 1,
                color: 'rgb(25, 183, 207)'
              }])
            },
            tooltip: {
              formatter: function(params){
                return params.seriesName + '<br />' + params.data[0] + ' : ' + params.data[2] + '%';
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted(){
    this.drawSummary();
    this.drawSummaryV();
    this.drawCpu();
    this.drawHardDisk();
    this.drawMemory();
    this.drawNetwork();
  }
}
</script>


<style lang="less" scoped>
@hborder: #90C;
@color: #333;
.detail {
  width: 100%;
  padding: 20px;
  .title {
    h2 {
      color: @color;
      font-size: 20px;
      padding-left: 5px;
      border-left: 2px solid @hborder;
    }
  }
  .summary {
    .chart {
      width: 400px;
      height: 400px;
      display: inline-block;
      &:nth-child(3){
        width: 600px;
      }
    }
  }
  .cpu, .hard-disk {
    .chart {
      width: 800px;
      height: 400px;
    }
  }
  .memory {
    .chart {
      width: 800px;
      height: 600px;
    }
  }
  .network {
    .chart {
      width: 600px;
      height: 400px;
    }
  }
}
</style>
