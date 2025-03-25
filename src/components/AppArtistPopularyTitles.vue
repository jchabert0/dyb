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
          <tr v-for="titre in titresPopulaires" :key="titre._id">
            <td>
              <img :src="titre.couverture" style="width: 30px;">
            </td>
            <td class="align-middle">
              {{ titre.titre }}
            </td>
            <td class="text-right align-middle">
              2:45
            </td>
            <td class="text-right align-middle">
              {{titre.nombreEcoutes}}
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
    this.titresPopulaires = this.mostListenedSongs();
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
      this.artistsSimilaires = [];
    for (var j in response.data) {
      if(response.data[j].styleMusical === this.artist.styleMusical && response.data[j]._id !== this.artist._id) {
        this.artistsSimilaires.push(response.data[j]);
      }
    }
    } catch (error) {
      console.error("Erreur lors du chargement des artistes :", error);
      this.artist = null;
    }
  },
  mostListenedSongs() {
      return [
        {
          "_id": "618ae89fc40339e626d8dff2",
          "numero": 0,
          "titre": "reprehenderit in voluptate",
          "dureeSecondes": 293,
          "nombreEcoutes": 806453529,
          "couverture": "http://localhost:8085/img/album/618ae89f89d64f81153d54c1.jpeg"
        },
        {
          "_id": "618ae89ff18f04ae3de8ce14",
          "numero": 1,
          "titre": "minim",
          "dureeSecondes": 231,
          "nombreEcoutes": 129446587,
          "couverture": "http://localhost:8085/img/album/618ae89f89d64f81153d54c1.jpeg"
        },
        {
          "_id": "618ae89f771d425479ac8e65",
          "numero": 2,
          "titre": "tempor cupidatat",
          "dureeSecondes": 239,
          "nombreEcoutes": 741808849,
          "couverture": "http://localhost:8085/img/album/618ae89f89d64f81153d54c1.jpeg"
        },
        {
          "_id": "618ae89f506ca1120b835347",
          "numero": 3,
          "titre": "deserunt",
          "dureeSecondes": 323,
          "nombreEcoutes": 182839200,
          "couverture": "http://localhost:8085/img/album/618ae89f89d64f81153d54c1.jpeg"
        },
        {
          "_id": "618ae89f3cc86e1ea38d91f3",
          "numero": 4,
          "titre": "labore enim mollit",
          "dureeSecondes": 270,
          "nombreEcoutes": 374839288,
          "couverture": "http://localhost:8085/img/album/618ae89f89d64f81153d54c1.jpeg"
        }
      ];
    }
}
};
</script>