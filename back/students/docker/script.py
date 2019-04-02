import docker

def run_container(callback=None):
    client = docker.from_env()
    image, logs = client.images.build(path = "./students/docker", tag='qwe', dockerfile='./Dockerfile', buildargs={'zad': 'test.c'})
    if callback is not None:
        callback(image)

def finished(image):
    print('finished')
    print(image)
    # client = docker.from_env()
    # client.containers.run(image, detach=True)