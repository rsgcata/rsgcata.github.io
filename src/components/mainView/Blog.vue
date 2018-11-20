<template>
    <div class="container-fluid">
        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col-10">
                        <router-view></router-view>
                        <hr/>
                        <div class="container commentSection">
                            <div class="row">
                                <div class="col-12">
                                    <span class="commentInfo">Your comment will be read for approval before it will be published in this comment section</span>
                                    <form>
                                        <div class="formFeedback font-weight-bold" v-show="commentForm.formNotice != null">
                                            {{commentForm.formNotice}}
                                        </div>
                                        <div class="form-group">
                                            <label for="comment">Comment:</label>
                                            <textarea class="form-control" rows="5" id="comment" v-model="commentForm.command.comment"></textarea>
                                            <div class="inputFeedback text-danger" v-show="commentForm.commentFieldNotice != null">
                                                {{commentForm.commentFieldNotice}}
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="personName">
                                                Name:
                                            </label>
                                            <input type="text" class="form-control" id="personName" v-model="commentForm.command.commenterName"/>
                                            <div class="inputFeedback text-danger" v-show="commentForm.nameFieldNotice != null">
                                                {{commentForm.nameFieldNotice}}
                                            </div>
                                        </div>
                                        <button class="btn btn-primary" type="submit"
                                                v-on:click="handleCommentCommand">
                                            Submit comment
                                        </button><br/><br/>
                                        <div class="g-recaptcha" id="commentRecaptchaContainer"></div> 
                                    </form>
                                </div>
                            </div><br/>
                            <div class="row commentsContainer">
                                <div class="col-12">
                                    <div class="row commentItem" v-for="comment in comments">
                                        <div class="col-12">
                                            <hr>
                                            <span class="commenterName">{{comment[1]}}</span> said : <br/>
                                            <span class="commentPublishingDate">
                                                {{comment[2] | commentDate}}
                                            </span> <br/>
                                            <p class="comment">{{comment[0]}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 articlesArchiveNav">
                        <div class="panel-group" id="accordion">
                            <div class="panel panel-default" v-for="archiveItem in archive">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" v-bind:href="'#y'+ archiveItem.year" v-on:click="changeArchiveIcon">
                                            <table>
                                                <tr>
                                                    <td class="yearItem"><span>{{archiveItem.year}}</span></td>
                                                    <td class="yearItem"><span class="fa fa-chevron-up"></span></td>
                                                </tr>
                                            </table> 
                                        </a>
                                    </h4>

                                </div>
                                <div v-bind:id="'y'+ archiveItem.year" class="panel-collapse collapse in">
                                    <div class="panel-body">
                                        <table class="table">
                                            <tr v-for="article in archiveItem.articles">
                                                <td>
                                                    <router-link v-bind:to="'/blog/articles/' + article.blogRelativePath">{{article.title}}</router-link>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import articleService from '@/components/services/articleService';
    import $ from 'jquery';
    
    var archive = [];
    
    articleService.articles.forEach(article => {
        var articleAdded = false;
        
        if(archive.length > 0) {
            for(var i = 0; i <= archive.length; i++) {            
                if(archive[i].year === article.year) {
                    archive[i].articles.push(article);
                    var articleAdded = true;
                    break;
                }
            }
        }
        
        if(articleAdded === false) {
            archive.push({
                year: article.year,
                articles: [article]
            });
        }
    });
    
    archive = archive.sort(function(a, b){
        return b.year - a.year;
    });
    
    archive.forEach(item => {
        item.articles.sort(function(a, b) {
            return b.publishingDateNumber - a.publishingDateNumber;
        });
    });
    
    export default {
        name: 'Blog',
        components: {
            
        },
        data: function() {
            return {
                archive: archive,
                commentForm: {
                    pendingHandling: false,
                    formNotice: null,
                    commentFieldNotice: null,
                    nameFieldNotice: null,
                    command: {
                        commenterName: null,
                        comment: null,
                        articlePath: null
                    }
                },
                comments: [],
                recaptcha: null
            };
        },
        watch: {
            $route: function(toRoute, fromRoute) {
                this.commentForm = {
                    pendingHandling: false,
                    formNotice: null,
                    commentFieldNotice: null,
                    nameFieldNotice: null,
                    command: {
                        commenterName: null,
                        comment: null,
                        articlePath: null
                    }
                };
                this.comments = [];
                this.generateComments();
            }
        },
        created: function() {
            this.generateComments();
        },
        mounted: function() {
            this.recaptcha = {
                commentRecaptchaId: window.grecaptcha.render('commentRecaptchaContainer', {
                    sitekey: '6LdB9noUAAAAAIb_39zia4LhlrQNqxgoQHJyHfoJ',
                    callback: this.handleCommentWithRecaptcha,
                    size: 'invisible',
                    badge: 'inline'
                })
            };
        },
        methods: {
            generateComments: function() {
                $.get(window.location.pathname.replace('/blog/articles/', '/static/comments/') 
                        + '.json', data => {
                    if(!Array.isArray(data) || data.length == 0) {
                        return;
                    }
                    
                    this.comments = data.sort(function(a, b){
                        return b[2] - a[2];
                    });
                });
            },
            changeArchiveIcon: function(event) {
                if($(event.currentTarget).hasClass('collapsed')) {
                    $(event.currentTarget).find('.yearItem .fa')
                            .removeClass('fa-chevron-up')
                            .removeClass('fa-chevron-down')
                            .addClass('fa-chevron-down');
                }
                else {
                    $(event.currentTarget).find('.yearItem .fa')
                            .removeClass('fa-chevron-up')
                            .removeClass('fa-chevron-down')
                            .addClass('fa-chevron-up');
                }
            },
            handleCommentWithRecaptcha: function(recaptchaToken) {
                if(this.commentForm.pendingHandling) {
                    return;
                }
                
                this.commentForm.pendingHandling = true;
                this.commentForm.formNotice = null;
                this.commentForm.command.articlePath = window.location.pathname;
                
                if(this.commentForm.command.comment == null
                        || this.commentForm.command.comment.length < 6
                        || this.commentForm.command.comment.length > 2048) {
                    this.commentForm.commentFieldNotice = 'The comment should have at least 6 characters'
                            + ' and maximum 2048 characters';
                    return;
                }
                
                if(this.commentForm.command.commenterName == null
                        || this.commentForm.command.commenterName.length < 2
                        || this.commentForm.command.commenterName.length > 128) {
                    this.commentForm.nameFieldNotice = 'The name should have at least 2 characters'
                            + ' and maximum 128 characters';
                    return;
                }
                
                $.ajax('https://script.google.com/macros/s/AKfycbyHlw4J2PGMfNcsWu5vZxDxKiUTNqb353wSVX8IDltGLGHZ4yoV/exec', {
                    method: 'GET',
                    data: {
                        data: JSON.stringify(this.commentForm.command),
                        recaptchaToken: recaptchaToken
                    },
                    dataType: 'jsonp',
                    jsonp: "callback"
                }).then(responseData => {
                    if(responseData.success == null || responseData.success != true) {
                        this.commentForm.formNotice = 'There was an issue while trying to submit your comment. Please refresh the page and try again after a few seconds. If the problem persists, contact me.'
                        $('.formFeedback').removeClass('text-danger').removeClass('text-success')
                                .addClass('text-danger');
                    }
                    else {
                        this.commentForm.formNotice = 'Success! Comment submited! It will be read for approval soon.';
                        $('.formFeedback').removeClass('text-danger').removeClass('text-success')
                                .addClass('text-success');
                        
                        this.commentForm.command.comment = null;
                        this.commentForm.command.commenterName = null;
                    }
            
                    this.commentForm.pendingHandling = false;
                },
                () => {
                    this.commentForm.formNotice = 'There was an issue while trying to submit your comment. Please refresh the page and try again after a few seconds. If the problem persists, contact me.'
                    $('.formFeedback').removeClass('text-danger').removeClass('text-success')
                                .addClass('text-danger');
                    
                    this.commentForm.pendingHandling = false;
                });
            },
            handleCommentCommand: function(event) {
                event.preventDefault();
                
                window.grecaptcha.execute(this.recaptcha.commentRecaptchaId);
            }
        },
        filters: {
            commentDate: function(timestamp) {
                var date = new Date(timestamp*1000);
                
                return date.toUTCString();
            }
        }
    };
</script>

<style scoped>
    .container-fluid {
        background-color: rgb(249, 249, 255);
        font-size: 14px;
        padding-top: 100px;
    }
    
    .articlesArchiveNav a {
        text-decoration: none;
        color: black;
    }
    
    .articlesArchiveNav a:hover {
        color: #7787ff;
        cursor: pointer;
    }
    
    .articlesArchiveNav h4 {
        font-size: 18px;
    }
    
    .yearItem {
        padding: 5px;
    }
    
    .commentSection {
        padding-bottom: 30px;
    }
    
    hr {
        border-color: #999999;
    }
    
    .commentInfo {
        color: #888888;
        font-style: italic;
    }
    
    .form-group label {
        font-weight: bold;
    }
    
    .commenterName {
        color: rgb(0, 123, 255);
        font-weight: bold;
    }
    
    .commentPublishingDate {
        color: rgb(119, 119, 119);
        font-style: italic;
    }
    
    .comment {
        text-indent: 20px;
        padding-top: 10px;
    }
</style>