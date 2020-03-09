<template>
  <div class="return-sys">
    <div class="foot">国网新疆电力有限公司</div>
    <div class="page-title">
      疫情防控期间公司电量及企业复工生产情况
    </div>
    <div style="position: relative;width:100%;display:flex;justify-content:end-flex">
      <div class="page-time">数据截止：{{bannerData.year}}年{{bannerData.month}}月{{bannerData.day}}日 {{bannerData.week}}
        <div class="logo-click" @click=showTab></div>
        <div @click.stop class="close" v-if=showNewsFrame @click=closeNews></div>
        <div class="close-tab" v-if="showNewsTab" @click="closeTab"></div>
      </div>
      <div class="page-news" v-if="showNewsTab">
        <div class="page-news-content">
          <div class="content-title" v-if="!showNewsFrame">外部信息动态</div>
          <div v-for="(items,indexs) in newsList" :key=indexs  v-show="!showNewsFrame">
            <div class="news-title">{{items.type}}</div>
            <div class="news-content">
              <div v-for="(item,index) in items.detail" :key=index class="news" @click=showNews(item.title,item.content)>{{item.title}}</div>
            </div>
          </div>
          <div @click.stop class="frame" v-if=showNewsFrame>
            <div class="title" v-html="newsTitle"></div>
            <div v-html="newsContent"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="page-left">
        <div class="content-side">
          <div class="content-title">调度经营口径负荷</div>
          <div class="banner-detail">
            <div class="banner-rect">
              <div class="unit">（万千瓦）</div>
              <div class="left-title">当日最大负荷</div>
              <div class="bottom-value">{{bannerData.maxLoadDayValue}} <span style="font-weight:bold;" v-if="!bannerData.maxLoadDayValue">--</span>
                <span v-if="bannerData.maxLoadComparedToPre>0" style="color:#E0E957">{{bannerData.maxLoadComparedToPre}}% <span>&uarr;</span></span>
                <span v-else-if="bannerData.maxLoadComparedToPre" style="color:#85F6C8">{{bannerData.maxLoadComparedToPre}}% &darr;</span>
              </div>
            </div>
            <div class="banner-rect">
              <div class="unit">（万千瓦）</div>
              <div class="left-title">平均最大负荷</div>
              <div class="bottom-value">{{bannerData.averageMaxVol}} <span style="font-weight:bold;" v-if="!bannerData.averageMaxVol">--</span>
                <span v-if="bannerData.averageMaxVolComparedToPre>0" style="color:#E0E957">{{bannerData.averageMaxVolComparedToPre}}% <span>&uarr;</span></span>
                <span v-else-if="bannerData.averageMaxVolComparedToPre" style="color:#85F6C8">{{bannerData.averageMaxVolComparedToPre}}% &darr;</span>
              </div>
            </div>
          </div>
          <v-chart class="chart-top" :options="lefttopOption"></v-chart>
        </div>
        <div class="content-side title-margin">
          <div class="content-title">用电量</div>
          <div class="banner-detail">
            <div class="banner-rect">
              <div class="unit">（万千瓦时）</div>
              <div class="left-title">当日用电量</div>
              <div class="bottom-value">{{bannerData.powerSaleDayValue}} <span style="font-weight:bold;" v-if="!bannerData.powerSaleDayValue">--</span>
                <span v-if="bannerData.powerSaleComparedToPre>0" style="color:#E0E957">{{bannerData.powerSaleComparedToPre}}% <span>&uarr;</span></span>
                <span v-else-if="bannerData.powerSaleComparedToPre" style="color:#85F6C8">{{bannerData.powerSaleComparedToPre}}% &darr;</span>
              </div>
            </div>
            <div class="banner-rect">
              <div class="unit">（万千瓦时）</div>
              <div class="left-title">累计用电量</div>
              <div class="bottom-value">{{bannerData.totalUsedPower}} <span style="font-weight:bold;" v-if="!bannerData.totalUsedPower">--</span>
                <span v-if="bannerData.totalUsedPowerComparedToPre >0" style="color:#E0E957">{{bannerData.totalUsedPowerComparedToPre }}% <span>&uarr;</span></span>
                <span v-else-if="bannerData.totalUsedPowerComparedToPre " style="color:#85F6C8">{{bannerData.totalUsedPowerComparedToPre }}% &darr;</span>
              </div>
            </div>
          </div>
          <v-chart class="chart-top" :options="leftbottomOption"></v-chart>
          <!-- <v-chart class="chart-top" :options="bottomOption"></v-chart> -->
        </div>
      </div>
      <!-- <div class="content-side">
        <div class="content-title">大工业用户</div>
        <div class="banner-detail">
          <div class="banner-rect medium">
            <div class="title">当日电量</div>
            <div class="value">{{bannerData.bigIndustryPowerSaleDayValue}} <span style="font-weight:bold;" v-if="!bannerData.bigIndustryPowerSaleDayValue">--</span>
              <span v-if="bannerData.bigIndustryPowerSaleComparedToPre>0" style="color:#E0E957">{{bannerData.bigIndustryPowerSaleComparedToPre}}% <span>&uarr;</span></span>
              <span v-else-if="bannerData.bigIndustryPowerSaleComparedToPre" style="color:#85F6C8">{{bannerData.bigIndustryPowerSaleComparedToPre}}% &darr;</span>
            </div>
          </div>
          <div class="banner-rect mini">
            <div class="title">复工率</div>
            <div v-if="bannerData.bigIndustryReturnRate" class="value">{{bannerData.bigIndustryReturnRate}}%</div>
            <div v-else class="value">--</div>
          </div>
        </div>
        <v-chart class="chart-top" :options="topOption"></v-chart>
        <v-chart class="chart-top" :options="bottomOption"></v-chart>
      </div> -->
      <div class="content-middle">
        <div class="content-title long-title">企业复工态势</div>
        <div style="display:flex;">
          <div class="circel-percent">
            <div class="circle">
              <CircleProgress  
                v-if="bannerData.returnNum"
                :duration="1000"
                :delay="10"
                :radius="5"
                :progress="bannerData.returnNum"
                :isAnimation="true"
                barColor="#31C1EC"
              ></CircleProgress>
            </div>
            <div class="title">企业复工率</div>
            <div class="desc">较昨日 <span v-if="bannerData.returnNumComparedToPre>=0">+</span>
              {{bannerData.returnNumComparedToPre}}<span v-if="!bannerData.returnNumComparedToPre">--</span></div>
          </div>
          <v-chart class="bar-chart" :options="trendOption"></v-chart>
        </div>
        <div style="display:flex;">
          <div class="content-side content-side-short content-side-right">
            <div class="content-title">大工业用户</div>
            <div class="banner-detail">
              <div class="banner-rect medium">
                <div class="unit unit-top">（万千瓦时）</div>
                <div class="left-min-title">当日电量</div>
                <div class="value">{{bannerData.bigIndustryPowerSaleDayValue}} <span style="font-weight:bold;" v-if="!bannerData.bigIndustryPowerSaleDayValue">--</span>
                  <span v-if="bannerData.bigIndustryPowerSaleComparedToPre>0" style="color:#E0E957">{{bannerData.bigIndustryPowerSaleComparedToPre}}% <span>&uarr;</span></span>
                  <span v-else-if="bannerData.bigIndustryPowerSaleComparedToPre" style="color:#85F6C8">{{bannerData.bigIndustryPowerSaleComparedToPre}}% &darr;</span>
                </div>
              </div>
              <div class="banner-rect mini">
                <div class="left-min-title">复工率</div>
                <div v-if="bannerData.bigIndustryReturnRate" class="value">{{bannerData.bigIndustryReturnRate}}%</div>
                <div v-else class="value">--</div>
              </div>
            </div>
            <v-chart class="chart-top-short" :options="topOption"></v-chart>
            <v-chart class="chart-bottom-short" :options="bottomOption"></v-chart>
          </div>
          <div class="content-side content-side-short">
            <div class="content-title">10kV及以上一般工商业</div>
            <div class="banner-detail">
              <div class="banner-rect medium">
                <div class="unit unit-top">（万千瓦时）</div>
                <div class="left-min-title">当日电量</div>
                <div class="value">{{bannerData.industryPowerSaleDayValue}} <span style="font-weight:bold;" v-if="!bannerData.industryPowerSaleDayValue">--</span>
                  <span v-if="bannerData.industryPowerSaleComparedToPre>0" style="color:#E0E957">{{bannerData.industryPowerSaleComparedToPre}}% <span>&uarr;</span></span>
                  <span v-else-if="bannerData.industryPowerSaleComparedToPre" style="color:#85F6C8">{{bannerData.industryPowerSaleComparedToPre}}% &darr;</span>
                </div>
              </div>
              <div class="banner-rect mini">
                <div class="left-min-title">复工率</div>
                <div v-if="bannerData.industryReturnRate" class="value">{{bannerData.industryReturnRate}}%</div>
                <div v-else class="value">--</div>
              </div>
            </div>
            <v-chart class="chart-top-short" :options="topOption2"></v-chart>
            <v-chart class="chart-bottom-short" :options="bottomOption2"></v-chart>
          </div>
        </div>
      </div>
    </div>
  
    <!-- <div class="news-content-frame" v-if=showNewsFrame @click=closeNews>
      <div @click.stop class="frame">
        <div class="close" @click=closeNews></div>
        <div class="title">{{newsTitle}}</div>
        <div v-html="newsContent"></div>
      </div>
    </div> -->
    <!-- <div class="content">
      <div class="left">
        <div class='banner'>
          <div class="banner-title">{{fixedAssetInvest.label}}</div>
          <div class="banner-content">
            <div class="banner-rect" v-for="(item, index) in fixedAssetInvest.banner" :key=index>
              <div class="top">
                <div class="title">{{item.label}} {{item.unit}}</div>
                <div class="time" :style="{color:item.progress ==='进度滞后'?'#cb0000':'#00ff3c'}">{{item.progress}}</div>
              </div>
              <div class="value">{{item.data.fulfillRate}}</div>
              <div class="bottom">
                <div>
                  <div class="num">{{item.data.year}}</div>
                  <div class="desc">累计完成值</div>
                </div>
                <div>
                  <div class="num">{{item.data.plan}}</div>
                  <div class="desc">年度计划值</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-frame">
          <div class="title">{{capitalConst.label}}</div>
          <v-chart class="rank-chart" :options="trendOption"></v-chart>
        </div>
      </div>
      <div class="right">
        <div class="title">{{otherSpecialPlan.label}}</div>
        <v-chart class="rank-chart2" :options="trendOption2"></v-chart>
      </div>
    </div> -->
  </div>
