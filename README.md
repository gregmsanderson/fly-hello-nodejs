# fly-hello-nodejs

A sample NodeJS app ready to run on [Fly's global application platform](https://fly.io/).

## Run it locally

To run it locally you will need [NodeJS](https://nodejs.org/en/download/).

1. Clone this repo
2. Run `npm install` to install its dependencies
3. Run `npm start`
4. You should be able to visit `http://localhost:3000`

## Deploy it to Fly

If you haven't already done so, [install the Fly CLI](https://fly.io/docs/getting-started/installing-flyctl/) and then [log in to Fly](https://fly.io/docs/getting-started/log-in-to-fly/).

This repo includes a few extra files to make this application work on Fly: a `Dockerfile`, `.dockerignore` and `fly.toml`. The `Dockerfile` tells Fly how to _package_ the application. If we only had that `Dockerfile`, the image would include _all_ the files in our application's folder. That would include ones that we certainly don't want being deployed (like `.env`) and ones we don't need deployed (like the `node_modules` folder). So the `.dockerignore` file specifies the files/folders we _do_ want included. The `fly.toml` file _configures_ the application. The Fly CLI can make this for you. But since we know which variables, ports, services and so on our app needs, we made one.

**Note:** You'll need to make one change to our `fly.toml`: update the app's name to one of your choice e.g `app = "your-name-here"`.

Run `fly launch` from the application's directory. The Fly CLI will see the `fly.toml`:

```
An existing fly.toml file was found for app your-name-here
? Would you like to copy its configuration to the new app? (y/N)
```

Type _y_ (yes).

The Fly CLI will then spot the existing `Dockerfile`:

```
Detected a Dockerfile app
```

You'll be prompted to give the app a name. Type in your choice of name (using only lowercase and hyphens).

You'll be prompted to pick an organization. Since every Fly user has a personal organization, let's pick that for now.

You'll be asked for the region to deploy to. Pick one closest to you for the best performance.

It will ask if you would you like to setup a Postgresql database now. Type _N_ (no).

Would you like to deploy now? Type _y_ (yes).

You should see the files validated, the build progress, and after a couple of minutes the application successfully deployed:

```
Monitoring Deployment
1 desired, 1 placed, 1 healthy, 0 unhealthy [health checks: 2 total, 2 passing]
--> v0 deployed successfully
```

### View your application on Fly

Use `fly open` as a shortcut to open the app's URL in your browser. You should see the simple "hello world" text.

Use `fly logs` to see its log files.

Use `fly status` to see its details. For example:

```
App
  Name     = your-app-name
  Owner    =
  Version  = 1
  Status   = running
  Hostname = your-app-name.fly.dev

Deployment Status
  ID          = 3bd945ab-e25c-4cf6-b4b2-a7aea811837f
  Version     = v1
  Status      = successful
  Description = Deployment completed successfully
  Instances   = 1 desired, 1 placed, 1 healthy, 0 unhealthy

Instances
ID      	PROCESS	VERSION	REGION	DESIRED	STATUS 	HEALTH CHECKS     	RESTARTS	CREATED
abcdefgh	app    	1     	lhr   	run    	running	2 total, 2 passing	0       	1m10s ago
```