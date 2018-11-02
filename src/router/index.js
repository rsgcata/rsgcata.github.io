import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/mainView/AboutMe';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'AboutMe',
            component: Index,
            meta: {
                title: 'My Presentation - About Me'
            }
        }
    ],
    mode: 'history'
});
