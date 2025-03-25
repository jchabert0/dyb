<template>
  <TheNavigationForHome></TheNavigationForHome>

  <div class="row" v-if="filteredArtists.length">
    <ArtistCardForHome v-for="artist in filteredArtists" :artist="artist" :key="artist._id"></ArtistCardForHome>
  </div>
  <div class="alert alert-secondary" v-else>
    Aucun artiste ne correspond à vos critères...
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";
import TheNavigationForHome from "./TheNavigationForHome.vue";
import ArtistCardForHome from "./ArtistCardForHome.vue";

export default {
  name: "Home",
  components: {
    TheNavigationForHome,
    ArtistCardForHome
  },
  data() {
    return {
      artists: []
    };
  },
  computed: {
    ...mapState(["searchQuery", "sortBy", "sortOrder"]), 
    ...mapGetters(["getSearchQuery", "getSortBy", "getSortOrder"]),

    artistsWithTotalEcoutes() {
      return this.artists.map((artist) => {
        const totalEcoutes = artist.albums.reduce((total, album) => {
          return total + album.musiques.reduce((sum, musique) => sum + musique.nombreEcoutes, 0);
        }, 0);
        return { ...artist, totalEcoutes };
      });
    },

    filteredArtists() {
      return this.sortedArtists.filter(artist => {
        const searchText = this.searchQuery.toLowerCase();
        return artist.nom.toLowerCase().includes(searchText) || artist.prenom.toLowerCase().includes(searchText);
      });
    },

    sortedArtists() {
      return this.artistsWithTotalEcoutes.slice().sort((a, b) => {
        if (this.sortBy === "nombreEcoutes") {
          return this.sortOrder === "asc" ? a.totalEcoutes - b.totalEcoutes : b.totalEcoutes - a.totalEcoutes;
        } else if (this.sortBy === "nom") {
          return this.sortOrder === "asc" ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom);
        } else if (this.sortBy === "age") {
          return this.sortOrder === "asc" ? a.age - b.age : b.age - a.age;
        }
        return 0;
      });
    }
  },
  mounted() {
    axios.get("http://localhost:8085/artistes.json").then((data) => {
      this.artists = data.data;
    });
  }
};
</script>
