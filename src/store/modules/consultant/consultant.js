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
                const url = "https://consultanttestagence.000webhostapp.com/api/v1/consultant/";
                
                const configHeaders = {
                    'Content-Type':'application/json',
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                    // 'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
                    // 'Access-Control-Max-Age': 86400
                    // "Content-Type": "text/plain"
                    
                };
                console.log('Hello')
                const response = await fetch(url, {
                    method: 'POST',
                    // headers: configHeaders,
                    headers: {
                        // the content type header value is usually auto-set
                        // depending on the request body
                        "Content-Type": "text/plain;charset=UTF-8"
                      },
                      //body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
                      referrer: "about:client", // or "" to send no Referer header,
                      // or an url from the current origin
                      referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
                      mode: "cors", // same-origin, no-cors
                      credentials: "same-origin", // omit, include
                      cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
                      redirect: "follow", // manual, error
                      integrity: "", // a hash, like "sha256-abcdef1234567890"
                      keepalive: false, // true
                      signal: undefined, // AbortController to abort request
                      window: window, // null
                      body: JSON.stringify(payload)
                } );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Hello', data)
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