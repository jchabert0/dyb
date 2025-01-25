import { createStore } from "vuex";

const store = createStore({
  state: {
    artists: []
  },
  getters: {
     getArtists(state) {
      return state.artists;
    }
  },
  mutations: {
    setArtists(state, artists) {
      if (!artists) {
        artists = [];
      }
      
      state.artists = artists;
    }
  },
  strict: true
});

export default store;
