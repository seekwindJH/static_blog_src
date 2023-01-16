---
title: Redis
date: 2023-01-01 23:19:13
---


```py
from redis import ConnectionPool, Redis

pool = ConnectionPool(host='192.168.65.200', port=16379, decode_responses=True)
r = Redis(connection_pool=pool)

for m in r.lpop("mylist", 3):
    print(m)
```

```py
pool = ConnectionPool(host='192.168.65.200', port=16379, decode_responses=True)
r = Redis(connection_pool=pool)
p = r.pubsub()
p.psubscribe("A:*")
for item in p.listen():
    print(item)

for i in range(10):
    r.publish("A:B", "hello")
```