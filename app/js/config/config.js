const app = angular.module('myApp')

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .state('noticias', {
            url: '/noticias',
            templateUrl: 'views/noticias.html',
            controller: 'noticiasCtrl',
            controllerAs: 'vm'
        })
        .state('perfil', {
            url: '/perfil',
            templateUrl: 'views/perfil.html',
            controller: 'perfilCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFactory: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('js/factories/authFactory.js')
                }]
            }
        })

    $locationProvider.html5Mode(true)
})