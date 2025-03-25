<template>
  <template v-if="artist">

    <AppArtistInfos :id="artist._id"/>

    <AppArtistPopularyTitles :id="artist._id"/>

    <AppArtistAlbums :id="artist._id"/>

  </template>

  <div class="d-flex justify-content-center" v-else>
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppArtistInfos from '../components/AppArtistInfos';
import AppArtistPopularyTitles from '../components/AppArtistPopularyTitles';
import AppArtistAlbums from '../components/AppArtistAlbums';

// TODO : Séparer cette page monolithique en composants réutilisables // DONE
// TODO : Afficher les titres des chansons avec une majucule sur la première lettre // DONE
// TODO : formater les nombres d'écoutes pour les rendre plus facile à lire avec un séparateur de milliers // DONE
// TODO : récupérer et ordonner les vrais titres les plus écoutés de l'artiste // DONE
// TODO : afficher 5 ou 10 titres et changer le texte du bouton "Afficher plus de titres" en fonction de l'état // DONE
// TODO : Afficher les albums par ordre chronologique de sortie décroissant en bas de page // DONE
// TODO : Afficher la durée des musiques au format minutes:secondes // DONE
export default {
  name: "Artist",
  props: {
    id: {
      type: String,
      require: true
    }
  },
  components: {
    AppArtistInfos,
    AppArtistPopularyTitles,
    AppArtistAlbums
  },
  data() {
    return {
      artist: null,
    };
  },
  async mounted() {
    const response = await axios.get('http://localhost:8085/artistes.json');

    for (var i in response.data) {
      if(response.data[i]._id === this.id) {
        this.artist = response.data[i];
      }
    }
  }
};
</script>

<style scoped>

</style>
