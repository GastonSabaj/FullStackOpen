sequenceDiagram
    participant browser
    participant server
    participant api

    browser->>server: POST /exampleapp/new_note_spa
    activate server
    server->>api: POST /exampleapp/new_note_spa
    activate api
    api-->>server: 201 Created
    deactivate api
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: New note created successfully