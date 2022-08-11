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
        type="pie"
        height="350"
        ref="radar"
        :options="chartOptions" 
        :series="series"
        class="pt-3 mx-auto"
      >
      </apexchart>
    </v-card>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

import { organizeByConsultants } from "../assets/js/util";
import { calculationsOfAmounts } from "../assets/js/util";
import { alertDinamic } from '../assets/js/util';

export default {
  props: ['parentData'],
  components: {
    apexchart: VueApexCharts
  },
  data: () => ({
    status: true,
    loading: false,
    series: [],
    chartOptions: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      title: {
        text: 'Porcentaje de receita líquida generada por cada consultor',
        align: 'left',
        offsetX: 10
      },
    },
  }),
  watch:{
    parentData(){
      if(this.parentData.length > 0) {
        this.initialize();
      }
      else{
        this.$emit("resetComponentValue", '');
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
  mounted() {
    organizeByConsultants;
    calculationsOfAmounts;
    alertDinamic;
  },
  methods: {
    async initialize(){

      this.loading = true;

      const itemConsultants = this.parentData.map((v) => {
        return v.co_usuario
      });
      
      const request = {
        item_consultants: itemConsultants
      };
      try {
        const response = await this.$store.dispatch("consultant/CONSULTANT_NET_EARNINGS", request);//response service

        const dataConsultan = response.data;
        const sizeData = dataConsultan.length;

        if(sizeData > 0){
          const itemsSelect = this.parentData;
          const dataOrganizeConsultant = organizeByConsultants(dataConsultan, itemsSelect);

          let nameConsultan = [];
          let sumConsultan = [];

          for (let key in dataOrganizeConsultant){
            let suma = calculationsOfAmounts(dataOrganizeConsultant[key],'total_net_earnings');
            let total = parseInt(suma/dataOrganizeConsultant[key].length);
            nameConsultan.push(dataOrganizeConsultant[key][0].name);
            sumConsultan.push(total);
          }

          this.$refs.radar.updateOptions({
            series: sumConsultan,
            labels: nameConsultan
          });
          this.loading = false;
          // alertDinamic('success', 'Éxito', 'Registros encontrados con éxito.');
        }
        else{
          alertDinamic('error', 'Error', 'No posee registros.');
          this.$emit("resetComponentValue", '');
        }
      } catch (error) {
        console.log(error);
      }
    },
    organizeByConsultants,
    calculationsOfAmounts
  },
}
</script>