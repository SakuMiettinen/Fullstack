Made using:

MongoDB shell version: 3.4.24,
NodeJS version: 12.13.0,
Angular CLI version: 1.0.0-beta.28.3,

-
-
-

Link to project video : https://youtu.be/JNWcTCWPxR4

-
-
-

To run the project:

clone the repository
cd into Fullstack/project
run: npm install
cd into Fullstack/project/angular-src
run: npm install

In cmd, terminal etc. run: mongod

In Fullstack/project run: node app or nodemon

In/Fullstack/project/angular-src/node_modules/@types/node/index.d.ts line 20: change
/// <reference lib="es2015" />
to
// <reference lib="es2015" />
(Sorry I wasn't able to fix this with my time constraints)

In Fullstack/project/angular-src run: ng serve

Now the project should be running and accessible in localhost:4200

-
-
-

In order to see the coursework folder contents in /Fullstack just run:
git submodule init
git submodule update

(This is due to my lack of understanding and ability to foresee the future in the beginning of the course)
