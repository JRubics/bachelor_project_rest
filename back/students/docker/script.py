import docker

def run_container():
    client = docker.from_env()
    image, logs = client.images.build(path = "./students/docker", dockerfile='./Dockerfile', buildargs={'zad': 'test.c'})
    print("image:")
    print(image)
    print(logs)