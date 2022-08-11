import Vue from 'vue'
import Vuex from 'vuex'
import { consultant } from './modules/consultant/consultant';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        consultant
    }
})