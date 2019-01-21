---
layout: post
title: How I spent May 2018 on learning Databases
author: Navaneeth Suresh
---

Databases are the backbone of any software (credits: [@DefCon-007](https://github.com/DefCon-007)). But, it took a lot of time for me to understand this. I never understood the exact differences between using a spreadsheet for storing details and a RDBMS before. So, I started to study databases in depth.

## How I spent May 2018 on learning Databases
---
### Understanding concepts
![Database Design](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/database-design.png?token=AgXlPvuRwl5vrrlSHm2Ay2AD3m5c6Cfoks5cTxbTwA%3D%3D)


Prerequisites are necessary before diving into a specific technology. I had MySQL in my 10+2 syllabus and I mugged the queries without having a deep understanding on the concepts of SQL. I do know how to write queries to get some specific data but, I had no idea about database design at that time.

As recommended by [@ghostwriternr](https://github.com/ghostwriternr/), I started watching a set of video tutorials on Database Design by Caleb Curry [here](https://www.youtube.com/watch?v=e7Pr1VgPK4w&index=1&list=PLlTjty5ceOnd-sCYEHlFO0JRg2liaFvxv). I found this guy as super cool and highly contented. He explains each and every concepts in depth in a beginner friendly manner. I can't even call it a lecture. It's like your best friend teaching you a night before end sems. Very very user-friendly and informative.

I got a clear idea about the things to be taken care of while designing databases. Throughout this course, he keep on talking about Data Integrity and reducing Data Redundancy. Lack of them may lead to wrong results on executing queries. Breaking data into Atomic values is also a good practice. He also briefly talks about SQL queries and specific filters. He explains each concepts with proper examples which can easily make us grasp. After watching his videos you won't be actually implementing anything but, will have a deeper understanding on RDBMS. Nobody can do this course without recommending to others.

### Peek into NoSQL through MongoDB
I was in a mood to apply the concepts that I've learnt in Caleb's course. So, do I need to start with SQL again? I asked myself. Nope. I've seen MongoDB in many CVs and it has recently been a buzzword. I started to learn it from the official courses as recommended by [@icyflame](https://github.com/icyflame). I visited the MongoDB University [website](https://university.mongodb.com/) and selected the intro [course](https://university.mongodb.com/mercury/M001/2018_May). It started on May 15 and suppose to end on June 5. They update their resources on weekly basis so that you can have plenty of time on experimenting yourselves and enough time to chill. The syllabus includes:

![Syllabus of course](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/mongo-syllabus.png?token=AgXlPlZoLyFpNH5K82gxOugNSJptSfAKks5cTxbzwA%3D%3D)


One of the major differences that I've found in MongoDB with SQL is it uses JSON files for storage which is cute. BSON(Binary JSON) if you want encryption. Also, it is not necessary for a database to have a fixed schema. This one will throw away the concepts of Views in SQL. In case you want to select particular fields, you can create a Projection in MongoDB. There are various operators and filters in MongoDB which makes it powerful to use. Instead of DDL and DML commands in SQL, MongoDB has CRUD operations. We can either use MongoDB Compass or Mongo Shell to execute our queries.

MongoDB Compass:

![MongoDB Compass](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/mongodb-compass.png?token=AgXlPv8JaRld3ylFK5Z4XwsL3sSyD_F5ks5cTxcJwA%3D%3D)


Have a look at Mongo Shell:

![Mongo Shell](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/mongo-shell.png?token=AgXlPtEHETVfdmQUyVkiYnf6WT8si6K8ks5cTxcdwA%3D%3D)


Mostly I was using the Mongo Shell. It is a powerful Javascript interpreter. I created a sandbox atlas cluster for my own experiments which had 512 MB of space and free of cost even though the course had a class cluster by default for learning purpose. The class cluster contained databases which included almost 2 million documents. eg: It contained a video database with a movie collection, a weather database, etc. I explored the huge data throgh MongoDB Compass which is the GUI tool for MongoDB. After connecting to a cluster, it allows us to do all CRUD operations and browse the huge database.

In case you are familiar with MongoDB, here is a problem for you.

![MongoDB Problem](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/mongo-problem.png?token=AgXlPnXjlzi0zmrmWzvfA3I3DLCSWkP4ks5cTxcvwA%3D%3D)


Here is my progess in the course:

![Progress](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/mongo-progress.png?token=AgXlPowKcYyXWPDjUAutdQI1ICmB1kFvks5cTxdCwA%3D%3D)

At last certificate:

![(Certificate)](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/mongo-certificate.png?token=AgXlPt81BFX4B8oFT8EDihj1v2xEtzHnks5cTxdZwA%3D%3D)

If you are planning to learn MongoDB, don't forget to do this course. It'll give you a good idea on MongoDB AFAIK.

