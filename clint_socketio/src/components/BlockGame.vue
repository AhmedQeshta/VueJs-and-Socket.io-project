<template>
  <div class="BlockGame">
    <canvas ref="game" height="500" width="500"></canvas>
    <div class="BlockGame_btn">
      <button @click.prevent="move('up')">Up</button>
      <button @click.prevent="move('down')">down</button>
      <button @click.prevent="move('right')">right</button>
      <button @click.prevent="move('left')">left</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'BlockGame',
  data() {
    return {
      socket: {},
      context: {},
      position: {
        x: 0,
        y: 0,
      }
    }
  },
  created() {
    this.socket = io('http://localhost:3000');

  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    // reserve event that sent from server
    this.socket.on("position", data => {
      this.position = data;
      this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
      this.context.fillRect(this.position.x, this.position.y, 20, 20);
    });
  },
  methods: {
    move(direction) {
      this.socket.emit("move", direction);
    }
  },
}
</script>

<style scoped>
.BlockGame_btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1.2rem;
}

canvas {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}

button {
  cursor: pointer;
  user-select: none;
  background-color: #3ca9a4;
  border: none;
  font-size: 1.2rem;
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 5px;
  text-align: center;
}

button:focus {
  outline: none;
}

.BlockGame {
  /*display: flex;*/
  /*position: relative;*/
  /*justify-items: center;*/
  /*justify-content: center;*/
  /*justify-self: center;*/
  /*text-align: center;*/
  /*margin: 0 auto;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*flex-direction: column;*/
}

.BlockGame canvas {
  /*width: 50%;*/
  border: 1px solid black;
}
</style>
