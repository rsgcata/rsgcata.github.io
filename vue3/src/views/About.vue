<script setup>
</script>

<template>
    <div class="container-fluid">
        <div class="container">
            <div class="row short-presentation align-items-center">
                <div class="col-12 col-md-12 col-lg-6 col-xl-6">
                    <h1>THE NAME IS</h1> <br />
                    <h2 class="font-weight-bold">
                        George Catalin
                    </h2>
                    <p>
                        and the activity which fills most of my day is building software.
                    </p><br />

                    <h1>ABOUT ME</h1> <br />
                    <p class="about-me-text">
                        <b>Self thought to some degree</b>. Full ownership for the learning path
                        and
                        process. The source of knowledge: books, internet, trial and error,
                        working on multiple projects of different sizes and with different
                        development styles.
                    </p>
                    <p class="about-me-text">
                        <b>Curious by nature, but with a practical mindset</b>. I like working
                        with
                        tools and technologies that help me build simple, flexble solutions
                        and lower the overall cognitive load.
                        Some of these tools I'm using, or I have used at some point in my daily
                        activities, are: <b>go, php, js, typescript, sql, python, docker,
                            html, scss, kubernetes. With a focus on software development and
                            less on
                            the operations part</b>.
                    </p>
                    <p class="about-me-text">
                        Key aspects of the <b>culture and midnset</b> I like the most:
                        <b>consistency (agility), flexibility, transparency, quality, proactive
                            and
                            not reactive, knowledge sharing, work ownership, client well-being
                            ortiented</b> (a client can be another software engineer, a
                        stakeholder, a
                        customer).
                    </p>
                </div>
                <div class="col-12 col-md-12 col-lg-6 col-xl-6 prod-cycle-container">
                    <div class="row">
                        <div class="col-xl-2"></div>
                        <img class="img-fluid col-10" src="@/assets/Geo1.png" alt="">
                    </div>
                    <div class="row">
                        <div class="col-8" style="padding-top: 10%">
                            <span style="font-weight: bold; float: right">"The cycle of
                                productivity"</span>
                        </div>
                        <div class="col-4">
                            <img class="w-50" src="@/assets/stareBlankly.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <div class="container">
            <div class="row peopleBooksPresentation">
                <div class="col-12">
                    <h5>People and resources to learn from</h5>
                    <p class="about-me-text">
                        If you enjoy reading or listening to other people's point of view about
                        software engineering, below are few people & resources that, in my opinion,
                        influenced me in a positive way.
                    </p>
                    <p class="people-refs d-flex justify-content-around">
                        <a href="https://www.youtube.com/@ContinuousDelivery"
                            referrerpolicy="no-referrer" rel="noreferrer" target="_blank">
                            Dave Farley's continuous delivery vlog
                        </a>
                        <a href="https://martinfowler.com/" referrerpolicy="no-referrer"
                            rel="noreferrer" target="_blank">
                            Martin Fowler's blog
                        </a>
                        <a href="https://gregfyoung.wordpress.com/" referrerpolicy="no-referrer"
                            rel="noreferrer" target="_blank">
                            Greg Young's blog
                        </a>
                        <a href="https://kalele.io/blog/" referrerpolicy="no-referrer"
                            rel="noreferrer" target="_blank">
                            Vaugh Vernon's blog
                        </a>
                        <a href="http://udidahan.com/articles/" referrerpolicy="no-referrer"
                            rel="noreferrer" target="_blank">
                            Udi Dahan's articles
                        </a>
                    </p>
                    <p class="people-refs">
                        <a href="http://www.cqrs.nu/" referrerpolicy="no-referrer" rel="noreferrer"
                            target="_blank">
                            Simple presentation of DDD and CQRS concepts
                        </a>
                    </p>
                    <p>Books:</p>
                    <p class="people-refs">
                        Domain-Driven Design: Tackling Complexity in the Heart of Software -
                        Eric Evans <br>
                        Implementing Domain Driven Design - Vaughn Vernon <br>
                        Patterns of Enterprise Application Architecture - Martin Fowler <br>
                        My very first programming book - PHP and MySQL for Dynamic Web Sites - Larry
                        Ullman
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-fluid {
    background-color: rgb(249, 249, 255);
    font-size: 15px;
    padding-bottom: 30px;
}

.short-presentation:first-child h1:first-child {
    margin-top: 15%;
}

.short-presentation h1 {
    letter-spacing: 2px;
    font-size: 15px;
    margin: 0;
}

.storyPresentation {
    margin-top: 3%;
}

p {
    color: rgb(90, 90, 90);
}

p.about-me-text {
    text-indent: 20px;
}

p.about-me-text b {
    font-weight: bold;
    color: black;
}

p.people-refs {
    padding-left: 20px;
}

p.people-refs a {
    text-decoration: none;
}

.prod-cycle-container {
    text-align: center;
    min-width: 300px;
    min-height: 300px;
    margin-top: 10%;
}

.tagItem {
    color: #3E6D8E;
    background-color: #E0EAF1;
    border-bottom: 1px solid #3E6D8E;
    border-right: 1px solid #7F9FB6;
    padding: 3px 4px 3px 4px;
    margin: 2px 2px 2px 0;
    text-decoration: none;
    line-height: 2.4;
    white-space: nowrap;
}
</style>