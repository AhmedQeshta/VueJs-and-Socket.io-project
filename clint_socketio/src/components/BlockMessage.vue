<template>
  <div class="BlockMessage_container">
    <div class="container_header">
      <div v-if="ready">
        <div v-for="(item,i) in info" v-bind:key="i">
          <small>{{ item.name }} {{ item.type }}</small>
        </div>
      </div>
      <h2>{{ !ready ? 'Add Your Name' : 'Send Your message' }}</h2>
      <div v-if="!ready" class="input_group">
        <form @submit.prevent="setName">
          <input v-model.trim="YourName" placeholder="Enter name" type="text">
          <button type="submit">Add</button>
        </form>
      </div>
      <div v-if="ready">
        <h2>{{ YourName }}</h2>
      </div>
      <div v-if="ready" class="message_group">
        <div class="messages">
          <ul>
            <li v-for="(message,index) in messages" v-bind:key="index">
              <span :class="{'float-right':(message.type===1)}">{{ message.message }} <small>:{{ message.by }}</small> </span>
            </li>
          </ul>
          <small v-if="typing"
                 style="position: absolute;bottom: 5px ;left: 5px ;background-color: white;text-align: center;color: black">
            {{ typing }} is typing...
          </small>

        </div>
        <div class="input_message">
          <form @submit.prevent="submitForm">
            <input v-model.trim="message" placeholder="Enter Message" type="text">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: "BlockMessage",
  data() {
    return {
      YourName: null,
      message: null,
      messages: [],
      socket: null,
      ready: false,
      typing: false,
      online: [],
      info: [],
    }
  },
  created() {
    this.socket = io('http://localhost:3000');
  },
  mounted() {
    // reserve event that sent from server
    this.socket.on("chat_messages", data => {
      this.messages.push({message: data.message, type: 1, by: data.user})
      this.typing = false
    });
    // reserve event that sent from server
    this.socket.on("joined", data => {
      this.online.push(data);
      this.info.push({name: data, type: 'Joined'})
      setTimeout(() => {
        this.info = []
      }, 2500);
    });

    this.socket.on("typing", data => {
      this.typing = data
    });
    this.socket.on("stopTyping", () => {
      this.typing = false
    });
  },
  methods: {
    submitForm() {
      this.messages.push({message: this.message, type: 0, by: 'Me'});
      this.socket.emit("chat_messages", {message: this.message, user: this.YourName});
      this.message = null;
    },
    setName() {
      this.socket.emit('joined', this.YourName)
      this.ready = true
    },
  },
  watch: {
    message(value) {
      value ? this.socket.emit('typing', this.YourName) : this.socket.emit('stopTyping')
    }
  },
}
</script>

<style scoped>
.float-right {
  float: right;
  padding: 0 1.2rem;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column
}

.BlockMessage_container {
  margin: 0.5rem auto;
  font-family: Ubuntu, Arial, sans-serif;
  font-size: 1.2rem;
  color: #3ca9a4;
  padding: 0.2rem 0.5rem;
}

.container_header {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.input_group form {
  display: flex;
}

input {
  width: 100%;
  height: 1.3rem;
  background-color: #dddada;
  border: none;
  margin: 0 0.5rem;
  font-size: 1.2rem;
  padding: 0.3rem 0.5rem;
  color: #2e92cb;
  border-radius: 8px;
}

button {
  /*width: 100%;*/
  /*height: 1.2rem;*/
  background-color: #2e92cb;
  border: none;
  font-size: 1.2rem;
  padding: 0.3rem 0.5rem;
  color: #ffffff;
  cursor: pointer;
  border-radius: 8px;
}

input:focus,
button:focus {
  outline: none;
}

.message_group {
  margin: 0.5rem auto;
  width: 100%;
  height: 20rem;
  padding: 0.5rem 0.6rem;
  background-color: #68c7de;
}

.messages {
  margin: 0.5rem auto;
  width: 100%;
  height: 15rem;
  background-color: white;
  overflow-y: auto;
  position: relative;
}

p {
  margin: 0;
  padding: 0.25rem;
}

.input_message input {
  width: 90%;
  height: 1.3rem;
  background-color: #f5f1f1;
  border: none;
  margin: 0 auto;
  font-size: 1.2rem;
  padding: 1rem 0.9rem;
  color: #2e92cb;
  border-radius: 8px;
}
</style>
