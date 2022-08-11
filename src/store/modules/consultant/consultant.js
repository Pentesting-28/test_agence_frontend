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
                const response = await fetch("https://consultanttestagence.000webhostapp.com/api/v1/consultant")
                // .then(response => response.json())
                // .then(data => (commit("SET_CONSULTANTS", data)));
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                commit("SET_CONSULTANTS", data)
                return data
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
                const response = await fetch("https://consultanttestagence.000webhostapp.com/api/v1/consultant", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
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