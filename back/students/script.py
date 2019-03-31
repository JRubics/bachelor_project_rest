import docker

def run_container():
    client = docker.from_env()
    # print(client.containers.run("bfirsh/reticulate-splines", detach=True))
    # print(client.containers.list())