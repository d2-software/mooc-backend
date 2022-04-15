# MOOC Platform Backend

Backend API in Node.JS for MOOC Platform.

### Init project

#### Configuration files

**.env file**: contains application variables for environment, database, ...

```shell
cp .env.dist .env
```

**sequelize.json file**: contains database configuration for run _sequelize-cli_ commands.

```shell
cp sequelize.json.dist sequelize.json
```

#### Docker & Docker Compose

Start development environment:

```shell
docker-compose up
```

Enter web container to execute commands:

```shell
docker-compose exec web /bin/sh
```

#### Sequelize

Create migrations:

```shell
npx sequelize-cli migration:create --name NAME_OF_MIGRATION_FILE
```

This command will create `{TIMESTAMP}-NAME_OF_MIGRATION_FILE` inside `src/migrations` folder.

Migration naming conventions examples:

- Create table _users_: `usersCreate`
- Add column _token_ to table _users_: `addTokenToUsers`
- Remove column _token_ from table _users_: `removeTokenFromUsers`
- Modify column _name_ in table _users_: `modifyNameInUsers`
- Modify column _name_ in table _users_ with some changes in data: `refactorNameInUsers`

Execute pending migrations:

```shell
npx sequelize-cli db:migrate
```

Undo migrations:

```shell
npx sequelize-cli db:migrate:undo:all
```

