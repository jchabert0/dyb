<template>
      <div v-if="artist">
        <AppArtistInfos :id="artist._id"/>

        <AppArtistPopularyTitles :id="artist._id"/>

        <AppArtistAlbums :id="artist._id"/>
      </div>

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

