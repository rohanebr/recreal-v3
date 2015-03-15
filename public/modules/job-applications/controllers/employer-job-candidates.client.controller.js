'use strict';

angular.module('job-applications').controller('EmployerJobCandidatesController', ['$scope', '$filter', '$state','Jobs', 'Employers', '$stateParams', '$http', '$modal', '$location', 'Authentication', 'Socket', '$rootScope', 'JobApplications',
    function($scope, $filter, $state, Jobs, Employers, $stateParams, $http, $modal, $location, Authentication, Socket, $rootScope, JobApplications) {
        $rootScope.$broadcast("inEmployerJobupdateHeader", {
            trigger: true
        });
        $scope.firstTimeFetching = true;
        $scope.locationFilters = [];
        $scope.filteredjobApplications = [];
        $scope.user = Authentication.user;
        $scope.employer = Employers.get({
            employerId: $scope.user.employer
        });
        $scope.itemsPerPage = 5;
        $scope.currentPage = 0;
        $scope.candidates = [];
        $scope.skip = 0;

        $scope.dummyfilters = [];
        $scope.filters = [];
        $scope.filters1 = [];
        $scope.firsttime = true;
        $scope.completefilternames = [];
        $scope.filterLimit = 5;
        var i;
        if(!$scope.currentStage){
            $scope.currentStage = 'All';
        }
        $scope.priorities = [{
            'Id': 1,
            'Label': "Career Level",
            'name': 'career_level',
            'nameinjob': 'career_level'
        }, {
            'Id': 2,
            'Label': "Salary Expectation",
            'name': 'salary_expectation',
            'nameinjob': "salary_range"
        }, {
            'Id': 3,
            'Label': "Skills",
            'name': 'skills',
            'nameinjob': 'skills'
        }, {
            'Id': 4,
            'Label': "Education",
            'name': "degree_title",
            'nameinjob': "degree_title"
        }, {
            'Id': 5,
            'Label': "Gender",
            'name': "gender",
            'nameinjob': "gender"
        }, {
            'Id': 6,
            'Label': "Employment Status",
            'name': "employee_status",
            'nameinjob': "employee_status"
        }, {
            'Id': 7,
            'Label': "Employment Type",
            'name': "employee_type",
            'nameinjob': "employee_type"
        }, {
            'Id': 8,
            'Label': "Visa Status",
            'name': "visa_status",
            'nameinjob': "visa_status"
        }];
        if (!$scope.user) $location.path('/signin');
        Socket.on('applied_on_job', function(data) {

            if ($scope.job._id == data.job._id) {
                $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
            }
        });
        Socket.on('WatchingJob', function(data) {
            for (var dd = 0, len = $scope.candidates.length; dd < len; dd++) {

                if (data.userId == $scope.candidates[dd].user._id) {

                    $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
                    break;
                }

            }



        });
        $scope.itemsList = {
            items1: []

        };
        $scope.itemsList.items1 = $scope.priorities;
        $scope.sortableOptions = {
            containment: '#sortable-container',
            //restrict move across columns. move only within column.
            accept: function(sourceItemHandleScope, destSortableScope) {
                return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
            },
            orderChanged: function(event) {
                $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
            }
        };

        ////////////////////////////////////////////
        //////////   pagination controls begin
        ////////////////////////////////////////////
        $scope.range = function() {
            var rangeSize = 5;
            var ret = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCount() - rangeSize) {
                start = $scope.pageCount() - rangeSize;
            }

            for (var i = start; i < start + rangeSize; i++) {
                if (i >= 0)
                    ret.push(i);
            }
            return ret;
        };


        $scope.prevPage = function() {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.prevPageDisabled = function() {
            return $scope.currentPage === 0 ? "disabled" : "";
        };

        $scope.nextPage = function() {
            if ($scope.currentPage < $scope.pageCount() - 1) {
                $scope.currentPage++;
            }
        };

        $scope.nextPageDisabled = function() {
            return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
        };

        $scope.pageCount = function() {

            return Math.ceil($scope.total / $scope.itemsPerPage);

        };

        $scope.setPage = function(n) {

            if (n >= 0 && n < $scope.pageCount()) {

                $scope.currentPage = n;

            }
        };

        ////////////////////////////////////////////
        //////////   employer's favorite candidates
        ////////////////////////////////////////////


        $scope.isFavorite = function(candidate) {

            var ans = false;
            angular.forEach($scope.employer.favorites, function(item) {
                if (item.candidate == candidate._id)
                    ans = true;
            });
            return ans;
        };


        // Add to Short List
        $scope.addCandidateToFavorites = function(candidate) {
            JobApplications.addCandidateToFavorites(candidate, $scope.job, $scope.employer, function(jobApplication){
              $scope.employer.favorites.push(jobApplication);
            });
        };


        // Remove from Short List
        $scope.removeCandidateFromFavorites = function(candidate) {

            var attribute = {
                jobId: $scope.job._id,
                candidateId: candidate._id
            }

            $http.put('employers/removeFromFavorites/' + $scope.employer._id, attribute).success(function(response) {

                angular.forEach($scope.employer.favorites, function(item) {
                    if (item.candidate == candidate._id)
                        $scope.employer.favorites.splice($scope.employer.favorites.indexOf(item), 1);
                });
                //And redirect to the index page

                // $location.path('jobs/' + job._id);
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        ////////////////////////////////////////////
        //////////   Stage Manipulation
        ////////////////////////////////////////////

        $scope.changeStage = function(jobApplication){
            JobApplications.changeStage(jobApplication, $scope.job, function(responseJobApplication){
              jobApplication.stage = responseJobApplication.stage;
            });
        }

        

        ////////////////////////////////////////////
        //////////   Get list of paginated candidates
        ////////////////////////////////////////////

        $scope.findCandidates = function(skip, limit, filters, isPageChange) {
             var jsonObject={
                skip: skip,
                stage: $scope.currentStage,
                limit: limit,
                filter: filters,
                isPageChange: isPageChange,
                priority: $scope.itemsList.items1
            };
            console.log(jsonObject);
            $http.put('jobs/getPaginatedCandidates/' + $stateParams.jobId,jsonObject ).success(function(serverData) {


                console.log(serverData);
                $scope.candidates = [];

                $scope.filters1 = [];
                $scope.job = serverData.job;
                // $scope.locationFilters=job.filters.locationFilters;
                $scope.total = serverData.totalentries;
                for (var h = 0, y = serverData.candidates.length; h < y; h++)
                    $scope.candidates.push({
                        candidate: serverData.candidates[h],
                        jobapplication: serverData.jobapplication[h]
                    });
                // $scope.candidates = serverData.candidates;
                $scope.filteredjobApplications = serverData.jobapplication;
                serverData.filters.forEach(function(entry) {
                    $scope.filters1.push(entry);
                });

                if ($scope.firsttime) {
                    $scope.firsttime = false;
                    $scope.filters1.forEach(function(entry) {

                        var alreadyexists = false;
                        for (var h = 0, a = $scope.completefilternames.length; h < a; h++) {

                            if ($scope.completefilternames[h] == entry.type)
                                alreadyexists = true;

                        }
                        if (!alreadyexists) {
                            $scope.completefilternames.push(entry.type);
                        }


                    });




                }


            });
        }



        //only watch currentPage for pagination purposes 
        $scope.$watch("currentPage", function(newValue, oldValue) {
            $scope.skip = newValue * $scope.itemsPerPage;
            if ($scope.skip == 0) { //   if first page
                $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
            } else {
                $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, true);
            }
        });
        //Removes and adds filter for salary

        $scope.filterChanged = function(type, name) {

            $scope.filters1.forEach(function(entry) {
                console.log(entry.value);

                if (name == entry.name) {
                    //entry.value=!entry.value;

                    if (entry.value == true) {
                        console.log("ADD FILTERS");
                        $scope.addToFilters(entry.type, entry.name);
                    } else
                        $scope.removeFromFilters(entry.type, entry.name);
                }
                console.log("ENTRY");
            });
            console.log($scope.filters);
            $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);


        }


        //addToFilters
        $scope.addToFilters = function(type, name) {
            var once = true;
            var alreadyPresentInFilters = false;
            $scope.filters.forEach(function(entry) {
                if (type == entry.type && name == entry.name) {
                    alreadyPresentInFilters = true;
                }
            });

            if (!alreadyPresentInFilters) {

                var typeExists = false;
                var feefilters = angular.copy($scope.filters);
                feefilters.forEach(function(entry) {

                    if (type == entry.type && once) {
                        once = false;
                        typeExists = true;
                        $scope.filters.push({
                            type: type,
                            name: name,
                            priority: entry.priority,
                            value: true
                        });

                    }
                });

                if (!typeExists) {
                    // There's no real number bigger than plus Infinity

                    var highest = 0;
                    var tmp;
                    for (var i = $scope.filters.length - 1; i >= 0; i--) {
                        tmp = $scope.filters[i].priority;
                        if (tmp > highest) highest = tmp;
                    }

                    $scope.filters.push({
                        type: type,
                        name: name,
                        priority: highest + 1,
                        value: true
                    });

                }


                //salary_expext salay_exp  visa visa
            }


            console.log($scope.filters);




        }

        //removeFromFilters
        $scope.removeFromFilters = function(type, name) {

            $scope.filters.forEach(function(entry) {
                if (type == entry.type && name == entry.name)

                    $scope.filters.splice($scope.filters.indexOf(entry), 1);



            });
            //   $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);

        }
        $scope.openFilterModal = function(filterArray, name) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/job-applications/views/employer-job-candidates/filter-modal.html',
                controller: 'FilterModalCtrl',
                resolve: {
                    filter: function() {
                        return {
                            values: angular.copy(filterArray),
                            name: name
                        };
                    }
                }
            });

            modalInstance.result.then(function(filterObject) {
                var filternames = [];
                filterObject.filters.forEach(function(filter) {
                    if (filter.value) {
                        filternames.push(filter.name);
                    }
                });


                if (filterObject.name) {
                    filternames.forEach(function(filter) {
                        $scope.addToFilters(filterObject.name, filter);
                    });
                }

                $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);

            }, function() {

            });
        };

        $scope.stageLink = function(stage){
            $scope.currentStage = stage;
            switch(stage){
                case 'all':
                    $state.go('employer-job-candidates.all');
                break;
                case 'Interview':
                    $state.go('employer-job-candidates.interview');
                break;   
                case 'Test':
                    $state.go('employer-job-candidates.exam');
                break;
                default:
                    $state.go('employer-job-candidates.all');
                break;
            }
            $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
        };




        $scope.compareType = function(typeName, value) {
            if ($scope.job[typeName] === value) {
                return true;
            } else {
                return false;
            }
        }

    }




]).

controller('FilterModalCtrl', [
    '$scope', '$modalInstance', 'filter',
    function($scope, $modalInstance, filter) {

        $scope.filters = filter.values;
        $scope.name = filter.name;

        $scope.ok = function() {
            // $scope.$parent.findCandidates($scope.$parent.skip, $scope.$parent.itemsPerPage, $scope.$parent.filters, false);
            $modalInstance.close({
                name: $scope.name,
                filters: $scope.filters
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');

        };
    }
]);