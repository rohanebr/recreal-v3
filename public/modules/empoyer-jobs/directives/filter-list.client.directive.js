'use strict';

angular.module('empoyer-jobs').directive('filterList', ['$compile',
	function($compile) {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Test directive directive logic
				// ...
				console.log(attrs.filterFlag);
            
               var filterName = attrs.filterName;
				var filterNameString = "'" + attrs.filterName + "'";
				var count  = "'count'";
				var type='';
				
            
            	scope.$watch('filters1', function (v) {
            		filterName = attrs.filterName;

            		filterNameString = "'" + attrs.filterName + "'";
            		count  = "'count'";
            		 	scope.dummyfilters=[];
            		   console.log("FILTERS "+filterName);
            		for(var h=0,j=v.length;h<j;h++)
				{
					if(filterName==v[h].type)
					scope.dummyfilters.push(v[h]);
				}

			
			var html =	'<article class="thumbnail">' + 
 		                      '<label>'+ filterName +'</label>' +
 		                        '<ul>' + 
		                            '<li data-ng-repeat="'+ filterName +'Filter in dummyfilters | orderBy:'+ count + ':true  | limitTo: filterLimit">' + 
		                            '<input type="checkbox" data-ng-click="filterChanged('+ filterNameString +','+filterName+'Filter.name)" data-ng-model="'+ filterName +'Filter.value" id="{{'+ filterName +' + '+ filterName +'Filter.name}}" />' + 
 		                            '<label ng-if="'+ filterName +'Filter.name" for="{{'+ filterName +' + '+ filterName +'Filter.name}}" >{{'+ filterName +'Filter.name}} ({{'+ filterName +'Filter.count}})</label>' + 
 		                            '<label ng-if="!'+ filterName +'Filter.name" for="{{'+ filterName +' + '+ filterName +'Filter.name}}" >Not Mentioned ({{'+ filterName +'Filter.count}})</label>' + 
 		                            '</li>' + 
 		                        '</ul>' + 
 		                        '<a href="" data-ng-if="dummyfilters.length > filterLimit" data-ng-click="openFilterModal('+ filterName +'Filters, '+ filterNameString +')">more choices...</a>' + 
 		                    '</article>';
                var e =$compile(html)(scope);

            	element.replaceWith(e);

            },true);
			}
		};
	}
]);