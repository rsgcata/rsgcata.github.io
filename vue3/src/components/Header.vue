<script setup>
</script>

<template>
    <div class="container-fluid fixed-top bg-white" id="header">
        <nav class="navbar navbar-expand-sm navbar-light px-5">
            <div class="collapse navbar-collapse text-nowrap justify-content-center">
                <ul class="navbar-nav">
                    <li class="nav-item header-item" v-bind:class="{ active: $route.path === '/' }">
                        <router-link to="/">About me</router-link>
                    </li>
                    <li class="nav-item header-item"
                        v-bind:class="{ active: $route.path.indexOf('blog') != -1 }">
                        <router-link to="/blog/articles">Blog</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header.shadowed {
    -webkit-box-shadow: 0px 7px 26px -14px rgba(0, 0, 0, 0.34);
    -moz-box-shadow: 0px 7px 26px -14px rgba(0, 0, 0, 0.34);
    box-shadow: 0px 7px 26px -14px rgba(0, 0, 0, 0.34);
}

div.container-fluid {
    text-align: center;
}

.header-item {
    margin: 10px;
}

.header-item a {
    line-height: 23px;
    outline-color: rgb(34, 34, 34);
    color: black;
    text-transform: uppercase;
    transition-timing-function: ease;
    cursor: pointer;
    transition: 0.5s;
    text-decoration: none;
    padding: 0.5em;
    background-color: transparent;
}

.header-item a:hover,
.header-item.active a {
    color: #0277BD;
    border-bottom: 5px solid #7787ff3a;
}
</style>
