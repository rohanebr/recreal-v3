'use strict';

angular.module('empoyer-jobs').controller('EmployerJobCandidatesController', ['$scope', '$filter', 'Jobs', '$stateParams', '$http', '$modal', '$location', 'Authentication', 'Socket', '$rootScope',
    function($scope, $filter, Jobs, $stateParams, $http, $modal, $location, Authentication, Socket, $rootScope) {
        $rootScope.$broadcast("inEmployerJobupdateHeader", {
            trigger: true
        });
        $scope.firstTimeFetching = true;
        $scope.locationFilters = [];
        $scope.user = Authentication.user;
        $scope.itemsPerPage = 5;
        $scope.currentPage = 0;
        $scope.jobApplications = [];
        $scope.skip = 0;

        $scope.dummyfilters = [];
        $scope.filters = [];
        $scope.filters1 = [];
        $scope.firsttime = true;
        $scope.completefilternames = [];
        $scope.filterLimit = 5;
        var i;
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
            for (var dd = 0, len = $scope.jobApplications.length; dd < len; dd++) {

                if (data.userId == $scope.jobApplications[dd].user._id) {

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

        $scope.isShortListed = function(candidate) {

            var ans = false;
            angular.forEach($scope.job.shortListedCandidates, function(item) {
                if (item.candidate == candidate._id)
                    ans = true;
            });
            return ans;
        };

        $scope.findCandidates = function(skip, limit, filters, isPageChange) {

            $http.put('jobs/getPaginatedCandidates/' + $stateParams.jobId, {
                skip: skip,
                limit: limit,
                filter: filters,
                isPageChange: isPageChange,
                priority: $scope.itemsList.items1
            }).success(function(job) {


                console.log(job);


                $scope.filters1 = [];
                $scope.job = job.job;
                // $scope.locationFilters=job.filters.locationFilters;
                $scope.total = job.totalentries;
                $scope.jobApplications = job.jobApplications;
                job.filters.forEach(function(entry) {
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
                        if (!alreadyexists)
                            $scope.completefilternames.push(entry.type);


                    });




                }


            });
        }


        // Add to Short List
        $scope.addCandidateToShortList = function(candidate) {

            var attribute = {
                jobId: $scope.job._id,
                candidateId: candidate._id
            }


            $http.put('jobs/addToShortList/' + $scope.job._id, attribute).success(function(response) {

                $scope.job.shortListedCandidates.push({
                    candidate: candidate._id
                });

            }).error(function(response) {
                $scope.error = response.message;
            });
        };


        // Remove from Short List
        $scope.removeCandidateFromShortList = function(candidate) {

            var attribute = {
                jobId: $scope.job._id,
                candidateId: candidate._id
            }

            $http.put('jobs/removeFromShortList/' + $scope.job._id, attribute).success(function(response) {

                angular.forEach($scope.job.shortListedCandidates, function(item) {
                    if (item.candidate == candidate._id)
                        $scope.job.shortListedCandidates.splice($scope.job.shortListedCandidates.indexOf(item), 1);
                });
                //And redirect to the index page

                $location.path('jobs/' + job._id);
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

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

                if (name == entry.name) {
                    entry.value = !entry.value;
                    if (entry.value == true)

                        $scope.addToFilters(entry.type, entry.name);
                    else $scope.removeFromFilters(entry.type, entry.name);
                }
            });
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
                var feefilters = $scope.filters.slice();
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




        }

        //removeFromFilters
        $scope.removeFromFilters = function(type, name) {

            $scope.filters.forEach(function(entry) {
                if (type == entry.type && name == entry.name)

                    $scope.filters.splice($scope.filters.indexOf(entry), 1);



            });
            $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);

        }
        $scope.openFilterModal = function(filterArray, name) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/empoyer-jobs/views/employer-job-candidates/filter-modal.html',
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