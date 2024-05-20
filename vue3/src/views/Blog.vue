<script setup>

var articles2018 = [{
    blogRelativePath: '2018/hello-world',
    title: 'Hello World'
}, {
    blogRelativePath: '2018/conventions-evolution',
    title: 'Conventions root for evolution'
}, {
    blogRelativePath: '2018/github-comments',
    title: 'Github Pages comments'
}, {
    blogRelativePath: '2018/mysql-ha',
    title: 'Mysql high availability'
}]

var articles2024 = [{
    blogRelativePath: '2024/estimates',
    title: 'To estimate or not to estimate'
}]

</script>

<template>
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-10">
                    <router-view></router-view>
                </div>
                <div class="col-2 articles-archive-nav">
                    <div class="panel-group" id="accordion">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    2024
                                </h4>
                            </div>
                            <div class="panel-body">
                                <div v-for="article in articles2024" class="article-item-link">
                                    <router-link
                                        v-bind:to="'/blog/articles/' + article.blogRelativePath"
                                        :class="$router.currentRoute.value.path === '/blog/articles/' + article.blogRelativePath ? 'active' : ''">
                                        {{ article.title }}
                                    </router-link>
                                </div>
                            </div>
                        </div> <br><br>

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    2018
                                </h4>
                            </div>
                            <div class="panel-body">
                                <div v-for="article in articles2018" class="article-item-link">
                                    <router-link
                                        v-bind:to="'/blog/articles/' + article.blogRelativePath"
                                        :class="$router.currentRoute.value.path === '/blog/articles/' + article.blogRelativePath ? 'active' : ''">
                                        {{ article.title }}
                                    </router-link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-fluid {
    background-color: rgb(249, 249, 255);
    font-size: 14px;
    padding-top: 100px;
}

.articles-archive-nav a {
    text-decoration: none;
    color: black;
}

.articles-archive-nav a.router-link-active {
    color: #7787ff;
}

.articles-archive-nav a:hover {
    color: #7787ff;
    cursor: pointer;
}

.articles-archive-nav h4 {
    font-size: 18px;
}

hr {
    border-color: #999999;
}

.panel-title {
    font-weight: bold;
}

.article-item-link {
    border-bottom: 1px solid #99999975;
    padding-top: 7px;
    padding-bottom: 7px;
}
</style>