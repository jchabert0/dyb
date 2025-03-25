<template>
    <div v-if="artist">
      <div class="row mb-4">
      <div class="col-lg-2"></div>
      <div class="col-lg-7">
        <table class="table table-striped">
          <thead class="thead-light">
            <tr>
              <th></th>
              <th>Titres populaires</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="titre in titresPopulairesTries" :key="titre._id">
            <td>
              <img :src="titre.couverture" style="width: 30px;">
            </td>
            <td class="align-middle">
              {{ capitalizeFirstLetter(titre.titre) }}
            </td>
            <td class="text-right align-middle">
              2:45
            </td>
            <td class="text-right align-middle">
              {{ thousandsSeparator(titre.nombreEcoutes) }}
            </td>
          </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-center">
                <fa icon="add"></fa>
                Afficher plus de titres
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    </div>
    <div v-else>Titres introuvables ou en cours de chargement...</div>

</template>

<script>
import axios from 'axios';

export default {
  name: "ArtistPopularyTitles",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
  },
  data() {
    return {
      artist: null,
      titresPopulaires: []
    };
  },
  async mounted() {
    this.fetchArtist(this.id);
  },
  watch: {
  id: {
    immediate: true,
    handler(newId) {
      this.fetchArtist(newId);
    }
  }
},
computed: {
  titresPopulairesTries() {
    return [...this.allMusiques].sort((a, b) => {
      const aEcoutes = Number(a.nombreEcoutes);
      const bEcoutes = Number(b.nombreEcoutes);
      return bEcoutes - aEcoutes;
    });
  },
  allMusiques() {
      return this.artist.albums.reduce((acc, album) => {
        return acc.concat(album.musiques);
      }, []);
    }
},
methods: {
  thousandsSeparator (number, separator = ' ') {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  },
  capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
},
  async fetchArtist(artistId) {
    try {
      const response = await axios.get('http://localhost:8085/artistes.json');
      this.artist = response.data.find(a => a._id === artistId) || null;
    } catch (error) {
      console.error("Erreur lors du chargement des artistes :", error);
      this.artist = null;
    }
  }
}
};
</script>