<script setup>
import { ref, onMounted } from 'vue'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import php from 'highlight.js/lib/languages/php';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('php', php);

const codeRefs = ref([]);

onMounted(() => {
    codeRefs.value.forEach((element) => {
        console.log(element)
        hljs.highlightElement(element)
    })
})
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2 class="articleTitle">
                    The devil is in the detail - Consistency with MySQL Group Replication
                </h2>
                <p class="articleDateTime" data-dateNumber="20181113">
                    Published: Tuesday, 13 November 2018
                </p>
                <br /><br />
                <p class="articleSubTitle">
                    What is this "MySQL Group Replication" . . . ?
                </p>
                <p>
                    MySQL Group Replication is a fairly new plugin (since MySQL 5.7) for MySQL that
                    takes care of the challenges that emerge when building fault tolerant systems.
                    It's a synchronous, single and multi master database replication solution that
                    also takes care of cluster management (with minor drawbacks for consistency
                    which I will talk about in this article and offer a solution for it). If HA
                    (high availability) and consistency is a must for the project you are working
                    on, I think Group Replication is the best free option, offered by MySQL/Oracle,
                    that you can use at this moment. You can find more details about this plugin <a
                        href="https://dev.mysql.com/doc/refman/8.0/en/group-replication-background.html">here</a>.
                </p>
                <div class="tldr">
                    <p class="tldrTitle">
                        TL;DR
                    </p>
                    <p class="articleSubTitle">
                        Why not use traditional MySQL replication or semi-sync replication ?
                    </p>
                    <p>
                        I think the evolution of things in this internet era goes towards a more
                        challenging environment. An IoT, SaaS, IaaS (insert more products ... as a
                        service) era where everything is connected, where information needs to be
                        delivered right away and in a consistent state. The only way to solve these
                        challenges is to have clustered nodes, servers that can function as a whole,
                        that can manage themselves and self heal.
                    </p>
                    <p>
                        When it comes to database HA and consistency, the traditional MySQL options
                        can't solve them entirely. Both of them are asynchronous replication methods
                        so, there is a chance that in some scenarios, the slave may end up with
                        stale data. In case of master failure, if you care about consistency, you
                        will have to check if the slave has received all data changes made on the
                        master. Only then you can set a new master. This type of setup is mostly
                        used in geographic replication, or where data consistency is not a priority.
                        In contrast, with Group Replication there is a concensus, all nodes (or a
                        majority) have to approve a transaction before it is committed .
                    </p>
                    <p>
                        Another drawback (more of an inconvenience) for the traditional replication
                        methods is that they lack automatic cluster management. They lack automatic
                        master election, automatic failure detection and group membership
                        management. You have to step in to manually manage the cluster or build some
                        tools that could automate some of the cluster management tasks.
                    </p>
                    <p>
                        Don't get me wrong, async replication has many use cases. You may use async
                        replication for example if the product, system requires inter data center
                        replication or to scale out reads that do not really require up to date
                        data. Even though it's more of a "cold" failover solution, it can be used
                        for disaster scenarios.
                    </p>
                </div><br />
                <p class="articleSubTitle">
                    Back to the main subject of the article : group replication consistency
                </p>
                <p>
                    Even though nodes in MySQL Group Replication guarantees that database state is
                    the same at any time on all of them, in some scenarios, data is not made
                    available to the client right away if needed. In other terms, the slaves queue
                    the certified transactions in the relay log, they guarantee that they have an up
                    to date copy of the data, but they can't guarantee that at the same time the
                    queued transactions will be applied, data may not be available for clients.
                    There are rare scenarios when applier threads lag behind (this can happen for
                    example with large transactions). I know it sounds like the same issue async
                    replication options have, but at least here, we know for sure that we have a
                    full copy of the data on the slave at any time, the only issue is that it may
                    not be available in some scenarios for the client (very rare scenarios).
                </p>
                <p>
                    So knowing that there may be a small window of "read inconsistencies" on the
                    slaves, when trying to failover to a newly elected master, we have to make sure
                    that, the new master, has applied all transactions queued in the relay log. It
                    is very important for business critical decisions (like payments) to fetch up to
                    date data.
                </p>
                <p>
                    Assuming we are working with the primary node (the one that has
                    performance_schema.replication_group_members.MEMBER_STATE = ONLINE,
                    performance_schema.replication_group_members.MEMBER_ROLE = PRIMARY), <b>to
                        achieve this level of "read consistency" we can check 2 things</b>:
                </p>
                <ul>
                    <li>
                        Check if the slave sql thread has read all relay log. Which means that the
                        applier thread has finished applying the transactions
                        <pre>
<code xlass="php":ref="el => codeRefs.push(el)">
$threadsInfo = $dbSession->selectRows(
        'SELECT THREAD_ID, PROCESSLIST_USER, PROCESSLIST_COMMAND, PROCESSLIST_STATE FROM threads');
        
$hasReadAllRelayLog = FALSE;
foreach($threadsInfo as $thread) {
    if(stripos($thread['PROCESSLIST_STATE'], 'has read all relay log') !== FALSE) {
        $hasReadAllRelayLog = TRUE;
        break;
    }
}
</code>
</pre>
                    </li>
                    <li>
                        Check if the applier queue is empty
                        <pre>
<code class="php":ref="el => codeRefs.push(el)">
$txInApplierRes = $dbSession->selectRows(
        'SELECT count_transactions_remote_in_applier_queue  
        FROM performance_schema.replication_group_member_stats');
        
$applierQueueEmpty = FALSE;
if($txInApplierRes[0]['count_transactions_remote_in_applier_queue'] === 0) {
    $applierQueueEmpty = TRUE;
}
</code>
</pre>
                    </li>
                </ul>
                <p>
                    We can check for both things to make sure the new master is up to date. These
                    kind of checks can be done periodically (ex. every 60 seconds), to refresh the
                    state of the group members. The state can be registered with a service discovery
                    tool like <a href="https://www.consul.io/">Consul</a>, which will make primary
                    node discovery simpler.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.articleDateTime {
    font-style: italic;
    color: rgb(119, 119, 119);
}

.articleTitle {
    padding-left: 20px;
}

p,
.articleParagraph {
    text-indent: 20px;
}

.articleSubTitle {
    font-weight: bold;
    font-style: italic;
    font-size: 110%;
}

.tldr {
    background-color: #efefef;
    padding: 20px;
    border: 1px solid #e0e0e0;
}

.tldrTitle {
    font-size: 200%;
}
</style>