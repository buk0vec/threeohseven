# threeohseven

A group project.

[Frontend deployment](https://victorious-meadow-0f5843c10.2.azurestaticapps.net/)

NOTE: Frontend deployment has routing issues due to how azure handles routes for static web apps

[Backend deployment](https://linkbush-api.azurewebsites.net/)

The goal of this project was to recreate a service like Linktree where users can create their own pages that contain links. Users can create an account and sign in, edit their own page, and view the pages of other users. Each page is comprised of links and categories that can be updated.

Currently we have a feature-complete backend, but it does not work well with the front end because of cross-orgin cookies issues that we did not have time to debug. Our front end includes a landing page, an about page, a login page, a sign up page, and the ability to view user's pages. The edit page does not currently update the user's page due to CORS issues.

We used ESLint and Prettier for linting this project.

threeohseven was created with **Turborepo**. Turborepo manages packages, dependencies, and pipelines automatically.

The `app` package is a **React** app built with **Vite**

The `server` package is an **Express** app.

Typescript is supported throughout the project!

For the backend server, a `.env` file is required to be in the `packages/sever` directory.

[Our Figma design file](https://www.figma.com/file/xRg0TlVcsnBL145lUkMYEz/Wireframes)

[Our class diagram](https://www.figma.com/file/LpzuuVwzY0pLA60YDjvTyR/BE-Class-Diagram?node-id=0%3A1&t=oimBtq9vaPkZBLK5-1)

[Our sequence diagram for sign up](https://www.figma.com/file/nlLJseiTZov26xTewypUIb/Sequence-Diagram?node-id=0%3A1&t=SZrpdYcWndPYzGw0-1)

[Our demo video](https://youtu.be/De23xbz9fXQ)

# Setup

1. `git clone https://github.com/buk0vec/threeohseven.git`
2. `cd threeohseven`
3. `npm install`
4. `npm run dev`

## Test coverage

Output from running jest for server, 11/27/22 7:22 pm:

```
$ jest
 PASS  src/user-service.test.ts (5.193 s)
 PASS  src/page-service.test.ts (5.993 s)
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |
 src              |     100 |      100 |     100 |     100 |
  page-service.ts |     100 |      100 |     100 |     100 |
  user-service.ts |     100 |      100 |     100 |     100 |
 src/models       |     100 |      100 |     100 |     100 |
  page.ts         |     100 |      100 |     100 |     100 |
  user.ts         |     100 |      100 |     100 |     100 |
------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       30 passed, 30 total
Snapshots:   0 total
Time:        6.467 s, estimated 9 s
Ran all test suites.
✨  Done in 7.83s.
```

## Commands

`npm run dev` - Start the development servers for all packages

`npm run build` - Build all packages

`npm run lint` - Lint all packages 

`npm run test` - Test all packages 
