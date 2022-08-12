import Api from '../../../Services/index';

export const consultant = {
    namespaced: true,
    state: {
        consultants: [],
        showConsultants: [],
        netEarningsConsultants: [],
        netEarningsFixedCostConsultants: []
    },
    getters: {
        GET_CONSULTANTS(state) {
            return state.consultants;
        }
    },
    mutations: {
        SET_CONSULTANTS(state, payload) {
            state.consultants = payload.data;
        },
        SET_CONSULTANTS_SHOW(state, payload) {
            state.showConsultants = payload.data;
        },
        SET_CONSULTANTS_NET_EARNINGS(state, payload) {
            state.netEarningsConsultants = payload.data;
        },
        SET_CONSULTANTS_NET_EARNINGS_FIXED_COST(state, payload) {
            state.netEarningsFixedCostConsultants = payload.data;
        },
    },
    actions: {
        async INDEX_CONSULTANTS({ commit }) {
            try {
                // const response = await Api.get(`/api/v1/consultant`);
                // console.log(response, 'consultant index')
                // commit("SET_CONSULTANTS", response.data);
                // return response;
                // const headers = {
                //     Accept: "application/json",
                //     "Content-Type": "application/json",
                //     "X-localization": "es"
                // }
                const url = "http://agenceconsultant.42web.io/api/v1/consultant/";
                const response = await fetch(url,{
                    statusCode: 200,
                    method : "GET",
                    headers: {
                        "Access-Control-Allow-Headers" : "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST,GET"
                    },
                });
                // .then(response => response.json())
                // .then(data => (commit("SET_CONSULTANTS", data)));
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // const data = await response.json();
                // const url = "http://agenceconsultant.42web.io/api/v1/consultant/";
                // const headers = {
                //     "Access-Control-Allow-Origin": "https://pentesting-28.github.io/test_agence_frontend/",
                //     'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
                // }
                
                // const response = await fetch(url, {
                //     method : "GET",
                //     // mode: "cors",
                //     headers: headers
                // });
                // if (!response.ok) {
                //     throw new Error(`HTTP error! status: ${response.status}`);
                // }
                const data = await response.json();
                console.log(data);
                commit("SET_CONSULTANTS", data);
                return data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async CONSULTANT_SHOW({ commit }, payload) {
            try {
                // const response = await Api.post('/api/v1/consultant', payload);
                // commit("SET_CONSULTANTS_SHOW", response.data.data);
                // console.log(response.data)
                // return response.data;
                // let options = {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type':
                //             'application/json;charset=utf-8'
                //     },
                //     body: payload
                // }

                //  await fetch("https://consultanttestagence.000webhostapp.com/api/v1/consultant", options);
                const response = await fetch("http://agenceconsultant.42web.io/api/v1/consultant/", {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin' : 'http://172.16.31.43:8080',
                        // 'Access-Control-Allow-Methods':'POST, GET',
                        'Accept':'application/json',
                        'content-type':'application/json',
                        // 'Access-Control-Allow-Headers': "Origin, X-Api-Key, X-Requested-With, Access-Control-Allow-Headers, Content-Type, Accept, Authorization",
                        // 'cache-control': 'no-cache'
                    },
                    body: JSON.stringify(payload)
                } );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                commit("SET_CONSULTANTS_SHOW", data);

                return data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async CONSULTANT_NET_EARNINGS({ commit }, payload) {
            try {
                const response = await Api.post('/api/v1/consultant/total_net_earnings', payload);
                commit("SET_CONSULTANTS_NET_EARNINGS", response.data.data);
                return response.data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async CONSULTANT_NET_EARNINGS_FIXED_COST({ commit }, payload) {
            try {
                const response = await Api.post('/api/v1/consultant/total_net_earnings_fixed_cost', payload);
                commit("SET_CONSULTANTS_NET_EARNINGS_FIXED_COST", response.data.data);
                return response.data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
    }
}