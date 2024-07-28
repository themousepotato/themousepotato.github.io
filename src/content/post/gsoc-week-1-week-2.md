---
title: GSoC Week 1 - Week 2
description: ""
publishDate: "07 June 2019"
permalink: /posts/gsoc-week-1-week-2
tags: ["gsoc", "software"]
---

I had to work on implementing functionality to store unresolved merge-states. After interacting with the community, most of the people voted for an approach that I hadn't thought much of. It was to add an `--unresolved` flag to `hg shelve` and `hg unshelve` commands. @marmoute advised me to study the current storage format of mergestate in depth and send a patch to the core to add an `internals.mergestate` help entry. I sent a patch[[1]](https://phab.mercurial-scm.org/D6448) for that in the very first day itself.

Before sending patches directly to the core, it was necessary to experiment with the ideas that I had and test them. My mentor @pulkit adviced me to bootstrap my implementation as an extension and push changes to my clone[[2]](https://bitbucket.org/navaneethsuresh/hg/src/default/) of hg on bitbucket. I pushed two commits. One[[3]](https://bitbucket.org/navaneethsuresh/hg/commits/5a4358258d60ab26bf9863b99ca6bf4c33dd8c31) of them added an `--unresolved` flag to `hg commit` which made to commit unresolved merge and the other[[4]](https://bitbucket.org/navaneethsuresh/hg/commits/650d3ac7328a4f88ef005aacce8ef2d261fa820f) added a new command `hg commit-unresolved` to make the user get back to the old unresolved merge-state. I received good reviews from my mentor for both of them. Writing a new extension to mercurial and integrate it over there was much easier than I thought. The wiki had a nice page[[5]](https://www.mercurial-scm.org/wiki/WritingExtensions) for that. I followed those instructions to set up new extensions without making the main codebase buggy. We can also bootstrap a flag as an extension.

The next week, I worked on adding the flag `--unresolved` to both `hg shelve` and `hg unshelve` commands. This changed their behaviour to handle unresolved merge-states with a simple hack. I used the already stored mergestate information. I have sent two patches to the core after implementing one[[6]](https://phab.mercurial-scm.org/D6478) for shelve and another[[7]](https://phab.mercurial-scm.org/D6479) for unshelve.

## Changing the behavior of shelve
Shelving was aborted when a merge is in progress. I had to stop this abort and allow it to continue when called with an `--unresolved` flag. Then, after locking the repo, an extra mapping `{'unresolved-merge': True}` is added to the shelve changeset. Finally, the usual merge-state information is moved to a new place `.hg/merge-unresolved`. The following code made that work.
```python
if unresolved:
    extra['unresolved-merge'] = True
    if not os.path.exists(repo.vfs.join('merge-unresolved')):
        util.makedir(repo.vfs.join('merge-unresolved'), False)
    util.rename(repo.vfs.join('merge'),
                repo.vfs.join('merge-unresolved/%s/' % name))
```

## Changing the behaviour of unshelve
Unshelve should update the working directory to the old unresolved merge-state. But, one problem with this is what the UI should be when the user has commits on the top of the shelved unresolved merge-state. The user has to be in one of the merge parents of the stored shelve in order to restore the unresolved merge-state. Also, `hg unshelve --unresolved` will abort on a dirty working directory. The following steps are taken by unshelve to get back to the stored unresolved merge-state.

1. If the user has committed new changesets after shelving the changes, they must update the working directory to one of the merge parents.

2. Internally, merge `p1` with `p2` with the merge tool `:fail`. This will not update the contents of the files with conflicting changes. Instead, it will mark them as unresolved.

3. This internal merge will also mark the files which are already resolved by the user in the unresolved shelve changeset as unresolved. But, we will move the contents of `$HGRCPATH/merge-unresolved/<basename>/` to `$HGRCPATH/merge/` so that we can restore the partially resolved states.

4. We now have a state in which files marked as resolved might have conflicts. But, we will apply the changes in shelve on the top of this so that we can get our old unresolved merge again by the usual `unshelve` mechanism. The usual rebase step is avoided on unresolved shelve changesets.

I wrote a new function `shelve.restoreunresolvedshelve()` to get this work as:
```python
def restoreunresolvedshelve(repo, ui, basename, pctx, shelvectx):
    p1, p2 = shelvectx.parents()
    overrides = {('ui', 'forcemerge'): ':fail'}
    # Rather than attempting to merge files that were modified on
    # both branches, `:fail` marks them as unresolved.
    # This will also mark resolved files in unresolved shelvectx as
    # unresolved. We'll restore their status and content later.
    with ui.configoverride(overrides, 'unshelve'):
        # dirstate can be either p1 or p2.
        targetctx = p2
        if pctx.node() == p2.node():
            targetctx = p1
        merge.update(repo, targetctx, branchmerge=True, mergeforce=False,
                     force=True)

    if not os.path.exists(repo.vfs.join('merge-unresolved')):
        util.makedir(repo.vfs.join('merge-unresolved'), False)
    shutil.rmtree(repo.vfs.join('merge'))
    # Replace `merge/` with `merge-unresolved/<basename>/` to
    # restore the status of resolved files in shelvectx.
    util.rename(repo.vfs.join('merge-unresolved/%s/' % basename),
                repo.vfs.join('merge'))
```

Now that I have a fully functioning UI with the proposed method. However, the end-goal of the project is to transmit these stored unresolved merge-states across repositories. For that, I would have to store data in changeset level. Now, I shall wait for reviews from the community on the current approach and will start working on storing data in a changeset level from next week.
