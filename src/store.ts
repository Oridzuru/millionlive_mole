import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cur_eventId: 0,
    isLoading: false,
    cur_slectEventId: 0,
    idolList: [],
  },
  mutations: {
    updateCurEventId: (state,eventId)=>{
      state.cur_eventId = eventId;
    },
    updateSelectEventId: (state, eventId) => {
      state.cur_slectEventId = eventId;
    },
    // loadding
    showloadding(state, load) {
      state.isLoading = load
    },
    upDateIdolList: (state, idolList) => {
      state.idolList = idolList;
    },
  },
  actions: {
    changeCurEventId(context, ev) {
      context.commit("updateCurEventId", ev)
    },
    changeSelectEventId(context, ev) {
      context.commit("updateSelectEventId", ev)
    },
    setloadding(context, load) {
      context.commit("showloadding", load);
    },
    setIdolList(context, ev) {
      context.commit("upDateIdolList", ev);
    },
  },
  getters: {
    loadingStatus: (state) => {
      return state.isLoading;
    },
    getCurEventId: (state) => {
      return state.cur_eventId;
    },
    getSelectEventId: (state) => {
      return state.cur_slectEventId;
    },
    getIdolList: (state) => {
      return state.idolList;
    }
  }
});
