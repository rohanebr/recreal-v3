'use strict';

angular.module('core').directive('triggerJobList', ['$compile','$rootScope','$http','Jobs', 'Employers', 'Companies',
	function($compile,$rootScope,$http, Jobs, Employers, Companies) {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
		
		$rootScope.$on("inEmployerJobupdateHeader", function (args) {
			 scope.jobs = [];

        scope.employer = Employers.get({
            employerId: scope.user.employer
        }, function(employer) {
            scope.company = Companies.get({
                companyId: employer.company
            }, function(company) {
                           var gg=company.jobs;
                 $http.put('jobs/jobsByIDs/' + scope.user._id, gg).success(function(res){

                scope.jobslist=[];
                for(var d,g=res.length;d<g;d++)
                    {  scope.jobslist.push({name:res[d].title,id:res[d]._id});}
                scope.myColor = scope.jobslist[1];
                if(args.trigger)
            var html='<select ng-model="myColor" ng-options="joblist.name for joblist in jobslist">'+'</select><br>';
       else
        var html='';
         
       
                var e =$compile(html)(scope);

                element.replaceWith(e);  
                 });




               

 
            });
        });



         
    });

				
            
            	

           
			}
		};
	}
]);