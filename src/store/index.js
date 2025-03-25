import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    searchQuery: "",
    sortBy: "nom",
    sortOrder: "asc",
  },
  mutations: {
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_SORT(state, { sortBy, sortOrder }) {
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },
  },
  actions: {
    updateSearchQuery({ commit }, query) {
      commit("SET_SEARCH_QUERY", query);
    },
    updateSort({ commit }, { sortBy, sortOrder }) {
      commit("SET_SORT", { sortBy, sortOrder });
    },
  },
  getters: {
    getSearchQuery: (state) => state.searchQuery,
    getSortBy: (state) => state.sortBy,
    getSortOrder: (state) => state.sortOrder,
  },
});
