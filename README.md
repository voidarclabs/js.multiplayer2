# NODE.JS SITE IN DOCKER-COMPOSE

This is a site template with a dockerised node.js site.
The index.js file uses the express package to load index.html to 0.0.0.0:80.
Using the volumes feature, the HTML and `index.js` are fully editable while the container is running.
The node app is running on port 100 internally (artefact from creation), but the port
is editable on [line 11](https://github.com/voidarclabs/js.docker.node/blob/main/docker-compose.yml#L11)
of `docker-compose.yml`. To download and use this repo, use these commands:
```
git clone https://github.com/voidarclabs/js.docker.node
cd js.docker.node
docker-compose up -d
```

If you now navigate to `localhost:80`, you will see `public/index.html` being displayed.

## Misc

This repo has no prerequisites. The docker-compose file automatically installs all the necesarry npm packages.
The only thin you need to get started is docker, docker-compose, and an internet connection. The internal port 100
is questionable, but unless it is really important to your project that is a different port, don't bother changing it.
In my experience, changing the port tends to result in a connection timeout or a 404 error. This project is open source, 
and can be used in any application. For more information, see [LICENCE.md](https://github.com/voidarclabs/js.docker.node/blob/main/LICENCE.md).