<template>
  <section>
    <TopBarMetrics class="tob-bar-metrics"></TopBarMetrics>
    <div class="row">

    </div>
  </section>
</template>

<script>
  import TopBarMetrics from './TopBarMetrics.vue';

  export default {
    name: 'ChatDashboard',
    components: {
      TopBarMetrics
    }
  }
</script>

<style scoped>
  .row {
    margin-left: 10px;
    margin-right: 10px;
  }

  .tob-bar-metrics {
    padding-top: 1em;
  }
</style>