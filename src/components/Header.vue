<template>
    <div class="container-fluid fixed-top bg-white" id="header">
        <div class="row align-items-center">
            <div class="col-1"></div>
            <div class="col-2">
                <table>
                    <tr>
                        <td>
                            <div class="heart noLove" v-on:click="showMeSomeLove" title="Click if you like my page">
                            </div>
                        </td>
                        <td>
                            <span class="loveCounter">{{loves !== null ? loves.length : "0"}}</span>
                        </td>
                    </tr>
                </table>
                
            </div>
            <div class="col-5"></div>
            <div class="col-3">
                <nav class="navbar navbar-expand-sm navbar-light">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse text-nowrap" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                            <li class="nav-item headerItem active" v-on:click="makeNavItemActive">
                                <a>About me</a>
                            </li>
                            <!--
                            <li class="nav-item headerItem" v-on:click="makeNavItemActive">
                                <a>Blog</a>
                            </li>
                            -->
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<script>    
    import $ from 'jquery';
    import crypto from 'crypto';
    import Cookies from 'js-cookie';
    
    export default {
        name: 'Header',
        data() {
            return {
                loves: null,
                cachedHashedIp: null,
                showSomeLoveClicked: false
            }
        },
        created: function() {
            $.ajax('https://api.jsonbin.io/b/5bd71831adf9f5652a679263/latest')
                    .then(lovesData => {
                        this.loves = lovesData.loves;
                    });
            
            window.addEventListener('scroll', this.addHeaderShadow);
        },
        destroyed () {
            window.removeEventListener('scroll', this.addHeaderShadow);
        },
        methods: {
            addHeaderShadow: function(event) {
                if($(window).scrollTop() === 0) {
                    $('#header').removeClass('shadowed');
                    return;
                }
                
                $('#header').addClass('shadowed');
            },
            makeNavItemActive: function(event) {
                var elem = event.currentTarget;
                $('.headerItem.active').removeClass('active');
                $(elem).addClass('active');
            },
            showMeSomeLove : function(event) {
                if(Cookies.get('didShowSomeLove') === '1' || this.showSomeLoveClicked === true) {
                    return;
                }
                
                this.showSomeLoveClicked = true;
                
                var updateLoves = (hashedIp) => {
                    var dataToStore = {
                        i: hashedIp
                    };
                            
                    if(this.loves === null){
                        $.ajax('https://api.jsonbin.io/b/5bd71831adf9f5652a679263/latest')
                                .then(lovesData => {
                                    this.loves = lovesData.loves;

                                    for(var i=0;i<this.loves.length;i++) {
                                        if(this.loves[i].i === hashedIp) {
                                            this.showSomeLoveClicked = false;
                                            return;
                                        }
                                    }

                                    this.loves.push(dataToStore);
                                    $.ajax('https://api.jsonbin.io/b/5bd71831adf9f5652a679263',{
                                        method: 'PUT',
                                        headers: {
                                            "Content-Type": 'application/json'
                                        },
                                        data: JSON.stringify({loves: this.loves})
                                    })
                                            .then(() => {
                                                Cookies.set('didShowSomeLove', '1');
                                                this.showSomeLoveClicked = false;
                                            }, () => {
                                                this.showSomeLoveClicked = false;
                                            });
                                }, () => {
                                    this.showSomeLoveClicked = false;
                                });

                        return;
                    }

                    for(var i=0;i<this.loves.length;i++) {
                        if(this.loves[i].i === hashedIp) {
                            this.showSomeLoveClicked = false;
                            return;
                        }
                    }

                    this.loves.push(dataToStore);
                    $.ajax('https://api.jsonbin.io/b/5bd71831adf9f5652a679263',{
                        method: 'PUT',
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        data: JSON.stringify({loves: this.loves})
                    })
                            .then(() => {
                                Cookies.set('didShowSomeLove', '1');
                                this.showSomeLoveClicked = false;
                            }, () => {
                                this.showSomeLoveClicked = false;
                            });
                };
                
                if(this.cachedHashedIp != null) {
                    updateLoves(this.cachedHashedIp);
                    return;
                }
                
                $.ajax('https://ipapi.co/json/')
                        .then(ipData => {
                            var hash = crypto.createHash('sha256');
                            var ipParts = ipData.ip.split('.');
                            hash.update(ipParts[2] + '.' + ipParts[3]);
                            var hashedIp = hash.digest('hex');
                            
                            this.cachedHashedIp = hashedIp;
                            
                            updateLoves(hashedIp);
                        });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #header.shadowed {
        -webkit-box-shadow: 0px 7px 26px -14px rgba(0,0,0,0.34);
        -moz-box-shadow: 0px 7px 26px -14px rgba(0,0,0,0.34);
        box-shadow: 0px 7px 26px -14px rgba(0,0,0,0.34);
    }
    
    div.container-fluid div.row {
        text-align: center;
    }
    
    div.heart {
        position: relative;
        width: 20px;
        height: 30px;
    }
    
    div.heart:hover {
        cursor: pointer;
        animation-name: heart;
        animation-timing-function: linear;
        animation-iteration-count: 1;
        animation-duration: .5s; 
    }
    
    @keyframes heart {
        0%{transform: scale(1)}
        40%{transform: scale(1.25)}
        70%{transform: scale(.9)}
        100%{transform: scale(1)}
    }
    
    div.heart:before, div.heart:after {
        position: absolute;
        width: 22px;
        height: 30px;
        content: "";
        background-color: red;
        border-top-left-radius: 38px;
        border-top-right-radius: 38px;
    }
    
    div.heart:before {
        transform: rotate(50deg);
        transform-origin: 100% 100%;
    }
    
    div.heart:after {
        left: 31px;
        transform: rotate(-50deg);
        transform-origin: 0 100%;
    }
    
    .loveCounter {
        margin-left: 40px;
        display: inline-block;
        background-color: #eee;
        border: 1px solid #d3d3d3;
        min-width: 25px;
        position: relative;
    }
    
    .loveCounter:after, .loveCounter:before {
        right: 100%;
        top: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .loveCounter:after {
        border-right-color: #eee;
        border-width: 5px;
        margin-top: -5px;
    }
    .loveCounter:before {
        border-right-color: #d3d3d3;
        border-width: 7px;
        margin-top: -7px;
    }
    
    .headerItem {
        margin: 10px;
    }
    
    .headerItem a {
        font-size: 12px;
        font-weight: 500;
        line-height: 23px;
        outline-color: rgb(34, 34, 34);
        text-transform: uppercase;
        transition-timing-function: ease;
        cursor: pointer;
        transition: 0.5s;
    }
    
    .headerItem a:hover, .headerItem.active a {
        color: #7787ff;
    }
</style>
