import jwt
import os
import sys

with open('.key') as f:
  key = f.read()

encoded = jwt.encode({'username': sys.argv[1]}, key, algorithm='HS256')
print('http://bachelor.localhost/signup?token=' + encoded.decode('utf-8'))

print(jwt.decode(encoded, key, algorithms=['HS256']))
