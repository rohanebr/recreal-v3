'use strict';

angular.module('core').directive('collapseNav', [
  function() {
    return {
      restrict: 'A',
      compile: function(ele, attrs) {
        var $a, $aRest, $lists, $listsRest;
        $lists = ele.find('ul').parent('li');
        $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>');
        $a = $lists.children('a');
        $listsRest = ele.children('li').not($lists);
        $aRest = $listsRest.children('a');
        $a.on('click', function(event) {
          var $parent, $this;
          $this = $(this);
          $parent = $this.parent('li');
          $lists.not($parent).removeClass('open').find('ul').slideUp();
          $parent.toggleClass('open').find('ul').slideToggle();
          return event.preventDefault();
        });
        return $aRest.on('click', function(event) {
          return $lists.removeClass('open').find('ul').slideUp();
        });
      }
    };
  }
]).directive('highlightActive', [
  function() {
    return {
      restrict: 'A',
      controller: [
        '$scope', '$element', '$attrs', '$location', function($scope, $element, $attrs, $location) {
          var highlightActive, links, path;
          links = $element.find('a');
          path = function() {
            return $location.path();
          };
          highlightActive = function(links, path) {
            path = '#!' + path;
            return angular.forEach(links, function(link) {
              var $li, $link, href;
              $link = angular.element(link);
              $li = $link.parent('li');
              href = $link.attr('href');
              if ($li.hasClass('active')) {
                $li.removeClass('active');
                $li.parent().parent().removeClass('active');
              }
              if (path.indexOf(href) === 0) {
                $li.parent().parent().addClass('active');
                return $li.addClass('active');
              }
            });
          };

          highlightActive(links, $location.path());
          return $scope.$watch(path, function(newVal, oldVal) {
            if (newVal === oldVal) {
              return;
            }
            return highlightActive(links, $location.path());
          });
        }
      ]
    };
  }
]).directive('toggleOffCanvas', [
  function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        return ele.on('click', function() {
          return $('#app').toggleClass('on-canvas');
        });
      }
    };
  }
]).directive('slimScroll', [
  function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        return ele.slimScroll({
          height: '100%'
        });
      }
    };
  }
]);