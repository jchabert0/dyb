<template>
    <div v-if="artist">
      <div class="row mb-4 border-bottom mb-4 pb-4">
      <div class="col-lg-2">
        <img src="http://localhost:8085/img/album/No-album-art.png" :alt="artist.prenom+' '+artist.nom" class="img-thumbnail">
        <h5>
          Intitulé de l'album
          <span class="text-muted">05/11/2021</span>
        </h5>
      </div>
      <div class="col-lg-7">
        <table class="table">
          <tbody>
          <tr v-for="index in [0, 1 , 2, 4, 5, 6]" :key="index">
            <td class="align-middle">
              Titre de la chanson
            </td>
            <td class="text-right align-middle">
              2:45
            </td>
            <td class="text-right align-middle">
              1 548
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    <div v-else>Albums introuvable ou en cours de chargement...</div>

</template>

<script>
import axios from 'axios';

export default {
  name: "ArtistAlbums",
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
methods: {
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