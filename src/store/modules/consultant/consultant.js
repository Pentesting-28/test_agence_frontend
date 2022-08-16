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
                const response = await Api.get(`/api/v1/consultant`);
                // console.log(response, 'consultant index')
                console.log('update', response)
                commit("SET_CONSULTANTS", response.data);
                return response;
                // const response = await fetch(
                //     'https://consultanttestagence.000webhostapp.com/test_agence_backend/public/api/v1/consultant'
                //     ,{
                //         method: 'GET',
                //         // headers: {
                //         //     // 'Access-Control-Allow-Origin': '*',
                //         //     Accept: "application/json",
                //         //     'Content-Type': "application/json",

                //         // },
                //     }
                // );
                // if (!response.ok) {
                //     throw new Error(`HTTP error! status: ${response.status}`);
                // }
                // const data = await response.json();
                // console.log('update', data)
                // commit("SET_CONSULTANTS", data);
                // return data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async CONSULTANT_SHOW({ commit }, payload) {
            try {
                // const response = await Api.post('/api/v1/consultant/performance', payload);
                // commit("SET_CONSULTANTS_SHOW", response.data.data);
                // console.log(response.data)
                // return response.data;
                // console.log('rescurso deploy');
                
                // const response = await fetch('https://consultanttestagence.000webhostapp.com/test_agence_backend/public/api/v1/consultant/performance', {
                //     method: 'POST',
                //     body: JSON.stringify(payload),
                //     headers: {
                //         Accept: "application/json",
                //         'Content-Type': 'application/json',
                //     },
                // });
                let raw = JSON.stringify(payload);

                const response = await fetch("https://consultanttestagence.000webhostapp.com/test_agence_backend/public/api/v1/consultant/performance", {
                    "headers": {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "content-type": "application/json"
                    },
                    "body": raw,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                });/*.then(r => r.text()).then(r => console.log(r)).catch(e => console.error(e))*/
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('responseData', data);
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