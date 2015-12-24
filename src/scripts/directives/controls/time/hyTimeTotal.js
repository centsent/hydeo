function hyTimeTotal($hyMedia, $filter) {
  'ngInject';

  function formatTime(time, format) {
    return $filter('date')(new Date(time), format);
  }

  return {
    restrict: 'A',
    scope: {
      format: '=',
    },
    link($scope, elem) {
      const format = $scope.format || 'mm:ss';
      const defaultTime = formatTime(0, format);

      $hyMedia.onLoaded(totalTime => {
        const time = formatTime(totalTime * 1000, format);
        elem.html(time);
      });

      elem.html(defaultTime);
    },
  };
}

export default hyTimeTotal;
