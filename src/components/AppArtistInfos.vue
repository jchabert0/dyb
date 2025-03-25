<template>
    <div v-if="artist">
        <div class="row border-bottom mb-4 pb-4">
        <div class="col-lg-2">
    <img :src="artist.photo" :alt="artist.prenom+' '+artist.nom" height="130" width="130" class="img-thumbnail">
        <span class="badge badge-secondary mr-2 mt-1" v-for="tag in artist.tags" :key="tag">
          {{ tag }}
        </span>
    </div>
    <div class="col-lg-7">
        <h3>
          {{artist.prenom}} {{artist.nom}}
          <span class="text-muted">({{artist.age}} ans)</span>
        </h3>
        <p>
          {{ artist.bio }}
        </p>
      </div>
    <div class="col col-lg-3">
        <div class="list-group">
          <h5 class="list-group-item list-group-item-primary">{{artist.styleMusical}}</h5>
          <template v-if="artistsSimilaires.length">
            <router-link
                v-for="artistSimilaire in artistsSimilaires"
                :to="{name: 'artist', params: {id: artistSimilaire._id}}"
                :key="artistSimilaire._id"
                class="list-group-item"
            >{{artistSimilaire.prenom}} {{artistSimilaire.nom}}</router-link>
          </template>
          <template v-else>
            <a class="list-group-item disabled" href="#">Seul(e) artiste de {{ artist.styleMusical }} connu(e)</a>
          </template>
        </div>
      </div>
    </div>
</div>
    <div v-else>Artiste introuvable ou en cours de chargement...</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ArtistInfos",
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
      artistsSimilaires: [],
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
  }
}
};
</script>