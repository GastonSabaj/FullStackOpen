sequenceDiagram
    participant browser
    participant server

    browser->>server: GET /notes
    activate server
    server-->>browser: HTML document
    deactivate server

    Note right of browser: Notes page is loaded with form

    browser->>server: POST /new_note
    activate server
    server-->>browser: HTTP 302 Redirect to /notes
    deactivate server

    browser->>server: GET /main.css
    activate server
    server-->>browser: main.css
    deactivate server

    browser->>server: GET /main.js
    activate server
    server-->>browser: main.js
    deactivate server

    browser->>server: GET /data.json
    activate server
    server-->>browser: [{ "content": "Note content", "date": "2024-02-21" }, ...]
    deactivate server
