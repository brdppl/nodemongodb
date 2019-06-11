(function() {
    'use strict'

    const app = angular.module('myApp')

    app.factory('auth', [
        '$http',
        'config',
        AuthFactory
    ])
    function AuthFactory($http, config) {
        function login(user, callback) {
            submit(config.login, user, callback)
        }

        function submit(url, user, callback) {
            $http.post(url, user)
            .then(function(response) {
                localStorage.setItem(config.userKey, JSON.stringify(response.data))
                $http.defaults.headers.common.Authorization = response.data.token
                if(callback) callback(null, response.data)
            }).catch(function(response) {
                if(callback) callback(response.data.errors, null)
            })
        }

        return {login}
    }
})()