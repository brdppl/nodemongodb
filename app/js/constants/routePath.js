(function() {
    'use strict'

    const app = angular.module('myApp')

    const api = 'http://localhost:4000/api/'
    const oapi = 'http://localhost:4000/oapi/'

    app.constant('config', {
        userKey: '_nodejs_mongodb',
        posts: api+'posts',
        upload: api+'upload',
        login: oapi+'login'
    })
})()