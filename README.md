# express-auth-generator

## A starter project template that includes the following
<br />

- [X] Basic login/signup
- [X] Google Oauth
- [X] Facebook Oauth
- [X] Connection to mongoDB
- [X] Json-web-tokens
- [X] express-session


<br />


## Installing CLI  
___

### For Linux and Mac

<br />

```
 $ curl -L https://fileserve.herokuapp.com/download/express_auth_generator | bash
```

<br />
<br />

## How to run command

### For auth project options-

<br />

```
$ authgen
```

<br />
<br />

### For facebook auth project-

<br />

```
$ authgen facebook_auth
```

<br />
<br />

### For google auth project-

<br />

```
$ authgen google_auth
```

<br />

<br />

### For both facebook and google auth project-

<br />

```
$ authgen all
```

<br />


<br />
<br />

## What then ?
___



1. Select the name of the project, then
<br />

```
 $ cd projectname
 $ npm install
```

<br />

2. Insert the API credentials for Oauth and URL for mongoDB connection in .env
<br />
<br />

```javascript
MONGO_URL=
SALT=
SECRET_KEY=
GCLIENT_ID=
GCLIENT_SECRET=
GCALLBACK_URL=
FCLIENT_ID=
FCLIENT_SECRET=
FCALLBACK_URL=
PORT=
```

<br />
<br />

3. You are good to go
<br />

```
 $ nodemon app
```

<br />

![Alt text](https://blog.christopherianmurphy.com/assets/images/posts/publishing-npm-packages/publishing-npm-packages.png)
