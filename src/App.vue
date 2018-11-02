<template>
    <div class="container-fluid">
        <div class="row">
            <topHeader></topHeader>
            <router-view/>
            <mainfooter></mainfooter>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header';
    import Footer from './components/Footer';
    
    export default {
        components: {
            'topHeader': Header,
            'mainfooter': Footer
        },
        name: 'Index'
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
