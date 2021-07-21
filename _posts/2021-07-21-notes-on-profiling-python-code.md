---
title: Notes on Profiling Python code
date: 2021-07-21
permalink: /posts/notes-on-profiling-python-code
tags:
  - python
  - software
  - profiling
  - pprof
---

Profiling is the process of dynamic program analysis that measures the space/time complexity of the functions, frequency and duration of function calls, etc. It gives us the idea about where can we modify the code to have maximum impact on the performance of the program. In this blog post, I try to explain how to set up profiling tools for a python code and how can we find the code snippet which we can improve upon. We want to reduce the number of calls to that function.

There are numerous profling tools available for python out there. I use `yep`.

## Setting up yep
`yep` uses the `google-perftools` CPU profiler and depends on `pprof` for visualization. It profiles compiled code of C/C++/Fortran from the python interpreter.

* Install `google-perftools` and `yep`

```
$ sudo apt-get install google-perftools
$ pip install yep
```

* Mark the region to profile
{% highlight python %}import yep

yep.start('perf.prof')
# Code to profile
yep.stop(){% endhighlight %}

This will generate a `perf.prof` file which can be analysed using `pprof`

## Setting up pprof and profiling
`pprof` is a tool for visualization and analysis of profiling data. It can generate both text and graphical reports. It needs profiling sample in [this](https://github.com/google/pprof/blob/master/proto/profile.proto) format which we'd generated using `yep`.

* Install `pprof` and get report
```
$ go get -u github.com/google/pprof
$ pprof -cum -text -lines perf.prof
```

Now, let's look at the report generated. It'll have the fields - `flat`, `flat%`, `sum%`, `cum`, `cum%` and `context`. `flat` means the memory allocated and is held by the function. `cum` means the memory allocated by this function or the function that it called down the stack. `sum` means the memory spent by the previous lines. `context` means the line of code which has the corresponding call. A more detailed explanation can be found [here](https://stackoverflow.com/a/56882137).

Here, we used `-cum` flag to have the entries sorted by the `cum` value. The first entry will have the greatest `cum` value. This will be a function that is down the stack(a c++ stl operation for example). We need to look for the routine that calls this function. To do that, we'll look the `context` which has our code and that has `sum%` just greater than the maximum `cum%` we'd just found. This is because, if we think of the function calls as taking up time, we know that whatever calls the function that is taking up the time should be slightly more time-consuming than the function call itself. So, we can figure out the caller of the function by looking for something with a cumulative call time higher than it. The difference between `sum%` and `cum%` is the key since cumulative includes it and all of its sub-calls.

I found it hard to digest this at first. Let's talk through a real life example. Imagine you are spending time on your computer. There are various tasks you do at the computer - emails, coding, gaming, etc. The time you spend doing emails + coding + gaming is going to be slightly less than the time you spend at the computer, because of things like booting, navigating between menus, folders, etc. So if you are told, you spend Y amount of time doing X, you can see what contains X by looking one level up at the cumulative time total spent. If I told you, it looks like you spent 40min doing emails, what were you doing while doing emails, and you looked and say, oh, I was at the computer for 41min, you could say, "That was part of my computer time". Similarly, if we look at our routines, and the big time sink is taking X% of time, we want to look for the first routine that takes more than X%, because that's likely to be the one that is calling it.

## References
* Most of the things I'd said to elaborate were exactly words of [Matt](https://matthewturk.github.io/) while he was trying to make me understand. I didn't want those to get buried, so I'd decided to write this up and publish
* https://gperftools.github.io/gperftools/cpuprofile.html
* https://github.com/google/pprof
* https://pypi.org/project/yep/
* https://www.freecodecamp.org/news/how-i-investigated-memory-leaks-in-go-using-pprof-on-a-large-codebase-4bec4325e192/
* https://v0dro.in/blog/2020/04/21/profiling-and-benchmarking-python-programs/
* https://stackoverflow.com/a/56882137
