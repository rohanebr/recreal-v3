'use strict';

angular.module('candidate-jobs').directive('googleMaps', ['$compile',
	function($compile) {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
            
            	scope.$watch('lat', function (v) {
            		console.log("WTF"+scope.lat);
            		
			var html =	'<map zoom="11" center="[{{lat}},{{longi}}]"><marker position="[{{lat}},{{longi}}]" draggable="true" /><control name="overviewMap" opened="false" /></map>';
                var e =$compile(html)(scope);

            	element.replaceWith(e);

            },true);
			}
		};
	}
]);