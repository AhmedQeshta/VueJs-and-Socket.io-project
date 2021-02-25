import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const state = {};

const store = new Vuex.Store({
    state,
    plugins: [new VuexPersistence().plugin],
    getters: {},
    actions: {},
    mutations: {}

});

export default store;
