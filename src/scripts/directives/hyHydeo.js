import template from '../../views/directives/hyHydeo.html';
import KeyEventHandler from '../utils/KeyEventHandler';

const defaultOptions = {
  autoplay: true,
  controls: true,
  autohide: true,
};

function hyHydeo($hyMedia, $hyOptions) {
  'ngInject';

  return {
    restrict: 'E',
    template,
    scope: {
      cuepoints: '=',
      src: '=',
      onReady: '&',
      controls: '=',
      autoplay: '=',
      autohide: '=',
    },
    transclude: true,
    link: {
      pre($scope, elem) {
        $hyOptions.set('hydeoElement', elem);
        $hyOptions.directiveKeys().map((key) => {
          let value = $scope[key];
          if (value === undefined) {
            value = defaultOptions[key];
            $scope[key] = value;
          }
          $hyOptions.set(key, value);
          $scope.$watch(key, (newValue) => $hyOptions.set(key, newValue));
        });
        // make the element focusable to catch the keydown event
        elem.attr('tabindex', -1);
        KeyEventHandler.bind(elem, $hyOptions, $hyMedia);
        elem.bind('$destroy', () => {
          $hyMedia.destroy();
          $hyOptions.flush();
        });
      },
    },
  };
}

export default hyHydeo;
