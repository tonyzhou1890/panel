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
    console.log(this.$refs.summarychart);
  },
  methods: {
    drawSummary(){
      console.log(this.$refs.summarychart);
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
      console.log(this.hardDisk);
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
    }
  },
  mounted(){
    this.drawSummary();
    this.drawSummaryV();
    this.drawCpu();
    this.drawHardDisk();
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
}
</style>
