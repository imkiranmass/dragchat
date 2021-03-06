define(['angular','songsController', 'loginController', 'contactDirective','privateController', 'dragdropController','contactsController', 'mainChatController', 'chatController' , 'profileController' , 'jquery','isUserValid' ,'dateFormatFilter' ,'smileyService' , 'removeTilda', 'dragdrop', 'uiRouter', 'angularSanitize', 'angularMaterial'], function(angular,songsController,loginController, contactDirective, privateController, dragdropController,contactsController, mainChatController, chatController, profileController, $, isUserValid, dateFormatFilter,smileyService, removeTilda, angularMaterial) {
   'use strict';
   var app = angular.module('myApp', ['ui.router','ngDragDrop', 'ngSanitize', 'ngMaterial']);
   app.init = function () {
      angular.bootstrap(document, ['myApp']);
   };
   app.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function ($urlRouterProvider, $stateProvider, $httpProvider) {
            $urlRouterProvider.when("/", "/login");
            $urlRouterProvider.otherwise("/login");
            // $httpProvider.interceptors.push('AjaxErrorHandler');
            $stateProvider.state('base.chat', {
                url: "/chat",
                templateUrl: "html/mainChat.html",
                controller: 'mainChatController'
            }).state('base.profile', {
                url: "/profile",
                templateUrl: "html/profile.html",
                controller: 'profileController'
            }).state('base.chat.hub', {
            url: '/:chatId',
            templateUrl: 'html/chat.html',
            controller: 'chatController',
            resolve: {
              app: function(smileyService) {
                return smileyService.getSmiley().then(function (response) {
                   return response;
                });
              }
            }
        }).state('base.contacts', {
          url: '/contacts',
          templateUrl: 'html/contact.html',
          controller: 'contactsController'
        }).state('base.contacts.private', {
          url: '/:userId',
          templateUrl: 'html/private.html',
          controller: 'privateController',
          resolve: {
            app: function(smileyService) {
              return smileyService.getSmiley().then(function (response) {
                 return response;
              });
            }
          }
        }).state('login', {
            url: "/login",
            templateUrl: "html/login.html",
            controller: 'loginController'
        }).state('base', {
            url: "/base",
            templateUrl: 'html/base.html',
            controller: 'dragdropController'
        }).state('base.songs', {
            url: "/songs",
            templateUrl: 'html/songs.html',
            controller: 'songsController',
            resolve: {
              songs: function(smileyService) {
                return smileyService.getSongList().then(function (response) {
                 return response;
                });
              }
            }
        });
   }]);
   app.controller('loginController', loginController);
   app.controller('mainChatController', mainChatController);
   app.controller('chatController', chatController);
   app.controller('privateController', privateController);
   app.controller('songsController', songsController);
   app.controller('contactsController', contactsController);
   app.controller('profileController', profileController);
   app.controller('dragdropController', dragdropController);
   app.service('isUserValid', isUserValid);
   app.service('smileyService', smileyService);
   app.filter('dateFormatFilter', dateFormatFilter);
   app.filter('removeTilda', removeTilda);
   app.directive('contactDirective', contactDirective);
   return app;
});
