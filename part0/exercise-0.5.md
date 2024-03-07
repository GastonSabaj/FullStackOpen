sequenceDiagram
    participant browser
    participant server
    participant api

    browser->>server: GET /exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    Note right of browser: Single Page App is loaded

    browser->>api: GET /exampleapp/data.json
    activate api
    api-->>browser: [{ "content": "Note content", "date": "2024-02-21" }, ...]
    deactivate api
    