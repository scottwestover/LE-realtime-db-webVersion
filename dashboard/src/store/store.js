import Vue from 'vue';
import Vuex from 'vuex';
import dataInt from '../data/dataInt';

Vue.use(Vuex);

const state = {
    dataInt: []
};

const mutations = {
    'SET_DASH' (state,dataInt) {
        state.dataInt = dataInt;
    }
};

const actions = {
    initData: ({commit}) => {
        commit('SET_DASH',dataInt);
    }
};

const getters = {
    dataInt: state => {
        return state.dataInt;
    }
};

export default new Vuex.Store( {
    state,
    getters,
    mutations,
    actions
})  