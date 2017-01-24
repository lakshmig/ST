// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('signin', {
            url: '/sign-in',
            templateUrl: 'templates/sign-in.html',
            controller: 'SignInCtrl'
        })
        .state('forgotpassword', {
            url: '/forgot-password',
            templateUrl: 'templates/forgot-password.html'
        })
        .state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tabs.home', {
            url: '/home',
            views: {
                'home-tab': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeTabCtrl'
                }
            }
        })
        .state('tabs.facts', {
            url: '/facts',
            views: {
                'home-tab': {
                    templateUrl: 'templates/facts.html'
                }
            }
        })
        .state('tabs.facts2', {
            url: '/facts2',
            views: {
                'home-tab': {
                    templateUrl: 'templates/facts2.html'
                }
            }
        })
        .state('tabs.about', {
            url: '/about',
            views: {
                'about-tab': {
                    templateUrl: 'templates/about.html'
                }
            }
        })
        .state('tabs.navstack', {
            url: '/navstack',
            views: {
                'about-tab': {
                    templateUrl: 'templates/nav-stack.html'
                }
            }
        })
        .state('tabs.contact', {
            url: '/contact',
            views: {
                'contact-tab': {
                    templateUrl: 'templates/contact.html'
                }
            }
        });


    $urlRouterProvider.otherwise('/sign-in');

})

.controller('SignInCtrl', function ($scope, $state) {
    $scope.cookie = "";
    $scope.signIn = function (user) {
        console.log('Sign-In', user);
            $scope.url="https://socialtrade.biz"
        var browser = cordova.InAppBrowser.open(encodeURI($scope.url), '_blank', 'location=no');

        browser.addEventListener('loadstop', function (event) {
          
            if (event.url.indexOf('/User/EarnePoints.aspx') > -1) { // User now logged in!
                console.log("event:"+ event.cookies)
             browser.executeScript(
                                  {code: "function f() { if($('.handIcon[campaignid]').length) { $('.handIcon[campaignid]').click();setTimeout(f,35000) ;} else {sleep.allow();}}f()"},
                                    function(data) {
                                            alert(data);
                                      }
             );// end of executescript
                
            }// end of if event.url
            //console.error('stop: ' + event.url);
        });
        browser.addEventListener('loaderror', function (event) {
            //browser.close();
            setTimeout(function () {
                navigator.notification.alert(
                    'Error displaying SSO login page, please try again',
                    null,
                    'SSO',
                    'OK'
                );
            },100);

            console.error('error: ' + event.message);
        });
        browser.addEventListener('exit', function (event) {
            console.error(event.type);
        });
        //$state.go('tabs.home');
    };

})

.controller('HomeTabCtrl', function ($scope) {
    console.log('HomeTabCtrl');
});