</template>

<script>
import { yearMonth } from '../../components/utils';
import { bigCompany, normalCompany, percent } from './data/bigCompany'
import { mapValue1, mapValue2, mapValue3, mapValue4, mapValue5, geoCoordMap } from './data/mapData'
import CircleProgress  from 'vue-circleprogressbar';
//require('./data/china.js')
export default {
  name: 'home',
  data() {
    return {
      showNewsTab: false,
      options: {},
      timeOptions: [],
      timeValue: '2019-12',
      year: 2019,
      month: 12,
      value: '',
      yearLabel: '2019年',
      monthLabel: '12月',
      topOption: {},
      bottomOption: {},
      topOption2: {},
      bottomOption2: {},
      trendOption: {},
      mapBarOption: {},
      companyOptions: [],
      companyValue: 0,
      fixedAssetInvest: {},
      capitalConst: {},
      otherSpecialPlan: {},
      option: {},
      bannerData: {},
      newsType: 2,
      newsContent: '',
      showNewsFrame: false,
      newsList: [],
      theNewsList: [],
      lefttopOption: {},
      leftbottomOption: {}
    }
  },
  components: {
    CircleProgress
  },
  created() {
    if (sessionStorage.getItem('pc_view_login') != 1) {
      this.$router.replace({
        name: 'login'
      })
    }
  },
  mounted() {
    const water = sessionStorage.getItem('water')
    if (water) {
      this.$watermark.set('water1', water, 0)
      // watermark.set('water2', water, 250)
      const element = document.getElementById("water1")
      //element.style.display = 'none'
    }
    
    const curRouter = this.$router.history.current.name;
    const mapBar_x = ['克孜勒苏','塔城','伊犁','喀什','乌鲁木齐']
    const mapBar_y = [43,45,61,81,82]
    
    this.getPageData();
  },
  methods: {
    closeTab() {
      this.showNewsTab = false
    },
    showTab() {
      this.showNewsTab = true
    },
    changeNews(index) {
      this.newsType = index
      this.theNewsList = this.newsList[index-1].detail || []
    },
    showNews(title, content) {
      this.newsTitle = title
      this.newsContent = content
      this.showNewsFrame = true
    },
    closeNews() {
      this.showNewsFrame = false
    },
    convertData(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    percent: data[i].value,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    },
    getPageData() {
      this.$ajax({
        url: 'table/overview',
        data: {
          // year: 2020,
          // month: 2,
          // day: 10
        }
      }).then(res => {
        const data = res.data || {}
        this.handlePageData(data)
      })
    },
    handlePageData(data) {
      this.newsList = data.newsList || []
      this.theNewsList = this.newsList[1].detail || []
      this.bannerData = data.banner || {}
      const powerAndReturn = data.powerAndReturnChart || []
      let bigCompany_x = []
      let bigCompany_y1 = []
      let bigCompany_y2 = []
      let bigCompany_y3 = []
      let bigCompany_y4 = []

      let normalCompany_x = []
      let normalCompany_y1 = []
      let normalCompany_y2 = []
      let normalCompany_y3 = []
      let normalCompany_y4 = []

      let maxLoadDayValue = []
      let maxLoadTheSameTime = []

      let powerSaleTheSameTime = []
      let powerSaleDayValue = []

      powerAndReturn.map((item) => {
        bigCompany_x.push(item.month+'月'+item.day+'日' || '')
        bigCompany_y1.push(item.bigIndustryPowerSaleDayValue || '')
        bigCompany_y2.push(item.bigIndustryPowerSaleTheSameTime || '')
        bigCompany_y3.push(item.bigIndustryReturnRate || '')
        bigCompany_y4.push(item.bigIndustryReturnNum || '')

        normalCompany_x.push(item.month+'月'+item.day+'日' || '')
        normalCompany_y1.push(item.industryPowerSaleDayValue || '')
        normalCompany_y2.push(item.industryPowerSaleTheSameTime || '')
        normalCompany_y3.push(item.industryReturnRate || '')
        normalCompany_y4.push(item.industryReturnNum || '')

        maxLoadDayValue.push(item.maxLoadDayValue || '')
        maxLoadTheSameTime.push(item.maxLoadTheSameTime || '')

        powerSaleTheSameTime.push(item.powerSaleTheSameTime || '')
        powerSaleDayValue.push(item.powerSaleDayValue || '')
      })
      
      this.topOption = this.showLine(2000,'用电趋势', bigCompany_x, bigCompany_y2,bigCompany_y1)
      this.bottomOption = this.showLineBar('复工趋势', bigCompany_x, bigCompany_y3, bigCompany_y4)

      this.topOption2 = this.showLine(200,'用电趋势', normalCompany_x, normalCompany_y2,normalCompany_y1)
      this.bottomOption2 = this.showLineBar('复工趋势', normalCompany_x, normalCompany_y3, normalCompany_y4)

      this.lefttopOption = this.showLine(200,'当日最大负荷趋势', bigCompany_x, maxLoadTheSameTime,maxLoadDayValue)
      this.leftbottomOption = this.showLine(2000,'用电趋势', bigCompany_x, powerSaleTheSameTime,powerSaleDayValue)

      const returnProductionList = data.totalTrendList || []
      let percent_x = []
      let percent_y1 = []
      let percent_y2 = []
      returnProductionList.map((item) => {
        percent_x.push(item.month+'月'+item.day+'日' || '')
        percent_y1.push(item.returnRate || '')
        percent_y2.push(item.returnNum || '')
      })
      this.trendOption = {
          // title: {
          //   text: '基本建设',
          //   textStyle: {
          //     color: '#77bde1',
          //     fontSize: 22
          //   },
          //   padding: 10
          // },
          tooltip: {
            trigger: 'axis',
            formatter: "{b}<br/>{a0}: {c0}%</br>{a1}: {c1}%",
            textStyle: {
              align: 'left'
            }
          },
          calculable : true,
          legend: {
            //data: ['复产率','复工率'],
            data: ['复工率'],
            x: 'right',
            y: 'top',
            padding: [5,30,0,0],
            textStyle: {
              color: '#77bde1',
              fontSize:10
            },
            itemHeight: 10,
            itemWidth: 20
          },
          xAxis: [{
            type : 'category',
            data : percent_x,
            // boundaryGap : [0, 0.01],
            axisLine: {
              show: true,
              lineStyle: {
                color: '#BED5F2'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel:{
              interval:0,
              rotate:60,//倾斜度 -90 至 90 默认为0
              textStyle:{
                color: '#F1FBFE',
                fontSize: 10
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#50586c'
              }
            }
          }],
          yAxis: [{
            type : 'value',
            min: 63,
            // min: function (value) {
            //   return parseInt(value.min - 10);
            // },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#50586c'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#50586c'
              }
            },
            axisLabel: {
              formatter: '{value}%',
              textStyle: {
                color: '#F1FBFE',
                fontSize: 10
              }
            }
          }],
          grid: {
            //x: '2%',
            // width: '45%'
            left: '5%',
            top: '18%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          series: [
          //   {
          //   name:'复产率',
          //   type:'bar',
          //   data: percent_y1,
          //   barMaxWidth: 8,
          //   itemStyle: {
          //     normal: {
          //         color: {
          //           type: 'linear',
          //           x: 0,
          //           y: 0,
          //           x2: 0,
          //           y2: 1,
          //           colorStops: [{
          //               offset: 0, color: '#79ADF5' // 0% 处的颜色
          //           }, {
          //               offset: 1, color: '#4178C3' // 100% 处的颜色
          //           }],
          //           globalCoord: false // 缺省为 false
          //       }
          //     }
          // },
          //   label: {
          //     normal: {
          //       show: true,
          //       position: 'top',
          //       color: '#fff',
          //       fontSize: 14
          //     }
          //   },
          // },
          {
            name:'复工率',
            type:'bar',
            data: percent_y2,
            barMaxWidth: 8,
            itemStyle: {
              normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#60E0E2' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#2EAEAF' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
              }
          },
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'top',
            //     color: '#fff',
            //     fontSize: 14
            //   }
            // },
          }]
        };
    },
    showLine(minData,title, x,line1,line2,line3){
      return {
          title: {
            text: title,
            top: 10,
            textStyle: {
              color: '#C5EDF8',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          grid: {
            top: '33%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          legend: {
            data: ['2019年','2020年'],
            x: 'right',
            y: 'top',
            padding: 20,
            textStyle: {
              color: '#77bde1'
            },
            itemHeight: 10,
            itemWidth: 20
          },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: x,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#BED5F2'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#C5EDF8',
                fontSize: 9
              }
            }
          }],
          yAxis: [{
            type: 'value',
            min: function (value) {
              return parseInt(value.min - minData);
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#BED5F2'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#50586c'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#C5EDF8',
                fontSize: 10
              }
            }
          }],
          series: [
            {
              name:'2019年',
              type:'line',
              data: line1,
              smooth: true,
              symbol: "none",
              itemStyle: {
                color: '#2EB792',
                borderColor: '#2EB792'
              },
            },
            {
              name:'2020年',
              type:'line',
              data: line2,
              smooth: true,
              symbol: "none",
              itemStyle: {
                color: '#E9EB63',
                borderColor: '#E9EB63'
              },
            },
            {
              name:'2018',
              type:'line',
              data: line3,
              smooth: true,
              symbol: "none",
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            }
          ]
        }
    },
    showLineBar(title, x,line1,line2,line3){
      return {
          title: {
            text: title,
            textStyle: {
              color: '#C5EDF8',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: "{b}<br/>{a}: {c}%<br/>{a1}: {c1}",
            textStyle: {
              align: 'left'
            }
          },
          grid: {
            top: '38%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          legend: {
            data: ['复工率','复工用户数'],
            x: 'right',
            y: 'top',
            padding: 10,
            textStyle: {
              color: '#77bde1'
            },
            itemHeight: 10,
            itemWidth: 20
          },
          calculable : true,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: x,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#BED5F2'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#C5EDF8',
                fontSize: 9
              }
            }
          }],
          yAxis: [{
            type: 'value',
            name: '复工用户数',
            min: function (value) {
              return parseInt(value.min - 500);
            },
            nameTextStyle: {
              color: '#C5EDF8'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#BED5F2'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#50586c'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#C5EDF8',
                fontSize: 10
              }
            }
          },{
            type: 'value',
            name: '复工率',
            nameTextStyle: {
              color: '#C5EDF8'
            },
            max: function (value) {
              return parseInt(value.max + 2);
            },
            min: function (value) {
              return parseInt(value.min - 2);
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#8d8d8d'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#50586c'
              }
            },
            axisLabel: {
              formatter: '{value}%',
              textStyle: {
                color: '#C5EDF8',
                fontSize: 10
              }
            }
          }],
          series: [
            {
              name:'复工率',
              type:'line',
              data: line1,
              smooth: true,
              yAxisIndex: 1,
              symbol: "none",
              itemStyle: {
                color: '#E9EB63',
                borderColor: '#E9EB63'
              }
            },
            {
              name:'复工用户数',
              type:'bar',
              data: line2,
              barMaxWidth: 5,
              itemStyle: {
                normal: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: '#79ADF5' // 0% 处的颜色
                      }, {
                          offset: 1, color: '#4178C3' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                  }
                }
              },
            },
            {
              name:'2018',
              type:'line',
              data: line3,
              smooth: true,
              symbol: "none",
              itemStyle: {
                color: '#efea3d',
                borderColor: '#efea3d'
              },
            }
          ]
        }
    },
  }
}
</script>

