'use strict';

angular.module('candidate-jobs').directive('filterListOpenJobs', ['$compile',
	function($compile) {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Test directive directive logic
				// ...
				
            
               var filterName = attrs.filterName;
				var filterNameString = "'" + attrs.filterName + "'";
				var count  = "'count'";
				var type='';


				var filterHeading = '';
				switch(filterName){
					case 'gender':
					    filterHeading = 'Gender';
					break;
					case 'salary_expectation':
						filterHeading = 'Salary Expectation';
					break;
					case 'visa_status':
						filterHeading = 'Visa';
					break;
					case 'employee_status':
						filterHeading = 'Employment Status';
					break;
					case 'employee_type':
						filterHeading = 'Employment Type';
					break;
					case 'career_level':
						filterHeading = 'Career Level';
					break;
					case 'skills':
					    filterHeading = 'Skills';
					break;
					case 'educations':
					    filterHeading = 'Education';
					    case 'industry':
					    filterHeading='Industry';
					    break;
					    case 'location':
					    filterHeading='Location';
					    break;
					    case 'salary_range':
					    filterHeading="Salary Range";

				}
				
            
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

			
			var html =	'<article>' + 
 		                      '<label><strong>'+ filterHeading +'</strong></label>' +
 		                        '<ul>' + 
		                            '<li class="checkbox i-checks" data-ng-repeat="'+ filterName +'Filter in v | orderBy:'+ count + ':true  | limitTo: filterLimit">' + 
			                            '<label>' +
				                            '<input type="checkbox" data-ng-click="filterChanged('+ filterNameString +','+filterName+'Filter.name)" data-ng-model="'+ filterName +'Filter.value" id="{{'+ filterName +' + '+ filterName +'Filter.name}}" />' +
				                            '<i></i>' +
		 		                            '<label ng-if="'+ filterName +'Filter.name" for="{{'+ filterName +' + '+ filterName +'Filter.name}}" >{{'+ filterName +'Filter.name}} ({{'+ filterName +'Filter.count}})</label>' + 
		 		                            '<label ng-if="!'+ filterName +'Filter.name" for="{{'+ filterName +' + '+ filterName +'Filter.name}}" >Not Mentioned ({{'+ filterName +'Filter.count}})</label>' + 
	 		                            '</label>' +
 		                            '</li>' + 
 		                        '</ul>'
 		                        + 
 		                        '<a href="" data-ng-if="v.length > filterLimit" data-ng-click="openFilterModal(v, '+ filterNameString +')">more choices...</a>' + 
 		                        '</article>';
                var e =$compile(html)(scope);

            	element.replaceWith(e);

            },true);
			}
		};
	}
]);