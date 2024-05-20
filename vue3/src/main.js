import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/github.css'

const app = createApp(App)

app.use(router)

// Set the page title
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

app.mount('#app')
