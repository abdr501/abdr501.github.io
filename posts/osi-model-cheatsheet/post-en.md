---
title: OSI Model Quick Reference
date: 2026-09-20
description: A compact networking reference demonstrating headings, nested lists, and a comparison table.
tags: [networking, osi, study-notes]
---

# OSI Model Quick Reference

The OSI model is a useful way to organize networking concepts by layer.

## The seven layers

### 7. Application

Examples include HTTP, DNS, and DHCP.

### 6. Presentation

This layer is commonly associated with data representation, encoding, and encryption concepts.

### 5. Session

It describes communication sessions between applications.

### 4. Transport

TCP and UDP operate here.

### 3. Network

IP addressing and routing are key concepts at this layer.

### 2. Data Link

Ethernet frames, MAC addresses, and switches are common Layer 2 topics.

### 1. Physical

Cables, connectors, radio signals, and electrical/optical transmission belong here.

## Quick comparison

| Layer | Example | Device/topic |
| ---: | --- | --- |
| 7 | HTTP | Application |
| 4 | TCP | Transport |
| 3 | IP | Router / routing |
| 2 | Ethernet | Switch |
| 1 | Fiber | Physical media |

## Memory tip

Start from the application and move downward when troubleshooting. Ask which layer contains the problem before changing configuration.
