# Optifire

# Local Database:

-   user: `optifire`
-   password: `optifire`
-   db: `optifire_local`
-   port: `5432`

# Database for tests

-   user: `optifire-test`
-   password: `optifire`
-   db: `optifire_test`
-   port: `5433`

# Docker database troubleshooting

If you have problems with the docker, please execute the following commands:

-   docker rm -f $(docker ps -a -q)
-   docker volume rm $(docker volume ls -q)
-   docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs sudo docker rm
-   docker-compose up -d -V --force-recreate --build --remove-orphans

or just use

-   npm run resetDocker
-   docker-compose up -d

# Writing tests

Just use the test supporter which will connect to the database <br /> and then clean it when the test block is finished.

```javascript
import "reflect-metadata";
describe("My Test!", () => {
    let testSupporter = new TestSupporter();

    beforeEach(async () => {
        await testSupporter.initializeTestDb();
    });

    afterAll(async () => {
        await testSupporter.dropTableAndCloseConnection();
    });

    afterEach(async () => {
        await testSupporter.dropTableAndCloseConnection();
    });

    it("Should...", async () => {
        // test..
    });
});
```

# Creating migrations guide

1. make sure you've installed typeorm globally (`npm i -g typeorm`)
2. check repo's current version in package.json (e.g `0.21.0`)
3. run the following command:

> typeorm migration:create -n
> v &lt;HIGHER*VERSION&gt; * &lt;SCRIPT*NUMBER&gt; \_\_ &lt;DESCRIPTION&gt;
> -d migrations/v*&lt;HIGHER_VERSION&gt;

-   &lt;HIGHER_VERSION&gt; - bumped repo's version (`0.22.0` in that case)
-   &lt;SCRIPT_NUMBER&gt; - migration script number
-   &lt;DESCRIPTION&gt; - migration description

Example command:

> typeorm migration:create -n v0_22_0**01**add_column -d migrations/v_0_22_0;

# Commit and branch schema

-   Feature branch: `feat/JiraNumber-Short-description`
-   Feature commit: `feat(TaskNumber): Commit message`
-   Fix branch: `fix/JiraNumber-Short-description`
-   Fix commit: `fix(TaskNumber): Commit message`

Examples:

-   Feature branch: `feat/OA-200-adapter-for-maphere`
-   Feature commit: `feat(OA-200): Added adapter for maphere provider`
