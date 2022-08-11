<template>
  <div>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      bottom
      color="deep-purple accent-4"
    ></v-progress-linear>
    <v-simple-table 
      dense
      class="mt-2"
    >
      <template v-slot:default>
        <tbody
          v-for="(listConsultant, i) in perfConsultants"
          :key="i"
        >
          <tr>
            <td colspan="5" class="border border-secondary table-active">
              <span>{{ listConsultant[0].name }}</span>
            </td>
          </tr>
          <tr >
            <td class="text-center border border-secondary" >
              <strong>Periodo</strong>
            </td>
            <td class="text-center border border-secondary">
              <strong>Ganancias Netas</strong>
            </td>
            <td class="text-center border border-secondary">
              <strong>Costo Fijo</strong>
            </td>
            <td class="text-center border border-secondary">
              <strong>Comisión</strong>
            </td>
            <td class="text-center border border-secondary">
              <strong>Beneficio</strong>
            </td>
          </tr>
          <tr
            v-for="(dataConsultant, i) in listConsultant"
            :key="i"
          >
            <td class="border border-secondary contentCapitalize" style="width: 250px;">{{ formatMonth(dataConsultant.month) }}</td>
            <td class="text-right border border-secondary">R$ {{ formatAmounts(dataConsultant.total_net_earnings)}}</td>
            <td class="text-right border border-secondary">R$ {{ formatAmounts(dataConsultant.fixed_cost) }}</td>
            <td class="text-right border border-secondary">R$ {{ formatAmounts(dataConsultant.total_commission) }}</td>
            <td class="text-right border border-secondary">R$ {{ formatAmounts(dataConsultant.total_lucro) }}</td>
          </tr>
          <tr>
              <td class="border border-secondary table-active" style="width: 250px;"><strong>SALDO</strong></td>
              <td class="text-right border border-secondary table-active">R$ {{ formatAmounts(calculationsOfAmounts(listConsultant,'total_net_earnings')) }}</td>
              <td class="text-right border border-secondary table-active">R$ {{ formatAmounts(calculationsOfAmounts(listConsultant,'fixed_cost')) }}</td>
              <td class="text-right border border-secondary table-active">R$ {{ formatAmounts(calculationsOfAmounts(listConsultant,'total_commission')) }}</td>
              <td class="text-right border border-secondary table-active">R$ {{ formatAmounts(calculationsOfAmounts(listConsultant,'total_lucro',false)) }}</td>
          </tr>
          <tr class="espacio"></tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>

import { formatMonth } from '../assets/js/util';
import { calculationsOfAmounts } from '../assets/js/util';
import { formatAmounts } from '../assets/js/util';
import { organizeByConsultants } from '../assets/js/util';
import { alertDinamic } from '../assets/js/util';

export default {
  props: ['parentData'],
  data: () => ({
    perfConsultants: [],
    loading: false,
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
  mounted() {
    organizeByConsultants;
    formatMonth;
    calculationsOfAmounts;
    formatAmounts;
    alertDinamic;
  },
  methods: {
    async initialize(){

      this.loading = true;

      const itemConsultants = this.parentData.map((v) => {
          return v.co_usuario;
      });

      const request = {
        item_consultants: itemConsultants
      };
      
      try {
        const response = await this.$store.dispatch('consultant/CONSULTANT_SHOW', request);

        const dataConsultan = response.data;
        const sizeData = dataConsultan.length;
        console.log(response)

        if(sizeData > 0)
        {
          const itemsSelect = this.parentData;
          const dataOrganizeConsultant = organizeByConsultants(dataConsultan, itemsSelect);

          this.loading = false;

          this.perfConsultants = dataOrganizeConsultant;
          // alertDinamic('success', 'Éxito','Registros encontrados con éxito.');

        }else{
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

<style scoped lang="scss">
  tbody {
    tr:hover{
      background-color: transparent !important;
    }
  }
  .contentCapitalize{
    text-transform: capitalize;
  }
  .espacio{
    height:10px !important;
  }
</style>
