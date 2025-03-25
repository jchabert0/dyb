<template>
  <TheNavigationForHome @sortChanged="handleSortChanged" @searchChanged="handleSearchChanged"></TheNavigationForHome>
  <div class="row" v-if="filteredArtists.length">
    <ArtistCardForHome v-for="artist in filteredArtists" :artist="artist" :key="artist._id"></ArtistCardForHome>
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
      searchQuery: '',
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
    
    filteredArtists() {
      return this.sortedArtists.filter(artist => {
        const searchText = this.searchQuery.toLowerCase();
        return artist.nom.toLowerCase().includes(searchText) || artist.prenom.toLowerCase().includes(searchText);
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
    },
    handleSearchChanged(query) {
      this.searchQuery = query
    }
  }
}
</script>