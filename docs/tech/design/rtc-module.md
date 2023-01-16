---
title: 实时通信模块设计
date: 2023-01-04 21:13:00
---

## 1. 点对点通信
对每组通信，channel命名为A:B，代表B向A发送消息。A通过订阅pattern "A:*"来监听所有发给A的消息，B通过channel "A:B"来发送一条消息。

```jsno
{'type': 'psubscribe', 'pattern': None, 'channel': 'A:*', 'data': 1}
{'type': 'pmessage', 'pattern': 'A:*', 'channel': 'A:B', 'data': 'hello'}
{'type': 'pmessage', 'pattern': 'A:*', 'channel': 'A:M', 'data': 'hello'}
```
