<template>
  <!--  Ajouter les Filtres dans la navigation -->
  <!--  et les garder dans le store pour les conserver lors de la navigation-->
  <TheNavigationForHome></TheNavigationForHome>

  <!--  Prendre en compte les filtres pour afficher seulement les artistes correspondants à la recherche-->
  <div class="row" v-if="artists.length">
  <!--  Ajouter les informations de nombre d'écoute-->
    <ArtistCardForHome v-for="artist in artists" :artist="artist" :key="artist._id"></ArtistCardForHome>
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
      artists: []
    };
  },
  mounted() {
    axios.get('http://localhost:8085/artistes.json').then(data => this.artists = data.data);
  }
};
</script>

<style scoped>

</style>
