/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyMedia.html';

// Bind media events.
const events = [
  // Fires when the browser can start playing the audio/video.
  'onCanPlay',
  // Fires when the loading of an audio/video is aborted.
  'onAbort',
  // Fires when the current playlist is ended.
  'onEnded',
  // Fires when an error occurred during the loading of an audio/video.
  'onErroe',
  // Fires when the browser has loaded meta data for the audio/video.
  'onLoadedMetaData',
  // Fires when the audio/video has been paused.
  'onPause',
  // Fires when the audio/video has been started or is no longer paused.
  'onPlay',
  // Fires when the audio/video is playing after having been paused or stopped
  // for buffering.
  'onPlaying',
  // Fires when the user is finished moving/skipping to a new position in the
  // audio/video.
  'onSeeked',
  // Fires when the user starts moving/skipping to a new position in the
  // audio/video.
  'onSeeking',
  // Fires when the volume has been changed.
  'onVolumeChange',
  // Fires when the video stops because it needs to buffer the next frame.
  'onWaiting',
  // Fires when the browser is downloading the audio/video.
  'onProgress',
  // Fires when the playing speed of the audio/video is changed.
  'onRateChange'
];

/**
 * @ngInject
 */
function hyMediaDirective($sce, $hyMedia) {
  // mock `this` object because it is undefined in current context.
  const _this = {};

  /**
   * TODO
   */
  _this.setup = () => {
    const elem = _this.mediaElement;

    elem.prop('src', $sce.trustAsResourceUrl(_this.$scope.src));
    elem.prop('autoplay', _this.$scope.autoplay);
  };

  /**
   * Binding default events that has been defined in eventMap to the audio/video element.
   */
  _this.bindEvents = () => {
    angular.forEach(events, (eventType) => {
      const mediaEvent = $hyMedia[eventType];
      const currentHandler = _this[eventType];
      if (angular.isFunction(mediaEvent)) {
        mediaEvent.call($hyMedia, currentHandler);
      }
    });
  };

  /**
   * Start buffering.
   */
  _this.onWaiting = () => {
    $hyMedia.isBuffering = true;
  };

  /**
   * Fires when the audio/video resumed playing after been paused or stopped
   * for buffering.
   */
  _this.onPlaying = () => {
    $hyMedia.isBuffering = false;
  };

  /**
   * Buffered.
   */
  _this.onCanPlay = () => {
    $hyMedia.isBuffering = false;
  };

  return {
    restrict: 'E',
    template: template,
    require: '^hyHydeo',
    scope: {
      src: '=',
      autoplay: '='
    },

    link: ($scope, elem, attrs, hydeoController) => {
      _this.$scope = $scope;
      // TODO detecting media type.
      // TODO video should be configurable by an options param.
      // only support video for now.
      _this.mediaElement = elem.find('video');

      // setup $hyMedia service
      $hyMedia.setMediaElement(_this.mediaElement);
      // setup hy-media directive
      _this.setup();
      // setup hydeoController
      hydeoController.ready();
    }
  };
}

directivesModule.directive('hyMedia', hyMediaDirective);
