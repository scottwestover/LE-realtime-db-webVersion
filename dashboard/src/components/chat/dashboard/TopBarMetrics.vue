<template>
  <section>
    <!-- Top Bar Metrics -->
    <div class="row">
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Total Chat <br>Requests</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Total Connected <br>Chats</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Total Interactive <br>Chats</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Total Chats <br>In Queue</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Total Abandoned <br>Chats</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Abandonment <br>Rate</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar Metrics -->
    <div class="row">
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Agents <br>Online</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Total Available <br>Slots</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Avg. Handling <br>Time</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Avg. Agent <br>Utilization</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Avg. Time <br>To Answer</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="card-non-interactive">
          <div class="card-content">
            <p class="card-title">Avg. Time <br>To Abandon</p>
            <p class="card-metric">2</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'TopBarMetrics'
  }
</script>

<style scoped>
  .row {
    margin-left: 10px;
    margin-right: 10px;
  }

  .card-title {
    font-size: 1.6rem;
    padding-top: 5px;
  }

  .card-metric {
    color: #00d1b2;
    font-size: 1.6rem;
  }
</style>