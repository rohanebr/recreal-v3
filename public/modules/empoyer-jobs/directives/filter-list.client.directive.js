'use strict';

angular.module('empoyer-jobs').directive('filterList', ['$compile',
	function($compile) {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Test directive directive logic
				// ...
				
				var filterName = attrs.filterName;
				var count  = "'count'"

				var html =	'<article class="thumbnail">' + 
		                       '<label>'+ filterName +'</label>' +
		                        '<ul>' + 
		                            '<li data-ng-repeat="'+ filterName +'Filter in '+ filterName +'Filters | orderBy:'+ count + ':true  | limitTo: filterLimit">' + 
		                            '<input type="checkbox" data-ng-click="'+ filterName +'FilterChanged('+ filterName +'Filter.name)" data-ng-model="'+ filterName +'Filter.value" id="{{'+ filterName +' + '+ filterName +'Filter.name}}" />' + 

		                            '<label ng-if="'+ filterName +'Filter.name" for="{{'+ filterName +' + '+ filterName +'Filter.name}}" >{{'+ filterName +'Filter.name}} ({{'+ filterName +'Filter.count}})</label>' + 
		                            '<label ng-if="!'+ filterName +'Filter.name" for="{{'+ filterName +' + '+ filterName +'Filter.name}}" >Not Mentioned ({{'+ filterName +'Filter.count}})</label>' + 
		                            '</li>' + 
		                        '</ul>' + 
		                        '<a href="" data-ng-if="'+ filterName +'Filters.length > filterLimit" data-ng-click="openFilterModal('+ filterName +'Filters, '+ filterName +')">more choices...</a>' + 
		                    '</article>';
            	var e =$compile(html)(scope);
            	element.replaceWith(e);
			}
		};
	}
]);