<style lang="scss">
  .return-sys {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    overflow: hidden;
    .foot {
      position: absolute;
      right: 45px;
      bottom: 10px;
      font-size:12px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(223,235,255,1);
    }
    .page-title {
      margin-top: 29px;
      font-size:32px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:rgba(223,235,255,1);
      line-height:58px;
    }
    .page-time {
      width: 100%;
      text-align: right;
      padding-right: 80px;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(119,189,225,1);
      position: relative;
      .logo-click {
        position: absolute;
        top: -15px;
        right: 40px;
        width: 34px;
        height: 34px;
        z-index: 19;
      }
      .close {
        position: absolute;
        top: 40px;
        right: 50px;
        width: 16px;
        height: 16px;
        background-image: url(../../assets/img/frame-close.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        z-index: 11;
      }
      .close-tab {
        position: absolute;
        top: 40px;
        right: 50px;
        width: 16px;
        height: 16px;
        background-image: url(../../assets/img/frame-close.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        z-index: 10;
      }
      &:before {
        content: '';
        position: absolute;
        top: -15px;
        right: 40px;
        width: 34px;
        height: 34px;
        background-image: url(../../assets/img/news_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      &:after {
        content: '';
        position: absolute;
        top: -10px;
        right: 45px;
        width: 24px;
        height: 21px;
        background-image: url(../../assets/img/news_logo.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
    .page-banner {
      width:1350px;
      height:100px;
      background:rgba(54,102,161,0.15);
      display: flex;
      align-items: center;
      justify-content: space-around;
      //opacity:0.15;
      .small {
        width: 180px !important;
      }
      
    }
    .banner-detail {
      display: flex;
      width: 100%;
      margin-bottom: 6px;
      .banner-rect {
        position: relative;
        width:220px;
        height:80px;
        background:rgba(54,102,161,0.15);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border:2px solid rgba(22,83,148,0.8);
        margin-left: 10px;
        box-sizing: border-box;
        .unit {
          position: absolute;
          top: 10px;
          right: 0;
          font-size:10px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(218,234,254,1);
        }
        .unit-top {
          top: 2px !important;
        }
        .left-title {
          position: absolute;
          top: 10px;
          left: 12px;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(218,234,254,1);
        }
        .left-min-title {
          position: absolute;
          top: 0;
          left: 6px;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(218,234,254,1);
        }
        .title {
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(218,234,254,1);
        }
        .bottom-value {
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 7px 0 24px;
          box-sizing: border-box;
          font-size: 25px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(152,208,255,1);
          .value {
            font-size:25px !important;
            padding-bottom: 0 !important;
          }
          span {
            font-size:14px;
            padding-bottom: 5px;
          }
        }
        .value {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(152,208,255,1);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 7px 0 6px;
          box-sizing: border-box;
          //margin-right: 20px;
          .value {
            font-size:16px !important;
          }
          span {
            font-size:14px;
          }
        }
      }
    }
    .page-content {
      width:1350px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .page-left {
        display: flex;
        flex-direction: column;
      }
      .title-margin {
        margin-top: 10px;
      }
      .content-side-right {
        margin-right: 10px;
      }
      .content-side-short {
        box-sizing: border-box;
        margin-top: 10px;
        width:430px !important;
        height:52vh !important;
      }
      .content-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        width:470px;
        height:39vh;
        background:rgba(54,102,161,0.15);
        .content-title {
          margin-bottom: 5px;
          width: 100%;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(197,237,248,1);
          width:100%;
          height:28px;
          line-height: 28px;
          background:linear-gradient(90deg,rgba(41,98,138,1) 0%,rgba(21,56,94,1) 100%);
          box-shadow:0px 3px 8px 0px rgba(2,25,50,0.27);
          text-align: left;
          padding-left: 10px;
          box-sizing: border-box;
        }
      }
      .content-middle {
        position: relative;
        //width:544px;
        height:26vh;
        background:rgba(54,102,161,0.15);
        .long-title {
          width: 868px !important;
        }
        .content-title {
          width: 100%;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(197,237,248,1);
          height:28px;
          line-height: 28px;
          background:linear-gradient(90deg,rgba(41,98,138,1) 0%,rgba(21,56,94,1) 100%);
          box-shadow:0px 3px 8px 0px rgba(2,25,50,0.27);
          text-align: left;
          padding-left: 10px;
          box-sizing: border-box;
        }
      }
      .medium {
        width: 194px !important;
        height: 51px !important;
        .value {
          font-size: 16px;
        }
      }
      .mini {
        width: 98px !important;
        height: 51px !important;
        .value {
          font-size: 16px;
        }
      }
    }

    .chart-top {
      width: 460px;
      height: 25vh;
    }

    .chart-top-short {
      width: 400px;
      height: 25vh;
    }

    .chart-bottom-short {
      width: 400px;
      height: 31vh;
    }
    .circel-percent {
      box-sizing: border-box;
      margin-top: 5px;
      margin-left: 10px;
      width: 152px;
      height: 20vh;
      border: 2px solid rgba(21,75,133,1);
      display: flex;
      flex-direction: column;
      align-items: center;
      .circle {
        margin-top: 10px;
        margin-bottom: 4px;
        width: 12vh;
        height: 12vh;
      }
      .title {
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(197,237,248,1);
      }
      .desc {
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(197,237,248,1);
      }
    }
    .bar-chart {
      width: 700px;
      height: 22vh;
    }

    .map-line-frame {
      position: absolute;
      top: 28px;
      right: 0;
      width: 148px;
      height: 25vh;
      background:rgba(38,54,66,0.8);
      .map-bar-chart {
        margin-top: 3vh;
        width: 148px;
        height: 22vh;
      }
    }

    .map-chart-frame {
      //width: 600px;
      height: 28vh;
      overflow: hidden;
      position: relative;
      .map-label {
        box-sizing: border-box;
        margin-bottom: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        color: #B9E1EE;
        height: 24px;
        line-height: 24px;
        width: 100%;
        background:rgba(38,54,66,1);
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        text-align: left;
        padding-left: 20px;
        display: flex;
        align-items: center;
      }
      p {
        margin-right: 10px;
      }
      .map-radio {
        margin: 0 7px;
        width:10px;
        height:10px;
        border-radius: 50%;
      }
      .radio1 {
        width: 16px;
        height: 16px;
        background:url(../../assets/img/radio1.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .radio2 {
        width: 16px;
        height: 16px;
        background:url(../../assets/img/radio2.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }

    .page-news {
      position: absolute;
      top: 20px;
      right: 35px;
      width: 400px;
      height: 80vh;
      //background-color: #162E46;
      background-image: url(../../assets/img/newstab.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      z-index: 9;
      .page-news-content {
        padding-top: 10px;
        width: 400px;
        height: 79vh;
        overflow-y: scroll;
        position: relative;
      }
      .frame {
        position: relative;
        width: 400px;
        height: 80vh;
        overflow-y: scroll;
        // background-color: #163044;
        // background-image: url(../../assets/img/frame-bg.png);
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        padding: 30px 30px;
        box-sizing: border-box;
        color: #D7E6F8;
        font-size: 14px;
        line-height: 28px;
        font-family: Microsoft YaHei;
        text-align: left;
        text-align: justify;
        .title {
          font-weight:bold;
          font-size:20px;
          margin-bottom: 5px;
          text-align: center;
          font-weight:bold;
          padding: 0 30px;
        }
      }
      .content-title {
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top: 20px;
        //line-height:77px;
      }
      .news-title {
          display: flex;
          //justify-content: space-around;
          margin: 15px 10px 0;
          font-size:14px;
          font-family:Microsoft YaHei;
          color:rgba(230,243,139,1);
          // .active {
          //   font-weight: bold;
          //   position: relative;
          //   &:before {
          //     content: '';
          //     position: absolute;
          //     bottom: -4px;
          //     left: 50%;
          //     margin-left: -35px;
          //     width:70px;
          //     height:2px;
          //     background:rgba(228,238,162,1);
          //     border-radius:1px;
          //   }
          // }
        }
        .news-content {
          width: 400px;
          //height: 22vh;
          overflow-y: scroll;
          padding: 0 14px;
          box-sizing: border-box;
          .news {
            margin-left: 20px;
            margin-top: 5px;
            text-decoration:underline;
            text-decoration-color: #2286A8;
            font-size:12px;
            font-family:Microsoft YaHei;
            color:#E6FAFF;
            text-align: left;
            position: relative;
            &:before {
              content: '';
              position: absolute;
              top: 8px;
              left: 20px;
              margin-left: -35px;
              width:4px;
              height:4px;
              background:rgba(56,252,236,1);
            }
          }
        }
    
    }

    // .news-content-frame {
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   color: #fff;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   background:rgba(0,0,0,0.48);
    //   .close {
    //     position: absolute;
    //     top: 10px;
    //     right: 30px;
    //     width: 24px;
    //     height: 24px;
    //     background-image: url(../../assets/img/frame-close.png);
    //     background-size: 100% 100%;
    //     background-repeat: no-repeat;
    //   }
    //   .frame {
    //     position: relative;
    //     width: 720px;
    //     height: 70%;
    //     overflow-y: scroll;
    //     background-color: #163044;
    //     background-image: url(../../assets/img/frame-bg.png);
    //     background-size: 100% 100%;
    //     background-repeat: no-repeat;
    //     padding: 30px 50px;
    //     box-sizing: border-box;
    //     color: #D7E6F8;
    //     font-size:16px;
    //     line-height: 28px;
    //     font-family: Microsoft YaHei;
    //     text-align: left;
    //     text-align: justify;
    //     .title {
    //       font-weight:bold;
    //       font-size:20px;
    //       margin-bottom: 5px;
    //       text-align: center;
    //     }
    //   }
    // }

    .map-chart {
      width: 400px;
      height: 30vh;
      margin-left: 30px;
      margin-top: -20px;
    }
    
    .el-input__inner {
      background-color: #2b516c;
          border: 1px solid #2b516c;
    }
    .el-select .el-input.is-focus .el-input__inner {
      border-color: #2b516c;
    }
    .el-select .el-input__inner:focus {
      border-color: #2b516c;
    }
    .el-input__inner {
      color: #77bde1;
    }
  }

</style>

