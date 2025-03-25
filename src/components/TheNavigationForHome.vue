<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin-bottom: 1rem;">
    <router-link to="/" class="navbar-brand">Artistes</router-link>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto"></ul>

      <form class="form-inline">
        <div class="input-group mb-1">
          <div class="input-group-prepend">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">
              Trier
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#" @click.prevent="updateSort({ sortBy: 'nom', sortOrder: 'asc' })" aria-label="Nom (A-Z)">Nom (A-Z)</a>
              <a class="dropdown-item" href="#" @click.prevent="updateSort({ sortBy: 'nom', sortOrder: 'desc' })" aria-label="Nom (Z-A)">Nom (Z-A)</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click.prevent="updateSort({ sortBy: 'age', sortOrder: 'asc' })" aria-label="Âge (Croissant)">Âge (Croissant)</a>
              <a class="dropdown-item" href="#" @click.prevent="updateSort({ sortBy: 'age', sortOrder: 'desc' })" aria-label="Âge (Décroissant)">Âge (Décroissant)</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click.prevent="updateSort({ sortBy: 'nombreEcoutes', sortOrder: 'asc' })" aria-label="Nombre d'écoutes (Croissant)">Nombre d'écoutes (Croissant)</a>
              <a class="dropdown-item" href="#" @click.prevent="updateSort({ sortBy: 'nombreEcoutes', sortOrder: 'desc' })" aria-label="Nombre d'écoutes (Décroissant)">Nombre d'écoutes (Décroissant)</a>
            </div>
          </div>
          <input 
            class="form-control" 
            type="search" 
            placeholder="Rechercher" 
            :value="searchQuery" 
            @input="updateSearchQuery($event.target.value)"
          />
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["searchQuery", "sortBy", "sortOrder"]),
  },
  methods: {
    ...mapActions(["updateSearchQuery", "updateSort"]),

    updateSearch() {
      this.updateSearchQuery(this.searchQuery);
    },

    setSort(sortBy, sortOrder) {
      this.updateSort({ sortBy, sortOrder });
    }
  }
};

</script>
