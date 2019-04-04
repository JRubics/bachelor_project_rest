import docker
import os

def run_container(callback, filepath, tag):
    client = docker.from_env()
    image, logs = client.images.build(path = "./students/docker", tag=tag, dockerfile='./Dockerfile', rm=True, buildargs={'filepath': filepath, 'filename': os.path.basename(filepath)})
    callback(image)

def finished(image):
    print('finished')
    print(image)

    client = docker.from_env()
    client.images.remove(image=image.id)