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
              <a class="dropdown-item" href="#">Nom (Croissant)</a>
              <a class="dropdown-item" href="#">Nom (Decroissant)</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Age (Croissant)</a>
              <a class="dropdown-item" href="#">Age (Decroissant)</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Nombre d'écoutes (Croissant)</a>
              <a class="dropdown-item" href="#">Nombre d'écoutes (Decroissant)</a>
            </div>
          </div>
          <input class="form-control" type="search" placeholder="Rechercher" aria-label="Rechercher">
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
    };
  },
  mounted() {
  }
};
</script>

<style scoped>

</style>