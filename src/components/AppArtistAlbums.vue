<template>
  <div v-if="artist && artist.albums.length">
    <div 
      v-for="album in sortedAlbums" 
      :key="album._id" 
      class="row mb-4 border-bottom pb-4"
    >
      <div class="col-lg-2">
        <img 
          :src="album.couverture || 'http://localhost:8085/img/album/No-album-art.png'"
          :alt="album.intitule"
          height="130"
          width="130"
          class="img-thumbnail"
        />
        <h5>
          {{ album.intitule }}
          <span class="text-muted">{{ formatDate(album.dateSortie) }}</span>
        </h5>
      </div>
      <div class="col-lg-7">
        <table class="table">
          <tbody>
            <tr v-for="musique in sortedMusiques(album.musiques)" :key="musique._id">
              <td class="align-middle">{{ capitalizeFirstLetter(musique.titre) }}</td>
              <td class="text-right align-middle">{{ formatDuration(musique.dureeSecondes) }}</td>
              <td class="text-right align-middle">{{ thousandsSeparator(musique.nombreEcoutes) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-else>Albums introuvables ou en cours de chargement...</div>
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
  data() {
    return {
      artist: null
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
    sortedAlbums() {
      if (!this.artist || !this.artist.albums) return [];
      return [...this.artist.albums].sort((a, b) => {
        const dateA = new Date(this.cleanDate(a.dateSortie));
        const dateB = new Date(this.cleanDate(b.dateSortie));
        return dateB - dateA;
      });
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
    },
    sortedMusiques(musiques) {
      return [...musiques].sort((a, b) => b.nombreEcoutes - a.nombreEcoutes);
    },
    formatDuration(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${min}:${sec.toString().padStart(2, "0")}`;
    },
    thousandsSeparator(number) {
      return number.toLocaleString();
    },
    capitalizeFirstLetter(string) {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    formatDate(date) {
      const d = new Date(this.cleanDate(date));
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return d.toLocaleDateString('fr-FR', options);
    },
    cleanDate(date) {
      return date.split('T')[0];
    }
  }
};
</script>
