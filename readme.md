## API Endpoints

The API provides the following endpoints:

- `POST /api/journal/create`: Create a journal `body` `{"content": "string"}`
- `GET /api/journal/all`: List all journal 
- `PATCH /api/journal/edit`: Edit Journal `body` `{"content": "string"}`
- `GET /api/journal`: Get individual Journal `query` `id` `body` `{content: "string"}`

## Running server
```shell
$ docker build -t app .
```

```shell
$ docker compose up
```

