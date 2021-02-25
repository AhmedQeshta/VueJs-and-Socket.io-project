<template>
  <div id="app">
    <header class="App_header">
      <nav>
        <h2>
          <router-link to="/">RealTime App</router-link>
        </h2>
        <ul>
          <li>
            <router-link to="/game">Game</router-link>
          </li>
          <li>
            <router-link to="/messages">Messages</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <div class="App_container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style scoped>

.App_container {
  width: 100%;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.App_header {
  display: flex;
  background-color: #3ca9a4;
  margin: 0 auto;
  padding: 0 1rem;
  color: white;
}

nav {
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  padding: 0 1.5rem;
}

nav h2 {
  font-size: 1.5rem;
  font-family: Ubuntu, Arial, serif;
}

nav ul {
  list-style: none;
  display: flex;
  align-items: center;
}

nav ul li {
  display: flex;
  margin: 0 0.5rem;
  font-size: 1.25rem;
  font-family: Ubuntu, Arial, serif;
}

a {
  color: white;
  text-transform: none;
  text-decoration: none;
}
</style>
