import docker
import os

def run_container(filepath, tag):
    client = docker.from_env()
    repository = os.environ.get('REGISTRY_URL', '') + '/assignments'

    print('build start')
    image, logs = client.images.build(path="./students/docker", dockerfile='./Dockerfile', rm=True, buildargs={'filepath': filepath, 'filename': os.path.basename(filepath)})
    image.tag(repository=repository, tag=tag)
    print('build end')

    auth_client = client.login(username=os.environ.get('REGISTRY_USERNAME', ''), password=os.environ.get('REGISTRY_PASSWORD', ''), registry=os.environ.get('REGISTRY_URL', ''))
    print('auth done')

    client.images.push(repository=repository, tag=tag)
    print('push done')

    client.images.remove(image=image.id)