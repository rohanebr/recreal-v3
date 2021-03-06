'use strict';


angular.module('core').controller('HomeController', ['$scope', '$modal', 'Authentication', '$state', '$rootScope', 'Employers', 'Companies', 'Candidates', 'Socket', '$location',
    function($scope, $modal, Authentication, $state, $rootScope, Employers, Companies, Candidates, Socket, $location) {
        // This provides Authentication context.

        $scope.OpenCandidateSignUpModal = function() {

            var modalInstance = $modal.open({
                templateUrl: '/modules/candidate-signup-wizard/views/partials/candidate-signup-partial.html',
                controller: 'CandidateSignupController'
            });
            modalInstance.result.then(function(result) {
                console.log(result);
                //    $scope.sendmessage = result.sendmessage;
            },
            function() {

            });
        };

        $scope.OpenSigninModal = function() {

            var modalInstance = $modal.open({
                templateUrl: '/modules/users/views/signin.partial.client.view.html',
                controller: 'AuthenticationController'
            });
            modalInstance.result.then(function(result) {
                    console.log(result);
                    //    $scope.sendmessage = result.sendmessage;
                },
                function() {

                });
        };


        $scope.authentication = Authentication;
        var user = $scope.authentication.user;
        console.log(user);
        if (!user)
            $state.go('home');
        else if (user.userType === 'employer') {
            if ($scope.authentication.user.stage == "Basic")
                $location.path("emp-wizard-one/" + $scope.authentication.user.activeToken);
            if ($scope.authentication.user.stage == "CompanyLocation")
                $location.path("emp-wizard-two");
            if ($scope.authentication.user.stage == "NoJobs") {
                $scope.employer = Employers.get({
                    employerId: $scope.authentication.user.employer
                }, function(employer) {
                    console.log(employer);
                    if (employer.jobs.length > 0) { // edit first job
                        $location.path('emp-job-post-two/' + employer.jobs[0]);
                    } else { // create new job
                        $location.path('emp-job-post-one');
                    }
                });
            }
            if ($scope.authentication.user.stage == "Active") {
                $rootScope.employer = Employers.get({
                    employerId: $scope.authentication.user.employer
                }, function(employer) {
                    $rootScope.company = Companies.get({
                        companyId: employer.company
                    });
                });
                $state.go('company-open-jobs');
            }
        } else if (user.userType === 'candidate') {
            $rootScope.candidate = Candidates.get({
                candidateId: $scope.authentication.user.candidate
            }, function(candidate) {
                switch (candidate.stage) {
                    case 'One':
                        $location.path("candidate-wizard-one/" + $scope.authentication.user.activeToken);
                        break;
                    case 'Two':
                        $state.go('candidate-wizard-two');
                        break;
                    case 'Three':
                        $state.go('candidate-wizard-three');
                        break;
                    case 'Four':
                        $state.go('candidate-wizard-four');
                        break;
                    case 'Five':
                        $state.go('candidate-wizard-five');
                        break;
                    case 'Complete':
                        $state.go('candidate-home');
                        break;
                }
            });
        } else if (user.userType === 'transition') {
            $location.path('/linkedin-cv'); 

        }



        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d1 = [];
        for (var i = 0; i <= 11; i += 1) {
            d1.push([i, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
        }

        $("#flot-1ine").length && $.plot($("#flot-1ine"), [{
            data: d1
        }], {
            series: {
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.3
                        }, {
                            opacity: 0.3
                        }]
                    }
                },
                points: {
                    radius: 3,
                    show: true
                },
                grow: {
                    active: true,
                    steps: 50
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#f0f0f0",
                borderWidth: 1,
                color: '#f0f0f0'
            },
            colors: ["#1bb399"],
            xaxis: {},
            yaxis: {
                ticks: 5
            },
            tooltip: true,
            tooltipOpts: {
                content: "chart: %x.1 is %y.4",
                defaultTheme: false,
                shifts: {
                    x: 0,
                    y: 20
                }
            }
        });

        var d0 = [
            [0, 0],
            [1, 0],
            [2, 1],
            [3, 2],
            [4, 15],
            [5, 5],
            [6, 12],
            [7, 10],
            [8, 55],
            [9, 13],
            [10, 25],
            [11, 10],
            [12, 12],
            [13, 6],
            [14, 2],
            [15, 0],
            [16, 0]
        ];
        var d00 = [
            [0, 0],
            [1, 0],
            [2, 1],
            [3, 0],
            [4, 1],
            [5, 0],
            [6, 2],
            [7, 0],
            [8, 3],
            [9, 1],
            [10, 0],
            [11, 1],
            [12, 0],
            [13, 2],
            [14, 1],
            [15, 0],
            [16, 0]
        ];
        $("#flot-sp1ine").length && $.plot($("#flot-sp1ine"), [
            d0, d00
        ], {
            series: {
                lines: {
                    show: false
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.4
                },
                points: {
                    radius: 0,
                    show: true
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#d9dee9",
                borderWidth: 1,
                color: '#d9dee9'
            },
            colors: ["#19b39b", "#644688"],
            xaxis: {},
            yaxis: {
                ticks: 4
            },
            tooltip: true,
            tooltipOpts: {
                content: "chart: %x.1 is %y.4",
                defaultTheme: false,
                shifts: {
                    x: 0,
                    y: 20
                }
            }
        });

        var d2 = [];
        for (var i = 0; i <= 6; i += 1) {
            d2.push([i, parseInt((Math.floor(Math.random() * (1 + 30 - 10))) + 10)]);
        }
        var d3 = [];
        for (var i = 0; i <= 6; i += 1) {
            d3.push([i, parseInt((Math.floor(Math.random() * (1 + 30 - 10))) + 10)]);
        }
        $("#flot-chart").length && $.plot($("#flot-chart"), [{
            data: d2,
            label: "Unique Visits"
        }, {
            data: d3,
            label: "Page Views"
        }], {
            series: {
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.3
                        }, {
                            opacity: 0.3
                        }]
                    }
                },
                points: {
                    show: true
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#f0f0f0",
                borderWidth: 0
            },
            colors: ["#1bb399", "#177bbb"],
            xaxis: {
                ticks: 15,
                tickDecimals: 0
            },
            yaxis: {
                ticks: 10,
                tickDecimals: 0
            },
            tooltip: true,
            tooltipOpts: {
                content: "'%s' of %x.1 is %y.4",
                defaultTheme: false,
                shifts: {
                    x: 0,
                    y: 20
                }
            }
        });


        // live update
        var data = [],
            totalPoints = 300;

        function getRandomData() {

            if (data.length > 0)
                data = data.slice(1);

            // Do a random walk

            while (data.length < totalPoints) {

                var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;

                if (y < 0) {
                    y = 0;
                } else if (y > 100) {
                    y = 100;
                }

                data.push(y);
            }

            // Zip the generated y values with the x values

            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }

            return res;
        }

        var updateInterval = 30,
            live;
        $("#flot-live").length && (live = $.plot("#flot-live", [getRandomData()], {
            series: {
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.2
                        }, {
                            opacity: 0.1
                        }]
                    }
                },
                shadowSize: 2
            },
            colors: ["#cccccc"],
            yaxis: {
                min: 0,
                max: 100
            },
            xaxis: {
                show: false
            },
            grid: {
                tickColor: "#f0f0f0",
                borderWidth: 0
            },
        })) && update();

        function update() {

            live.setData([getRandomData()]);

            // Since the axes don't change, we don't need to call plot.setupGrid()

            live.draw();
            setTimeout(update, updateInterval);
        };

        // bar
        var d1_1 = [
            [10, 120],
            [20, 70],
            [30, 100],
            [40, 60]
        ];

        var d1_2 = [
            [10, 80],
            [20, 60],
            [30, 30],
            [40, 35]
        ];

        var d1_3 = [
            [10, 80],
            [20, 40],
            [30, 30],
            [40, 20]
        ];

        var data1 = [{
            label: "Product 1",
            data: d1_1,
            bars: {
                show: true,
                fill: true,
                lineWidth: 1,
                order: 1,
                fillColor: {
                    colors: [{
                        opacity: 0.5
                    }, {
                        opacity: 0.9
                    }]
                }
            },
            color: "#6783b7"
        }, {
            label: "Product 2",
            data: d1_2,
            bars: {
                show: true,
                fill: true,
                lineWidth: 1,
                order: 2,
                fillColor: {
                    colors: [{
                        opacity: 0.5
                    }, {
                        opacity: 0.9
                    }]
                }
            },
            color: "#4fcdb7"
        }, {
            label: "Product 3",
            data: d1_3,
            bars: {
                show: true,
                fill: true,
                lineWidth: 1,
                order: 3,
                fillColor: {
                    colors: [{
                        opacity: 0.5
                    }, {
                        opacity: 0.9
                    }]
                }
            },
            color: "#8dd168"
        }];

        var d2_1 = [
            [90, 10],
            [70, 20]
        ];

        var d2_2 = [
            [80, 10],
            [60, 20]
        ];

        var d2_3 = [
            [120, 10],
            [50, 20]
        ];

        var data2 = [{
            label: "Product 1",
            data: d2_1,
            bars: {
                horizontal: true,
                show: true,
                fill: true,
                lineWidth: 1,
                order: 1,
                fillColor: {
                    colors: [{
                        opacity: 0.5
                    }, {
                        opacity: 1
                    }]
                }
            },
            color: "#6783b7"
        }, {
            label: "Product 2",
            data: d2_2,
            bars: {
                horizontal: true,
                show: true,
                fill: true,
                lineWidth: 1,
                order: 2,
                fillColor: {
                    colors: [{
                        opacity: 0.5
                    }, {
                        opacity: 1
                    }]
                }
            },
            color: "#4fcdb7"
        }, {
            label: "Product 3",
            data: d2_3,
            bars: {
                horizontal: true,
                show: true,
                fill: true,
                lineWidth: 1,
                order: 3,
                fillColor: {
                    colors: [{
                        opacity: 0.5
                    }, {
                        opacity: 1
                    }]
                }
            },
            color: "#8dd168"
        }];

        $("#flot-bar").length && $.plot($("#flot-bar"), data1, {
            xaxis: {

            },
            yaxis: {

            },
            grid: {
                hoverable: true,
                clickable: false,
                borderWidth: 0
            },
            legend: {
                labelBoxBorderColor: "none",
                position: "left"
            },
            series: {
                shadowSize: 1
            },
            tooltip: true,
        });

        $("#flot-bar-h").length && $.plot($("#flot-bar-h"), data2, {
            xaxis: {

            },
            yaxis: {

            },
            grid: {
                hoverable: true,
                clickable: false,
                borderWidth: 0
            },
            legend: {
                labelBoxBorderColor: "none",
                position: "left"
            },
            series: {
                shadowSize: 1
            },
            tooltip: true,
        });

        // pie

        var da = [{
                label: "iPhone5S",
                data: 40
            }, {
                label: "iPad Mini",
                data: 10
            }, {
                label: "iPad Mini Retina",
                data: 20
            }, {
                label: "iPhone4S",
                data: 12
            }, {
                label: "iPad Air",
                data: 18
            }],
            da1 = [],
            series = Math.floor(Math.random() * 4) + 3;

        for (var i = 0; i < series; i++) {
            da1[i] = {
                label: "Series" + (i + 1),
                data: Math.floor(Math.random() * 100) + 1
            }
        }

        $("#flot-pie-donut").length && $.plot($("#flot-pie-donut"), da, {
            series: {
                pie: {
                    innerRadius: 0.4,
                    show: true,
                    stroke: {
                        width: 0
                    },
                    label: {
                        show: true,
                        threshold: 0.05
                    },

                }
            },
            colors: ["#65b5c2", "#4da7c1", "#3993bb", "#2e7bad", "#23649e"],
            grid: {
                hoverable: true,
                clickable: false
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s: %p.0%"
            }
        });

        $("#flot-pie").length && $.plot($("#flot-pie"), da, {
            series: {
                pie: {
                    combine: {
                        color: "#999",
                        threshold: 0.05
                    },
                    show: true
                }
            },
            colors: ["#65b5c2", "#4da7c1", "#3993bb", "#2e7bad", "#23649e"],
            legend: {
                show: false
            },
            grid: {
                hoverable: true,
                clickable: false
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s: %p.0%"
            }
        });

        var cTime = new Date(),
            month = cTime.getMonth() + 1,
            year = cTime.getFullYear();

        var theMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var theDays = ["S", "M", "T", "W", "T", "F", "S"];
        var events = [
            [
                "4/" + month + "/" + year,
                'Meet a friend',
                '#',
                '#177bbb',
                'Contents here'
            ],
            [
                "7/" + month + "/" + year,
                'Kick off meeting!',
                '#',
                '#1bbacc',
                'Have a kick off meeting with .inc company'
            ],
            [
                "17/" + month + "/" + year,
                'Milestone release',
                '#',
                '#fcc633',
                'Contents here'
            ],
            [
                "19/" + month + "/" + year,
                'A link',
                'http://www.google.com',
                '#e33244'
            ]
        ];
        $('#calendar').calendar({
            months: theMonths,
            days: theDays,
            events: events,
            popover_options: {
                placement: 'top',
                html: true
            }
        });




    }
]);