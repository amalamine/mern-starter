# MERN Starter

## Running in dev natively

To run a development environment, you can use the `start-dev` command. This will start up a development web server on port 3000, and a nodemon-watched API server on port 3001. These development servers will automatically reload if changes are made to the source.

  - Install dependencies with:

    ```
    npm install
    ```

  - Start the development environment:

    ```
    npm run start-dev
    ```

## Running in prod natively

To run a production environment, you can use the `start-dev` command. This will start up a production web server on port 4000.

  - Install dependencies with:

    ```
    npm install
    ```

  - Build with:

    ```
    npm run build
    ```

  - Start the development environment:

    ```
    npm run start-prod
    ```

## Kubernetes

You can use Helm and our bundled chart for quickly deploying your application.

### Locally with minikube

You can use minikube for creating a local testing cluster. Start up your cluster:

```
minikube start
```

Make sure you set your Docker environment to use it. This is important so that the cluster has your Docker images.

```
eval $(minikube docker-env)
```

Build your Docker image and give it a tag:

```
docker build -t mern-starter:latest .
```

Install the Helm chart located in `chart/starter` on to your cluster:

```
helm install chart/starter
```

If using minikube, you will need to add port forwarding to be able to view your application:

```
kubectl port-forward <pod_name> <external_port>:3000

kubectl port-forward mern-deployment-789311257-36s62 32111:3000
```


Open your browser to http://localhost:32111

If you want to update your application, you can build a new image with a new version tag, e.x. `docker build -t mern:v2 .`. Update the version tag in `chart/starter/values.yml`.

Then, roll out a new release with:

```
helm upgrade <deployment_name> chart/starter
helm upgrade limping-bee .
```

### On IBM Cloud Kubernetes

***Build the Docker image***

1. Start the Docker engine on your local computer

2. Log the local Docker client in to IBM Bluemix Container Registry

```
bx cr login
```

> This will configure your local Docker client with the right credentials to be able to push images to the Bluemix Container Registry

3. Retrieve the name of the namespace you are going to use to push your Docker images

```
bx cr namespace-list
```

> If you don't have a namespace, you can create one with `bx cr namespace-add my_namespace` for example.

4. Build the Docker image of the service

> In the following steps, make sure to replace <namespace> with your namespace name

```
docker build -t registry.ng.bluemix.net/<namespace>/mern-example:v1 .
```

5. Push the image to the registry

```
docker push registry.ng.bluemix.net/<namespace>/mern-example:v1
```

***Create a Kubernetes cluster***

1. Create a Kubernetes cluster in Bluemix

```
bx cs cluster-create <cluster-name>
```

> Note that you can also use an existing cluster

2. Wait for you cluster to be deployed. This step can take awhile, you can check the status of your cluster by using:


```
bx cs clusters
```

3. Ensure that the cluster workers are ready:

```
bx cs workers <cluster-name>
```

***Deploy the Service***

1. Retrieve the cluster configuration


```
bx cs cluster-config <cluster-name>
```

The output will look like:

```
Downloading cluster config for mycluster-robert
OK
The configuration for mycluster-robert was downloaded successfully. Export environment variables to start using Kubernetes.

export KUBECONFIG=/home/rfdickerson/.bluemix/plugins/container-service/clusters/mycluster-robert/kube-config-hou02-mycluster-robert.yml
```

2. Copy and paste the `export KUBECONFIG=...` line into your shell.

3. Confirm the configuration worked by retrieving the cluster nodes.

```
kubectl get nodes
```

4. Edit your `chart/starter/Values.yaml` with your namespace

```
replicaCount: 3
revisionHistoryLimit: 1
image:
  repository: registry.ng.bluemix.net/<namespace>/mern-example
  tag: v1
  pullPolicy: IfNotPresent
service:
  name: Node
  type: NodePort
  containerPort: 3000
  env: production
```

> replace the namespace with your namespace used when pushing your container. You can change the number of relicaCount too.

5. Install the Helm tiller

```
helm init
```

6. Install the Helm chart

```
helm install chart/starter
```

7. If you need to upgrade an existing deployment, you can use `helm upgrade`.

Find out your deployment name:

```
helm ls
```

```
NAME         	REVISION	UPDATED                 	STATUS  	CHART     	NAMESPACE
elegant-puma 	5       	Wed Jun 28 12:01:58 2017	DEPLOYED	mern-0.0.1	default
```

then to update the deployment, use:

```
helm upgrade elegant-puma chart/starter
```
