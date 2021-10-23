import { createApp } from 'vue'
import App from './App.vue'
import Router from '@router'
import Store from '@store'
import { resizeQuery } from './modules/resizeQuery'

const app = createApp(App);

app.use(Router);
app.use(Store);
app.use(resizeQuery);

app.mount('#app');

