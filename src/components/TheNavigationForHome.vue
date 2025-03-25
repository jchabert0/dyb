<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin-bottom: 1rem;">
    <router-link to="/" class="navbar-brand" style="background: transparent; color: black !important;">Artistes</router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>

      <form class="form-inline">
        <div class="input-group mb-1">
          <div class="input-group-prepend">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Trier</button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#" @click.prevent="setSort('nom', 'asc')" aria-label="Nom (Croissant)">Nom (Croissant)</a>
              <a class="dropdown-item" href="#" @click.prevent="setSort('nom', 'desc')" aria-label="Nom (Décroissant)">Nom (Décroissant)</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click.prevent="setSort('age', 'asc')" aria-label="Age (Croissant)">Age (Croissant)</a>
              <a class="dropdown-item" href="#" @click.prevent="setSort('age', 'desc')" aria-label="Age (Décroissant)">Age (Décroissant)</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click.prevent="setSort('nombreEcoutes', 'asc')" aria-label="Nombre d'écoutes (Croissant)">Nombre d'écoutes (Croissant)</a>
              <a class="dropdown-item" href="#" @click.prevent="setSort('nombreEcoutes', 'desc')" aria-label="Nombre d'écoutes (Décroissant)">Nombre d'écoutes (Décroissant)</a>
            </div>
          </div>
          <input 
            class="form-control" 
            type="search" 
            placeholder="Rechercher" 
            aria-label="Rechercher"
            v-model="searchQuery"
            @input="emitSearchChange"
          />
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNavigationForHome",
  data() {
    return {
      searchQuery: "",
      sortBy: 'nom',
      sortOrder: 'asc'
    };
  },
  methods: {
    setSort(sortBy, sortOrder) {
      this.sortBy = sortBy;
      this.sortOrder = sortOrder;
      this.$emit('sortChanged', { sortBy, sortOrder });
    },
    emitSearchChange() {
      this.$emit('searchChanged', this.searchQuery);
    }
  },
};
</script>
