import angular from 'angular';
import constants from './constants';
// angular modules
import './templates';
import './controllers/_index';
import './services/_index';
import './directives/_index';
import './index'

const modules = [
  'templates',
  'hydeo.controllers',
  'hydeo.services',
  'hydeo.directives',
];

module.exports = angular.module('hydeo', modules).constant('AppSettings', constants);
// mount on window for testing
//window.app = app;
