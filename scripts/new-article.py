import sys
import time as t

if __name__ == '__main__':
    fileName = sys.argv[1]
    with open(sys.argv[1]+".md", "w+") as file:
        title = fileName.replace("-", " ")
        time = t.strftime("%Y-%m-%d %H:%M:%S", t.localtime())
        content = f'''---
title: {title}
time: {time}
---
'''
        file.write(content)
