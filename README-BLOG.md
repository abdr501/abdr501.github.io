# Markdown Blog

This blog is static. Write posts in Obsidian, keep each post in its own folder, then run `./build-blog.sh` before committing.

## Where your blog posts go

The `posts/` folder is the **content folder**, not a second website. You put one folder here for each Obsidian post. The `blog.html` page and the JavaScript are already at the repository root/scripts folder.

For example:

```text
posts/
└── my-first-post/
    ├── post.md
    └── images/
        ├── image-1.png
        └── image-2.jpg
```

## Markdown front matter

Front matter is optional, but recommended:

```yaml
---
title: My First Post
date: 2026-09-23
description: A short description of the post.
tags: [linux, networking]
---

# My First Post

Write your post here.

![My image](images/image-1.png)
```

## Publish

From the repository root:

```bash
./build-blog.sh
git add .
git commit -m "Add blog post"
git push
```

`build-blog.sh` scans `posts/*/post.md` and generates `posts.json`. The browser then loads the Markdown directly and renders it on `blog.html`.

You do **not** need to create a `blog/` folder. Only use `posts/` for your Markdown content.
