<template>
  <div id="app" class="container-fluid">
    <NavBar></NavBar>
    <ChatDashboard class="main-container"></ChatDashboard>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';
  import ChatDashboard from './components/chat/dashboard/ChatDashboard.vue';

  export default {
    name: 'app',
    components: {
      NavBar,
      ChatDashboard
    }
  }
</script>

<style scoped>
  #app {
    background: #333;
    background: -webkit-linear-gradient(left top, #024, #402);
    background: -moz-linear-gradient(bottom right, #024, #402);
    background: linear-gradient(to bottom right, #024, #402);
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .main-container {
    padding-left: 95px;
  }

  .container-fluid {
    padding: 0px;
  }
</style>

<style>
  html, body, #app {
    height: 100%;
    width: 100%;
    color: white;
    text-align: center;
  }

  .card {
    cursor: pointer;
    box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.25);
  }

  .card-non-interactive {
    box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.25);
  }

  .card:hover {
    border-radius: 4px;
    box-shadow: 0 0 5px 0 #fd6721;
    transition: .5s;
  }
</style>
