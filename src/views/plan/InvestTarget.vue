<template>
  <div class="invest-target">
    <div class="foot">国网新疆电力有限公司</div>
    <div class="page-title">
      疫情防控期间公司电量及企业复工生产情况
    </div>
    <div class="page-time">数据截止：{{bannerData.year}}年{{bannerData.month}}月{{bannerData.day}}日</div>
    <div class="page-banner">
      <div class="banner-detail">
         <div class="banner-rect">
           <div class="unit">（万千瓦）</div>
           <div class="left-title">同期最大负荷</div>
           <div class="bottom-value">{{bannerData.maxLoadTheSameTime}}<span style="font-weight:bold;" v-if="!bannerData.maxLoadTheSameTime">--</span></div>
         </div>
         <div class="banner-rect">
           <div class="unit">（万千瓦）</div>
           <div class="left-title">当日最大负荷</div>
           <div class="bottom-value">{{bannerData.maxLoadDayValue}} <span style="font-weight:bold;" v-if="!bannerData.maxLoadDayValue">--</span>
              <span v-if="bannerData.maxLoadComparedToPre>0" style="color:#E0E957">{{bannerData.maxLoadComparedToPre}}% <span>&uarr;</span></span>
              <span v-else-if="bannerData.maxLoadComparedToPre" style="color:#85F6C8">{{bannerData.maxLoadComparedToPre}}% &darr;</span>
           </div>
         </div>
      </div>
      <div class="banner-detail">
         <div class="banner-rect">
           <div class="unit">（万千瓦时）</div>
           <div class="left-title">同期电量</div>
           <div class="bottom-value">{{bannerData.powerSaleTheSameTime}}<span style="font-weight:bold;" v-if="!bannerData.powerSaleTheSameTime">--</span></div>
         </div>
         <div class="banner-rect">
           <div class="unit">（万千瓦时）</div>
           <div class="left-title">当日电量</div>
           <div class="bottom-value">{{bannerData.powerSaleDayValue}} <span style="font-weight:bold;" v-if="!bannerData.powerSaleDayValue">--</span>
              <span v-if="bannerData.powerSaleComparedToPre>0" style="color:#E0E957">{{bannerData.powerSaleComparedToPre}}% <span>&uarr;</span></span>
              <span v-else-if="bannerData.powerSaleComparedToPre" style="color:#85F6C8">{{bannerData.powerSaleComparedToPre}}% &darr;</span>
           </div>
         </div>
      </div>
      <div class="banner-detail">
         <div class="banner-rect small">
           <div class="left-title">企业复工率</div>
           <!-- <div v-if="bannerData.returnNum" class="value" style="color:#38D7AC">{{bannerData.returnNum}}%</div>
           <div v-else class="value" style="color:#38D7AC">--</div> -->
           <div class="bottom-value"><span class="value" v-if="bannerData.returnNum">{{bannerData.returnNum}}%</span> <span style="font-weight:bold;" v-else>--</span>
              <span v-if="bannerData.returnNumComparedToPre>0" style="color:#E0E957">{{bannerData.returnNumComparedToPre}} <span>&uarr;</span></span>
              <span v-else-if="bannerData.returnNumComparedToPre" style="color:#85F6C8">{{bannerData.returnNumComparedToPre}} &darr;</span>
           </div>
         </div>
         <div class="banner-rect small">
           <div class="left-title">企业复产率</div>
           <!-- <div v-if="bannerData.returnRate" class="value" style="color:#E43B08">{{bannerData.returnRate}}%</div>
           <div v-else class="value" style="color:#E43B08">--</div> -->
           <div class="bottom-value"><span class="value" v-if="bannerData.returnRate">{{bannerData.returnRate}}%</span> <span style="font-weight:bold;" v-else>--</span>
              <span v-if="bannerData.returnRateComparedToPre>0" style="color:#E0E957">{{bannerData.returnRateComparedToPre}} <span>&uarr;</span></span>
              <span v-else-if="bannerData.returnRateComparedToPre" style="color:#85F6C8">{{bannerData.returnRateComparedToPre}} &darr;</span>
           </div>
         </div>
      </div>
    </div>
    <div class="page-content">
      <div class="content-side">
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
      </div>
      <div class="content-middle">
        <!-- <div class="content-title">各地州复工复产情况</div> -->
        <!-- <div class="map-chart" :options="option"></div> -->
        <!-- <div class="map-chart-frame">
          <v-chart class="map-chart" :options="option"></v-chart>
          <div class="map-label">
            <div>复工率:</div>
            <div class="map-radio radio1"></div>
            <p>81%~100%</p>
            <div class="map-radio radio2"></div>
            <p>61%~80%</p>
            <div class="map-radio" style="background:#37D3C2"></div>
            <p>41%~60%</p>
            <div class="map-radio" style="background:#4DEC60"></div>
            <p>21%~40%</p>
            <div class="map-radio" style="background:#E5E72D"></div>
            <p>0%~20%</p>
          </div>
        </div> -->
        <!-- <div class="map-line-frame">
          <v-chart class="map-bar-chart" :options="mapBarOption"></v-chart>
        </div> -->

        <div class="content-title">各行业企业复工复产率</div>
        <v-chart class="bar-chart" :options="trendOption"></v-chart>
        <div class="content-title">防疫复工外部信息动态</div>
        <div>
          <div class="news-title">
            <div class="title1" :class="{'active': newsType === 1}" @click=changeNews(1)>国家政策动态</div>
            <div class="title2" :class="{'active': newsType === 2}" @click=changeNews(2)>自治区政策动态</div>
            <div class="title3" :class="{'active': newsType === 3}" @click=changeNews(3)>能源政策动态</div>
          </div>
          <div class="news-content">
            <div v-for="(item,index) in theNewsList" :key=index class="news" @click=showNews(item.title,item.content)>{{item.title}}</div>
          </div>
        </div>
      </div>
      <div class="content-side">
        <div class="content-title">10kV及以上一般工商业</div>
        <div class="banner-detail">
          <div class="banner-rect medium">
            <div class="title">当日电量</div>
            <div class="value">{{bannerData.industryPowerSaleDayValue}} <span style="font-weight:bold;" v-if="!bannerData.industryPowerSaleDayValue">--</span>
              <span v-if="bannerData.industryPowerSaleComparedToPre>0" style="color:#E0E957">{{bannerData.industryPowerSaleComparedToPre}}% <span>&uarr;</span></span>
              <span v-else-if="bannerData.industryPowerSaleComparedToPre" style="color:#85F6C8">{{bannerData.industryPowerSaleComparedToPre}}% &darr;</span>
            </div>
          </div>
          <div class="banner-rect mini">
            <div class="title">复工率</div>
            <div v-if="bannerData.industryReturnRate" class="value">{{bannerData.industryReturnRate}}%</div>
            <div v-else class="value">--</div>
          </div>
        </div>
        <v-chart class="chart-top" :options="topOption2"></v-chart>
        <v-chart class="chart-top" :options="bottomOption2"></v-chart>
      </div>
    </div>
    <div class="news-content-frame" v-if=showNewsFrame @click=closeNews>
      <div @click.stop class="frame">
        <div class="close" @click=closeNews></div>
        <div class="title">{{newsTitle}}</div>
        <div v-html="newsContent"></div>
      </div>
    </div>
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
//require('./data/china.js')
export default {
  name: 'home',
  data() {
    return {
      options: [],
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
      theNewsList: []
    }
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
    // 地图
    this.option = {
        //backgroundColor: '#022036',
        // title: {
        //     text: '全国主要城市空气质量',
        //     subtext: 'data from PM25.in',
        //     sublink: 'http://www.pm25.in',
        //     left: 'center',
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        tooltip : {
            trigger: 'item',
            formatter: function (params,ticket,callback) {
              const data = params.data
              return data.name + ': ' + data.percent + '%'
            }
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x:'right',
        //     data:['pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        geo: {
            map: 'xinjiang',
            label: {
              // show: true,
              color: '#717F8B',
                emphasis: {
                    show: true,
                    color: '#ddd',
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    borderColor: 'rgba(147, 235, 248, 1)',
                    borderWidth: 1,
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.9,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(128, 217, 248, 1)',
                    // shadowColor: 'rgba(255, 255, 255, 1)',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                },
                emphasis: {
                    areaColor: '#389BB7',
                    borderWidth: 0
                }
            }
        },
        series : [
            {
                name: '复工率',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.convertData(mapValue1),
                symbolSize: function (val) {
                    return val[2] / 5;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#3779D3'
                    }
                }
            },
            {
                name: '复工率',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.convertData(mapValue2),
                symbolSize: function (val) {
                    return val[2] / 5;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#37ACD3'
                    }
                }
            },
            {
                name: '复工率',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.convertData(mapValue3),
                symbolSize: function (val) {
                    return val[2] / 5;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#37D3C2'
                    }
                }
            },
            {
                name: '复工率',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.convertData(mapValue4),
                symbolSize: function (val) {
                    return val[2] / 4;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#4DEC60'
                    }
                }
            },
            {
                name: '复工率',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.convertData(mapValue5),
                symbolSize: function (val) {
                    return val[2] / 2;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#E5E72D'
                    }
                }
            },
            {
                // name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: this.convertData(mapValue1),
                // data: this.convertData(mapValue1.sort(function (a, b) {
                //     return b.value - a.value;
                // }).slice(0, 6)),
                symbolSize: function (val) {
                    return val[2] / 5;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#3779D3',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            },
            {
                // name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: this.convertData(mapValue2),
                // data: this.convertData(mapValue1.sort(function (a, b) {
                //     return b.value - a.value;
                // }).slice(0, 6)),
                symbolSize: function (val) {
                    return val[2] / 5;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#37ACD3',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
      }
    const curRouter = this.$router.history.current.name;
    const mapBar_x = ['克孜勒苏','塔城','伊犁','喀什','乌鲁木齐']
    const mapBar_y = [43,45,61,81,82]
    // 地图侧边栏
    this.mapBarOption =  {
          title: {
            text: '各地州复工率排行',
            textStyle: {
              color: '#B2DBE9',
              fontSize: 12
            },
            //padding: 10
          },
          tooltip: {
            trigger: 'axis',
            formatter: "{a}<br/>{b} : {c}%",
            textStyle: {
              align: 'left'
            }
          },
          calculable : true,
          // legend: {
          //   data: ['完成','计划'],
          //   x: 'right',
          //   y: 'top',
          //   padding: [0,20,0,0],
          //   textStyle: {
          //     color: '#77bde1'
          //   }
          // },
          xAxis: [{
            show: false,
            type : 'value',
            // boundaryGap : [0, 0.01],
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
              show: false,
              lineStyle: {
                color: '#50586c'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#77bde1',
                fontSize: 10
              }
            }
          }],
          yAxis: [{
            type : 'category',
            data : mapBar_x,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#50586c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#77bde1',
                fontSize: 10
              }
            }
          }],
          grid: {
            //x: '2%',
            // width: '45%'
            left: '3%',
            right: '10%',
            top: '18%',
            bottom: '0%',
            containLabel: true
          },
          series: [{
            name:'复工率',
            type:'bar',
            data: mapBar_y,
            barWidth: 5,
            itemStyle: {
                normal: {
                    //每根柱子颜色设置
                    color: function(params) {
                      if (params.value >= 81) {
                        return '#3779D3'
                      } else if (params.value >= 61) {
                        return '#37ACD3'
                      } else if (params.value >= 41) {
                        return '#37D3C2'
                      } else if (params.value >= 21) {
                        return '#4DEC60'
                      } else {
                        return '#E5E72D'
                      }
                        // let colorList = [
                        //     "#c23531",
                        //     "#2f4554",
                        //     "#61a0a8",
                        //     "#d48265",
                        //     "#91c7ae",
                        //     "#749f83",
                        //     "#ca8622",
                        //     "#bda29a",
                        //     "#6e7074",
                        //     "#546570",
                        //     "#c4ccd3",
                        //     "#4BABDE",
                        //     "#FFDE76",
                        //     "#E43C59",
                        //     "#37A2DA"
                        // ];
                        // return colorList[params.dataIndex];
                    }
                }
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                color: '#fff',
                fontSize: 10,
                formatter: "{c}%"
              }
            },
          }]
        };
    this.getPageData();
  },
  methods: {
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
      })
      
      this.topOption = this.showLine(5000,'用电趋势', bigCompany_x, bigCompany_y1,bigCompany_y2)
      this.bottomOption = this.showLineBar('复工趋势', bigCompany_x, bigCompany_y3, bigCompany_y4)

      this.topOption2 = this.showLine(4000,'用电趋势', normalCompany_x, normalCompany_y1,normalCompany_y2)
      this.bottomOption2 = this.showLineBar('复工趋势', normalCompany_x, normalCompany_y3, normalCompany_y4)

      const returnProductionList = data.returnProductionList || []
      let percent_x = []
      let percent_y1 = []
      let percent_y2 = []
      returnProductionList.map((item) => {
        percent_x.push(item.name || '')
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
            data: ['复产率','复工率'],
            x: 'right',
            y: 'top',
            //padding: [0,10,0,0],
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
            min: function (value) {
              return parseInt(value.min - 10);
            },
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
                color: '#77bde1',
                fontSize: 10
              }
            }
          }],
          grid: {
            //x: '2%',
            // width: '45%'
            left: '5%',
            top: '14%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          series: [{
            name:'复产率',
            type:'bar',
            data: percent_y1,
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
                        offset: 0, color: '#79ADF5' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#4178C3' // 100% 处的颜色
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
          },{
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
            top: '28%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          legend: {
            data: ['2020年','2019年'],
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
            min: function (value) {
              return parseInt(value.min - 1000);
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
              name:'2020年',
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
              name:'2019年',
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
            top: '33%',
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
  .invest-target {
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
      padding-right: 65px;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(119,189,225,1);
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
      .banner-rect {
        position: relative;
        width:220px;
        height:80px;
        background:rgba(54,102,161,0.15);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border:2px solid rgba(22,83,148,0.8);
        .unit {
          position: absolute;
          top: 10px;
          right: 0;
          font-size:10px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(218,234,254,1);
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
        .title {
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(218,234,254,1);
        }
        .bottom-value {
          position: absolute;
          bottom: 6px;
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
          font-size:25px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(152,208,255,1);
          //margin-right: 20px;
          .value {
            font-size:25px !important;
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
      .content-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        width:390px;
        height:65vh;
        background:rgba(54,102,161,0.15);
        .content-title {
          margin-bottom: 5px;
          width: 100%;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(197,237,248,1);
          width:390px;
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
        width:544px;
        height:65vh;
        background:rgba(54,102,161,0.15);
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
        .news-title {
          display: flex;
          justify-content: space-around;
          margin: 15px 50px;
          font-size:14px;
          font-family:Microsoft YaHei;
          color:rgba(230,243,139,1);
          .active {
            font-weight: bold;
            position: relative;
            &:before {
              content: '';
              position: absolute;
              bottom: -4px;
              left: 50%;
              margin-left: -35px;
              width:70px;
              height:2px;
              background:rgba(228,238,162,1);
              border-radius:1px;
            }
          }
        }
        .news-content {
          width: 504px;
          height: 22vh;
          overflow-y: scroll;
          padding-left: 20px;
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
      .medium {
        width: 204px !important;
        height: 70px !important;
        .value {
          font-size: 22px;
        }
      }
      .mini {
        width: 136px !important;
        height: 70px !important;
        .value {
          font-size: 22px;
        }
      }
    }

    .chart-top {
      width: 380px;
      height: 25vh;
    }

    .bar-chart {
      width: 540px;
      height: 28vh;
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

    .news-content-frame {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background:rgba(0,0,0,0.48);
      .close {
        position: absolute;
        top: 10px;
        right: 30px;
        width: 24px;
        height: 24px;
        background-image: url(../../assets/img/frame-close.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .frame {
        position: relative;
        width: 720px;
        height: 70%;
        overflow-y: scroll;
        background-color: #163044;
        background-image: url(../../assets/img/frame-bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 30px 50px;
        box-sizing: border-box;
        color: #D7E6F8;
        font-size:16px;
        line-height: 28px;
        font-family: Microsoft YaHei;
        text-align: left;
        text-align: justify;
        .title {
          font-weight:bold;
          font-size:20px;
          margin-bottom: 5px;
          text-align: center;
        }
      }
    }

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

