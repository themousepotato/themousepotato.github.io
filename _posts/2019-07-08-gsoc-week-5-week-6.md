---
title: GSoC Week 5 - Week 6
date: 2019-07-08
permalink: /posts/gsoc-week-5-week-6
tags:
  - gsoc
  - software
---

I was working on adding interactive mode to `hg unshelve`. Until now, we cannot unshelve selected changes only from the stored shelve. We already have an interactive mode in `hg shelve`. I sent a patch[[1]](https://phab.mercurial-scm.org/D6596) to add interactive mode to `unshelve`

I started with adding selected files only as a baby step. I borrowed a function from `uncommit` extension called `_commitfiltered()`. What it does was it created a new changeset excluding the given files. I modified it to include the given files to make it work for `unshelve`. This function had the following syntax by default:

```python

def _commitfiltered(repo, ctx, match, keepcommit):
    """Recommit ctx with changed files not in match. Return the new
    node identifier, or None if nothing changed.
    """
    base = ctx.p1()
    # ctx
    initialfiles = set(ctx.files())
    exclude = set(f for f in initialfiles if match(f))

    # No files matched commit, so nothing excluded
    if not exclude:
        return None

    # return the p1 so that we don't create an obsmarker later
    if not keepcommit:
        return ctx.p1().node()

    files = (initialfiles - exclude)
    # Filter copies
    copied = copiesmod.pathcopies(base, ctx)
    copied = dict((dst, src) for dst, src in copied.iteritems()
                  if dst in files)
    def filectxfn(repo, memctx, path, contentctx=ctx, redirect=()):
        if path not in contentctx:
            return None
        fctx = contentctx[path]
        mctx = context.memfilectx(repo, memctx, fctx.path(), fctx.data(),
                                  fctx.islink(),
                                  fctx.isexec(),
                                  copysource=copied.get(path))
        return mctx

    if not files:
        repo.ui.status(_("note: keeping empty commit\n"))

    new = context.memctx(repo,
                         parents=[base.node(), node.nullid],
                         text=ctx.description(),
                         files=files,
                         filectxfn=filectxfn,
                         user=ctx.user(),
                         date=ctx.date(),
                         extra=ctx.extra())
    return repo.commitctx(new)

```

Then, I started working directly by looking at the interactive mode on `shelve`. I had to pass an interactive commit function which does `cmdutil.dorecord()`. I had to make it work for all corner cases possible. One of the important cases which I missed initially was unshelve on interactive mode with conflicts. Later, I made this work for all cases.
