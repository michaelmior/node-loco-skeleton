# node-loco-skeleton

This project aims to be a fairly simple skeleton project built on top of the [Locomotive](http://locomotivejs.org/) framework for Node.js.
It's mostly a learning exercise as I play around with Node, but maybe someone will find it useful.
I couldn't find a good starting project that already included a template engine, user authentication, and other things that most dynamic Web apps need.

I'm trying to make some effort to give a fairly complete starting point, so a lot of my opinions have been injected on structure and library choice have been injected along the way.
But if you like my opinions, then this might be a good starting point for you :)

To get started, you'll need a working copy of [MongoDB](http://www.mongodb.org/).
By default, the app will connect to a database named `test` on `localhost`, but you can change this by editing [`config/environments/development.js`](https://github.com/michaelmior/node-loco-skeleton/blob/master/config/environments/development.js).
Once MongoDB is up and running, the following should suffice after cloning the repository:

    npm install
    npm start

Test coverage is currently very minimal, but more tests are in the works. You can run tests with `npm test`.

[![build status](https://secure.travis-ci.org/michaelmior/node-loco-skeleton.png)](http://travis-ci.org/michaelmior/node-loco-skeleton)

## Linting

You can lint the entire project with `grunt lint`.
I find it useful to lint the code each time I commit to make sure I don't commit something which doesn't lint.
To do this, just add the following to `.git/hooks/pre-commit` and mark it as executable.

    #!/bin/sh
    grunt lint


## Integrations

Of course you can see dependencies in the `package.json`, but here's a brief overview.

* [Dust](http://akdubya.github.com/dustjs/) paired with [consolidate](https://github.com/visionmedia/consolidate.js.git) for templating. If it's [good enough for LinkedIn](http://engineering.linkedin.com/frontend/leaving-jsps-dust-moving-linkedin-dustjs-client-side-templates), it's good enough for me
* [Mongoose](http://mongoosejs.com/) ODM for MongoDB object modeling
* [Passport](http://passportjs.org/) for authentication, currently supporting local authentication with [passport-local](https://github.com/jaredhanson/passport-local.git) with Mongoose and [bcrypt](https://github.com/ncb000gt/node.bcrypt.js.git)
* [Winston](https://github.com/flatiron/winston) for logging (including default Express logging
* [Grunt](https://github.com/cowboy/grunt.git) for some handy build/test tools on the command line
* [Vows](https://github.com/cloudhead/vows.git) and [should](https://github.com/visionmedia/should.js/) for testing
