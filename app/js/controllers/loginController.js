(function() {
    'use strict'

    const app = angular.module('myApp')

    app.controller('loginCtrl', function($scope, $http, config, toaster, auth) {
        const vm = this

        vm.logar = function(d) {
            auth.login(d, err => err ? console.error(err) : console.log('Sucesso!'))
        }
    })
})()