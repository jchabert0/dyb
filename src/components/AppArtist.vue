<template>
  <template v-if="artist">
    <AppArtistInfos :id="artist._id"/>
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
          <tr v-for="index in [0, 1 , 2, 4]" :key="index">
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
  </template>

  <div class="d-flex justify-content-center" v-else>
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FontAwesomeIcon from '../plugins/font-awesome';
import AppArtistInfos from '../components/AppArtistInfos';

// TODO : Séparer cette page monolithique en composants réutilisables
// TODO : Afficher les titres des chansons avec une majucule sur la première lettre
// TODO : formater les nombres d'écoutes pour les rendre plus facile à lire avec un séparateur de milliers
// TODO : récupérer et ordonner les vrais titres les plus écoutés de l'artiste
// TODO : afficher 5 ou 10 titres et changer le texte du bouton "Afficher plus de titres" en fonction de l'état
// TODO : Afficher les albums par ordre chronologique de sortie décroissant en bas de page
// TODO : Afficher la durée des musiques au format minutes:secondes
export default {
  name: "Artist",
  props: {
    id: {
      type: String,
      require: true
    }
  },
  components: {
    fa: FontAwesomeIcon,
    AppArtistInfos
  },
  data() {
    return {
      artist: null,
      artistsSimilaires: [],
      titresPopulaires: []
    };
  },
  async mounted() {
    const response = await axios.get('http://localhost:8085/artistes.json');

    for (var i in response.data) {
      if(response.data[i]._id === this.id) {
        this.artist = response.data[i];
      }
    }

    this.artistsSimilaires = [];
    for (var j in response.data) {
      if(response.data[j].styleMusical === this.artist.styleMusical && response.data[j]._id !== this.artist._id) {
        this.artistsSimilaires.push(response.data[j]);
      }
    }

    this.titresPopulaires = this.mostListenedSongs();
  },
  methods: {
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

<style scoped>

</style>
