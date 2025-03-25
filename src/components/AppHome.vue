<template>
  <!-- Ajouter les Filtres dans la navigation et les garder dans le store pour les conserver lors de la navigation -->
  <TheNavigationForHome @sortChanged="handleSortChanged"></TheNavigationForHome>

  <!-- Prendre en compte les filtres pour afficher seulement les artistes correspondants à la recherche DONE -->
  <div class="row" v-if="artists.length">
    <!-- Ajouter les informations de nombre d'écoutes DONE -->
    <ArtistCardForHome v-for="artist in sortedArtists" :artist="artist" :key="artist._id"></ArtistCardForHome>
  </div>
  <div class="alert alert-secondary" role="alert" v-else>
    Aucun artiste ne correspond à vos critères...
  </div>
</template>

<script>
import axios from 'axios';
import TheNavigationForHome from './TheNavigationForHome.vue'
import ArtistCardForHome from './ArtistCardForHome.vue'

export default {
  name: "Home",
  components: {
    TheNavigationForHome,
    ArtistCardForHome
  },
  data() {
    return {
      artists: [],
      sortBy: 'nom',
      sortOrder: 'asc'
    };
  },
  mounted() {
    axios.get('http://localhost:8085/artistes.json').then(data => this.artists = data.data);
  },
  computed: {
    artistsWithTotalEcoutes() {
      return this.artists.map(artist => {
        const totalEcoutes = artist.albums.reduce((total, album) => {
          return total + album.musiques.reduce((sum, musique) => sum + musique.nombreEcoutes, 0);
        }, 0);

        return { 
          ...artist, 
          totalEcoutes 
        };
      });
    },
    sortedArtists() {
      return this.artistsWithTotalEcoutes.slice().sort((a, b) => {
        if (this.sortBy === 'nombreEcoutes') {
          const compareA = a.totalEcoutes;
          const compareB = b.totalEcoutes;

          return this.sortOrder === 'asc' ? compareA - compareB : compareB - compareA;
        } else if (this.sortBy === 'nom') {
          const compareA = a.nom.toLowerCase();
          const compareB = b.nom.toLowerCase();

          if (compareA < compareB) return this.sortOrder === 'asc' ? -1 : 1;
          if (compareA > compareB) return this.sortOrder === 'asc' ? 1 : -1;
          return 0;
        } else if (this.sortBy === 'age') {
          return this.sortOrder === 'asc' ? a.age - b.age : b.age - a.age;
        }
        return 0;
      });
    }
  },
  methods: {
    handleSortChanged({ sortBy, sortOrder }) {
      this.sortBy = sortBy;
      this.sortOrder = sortOrder;
    }
  }
}
</script>

<style scoped>
</style>
