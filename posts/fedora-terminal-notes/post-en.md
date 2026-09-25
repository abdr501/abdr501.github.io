---
title: My Fedora Terminal Setup
date: 2026-09-22
description: A sample post showing terminal commands, ordered lists, inline code, and a local image.
tags: [linux, fedora, terminal]
---

# My Fedora Terminal Setup

I use the terminal heavily for networking labs, programming, and system administration.

![Terminal workflow](images/terminal.png)

## The basic workflow

1. Update the system.
2. Install the tools I need.
3. Keep configuration files organized.
4. Verify the result from the terminal.

## Useful commands

For example, `fastfetch` gives a quick overview of the machine, while `ip addr` shows network interfaces.

```bash
sudo dnf upgrade
ip addr
ss -tulpn
git status
```

## A small Bash example

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Current hostname: $(hostname)"
echo "Current user: $USER"
```

## Notes

Good shell habits make repetitive tasks easier to automate. I also prefer keeping commands in small scripts instead of repeatedly typing long command sequences.
