---
title: Where Should a Firewall Sit?
date: 2026-09-16
description: A simple network-design example showing diagrams, blockquotes, and configuration-style code.
tags: [firewall, security, networking]
---

# Where Should a Firewall Sit?

A firewall is commonly placed at a security boundary where traffic between different trust zones can be inspected and controlled.

![Firewall placement](images/firewall.svg)

## A simple design

```text
Internet
   |
[ ISP ]
   |
[ Firewall ]
   |
[ Core Switch ]
   |
+--+-----------+
|              |
Users        Servers
```

## Why the boundary matters

Putting the firewall at the boundary gives it a clear place to enforce policies such as:

- Internet-to-LAN filtering
- Server-zone access control
- NAT
- VPN termination
- Logging and inspection

## Example policy idea

```text
Source: Internet
Destination: Internal users
Action: Deny by default

Source: Admin VLAN
Destination: Management VLAN
Action: Allow approved management traffic
```

## Important

The exact placement depends on the network architecture. A larger environment may use multiple firewalls or security zones instead of one device at the edge.
