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

    $scope.signIn = function (user) {
        console.log('Sign-In', user);
        /*$scope.url = "https://login.microsoftonline.com/saml2/Redirect?SAMLRequest=fZFfa8IwFMXfBb9DyXvaJtZ1BqsURRC2Mabbw95ivc5Am3TJrXPffmmLY3%2FA15Pzuyf33On8XJXBCaxTRmeEhTEJQBdmr%2FRbRp63K3pL5rPhYOpkVdYib%2FCon%2BC9AYfDQRB4WDvRvWWksVoY6ZQTWlbgBBZik9%2FfCR7GorYGTWFK8pu6DknnwKL%2FWEetlxmR8sBHbHJDWZqOKGdsRJM0kfQAjCUJ43KX8s78ctnIz%2Blp5xpYa4dSo1fjOKGM03i8jSeCMzGevHa2%2FBK5MNo1FdgN2JMqPLmHc0b6WTmiVbsGoTf5qv66Zq2t60x0wXZ2RKydiCJXh3CWVV1CWJgqanfl0%2Bin8xutxYOvZL18NKUqPlvZR5el%2BVhYkAgZQdsA6fWVsZXE63W2itrTQ2cVaKV2CjSSqL1v9P%2FAXv4C"*/
            
            $scope.url="https://login.windows.net/7cd03953-15f5-47ec-a03a-becd90764048/saml2/?SAMLRequest=lVJdS8MwFP0rJe9t2tq1M3SF4V4G%2BjLFB18kJrcs2CY192aKv950A4cMBr4ll%2FNxz%2BG2KMdhEutAe7uDjwBIyXazYq%2FQN3ndyypVxaJKK6Xr9LZq6rTpbzXki1rK4oYlz%2BDROLtiZZazZIsYYGuRpKU4yosmzYs0r57KXJRLUZXZslq%2BsGQTXYyVdGTuiSYUnGs4FJPzJIdBvuN%2BNJn8Dh4%2B4Q0NAWYWiCV3ziLM4sFb4SQaFFaOgIKUeFw%2F3Iu4h1AnkAgWJ1CmN6BZ8jUOFsUx7XX25B055QbWtcc8%2FkS9TpKI4Oc8rJvzxDjYI7psNFaTB8iUG7nUPfKIOxgFyMkHpJafPLo2JtNmVsB%2F%2BrXroA1YBbvYqjdqnp6H3WW9l722%2FBd%2Bfv6R4%2Bf14ufyZrof"
        var browser = cordova.InAppBrowser.open(encodeURI($scope.url), '_blank', 'location=yes');

        browser.addEventListener('loadstop', function (event) {
            // Lets inject some CSS to apply a "Mobile" style to this IdP login page
            browser.insertCSS({
                code: 'body { background: #fff !important; font-size: 18px; } input { font-size: 18px; }'
            }, function injected() {
                console.log('injection done!', arguments);
            });

            if (event.url.indexOf('/login/ok') > -1) { // User now logged in!
                showSignedIn();
                browser.close();
                setTimeout(function () {
                    navigator.notification.alert(
                        "Great, you're signed in!",
                        null,
                        'SSO',
                        'OK'
                    );
                }, 500);
            }
            console.error('stop: ' + event.url);
        });
        browser.addEventListener('loaderror', function (event) {
            browser.close();
            setTimeout(function () {
                navigator.notification.alert(
                    'Error displaying SSO login page, please try again',
                    null,
                    'SSO',
                    'OK'
                );
            }, 500);

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
