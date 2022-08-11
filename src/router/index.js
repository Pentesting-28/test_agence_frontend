import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'consultantsComponent',
    component: () =>
        import ( /* webpackChunkName: "consultantsComponent" */ '../components/Consultants.vue'),
}, ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router