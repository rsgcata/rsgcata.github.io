<script setup>
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2 class="article-title">Hello World</h2>
                <p class="article-date-time">
                    Published: Thursday, 8 November 2018
                </p>
                <br /><br />
                <p class="article-sub-title">
                    There's no better way to start an IT & development blogging journey than with a
                    "Hello World!"
                </p>
                <p>
                    If you have not read my <router-link to="/">"About me"</router-link> section
                    yet, my name is George and I am a software engineer (I know it sounds like an
                    introduction from an AA meeting like you probably have seen in many movies, but
                    please bear with me, an introduction needs to be done). I am a curious and
                    practical person. Every bit of knowledge I gathered about this industry was done
                    thorough books, internet articles, podcasts and a lot of coding and
                    brainstorming to find solutions for all sorts of problems and challenges that
                    arose while working on various projects. My first major being in financial
                    analysis and stock markets (later on I majored in information technology also),
                    I had to learn a lot, by myself, as the environment I was part of, was not
                    really one that could aid that much to boost me on this path. Mostly curiosity
                    and the idea that I can build cool things with my own brain & hands was my drive
                    for exploring and aiming to master this quite vast field.
                </p>
                <p class="article-sub-title">
                    Blogging motivation
                </p>
                <p>
                    For a very long time I wanted to share with others my ideas and opinions about
                    programming and patterns, technologies related to it. I had many "Eureka"
                    moments that I wanted to share with others or sometimes I simply wanted to
                    express my dissatisfaction regarding certain implementations, methodologies or
                    patterns others follow. Now, I have a bit more time on my hands so I decided to
                    take this off my "to do" list.
                </p>
                <p class="article-sub-title">
                    Quick tour
                </p>
                <p>
                    If you decided to follow this blog and read the articles I post here, let me
                    tell you what you may read about here.
                </p>
                <p>
                    Some things I may post about : <br />
                </p>
                <ul>
                    <li>
                        General programming patterns, methodologies. Here I'll try not to repeat the
                        same things you can find out there in many articles. Or at least I'll try to
                        say my own opinion about these things, that could be different from the
                        popular vision. As a reminder for me, I will layout some patterns that I
                        could write about: MVC, CQRS, event sourcing, microservices, SOA,
                        distributed systems, design by contract & inversion of control, domain
                        driven design
                    </li>
                    <li>
                        Programming languages, libraries and frameworks. Maybe pros and cons of
                        certain frameworks, libraries. When and why should we use, from my opinion,
                        certain frameworks. What are the issues with certain programming languages
                        and where they excel.
                    </li>
                    <li>
                        Tools and services like databases, MySQL, service discovery, Consul, Elastic
                        Search, Kibana, Apache server, Nginx, cloud services, infrastructure as a
                        service, AWS, IDEs, VMs, Docker, K8s
                    </li>
                    <li>
                        Security: general types of attacks on the web apps, server security, private
                        network security, microservices security, SSL
                    </li>
                    <li>
                        Other general things related to the IT industry. Things like freelancing,
                        job postings and opinions on their set of requirements, full stack developer
                        term, startups, unicorns, teams or project management
                    </li>
                </ul>
                <p>
                    There will be no set date when I will post articles. I may write 5 articles in a
                    week, or one in a few months. I need to feel that I can share something
                    interesting with you, or feel that I really need to say my opinion about
                    something before I start writing about it. Also time is another factor that will
                    contribute to the new posts frequency. But if I really feel that something
                    really needs to get out there, I will find the time to write about it.
                </p>
                <p>
                    The articles will be organised based on their date when they were posted, for
                    now. Maybe, in the future I will add a "sort by tags" feature so you can reach
                    the desired type of article faster. You can navigate through articles by using
                    the "archive" panel situated on the right side of the page (articles are grouped
                    by year).
                </p>
                <p>
                    This is all for my blog's "Hello World!". I hope it was a pleasant read,
                    probably it was since you got this far :) .
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.article-date-time {
    font-style: italic;
    color: rgb(119, 119, 119);
}

.article-title {
    padding-left: 20px;
}

p {
    text-indent: 20px;
}

.article-sub-title {
    font-weight: bold;
    font-style: italic;
    font-size: 110%;
}
</style>