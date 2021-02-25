import Vue from 'vue';
import Router from 'vue-router'
import BlockGame from "@/components/BlockGame";
import BlockMessage from "@/components/BlockMessage";

Vue.use(Router);
export default new Router({
    mode: 'history',
    routes: [
        {path: '/game', name: "game", component: BlockGame},
        {path: '/messages', name: "BlockMessage", component: BlockMessage},
    ],
})
