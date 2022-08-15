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
                // // console.log(response, 'consultant index')
                // console.log('update', response)
                // commit("SET_CONSULTANTS", response.data);
                // return response;
                const response = await fetch(
                    'https://consultanttestagence.000webhostapp.com/test_agence_backend/public/api/v1/consultant'
                    ,{
                        method: 'GET',
                    //     headers: {
                    //         'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com',
                    //         'x-rapidapi-key': 'your_api_key'
                    //     }
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('update', data)
                commit("SET_CONSULTANTS", data);
                return data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async CONSULTANT_SHOW({ commit }, payload) {
            try {
                const response = await Api.post('/api/v1/consultant/hola', payload);
                commit("SET_CONSULTANTS_SHOW", response.data.data);
                console.log('update',response.data)
                return response.data;
                //    AQCS<2C$WUw6g-m%     }>v*+4[rVOFnUP&m
                // const response = await fetch(
                //     'https://consultanttestagence.000webhostapp.com/test_agence_backend/public/api/v1/consultant/hola'
                //     ,{
                //         method: 'POST',
                //         headers: {
                //             "Accept": "application/json */*",
                //             "Content-Type": "application/json"
                //         }
                //     }
                // );
                // if (!response.ok) {
                //     throw new Error(`HTTP error! status: ${response.status}`);
                // }
                // const data = await response.json();
                // commit("SET_CONSULTANTS_SHOW", data);
                // console.log('update',data)
                // return data;
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