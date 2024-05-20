import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/About.vue'
import Blog from '@/views/Blog.vue'
import HelloWorld from '@/views/articles/2018/HelloWorld.vue'
import ConventionsRootForEvolution from '@/views/articles/2018/ConventionsRootForEvolution.vue'
import GithubPagesCommentsUsingGoogleSheets from '@/views/articles/2018/GithubPagesCommentsUsingGoogleSheets.vue'
import MysqlHighAvailabilityAndGroupReplication from '@/views/articles/2018/MysqlHighAvailabilityAndGroupReplication.vue'
import Estimates from '@/views/articles/2024/Estimates.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'about-me',
      component: AboutView,
      meta: {
        title: 'About me'
      }
    },
    {
      path: '/blog/articles/',
      component: Blog,
      redirect: '/blog/articles/2018/hello-world',
      children: [{
        path: '2018/hello-world',
        component: HelloWorld,
        meta: {
          title: 'Hello World'
        }
      }, {
        path: '2018/conventions-evolution',
        component: ConventionsRootForEvolution,
        meta: {
          title: 'Conventions root for evolution'
        }
      }, {
        path: '2018/mysql-ha',
        component: MysqlHighAvailabilityAndGroupReplication,
        meta: {
          title: 'Mysql high availability'
        }
      }, {
        path: '2018/github-comments',
        component: GithubPagesCommentsUsingGoogleSheets,
        meta: {
          title: 'Github Pages comments'
        }
      }, {
        path: '2024/estimates',
        component: Estimates,
        meta: {
          title: 'To estimate or not to estimate'
        }
      }]
    }
  ]
})

export default router
