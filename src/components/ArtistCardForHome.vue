<template>
  <div class="col-sm-3 mg-b" v-if="artist">
    <div class="card mb-4">
      <img class="card-img-top" :src="artist.photo" :alt="artist.prenom+' '+artist.nom" width="208" height="208" />
      <span class="text-white" style="padding: .75rem 1.25rem; margin-top:-2.35rem; background: linear-gradient(to top, black 0%, transparent 100%)">
        Nombre d'écoutes : <b>{{ thousandsSeparator(totalEcoutes) }}</b>
      </span>
      <div class="card-body">
        <h5 class="card-title">
          {{ artist.prenom }} {{ artist.nom }}
          <div class="text-muted">({{ artist.age }} ans)</div>
        </h5>
        <p class="card-text custom-max-vh">{{ artist.bio }}</p>
        <router-link :to="{ name: 'artist', params: { id: artist._id } }" class="btn btn-primary btn-block mt-2">Voir la page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistCardForHome",
  props: {
    artist: {
      type: Object,
      required: true
    }
  },
  computed: {
    totalEcoutes() {
      if (this.artist && this.artist.albums) {
        return this.artist.albums.reduce((total, album) => {
          return total + album.musiques.reduce((sum, music) => sum + (music.nombreEcoutes || 0), 0);
        }, 0);
      }
      return 0;
    }
  },
  methods: {
    thousandsSeparator(number, separator = ' ') {
      if (number !== undefined && number !== null) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      }
      return '0';
    }
  }
};
</script>

<style scoped>
  .custom-max-vh {
    max-height: 10em;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  }
</style>
