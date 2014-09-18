koa-todo
========

a todo example write with koa and react.

## Technology

### backend

- koa
- levelup

### frontend

- react (without flux)
- superagent
- browserify

## TODO

- [] backend test
- [] frontend test
- [] try flux?

## Tree

```
├── Makefile
├── app.js
├── common
│   └── db.js
├── config.js
├── controllers
│   ├── home.js
│   └── task.js
├── models
│   └── task.js
├── package.json
├── public
│   ├── javascripts
│   │   ├── app.js
│   │   ├── bundle.js
│   │   ├── components
│   │   │   ├── footer.js
│   │   │   ├── header.js
│   │   │   ├── textinput.js
│   │   │   ├── todo.js
│   │   │   ├── todo_app.js
│   │   │   └── todo_list.js
│   │   └── task_store.js
│   └── todomvc-common
│       ├── base.css
│       ├── bg.png
│       ├── bower.json
│       └── readme.md
├── routes.js
├── test
└── views
    └── index.html
```

## License

MIT
