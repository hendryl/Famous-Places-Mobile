/* global malarkey:false, moment:false, SockJS:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import MainController from './main/main.controller';
import LobbyController from './lobby/lobby.controller';
import LoadingController from './loading/loading.controller';
import GameController from './game/game.controller';
import ScoreController from './score/score.controller';
import ResultController from './result/result.controller';
import SelectController from './select/select.controller';
import PlaceController from './place/place.controller';

import SocketService from './services/socket.service';
import BroadcastService from './services/broadcast.service';
import VibrateService from './services/vibrate.service';

import ModeFactory from './factories/mode.factory';
import CreditsFactory from './factories/credits.factory';
import ImageFactory from './factories/image.factory';

import baseURLConfig from './api.js';

var lodash = require('lodash');

angular.module('famousPlacesMobile', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'angularScreenfull', 'ui.router', 'ui.bootstrap', 'toastr', 'ngMap'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('_', lodash)
  .constant('SockJS', SockJS)
  .constant('baseURLConfig', baseURLConfig)
  .constant('mapsKey', 'AIzaSyBKm4xvXU4kg3MOvyghsWeNO1BtcHzvBQA')
  .constant('feedbackURL', 'https://docs.google.com/forms/d/1xFTMInkxI1-n6dRYxjoxZoQvtOAAtf8OisRyZe9Rk6c/viewform')

  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .controller('MainController', MainController)
  .controller('LobbyController', LobbyController)
  .controller('LoadingController', LoadingController)
  .controller('GameController', GameController)
  .controller('ScoreController', ScoreController)
  .controller('ResultController', ResultController)
  .controller('SelectController', SelectController)
  .controller('PlaceController', PlaceController)

  .service('SocketService', SocketService)
  .service('BroadcastService', BroadcastService)
  .service('VibrateService', VibrateService)

  .factory('ModeFactory', ($http, baseURLConfig) => new ModeFactory($http, baseURLConfig))
  .factory('CreditsFactory', ($http, baseURLConfig) => new CreditsFactory($http, baseURLConfig))
  .factory('ImageFactory', ($http, baseURLConfig) => new ImageFactory($http, baseURLConfig));
