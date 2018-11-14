<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2 class="articleTitle">Hello World</h2>
                <p class="articleDateTime" data-dateNumber="20181108">
                    Published: Thursday, 8 November 2018
                </p>
                <br/><br/>
                <p class="articleSubTitle">
                    There's no better way to start an IT & development blogging journey than with a "Hello World!"
                </p>
                <p>
                    If you have not read my <router-link to="/">"About me"</router-link> section yet, my name is George and I am a web developer (I know it sounds like an introduction from an AA meeting like you probably have seen in many movies, but please bear with me, an introduction needs to be done). I am a self thought, curious developer. Every bit of knowledge I gathered about this industry was done thorough books, tech docs, blog articles, podcasts and a lot of coding and brainstorming to find solutions for all sorts of problems and challenges that arose when working on projects/tasks. My major being in financial analysis and stock markets, I had to learn everything, by myself, from scratch, as the environment I was part of, was not really one that could aid that much to boost me on this path. Mostly curiosity and the idea that I can build something cool with my own brain & hands was my drive for exploring and aiming to master this quite vast field.
                </p>
                <p class="articleSubTitle">
                    Blogging motivation
                </p>
                <p>
                    For a very long time I wanted to share with others my ideas and opinions about programming and patterns, technologies related to it. I had many "Eureka" moments that I wanted to share with others and many times I simply wanted to express my dissatisfaction regarding certain implementations, methodologies or patterns others follow, and by others I am referring to entities who are part of the IT world (bloggers, programmers and even companies). Now, I have a bit more time on my hands so I decided to take this off my "to do" list.
                    Another motivator is the vast amount of articles written by IT professionals that are freely available on the web. Some helped me a lot to strengthen my skills and build a proper mindset. Because of this, I wanted to follow this pattern and also share with others my thoughts, who knows, maybe some of you will consider them helpful.
                </p>
                <p class="articleSubTitle">
                    Quick tour
                </p>
                <p>
                    If you decided to follow this blog and read the articles I post here, let me tell you what you may read about here. 
                </p>
                <p>
                    Some things I may post things about : <br/>
                </p>
                <ul>
                    <li>
                        General programming patterns, methodologies. Here I'll try not to repeat the same things you can find out there in many articles. Or at least I'll try to say my own opinion about these things, that could be different from the popular vision. As a reminder for me, I will layout some patterns that I could write about: MVC, CQRS, event sourcing, microservices, SOA, distributed systems, design by contract & inversion of control, domain driven design
                    </li>
                    <li>
                        Programming languages, libraries and frameworks. Maybe pros and cons of certain frameworks, libraries. When and why should we use, from my opinion, certain frameworks. What are the issues with certain programming languages and where they excel.
                    </li>
                    <li>
                        Tools and services like databases, MySQL, service discovery, Consul, Elastic Search, Kibana, Apache server, Nginx, cloud services, infrastructure as a service, AWS, IDEs, putty, virtualbox
                    </li>
                    <li>
                        Security: general types of attacks on the web apps, server security, private network security, microservices security, SSL
                    </li>
                    <li>
                        Other general things related to the IT industry. Things like freelancing, job positings and opinions on their set of requirements, full stack developer term, startups, unicorns
                    </li>
                </ul>
                <p>
                    There will be no set date when I will post articles. I may write 5 articles in a week, or one in a few months. I need to feel that I can share something interesting with you, or feel that I really need to say my opinion about something before I start writing about it. Also time is another factor that will contribute to the new posts frequency. But if I really feel that something really needs to get out there, I will find time to write about it.
                </p>
                <p>
                    The articles will be organised based on their date when they were posted, for now. Maybe, in the future I will add a "sort by tags" feature so you can reach the desired type of article faster. You can navigate through articles by using the "archive" panel situated on the right side of the page (articles are grouped by year).
                </p>
                <p>
                    This is all for my blog's "Hello World!". I hope it was a pleasant read, probably it was since you got this far :) . If you liked any of the articles you will read, or if you have anything to share with me regarding any of the articles subjects, please write a comment in the comment section (you can find it below each article).
                </p>
                <p class="articleSubTitle">
                    P.S. : If you would like me to write about something cool, interesting, you can leave a message here or in any article's comment section.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld'
    };
</script>

<style scoped>
    .articleDateTime {
        font-style: italic;
        color: rgb(119, 119, 119);
    }
    
    .articleTitle {
        padding-left: 20px;
    }
    
    p {
        text-indent: 20px;
    }
    
    .articleSubTitle {
        font-weight: bold;
        font-style: italic;
        font-size: 110%;
    }
</style>