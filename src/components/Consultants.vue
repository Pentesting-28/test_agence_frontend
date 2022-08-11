<template>
  <v-container 
    class="justify-content-center grey lighten-5" fluid
  >
    <v-row
      no-gutters
      class="center"
    >
      <v-col
      cols="12"
      md="12"
      sm="12"
      >
        <v-card
          class="border pa-2 border-secondary"
          outlined
          tile
        >
          <v-simple-table >
            <template v-slot:default>
              <tbody class="text-center">
                <tr>
                  <th colspan="1" class="text-left border border-secondary table-active">Período</th>
                  <th scope="col" class="text-center border border-secondary"></th>
                  <th  scope="col" class="text-center border border-secondary">Acci&oacute;n</th>
                </tr>
                <tr class="border border-secondary">
                  <th scope="row" class="table-active">Consultores</th>
                  <td colspan="1" class="border border-secondary">
                    <v-row
                      no-gutters
                    >
                      <v-col cols="12" md="5" sm="12" class="p-2">
                        <select size="6" style="width: 223px;" class="border border-secondary" multiple v-model="itemBoxA">
                          <option
                            v-for="(boxA, i) in ItemsConsultants"
                            :key="i"
                            :value="boxA.co_usuario">
                            {{ boxA.no_usuario }}
                          </option>
                        </select>
                      </v-col>
                      <v-col cols="12" md="2" sm="12" class="p-4">
                        <div class="btn-group-vertical">
                          <v-btn
                          v-if="ItemsConsultants.length > 0"
                            depressed
                            x-small
                            color="primary"
                            class="mb-2"
                            @click="addConsultant()"
                          >
                            &gt;&gt;
                          </v-btn>
                          <v-btn
                            v-if="ItemsTotalSelect.length > 0"
                            depressed
                            x-small
                            color="error"
                            @click="removeConsultant()"
                          >
                            &lt;&lt;
                          </v-btn>
                        </div>
                      </v-col>
                      <v-col cols="12" md="5" sm="12" class="p-2">
                        <select size="6" style="width: 223px;" class="border border-secondary" multiple v-model="itemBoxB">
                          <option
                            v-for="(boxB, i) in ItemsTotalSelect"
                            :key="i"
                            :value="boxB.co_usuario"
                            style="width: 223px;">
                            {{ boxB.no_usuario }}
                          </option>
                        </select>
                      </v-col>
                    </v-row>
                  </td>
                  <td v-if="ItemsTotalSelect.length > 0">
                    <div class="text-center btn-group-vertical pa-5">
                      <v-btn
                        
                        depressed
                        x-small
                        color="secondary"
                        class="mb-2"
                        @click="switchComponent('performance-component')"
                      >
                        Relatório
                      </v-btn>
                      <v-btn
                        depressed
                        x-small
                        color="info"
                        class="mb-2"
                        @click="switchComponent('graph-bar-component')"
                      >
                        Gráfico Bar
                      </v-btn>
                      <v-btn
                        depressed
                        x-small
                        color="success"
                        @click="switchComponent('graph-pizza-component')"
                      >
                        Gráfico Pizza
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <component
            v-if="currentTabComponent" 
            :is="currentTabComponent"
            @resetComponentValue="switchComponent"
            :parentData="prepareItemsQuery">
          </component>
        </v-card> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { sortArrayItems } from '../assets/js/util';
import { alertDinamic } from '../assets/js/util';

import PerformanceComponent from './PerformanceConsultants';
import GraphBarComponent from './GraphBar';
import GraphPizzaComponent from './GraphPizza';

export default {
  components: {
    PerformanceComponent,
    GraphBarComponent,
    GraphPizzaComponent
  },
  data: () => ({
    prepareItemsQuery: [],
    itemBoxA: [],
    ItemsTotalSelect: [],
    itemBoxB: [],
    currentTabComponent: false,
  }),
  computed: {
    ItemsConsultants() {
      return this.$store.getters['consultant/GET_CONSULTANTS'];
    },
  },
  created () {
    this.initialize()
  },
  mounted(){
    sortArrayItems;
    alertDinamic;
  },
  methods: {
    async initialize () {
      try {
        const response = await this.$store.dispatch("consultant/INDEX_CONSULTANTS");
      } catch (error) {
        console.log(error);
      }
    },
    addConsultant() {
      try {
        const sizeSelect = this.itemBoxA.length;
        if(sizeSelect > 0){
          for (let index = 0; index < this.itemBoxA.length; index++){
            const position = this.ItemsConsultants.findIndex((element) => {
              return element.co_usuario === this.itemBoxA[index];
            });
            if (position !== undefined){
              this.ItemsTotalSelect.push(this.ItemsConsultants[position]);
              this.ItemsConsultants.splice(position, 1);
              sortArrayItems(this.ItemsTotalSelect);
            }
          }
        }else{
          alertDinamic('error', 'Error', 'Seleccione al menos un consultor del listado.');
        }
        
      } catch (error) {
        console.log(error)
      }
    },
    removeConsultant() {
      try {
        const sizeSelect = this.itemBoxB.length;
        if(sizeSelect > 0){
          for (let index = 0; index < this.itemBoxB.length; index++){
            const position = this.ItemsTotalSelect.findIndex((element) => {
              return element.co_usuario === this.itemBoxB[index];
            });
            if (position !== undefined){
              this.ItemsConsultants.push(this.ItemsTotalSelect[position]);
              this.ItemsTotalSelect.splice(position, 1);
              sortArrayItems(this.ItemsConsultants);
            }
          }
        }else{
          alertDinamic('error', 'Error', 'Seleccione al menos un consultor del listado.');
        }
      } catch (error) {
        console.log(error)
      }
    },
    switchComponent(nameComponent) {
      try {
        this.currentTabComponent = nameComponent;
        this.prepareItemsQuery = this.ItemsTotalSelect;
      } catch (error) {
        console.log(error)
      }
    },
    sortArrayItems
  },
}
</script>

<style scoped lang="scss">
  tbody {
    tr:hover{
      background-color: transparent !important;
    }
  }
</style>
