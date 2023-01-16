---
title: WebSockets
date: 2023-01-01 18:41:46
---

Websocket协议是一种能运用于浏览器客户端的全双工协议。

## flask_socketio实现一个简单的websockets应用

[flask_socketio官网](https://flask-socketio.readthedocs.io/en/latest/getting_started.html?highlight=websocket)

使用`flask_socketio`框架实现websockets，用法如下。

app.py:
```py
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def hello():
    return render_template("index.html")

# 接收一个my event请求
@socketio.on('my event')
def handle_my_custom_event(json):
    print(json)

# 接收一个hello请求
@socketio.on('hello')
def handle_my_custom_event(json):
    print(json)
    # 返回一个名称为hello的data from server响应
    emit("hello", "data from server")

if __name__ == '__main__':
    socketio.run(app)
```

index.html:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js" integrity="sha512-q/dWJ3kcmjBLU4Qc47E4A9kTB4m3wuTY7vkFJDTZKjTs8jhyGQnaUrxa0Ytd0ssMZhbNua9hE+E7Qv1j+DyZwA==" crossorigin="anonymous"></script>
<script type="text/javascript" charset="utf-8">
    var socket = io();
    // 收到来自服务端的connect emit后，执行的方法
    socket.on('connect', function() {
        socket.emit('my event', {data: 'I\'m connected!'});
    });
    // 收到来自服务端的hello emit后，执行的方法
    socket.on('hello', function (data) {
        console.log(data)
    });
</script>
```