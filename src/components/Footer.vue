<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-11">
                <div class="footerItemTitle">My Github repositories</div><br/>
                <p class="footerItemContent">
                    Check out <a href="https://github.com/geocata" target="_blank">my repositories</a> 
                    if you want to browse some of my code that I made public
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data() {
            return {
                
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container-fluid {
        background-color: rgb(4, 9, 30);
    }
    
    .container-fluid>.row {
        padding-top: 3%;
    }
    
    .footerItemTitle {
        font-size: 16px;
        color: white;
    }
    
    .container-fluid>.row a {
        color: rgb(132, 144, 255);
        font-weight: 300;
        text-decoration: none;
    }
    
    .footerItemContent {
        font-size: 14px;
        color: rgb(119, 119, 119);
        font-weight: 100;
    }
</style>
