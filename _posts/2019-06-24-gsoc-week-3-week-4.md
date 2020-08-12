---
title: GSoC Week 3 - Week 4
date: 2019-06-24
permalink: /posts/gsoc-week-3-week-4
tags:
  - gsoc
  - software
---

First two weeks of the coding period went well and I had sent a patch on the first prototype of the functionality that I have coded up. I had only used the usual mergestate format for that. Starting from week 3, I worked on storing mergestate records in the changeset extras so that it can be exchanged to other repositories. I updated the patch that I had sent here[[1]](https://phab.mercurial-scm.org/D6479). Also, the patch[[2]](https://phab.mercurial-scm.org/D6448) which added documentation on `internals.mergestate` got merged too.

The mergestate record information is stored as a list of tuples and I had to store it in the extra mapping `mergerecords`. I had to write an encoder and decorder for this as the information from the extra mapping can only be parsed as a string. I have used the following code for the encoder and decoder.

```python
def _encodemergerecords(records):
    """Encode mergestate records to store in changeset extras.
    Takes list of tuples as input and returns str.
    """
    items = [
        '%s\033%s' % (rtype, record)
        for rtype, record in sorted(records)
    ]
    return "\n".join(items)

def _decodemergerecords(data):
    """Decode mergestate record from changeset extras to return
    a list of tuples.
    """
    records = []
    for l in data.split('\n'):
        rtype, record = l.split('\033')
        records.append((rtype, record))
    return records
```

The read/write operations that can be performed on mergestate information were already implemented on `merge.py`. So, I used that right away. You can find the complete code for the functionality with documentation here[[3]](https://phab.mercurial-scm.org/D6479).

The next week, I got some interesting ideas from my mentor outside the project sample space. I worked on moving shelve extension to core and sent a patch[[4]](https://phab.mercurial-scm.org/D6553) for that. I am looking forward to work on extending the functionality to store/restore mergestate to multi-step commands like `rebase` and `histedit`, exchanging shelves and moving show extension to core.
