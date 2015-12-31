/* global malarkey:false, moment:false, SockJS:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import MainController from './main/main.controller';
import LobbyController from './lobby/lobby.controller';

import SocketService from './services/socket.service';

import baseURLConfig from './api.js';

var lodash = require('lodash');

angular.module('famousPlacesMobile', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'angularScreenfull', 'ui.router', 'ui.bootstrap', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('_', lodash)
  .constant('SockJS', SockJS)
  .constant('baseURLConfig', baseURLConfig)

  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .controller('MainController', MainController)
  .controller('LobbyController', LobbyController)

  .service('SocketService', SocketService);
