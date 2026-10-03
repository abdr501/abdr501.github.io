---
title: Understanding VLANs Through a Small Cisco Lab
date: 2026-10-03
description: A practical explanation of VLANs, Access and Trunk ports, and how Cisco IOS handles VLAN configuration mode.
tags:
  - ccna
  - networking
  - cisco
---

# Understanding VLANs Through a Small Cisco Lab

One of the basic concepts in networking is the **VLAN**, especially if you're learning CCNA or working with Cisco switches.

VLANs allow us to divide a network into different logical networks without needing a separate switch for each network.

![Simple VLAN topology](images/topology.png)

## What is a VLAN?

Simply put, a VLAN is a logical network that works at **Layer 2**.

For example, I can have the same switch but divide the devices connected to it into multiple networks:

* VLAN 10 — Users
* VLAN 20 — Servers
* VLAN 30 — Management

Devices in different VLANs cannot communicate with each other directly at Layer 2. They need a Layer 3 device, such as a Router or Layer 3 Switch, to route traffic between them.

## An Important Note When Creating a VLAN

There is something I noticed while working with Cisco IOS, which is how the switch handles the VLAN creation command.

When you type:

```text
Switch(config)# vlan 10
Switch(config-vlan)#
```

you have entered **VLAN Configuration Mode**.

This means the switch has moved you into the configuration context for VLAN 10, and you are still inside that VLAN's configuration mode.

From here, you can change things such as the VLAN name:

```text
Switch(config)# vlan 10
Switch(config-vlan)# name USERS
```

One thing that can be a little confusing is that, in some versions or environments of Cisco IOS, if you try to check the VLAN using:

```text
Switch(config-vlan)# do show vlan brief
```

before leaving `config-vlan` mode, VLAN 10 might not appear in the output.

For example:

```text
Switch(config)# vlan 10
Switch(config-vlan)# do show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Et0/0, Et0/1, Et0/2, Et0/3
1002 fddi-default                    act/unsup
1003 token-ring-default              act/unsup
1004 fddinet-default                 act/unsup
1005 trnet-default                   act/unsup

Switch(config-vlan)# exit
Switch(config)# do show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Et0/0, Et0/1, Et0/2, Et0/3
10   VLAN0010                         active
1002 fddi-default                    act/unsup
1003 token-ring-default              act/unsup
1004 fddinet-default                 act/unsup
1005 trnet-default                   act/unsup
```

This might make you wonder:

**Did the `exit` command create the VLAN?**

Not exactly.

It is better to understand this as part of how Cisco IOS handles **configuration modes**.

When you type:

```text
Switch(config)# vlan 10
```

you enter:

```text
Switch(config-vlan)#
```

From there, you can start modifying the VLAN's properties.

When you type:

```text
Switch(config-vlan)# exit
```

you leave that configuration context and return to:

```text
Switch(config)#
```

After that, you can see the VLAN in the VLAN database using:

```text
show vlan brief
```

So, `exit` is not the command that creates the VLAN itself. It simply ends the VLAN configuration context and lets the change appear as expected when using show commands.

The same idea applies when modifying VLAN properties such as the VLAN name or other settings. These changes are made from the same configuration mode.

## Access Ports

An **Access** port is usually used to connect an end device such as a computer, printer, or server. It carries traffic for a single VLAN.

For example:

```text
Switch(config)# interface gigabitEthernet 0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
```

Here, we made `Gi0/1` an Access port and assigned it to VLAN 10.

This means that any device connected to this port will be placed in VLAN 10.

## Trunk Ports

Things are different with a **Trunk**.

A Trunk is used when we need to carry multiple VLANs over the same link, such as a link between two switches.

For example:

```text
Switch(config)# interface gigabitEthernet 0/24
Switch(config-if)# switchport mode trunk
```

Instead of needing a separate link for each VLAN, we can use a single link to carry multiple VLANs.

This is where **802.1Q** comes in.

## How Does the Switch Know Which VLAN an Ethernet Frame Belongs To?

When multiple VLANs are passing through a Trunk link, the switch needs a way to identify which VLAN each frame belongs to.

This is where **802.1Q tagging** is used inside the Ethernet frame.

In a simplified way:

```text
Ethernet Frame
┌──────────┬──────────┬────────────┬──────────┐
│   MAC    │   MAC    │  802.1Q    │ Payload  │
│   DST    │   SRC    │   VLAN ID  │          │
└──────────┴──────────┴────────────┴──────────┘
```

The VLAN ID inside the 802.1Q tag helps the switch identify which VLAN the frame belongs to.

### Native VLAN

802.1Q Trunks also have a concept called the **Native VLAN**.

Frames belonging to the Native VLAN are sent **untagged** by default, so the Native VLAN configuration needs to match on both ends of the Trunk.

## Quick Reference

| Port Type | VLANs Carried  | Common Use                    |
| --------- | -------------- | ----------------------------- |
| Access    | One VLAN       | Computer, printer, end device |
| Trunk     | Multiple VLANs | Link between switches         |

## Conclusion

The basic idea behind VLANs is simple, but the details start to become clearer once you begin configuring a switch.

An **Access Port** is normally used for end devices and is associated with a single VLAN, while a **Trunk Port** is used to carry multiple VLANs between network devices.

When configuring VLANs in Cisco IOS, pay attention to the configuration mode you're currently in. The prompt itself gives you a good idea of what you're configuring:

```text
Switch(config)#
Switch(config-vlan)#
Switch(config-if)#
```

These may seem like small details in Cisco IOS, but over time they help you understand how the CLI actually works instead of just memorizing commands.

