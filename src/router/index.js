import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/mainView/AboutMe';
import Blog from '@/components/mainView/Blog';
import articleService from '../components/services/articleService';

Vue.use(Router);
  
var blogChildren = [];

articleService.articles.forEach(article => {
    blogChildren.push({
        path: article.blogRelativePath,
        component: require(`@/components/mainView/articles/${article.componentPath}`).default,
        meta: {
            title: 'My presentation - ' + article.title
        }
    });
});

export default new Router({
    routes: [
        {
            path: '/',
            name: 'AboutMe',
            component: Index,
            meta: {
                title: 'My Presentation - About Me'
            }
        },
        {
            path: '/blog/articles/',
            component: Blog,
            redirect: '/blog/articles/2018/HelloWorld',
            children: blogChildren
        }
    ],
    mode: 'history'
});
