<template>
  <div>
    <v-card 
      outlined
      class="my-4 mx-auto border border-secondary"
    >
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        color="deep-purple accent-4"
      ></v-progress-linear>
      <apexchart
        type="line"
        height="350"
        ref="radar"
        :options="chartOptions"
        :series="series">
      </apexchart>
    </v-card>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

import moment from 'moment';
import 'moment/locale/es';

import { formatMonth } from '../assets/js/util';
import { calculationsOfAmounts } from '../assets//js/util';
import { formatAmounts } from '../assets/js/util';
import { organizeByConsultants } from '../assets/js/util';
import { alertDinamic } from '../assets/js/util';

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: ['parentData'],
  data: () => ({
    series : [],
    loading: false,
    chartOptions: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: 'Desempeño de cada consultor y costo medio de todos',
        align: 'left',
        offsetX: 10
      },
      xaxis: {
        categories: [],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            },
            
          },
          title: {
            text: 'R$ Performance comercial',
            style: {
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          },
          max: 130.000,
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft',
          offsetY: 30,
          offsetX: 60
        },
        y:{
          formatter: function (val) {
            return '$ ' + val
          }
        }
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    },
 }),
 watch:{
  parentData(){
    if(this.parentData.length > 0) {
      this.initialize();
    }
    else{
      this.$emit('resetComponentValue', '');
    }
  },
  loading (val) {
    if (!val) return
    setTimeout(() => (this.loading = false), 10000)
  },
},
created() {
  this.initialize();
},
mounted(){
  organizeByConsultants;
  formatMonth;
  calculationsOfAmounts;
  formatAmounts;
  alertDinamic;
},
methods: {
  async initialize(){
    const itemConsultants = this.parentData.map((item) => {
      return item.co_usuario;
    });

    const request = {
      item_consultants: itemConsultants
    };

    try {
      this.loading = true;
      const response = await this.$store.dispatch('consultant/CONSULTANT_NET_EARNINGS_FIXED_COST', request);
    
      let dataOrganizeConsultant = [];
      
      const dataConsultan = response.data;
      const sizeData = dataConsultan.length;

      if(sizeData > 0){
        
        const itemsSelect = this.parentData;
        dataOrganizeConsultant = organizeByConsultants(dataConsultan, itemsSelect);

        let ObjectBar = [];
        let sumTotal = 0;
        let countMaxMonth = 0;

        for (const j in dataOrganizeConsultant) {

          let earningsData = [];

          moment.months().map((month) => {

            let searchMonth = dataOrganizeConsultant[j].find((index) => {

              let monthActual = parseInt(moment(index.month).format('M'));

              if(monthActual > countMaxMonth){
                countMaxMonth = monthActual;
              }

              return month === moment(index.month).format('MMMM');
            });

            if(searchMonth !== undefined){
              earningsData.push(formatAmounts(searchMonth.total_net_earnings));
            }
            else{
              earningsData.push(0);
            }
          });

          let dataPrepare = {
            name: dataOrganizeConsultant[j][0].name,
            type: 'column',
            data: earningsData
          };

          ObjectBar.push(dataPrepare);

          sumTotal += calculationsOfAmounts(dataOrganizeConsultant[j],'fixed_cost');
        }

        let totalConsultant = Object.keys(dataOrganizeConsultant).length;
        let resulAverage = sumTotal / totalConsultant;
        let average = Array(countMaxMonth).fill(formatAmounts(resulAverage));

        ObjectBar.push({
          name: 'Promedio',
          type: 'line',
          data: average
        });

        this.$refs.radar.updateOptions({
          series: ObjectBar,
          xaxis:{
            categories: moment.months().slice(0, countMaxMonth)
          }
        });
        
        this.loading = false;
        // alertDinamic('success', 'Éxito', 'Registros encontrados con éxito.');
      }
      else{
        alertDinamic('error', 'Error', 'No posee registros.');
        this.$emit('resetComponentValue', '');
      }
    } catch (error) {
      console.log(error);
    }
  },
  organizeByConsultants,
  formatMonth,
  calculationsOfAmounts,
  formatAmounts,
  alertDinamic
 },
}
</script>