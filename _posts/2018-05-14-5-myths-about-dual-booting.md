---
layout: post
title: 5 Myths about dual booting
author: Navaneeth Suresh
---

Dual booting a GNU/Linux distro with either Windows or Mac is an important step before ditching them. Don't worry. Just kidding! It's all up to you. Here, we'll talk about 5 myths that are popular among the non-GNU/Linux users.

## 5 Myths about dual booting
---
### 1. System will slow down!
![Slow computer](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/slow-computer.png)
Surely, you must be kidding. Dual booting has nothing to do with your RAM. Only hard disk is being partitioned. You can allocate desired size to your partitions. It's all in your hands.

### 2. Process is too complex!
![Too complex process](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/complex.jpg)
This is another one. If you aren't a sysadmin, stay away from all these crap that affect your hard disk directly. Shut up! It is true that installing a distro alongside with your default one is not simple as a beginner. But, it's not too complex or difficult to understand. If you find some time to learn new stuff, enthusiastic enough to break rules and have some courage to experiment, then you are welcome. Today there are several tutorials available to all type of users. It doesn't matter whether you are a beginner, a noob or whatever.

### 3. Highly prone to driver issues!
![Error](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/error.png)
Many of my friends complain that after dual booting they came across problems like "wifi stopped working", "printers stopped working", etc. It happens sometimes. But, there is a holy grail for each and every problem of you. You can report bugs at discussion groups like StackOverflow. Often by a Google search you will get a link to the solution from a discussion group without even asking it by yourself. Try executing the mentioned solutions only by counting the upvotes is the corresponding discussion site. You may have to find some time to fix those issues. But, believe me at last you'll learn something new for sure.

### 4. Battery drains too fast!
![Battery drain comic](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/battery-drain.jpg)
This is very funny. People often complain that their laptop's battery drains too fast on using a GNU/Linux distro even with a single booted system. This is not true per se. If you are facing such issues, try installing some system monitoring programs. Stacer is one of them. You can disable the processes that you don't require using these apps. They'll show you the current running status graphically. You can easily understand which one is unnecessarily consuming your battery which you'll be hardly using. For example, the bluetooth will be on by default. It consumes a lot of power.

This command is also worth giving a shot:
> $ sudo apt-get install tlp && sudo tlp start

### 5. Takes time to boot!
![Too time taking process](https://raw.githubusercontent.com/themousepotato/themousepotato.github.io/master/images/long-time.jpg)
Some devices will force you to disable Fast boot option in Windows for a successful dual boot. This has nothing to do with the new distro. It's all decided by the Windows people. We cannot change that as long as they are proprietary.


