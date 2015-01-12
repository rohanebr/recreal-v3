'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'recreal';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'ui.date',
        'angularFileUpload',
        'textAngular',
        'timer',
        'angularCharts',
        'geolocation',
        'ui.sortable',
        'toaster',
        'ngMap'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName) {
      // Create angular module
      angular.module(moduleName, []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('candidate-features');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('candidate-jobs');'use strict';
// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('candidate-signup-wizard');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('candidates');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('companies');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('employer-company');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('employer-signup-wizard');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('employers');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('empoyer-jobs');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('exams');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('jobs');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('messages');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('short-list');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('static-factories');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('threads');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
//Setting up route
angular.module('candidate-features').config([
  '$stateProvider',
  function ($stateProvider) {
    // Candidate features state routing
    $stateProvider.state('linkedin-cv', {
      url: '/linkedin-cv',
      templateUrl: 'modules/candidate-features/views/linkedin-cv.client.view.html'
    }).state('edit-cv', {
      url: '/edit-cv',
      templateUrl: 'modules/candidate-features/views/edit-cv.client.view.html'
    }).state('candidate-home', {
      url: '/candidate-home',
      templateUrl: 'modules/candidate-features/views/candidate-home.client.view.html'
    }).state('candidate-cv', {
      url: '/candidate-cv',
      templateUrl: 'modules/candidate-features/views/candidate-cv.client.view.html'
    });
  }
]);'use strict';
angular.module('candidate-features').controller('CandidateCvController', [
  '$scope',
  'Industries',
  'Countries',
  '$http',
  'Authentication',
  'Candidates',
  '$location',
  '$modal',
  function ($scope, Industries, Countries, $http, Authentication, Candidates, $location, $modal) {
    $scope.user = Authentication.user;
    $scope.isEditing = false;
    $scope.industries = Industries.getIndustries();
    Countries.getCountries(function (countries) {
      $scope.countries = countries;
    });
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    $scope.candidate = Candidates.get({ candidateId: $scope.user.candidate }, function (candidate) {
      if (!candidate.skills) {
        $scope.candidate.skills = [{ title: '' }];
      }
      if (!candidate.educations) {
        $scope.candidate.educations = [{ degree: '' }];
      }
      if (candidate.target_industries.length < 1) {
        $scope.candidate.target_industries = [{ name: '' }];
      }
      if (candidate.target_locations.length < 1) {
        $scope.candidate.target_locations = [{ name: '' }];
      }
    });
    // Update existing Candidate
    $scope.update = function () {
      var candidate = $scope.candidate;
      candidate.$update(function () {
        $location.path('candidates/' + candidate._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    //Skills
    $scope.addSkill = function () {
      $scope.candidate.skills.push({ title: '' });
    };
    $scope.removeSkill = function (index) {
      $scope.candidate.skills.splice(index, 1);
    };
    //Education
    $scope.addEducation = function () {
      $scope.candidate.educations.push({ title: '' });
    };
    $scope.removeEducation = function (index) {
      $scope.candidate.educations.splice(index, 1);
    };
    //Experience
    $scope.addExperience = function () {
      $scope.candidate.positions.push({ title: '' });
    };
    $scope.removeExperience = function (index) {
      $scope.candidate.positions.splice(index, 1);
    };
    //Projects
    $scope.addProject = function () {
      $scope.candidate.projects.push({ title: '' });
    };
    $scope.removeProject = function (index) {
      $scope.candidate.projects.splice(index, 1);
    };
    //Languages
    $scope.addLanguage = function () {
      $scope.candidate.languages.push({ title: '' });
    };
    $scope.removeLanguage = function (index) {
      $scope.candidate.languages.splice(index, 1);
    };
    // $scope.newProject={name:'',company:'',description:''};
    // $scope.openProjectModal=function(project){
    // var modalInstance;
    //        modalInstance = $modal.open({
    //          templateUrl: '/modules/candidate-features/views/cv-partials/project-partial.html',
    //          controller: 'ProjectModalCtrl',
    //          resolve: {
    //            skill: function() {
    //              return angular.copy(skill);
    //            }
    //          }
    //        });
    // };
    // initialize new project for to pass to the modal when add clicked
    $scope.newProject = {
      name: '',
      company: '',
      description: ''
    };
    // cuntino to open new modal
    $scope.openProjectModal = function (project) {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/candidate-features/views/cv-partials/project-partial.html',
        controller: 'ProjectModalCtrl',
        resolve: {
          project: function () {
            return angular.copy(project);
          }
        }
      });
      //  when modal is closed with updated values result is return that contains the updated values
      modalInstance.result.then(function (result) {
        var project = result.project;
        // if delete was clicked to close the modal
        if (result.action === 'delete') {
          angular.forEach($scope.candidate.projects, function (cProject) {
            if (cProject._id === project._id) {
              $scope.candidate.projects.splice($scope.candidate.projects.indexOf(cProject), 1);
              $http.put('/candidates/deleteProject/' + $scope.candidate._id, cProject).success(function (response) {
              }).error(function (response) {
                $scope.error = response.message;
              });
            }
          });  // else if save was clicked to close the modal : produces two cases: new or update  
        } else {
          project.name = project.name.trim();
          // position has an id means its updating an existing position i.e edit
          if (project._id !== undefined) {
            angular.forEach($scope.candidate.projects, function (cProject) {
              if (cProject._id === project._id) {
                cProject.name = project.name;
                cProject.company = project.company;
                cProject.description = project.description;
                cProject.start_date = project.start_date;
                cProject.end_date = project.end_date;
                $http.put('/candidates/updateProject/' + $scope.candidate._id, cProject).success(function (response) {
                }).error(function (response) {
                  $scope.error = response.message;
                });
              }
            });
          }  // else project does not have an id means its creating a new project i.e add
          else {
            $scope.candidate.projects.push(project);
            $http.put('/candidates/addProject/' + $scope.candidate._id, project).success(function (response) {
              // reinitialize the attributes of newProject : in case the user wants to add more projectss
              $scope.newProject = {
                name: '',
                company: '',
                description: ''
              };
            }).error(function (response) {
              $scope.error = response.message;
            });
          }
        }
      }, function () {
      });
    };
    // initialize new certificate for to pass to the modal when add clicked
    $scope.newCertificate = { name: '' };
    // cuntino to open new modal
    $scope.openCertificateModal = function (certificate) {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/candidate-features/views/cv-partials/certificates-partial.html',
        controller: 'CertificateModalCtrl',
        resolve: {
          certificate: function () {
            return angular.copy(certificate);
          }
        }
      });
      //  when modal is closed with updated values result is return that contains the updated values
      modalInstance.result.then(function (result) {
        var certificate = result.certificate;
        // if delete was clicked to close the modal
        if (result.action === 'delete') {
          angular.forEach($scope.candidate.certificates, function (cCertificate) {
            if (cCertificate._id === certificate._id) {
              $scope.candidate.certificates.splice($scope.candidate.certificates.indexOf(cCertificate), 1);
              $http.put('/candidates/deleteCertificate/' + $scope.candidate._id, cCertificate).success(function (response) {
              }).error(function (response) {
                $scope.error = response.message;
              });
            }
          });  // else if save was clicked to close the modal : produces two cases: new or update  
        } else {
          certificate.name = certificate.name.trim();
          // Certificate has an id means its updating an existing certificate i.e edit
          if (certificate._id !== undefined) {
            angular.forEach($scope.candidate.certificates, function (cCertificate) {
              if (cCertificate._id === certificate._id) {
                cCertificate.name = certificate.name;
                $http.put('/candidates/updateCertificate/' + $scope.candidate._id, cCertificate).success(function (response) {
                }).error(function (response) {
                  $scope.error = response.message;
                });
              }
            });
          }  // else certificate does not have an id means its creating a new certificate i.e add
          else {
            $scope.candidate.certificates.push(certificate);
            $http.put('/candidates/addCertificate/' + $scope.candidate._id, certificate).success(function (response) {
              // reinitialize the attributes of newCertificate : in case the user wants to add more certificates
              $scope.newCertificate = { name: '' };
            }).error(function (response) {
              $scope.error = response.message;
            });
          }
        }
      }, function () {
      });
    };
    // initialize new language for to pass to the modal when add clicked
    $scope.newLanguage = {
      name: '',
      proficiency: ''
    };
    // cuntino to open new modal
    $scope.openLanguageModal = function (language) {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/candidate-features/views/cv-partials/language-partial.html',
        controller: 'LanguageModalCtrl',
        resolve: {
          language: function () {
            return angular.copy(language);
          }
        }
      });
      //  when modal is closed with updated values result is return that contains the updated values
      modalInstance.result.then(function (result) {
        var language = result.language;
        // if delete was clicked to close the modal
        if (result.action === 'delete') {
          angular.forEach($scope.candidate.languages, function (cLanguages) {
            if (cLanguages._id === language._id) {
              $scope.candidate.languages.splice($scope.candidate.languages.indexOf(cLanguages), 1);
              $http.put('/candidates/deleteLanguage/' + $scope.candidate._id, cLanguages).success(function (response) {
              }).error(function (response) {
                $scope.error = response.message;
              });
            }
          });  // else if save was clicked to close the modal : produces two cases: new or update  
        } else {
          language.name = language.name.trim();
          // Language has an id means its updating an existing position i.e edit
          if (language._id !== undefined) {
            angular.forEach($scope.candidate.languages, function (cLanguages) {
              if (cLanguages._id === language._id) {
                cLanguages.name = language.name;
                cLanguages.proficiency = language.proficiency;
                $http.put('/candidates/updateLanguage/' + $scope.candidate._id, cLanguages).success(function (response) {
                }).error(function (response) {
                  $scope.error = response.message;
                });
              }
            });
          }  // else language does not have an id means its creating a new language i.e add
          else {
            $scope.candidate.languages.push(language);
            $http.put('/candidates/addLanguage/' + $scope.candidate._id, language).success(function (response) {
              // reinitialize the attributes of newLanguage : in case the user wants to add more languages
              $scope.newLanguage = {
                name: '',
                proficiency: ''
              };
            }).error(function (response) {
              $scope.error = response.message;
            });
          }
        }
      }, function () {
      });
    };
    // initialize new education for to pass to the modal when add clicked
    $scope.newEducation = {
      degree: '',
      study_feild: '',
      institute: '',
      notes: ''
    };
    // cuntino to open new modal
    $scope.openEducationModal = function (education) {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/candidate-features/views/cv-partials/education-partial.html',
        controller: 'EducationModalCtrl',
        resolve: {
          education: function () {
            return angular.copy(education);
          }
        }
      });
      //  when modal is closed with updated values result is return that contains the updated values
      modalInstance.result.then(function (result) {
        var education = result.education;
        // if delete was clicked to close the modal
        if (result.action === 'delete') {
          angular.forEach($scope.candidate.educations, function (cEducation) {
            if (cEducation._id === education._id) {
              $scope.candidate.educations.splice($scope.candidate.educations.indexOf(cEducation), 1);
              $http.put('/candidates/deleteEducation/' + $scope.candidate._id, cEducation).success(function (response) {
              }).error(function (response) {
                $scope.error = response.message;
              });
            }
          });  // else if save was clicked to close the modal : produces two cases: new or update  
        } else {
          education.degree = education.degree.trim();
          // Education has an id means its updating an existing position i.e edit
          if (education._id !== undefined) {
            angular.forEach($scope.candidate.educations, function (cEducation) {
              if (cEducation._id === education._id) {
                cEducation.degree = education.degree;
                cEducation.study_feild = education.study_feild;
                cEducation.institute = education.institute;
                cEducation.notes = education.notes;
                cEducation.start_date = education.start_date;
                cEducation.end_date = education.end_date;
                $http.put('/candidates/updateEducation/' + $scope.candidate._id, cEducation).success(function (response) {
                }).error(function (response) {
                  $scope.error = response.message;
                });
              }
            });
          }  // else education does not have an id means its creating a new education i.e add
          else {
            $scope.candidate.educations.push(education);
            $http.put('/candidates/addEducation/' + $scope.candidate._id, education).success(function (response) {
              // reinitialize the attributes of newEducation : in case the user wants to add more educations
              $scope.newEducation = {
                degree: '',
                study_feild: '',
                institute: '',
                notes: ''
              };
            }).error(function (response) {
              $scope.error = response.message;
            });
          }
        }
      }, function () {
      });
    };
    $scope.newSkill = {
      title: '',
      experience: 1,
      level: 'Beginner'
    };
    $scope.openSkillModal = function (skill) {
      console.log('OPENSKILLMODAL RUNNING');
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/candidate-features/views/cv-partials/skill-partial.html',
        controller: 'SkillModalCtrl',
        resolve: {
          skill: function () {
            return angular.copy(skill);
          }
        }
      });
      modalInstance.result.then(function (result) {
        var skill = result.skill;
        if (result.action === 'delete') {
          angular.forEach($scope.candidate.skills, function (cSkill) {
            if (cSkill._id === skill._id) {
              $http.put('/candidates/deleteSkill/' + $scope.candidate._id, cSkill).success(function (response) {
                //If successful we assign the response to the global user model
                // $scope.authentication.user = response;
                alert(response);  //And redirect to the index page
                                  // $location.path('/');
              }).error(function (response) {
                $scope.error = response.message;
              });
              $scope.candidate.skills.splice($scope.candidate.skills.indexOf(cSkill), 1);
            }
          });
        } else {
          skill.title = skill.title.trim();
          if (skill._id !== undefined) {
            angular.forEach($scope.candidate.skills, function (cSkill) {
              if (cSkill._id === skill._id) {
                cSkill.title = skill.title;
                cSkill.level = skill.level;
                cSkill.experience = skill.experience;
                cSkill.last_used = skill.last_used;
                $http.put('/candidates/updateSkill/' + $scope.candidate._id, cSkill).success(function (response) {
                }).error(function (response) {
                  $scope.error = response.message;
                });
              }
            });
          } else {
            console.log('addskill clicked');
            $scope.candidate.skills.push(skill);
            $http.put('/candidates/addSkill/' + $scope.candidate._id, skill).success(function (response) {
              $scope.newSkill = {
                title: '',
                experience: 1,
                level: 'Beginner'
              };  //alert(response);
            }).error(function (response) {
              $scope.error = response.message;
            });
          }
        }
      }, function () {
      });
    };
    $scope.openCandidatePictureModal = function () {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/candidate-features/views/cv-partials/picture-partial.html',
        controller: 'PictureModalCtrl'
      });
      modalInstance.result.then(function (result) {
        $scope.candidate.picture_url = result.picture_url;
      }, function () {
      });
    };
    // initialize new exp for to pass to the modal when add clicked
    $scope.newExperience = {
      company_name: '',
      title: '',
      summary: '',
      company_location: '',
      company_industry: '',
      is_current: false
    };
    // cuntino to open new modal
    $scope.openExperienceModal = function (position) {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/candidate-features/views/cv-partials/experience-partial.html',
        controller: 'ExperienceModalCtrl',
        resolve: {
          position: function () {
            return angular.copy(position);
          }
        }
      });
      //  when modal is closed with updated values result is return that contains the updated values
      modalInstance.result.then(function (result) {
        var position = result.position;
        // if delete was clicked to close the modal
        if (result.action === 'delete') {
          angular.forEach($scope.candidate.positions, function (cPosition) {
            if (cPosition._id === position._id) {
              $scope.candidate.positions.splice($scope.candidate.positions.indexOf(cPosition), 1);
              $http.put('/candidates/deleteExperience/' + $scope.candidate._id, cPosition).success(function (response) {
              }).error(function (response) {
                $scope.error = response.message;
              });
            }
          });  // else if save was clicked to close the modal : produces two cases: new or update
        } else {
          position.company_name = position.company_name.trim();
          // position has an id means its updating an existing position i.e edit
          if (position._id !== undefined) {
            angular.forEach($scope.candidate.positions, function (cPosition) {
              if (cPosition._id === position._id) {
                cPosition.company_name = position.company_name;
                cPosition.company_industry = position.company_industry;
                cPosition.company_location = position.company_location;
                cPosition.start_date = position.start_date;
                cPosition.end_date = position.end_date;
                cPosition.is_current = position.is_current;
                cPosition.summary = position.summary;
                cPosition.title = position.title;
                $http.put('/candidates/updateExperience/' + $scope.candidate._id, cPosition).success(function (response) {
                }).error(function (response) {
                  $scope.error = response.message;
                });
              }
            });
          }  // else position does not have an id means its creating a new position i.e add
          else {
            $scope.candidate.positions.push(position);
            $http.put('/candidates/addExperience/' + $scope.candidate._id, position).success(function (response) {
              // reinitialize the attributes of newExperience : in case the user wants to add more skills
              $scope.newExperience = {
                company_name: '',
                title: '',
                summary: '',
                company_location: '',
                company_industry: '',
                start_date: '0-0-0',
                end_date: '0-0-0',
                is_current: false
              };
            }).error(function (response) {
              $scope.error = response.message;
            });
          }
        }
      }, function () {
      });
    };
  }
]).controller('SkillModalCtrl', [
  '$scope',
  '$modalInstance',
  'skill',
  function ($scope, $modalInstance, skill) {
    $scope.skill = skill;
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        skill: $scope.skill
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]).controller('LanguageModalCtrl', [
  '$scope',
  '$modalInstance',
  'language',
  function ($scope, $modalInstance, language) {
    $scope.language = language;
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        language: $scope.language
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]).controller('CertificateModalCtrl', [
  '$scope',
  '$modalInstance',
  'certificate',
  function ($scope, $modalInstance, certificate) {
    $scope.certificate = certificate;
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        certificate: $scope.certificate
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]).controller('EducationModalCtrl', [
  '$scope',
  '$modalInstance',
  'education',
  function ($scope, $modalInstance, education) {
    $scope.education = education;
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        education: $scope.education
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]).controller('ProjectModalCtrl', [
  '$scope',
  '$modalInstance',
  'project',
  function ($scope, $modalInstance, project) {
    $scope.project = project;
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        project: $scope.project
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]).controller('ExperienceModalCtrl', [
  '$scope',
  '$modalInstance',
  'position',
  function ($scope, $modalInstance, position) {
    $scope.position = position;
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        position: $scope.position
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);'use strict';
angular.module('candidate-features').controller('CandidateHomeController', [
  '$scope',
  'Jobs',
  '$http',
  'Authentication',
  'Candidates',
  '$location',
  'Socket',
  function ($scope, Jobs, $http, Authentication, Candidates, $location, Socket) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    console.log($scope.user.candidate);
    $scope.candidate = Candidates.get({ candidateId: $scope.user.candidate });
    $scope.jobs = Jobs.query();
    $scope.hasApplied = function (job) {
      for (var d = 0, x = $scope.candidate.jobs.length; d < x; d++) {
        if ($scope.candidate.jobs[d] === job._id)
          return true;
      }
      return false;
    };
    // Apply for a Job
    $scope.apply = function (job) {
      $http.put('jobs/apply/' + job._id, job).success(function (response) {
        // Socket.emit('applied_on_job', {job: job, candidate: $scope.candidate});
        $scope.candidate.jobs.push(job);
        $scope.jobs.splice($scope.jobs.indexOf(job), 1);
        $scope.$apply();
        //And redirect to the index page
        $location.path('jobs/' + job._id);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('candidate-features').controller('LinkedinCvController', [
  '$scope',
  '$http',
  'Authentication',
  function ($scope, $http, Authentication) {
    $scope.getLinkiedInProfile = function () {
      $scope.user = Authentication.user;
      $http.get('/users/linkedInProfile/' + $scope.user._id).success(function (res) {
        $scope.candidate = new Object();
        $scope.candidate.displayName = res.firstName + ' ' + res.lastName;
        $scope.candidate.title = res.headline;
        $scope.candidate.country = res.locat.name;
        $scope.candidate.picture_url = res.pictureUrl;
        $scope.candidate.objective = res.summary;
      }).error(function (data, status, headers, confige) {
        console.log('Shouldnt have happened');
      });
    };
  }
]);'use strict';
//Setting up route
angular.module('candidate-jobs').config([
  '$stateProvider',
  function ($stateProvider) {
    // Candidate jobs state routing
    $stateProvider.state('candidate-applied-jobs', {
      url: '/candidate-applied-jobs',
      templateUrl: 'modules/candidate-jobs/views/candidate-applied-jobs.client.view.html'
    }).state('candidate-open-jobs', {
      url: '/candidate-open-jobs',
      templateUrl: 'modules/candidate-jobs/views/candidate-open-jobs.client.view.html'
    }).state('search-jobs', {
      url: '/search-jobs/:keyword',
      templateUrl: 'modules/candidate-jobs/views/search-jobs.client.view.html'
    });
  }
]);'use strict';
angular.module('candidate-jobs').controller('CandidateAppliedJobsController', [
  '$scope',
  'Jobs',
  '$http',
  'Authentication',
  'Candidates',
  '$location',
  function ($scope, Jobs, $http, Authentication, Candidates, $location) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    $scope.candidate = Candidates.get({ candidateId: $scope.user.candidate });
    $scope.jobs = Jobs.query();
    $scope.hasApplied = function (job) {
      if ($scope.candidate.jobs.indexOf(job._id) > -1) {
        return true;
      } else {
        return false;
      }
    };
    // Apply for a Job
    $scope.apply = function (job) {
      $http.put('jobs/apply/' + job._id, job).success(function (response) {
        $scope.candidate.jobs.push(job);
        $scope.jobs.splice($scope.jobs.indexOf(job), 1);
        $scope.$apply();
        //And redirect to the index page
        $location.path('jobs/' + job._id);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('candidate-jobs').controller('CandidateOpenJobsController', [
  '$scope',
  'Jobs',
  '$http',
  'Authentication',
  'Candidates',
  '$location',
  'Socket',
  '$rootScope',
  function ($scope, Jobs, $http, Authentication, Candidates, $location, Socket, $rootScope) {
    console.log($rootScope.coords.lat + ',' + $rootScope.coords.longi);
    $scope.itemsPerPage = 10;
    $scope.currentPage = 0;
    $scope.locationFilters = [];
    $scope.isPageChange = false;
    $scope.skip = 0;
    $scope.completefilternames = [];
    $scope.firsttime = true;
    $scope.jobs = [];
    $scope.dummyfilters = [];
    $scope.user = Authentication.user;
    $scope.lat = 0;
    $scope.longi = 0;
    $scope.filters = [];
    $scope.filterLimit = 5;
    $scope.longi = $rootScope.coords.longi;
    $scope.lat = $rootScope.coords.lat;
    if (!$scope.user)
      $location.path('/signin');
    var map;
    $scope.dynMarkers = [];
    $scope.$on('mapInitialized', function (event, evtMap) {
      map = evtMap;
      for (var i = 0; i < 1000; i++) {
        var latLng = new google.maps.LatLng(markers[i].position[0], markers[i].position[1]);
        $scope.dynMarkers.push(new google.maps.Marker({ position: latLng }));
      }
      $scope.markerClusterer = new MarkerClusterer(map, $scope.dynMarkers, {});
    });
    $scope.range = function () {
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
    $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };
    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 0 ? 'disabled' : '';
    };
    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount() - 1) {
        $scope.currentPage++;
      }
    };
    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() - 1 ? 'disabled' : '';
    };
    $scope.pageCount = function () {
      return Math.ceil($scope.total / $scope.itemsPerPage);
    };
    $scope.setPage = function (n) {
      if (n >= 0 && n < $scope.pageCount()) {
        $scope.currentPage = n;
      }
    };
    $scope.candidate = Candidates.get({ candidateId: $scope.user.candidate });
    Socket.on('job_posted', function (data) {
      console.log(data);
      $scope.jobs.push(data.job);
      console.log($rootScope.coords.lat + ',' + $rootScope.coords.longi);
    });
    // $scope.findJobs= function(skip,limit, isPageChange) {
    //   $http.put('jobs/getPaginatedJobs/'+$scope.user._id, {
    //                 skip: skip,
    //                 limit: limit,
    //                 isPageChange:isPageChange
    //             }).success(function(job) {
    //                    $scope.jobs=job.jobs;
    //                    $scope.total=job.total;   
    //             });
    // };
    $scope.findJobs = function (skip, limit, filters, isPageChange) {
      $http.put('jobs/getPaginatedJobs/' + $scope.user._id, {
        skip: skip,
        limit: limit,
        filter: filters,
        isPageChange: isPageChange
      }).success(function (job) {
        $scope.filters1 = [];
        $scope.jobs = job.jobs;
        console.log(job.jobs);
        // $scope.locationFilters=job.filters.locationFilters;
        $scope.total = job.total;
        $scope.candidates = job.candidates;
        job.filters.forEach(function (entry) {
          $scope.filters1.push(entry);
        });
        if ($scope.firsttime) {
          $scope.firsttime = false;
          $scope.filters1.forEach(function (entry) {
            var alreadyexists = false;
            for (var h = 0, a = $scope.completefilternames.length; h < a; h++) {
              if ($scope.completefilternames[h] == entry.type)
                alreadyexists = true;
            }
            if (!alreadyexists)
              $scope.completefilternames.push(entry.type);
          });
          console.log($scope.completefilternames);
        }
      });
    };
    $scope.$watch('currentPage', function (newValue, oldValue) {
      $scope.skip = newValue * $scope.itemsPerPage;
      if ($scope.skip == 0)
        $scope.findJobs($scope.skip, $scope.itemsPerPage, $scope.filters, false);
      else
        $scope.findJobs($scope.skip, $scope.itemsPerPage, $scope.filters, true);
    });
    $scope.hasApplied = function (job) {
      if ($scope.candidate.jobs.indexOf(job._id) > -1)
        return true;
      else
        return false;
    };
    // Apply for a Job
    $scope.apply = function (job) {
      $http.put('jobs/apply/' + job._id, job).success(function (response) {
        $scope.candidate.jobs.push(job);
        $scope.jobs.splice($scope.jobs.indexOf(job), 1);
        $scope.$apply();
        //And redirect to the index page
        $location.path('jobs/' + job._id);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.filterChanged = function (type, name) {
      console.log('FILTERCHANGED');
      $scope.filters1.forEach(function (entry) {
        if (name == entry.name) {
          entry.value = !entry.value;
          if (entry.value == true)
            $scope.addToFilters(entry.type, entry.name);
          else
            $scope.removeFromFilters(entry.type, entry.name);
        }
      });
      $scope.findJobs($scope.skip, $scope.itemsPerPage, $scope.filters, false);
    };
    //addToFilters
    $scope.addToFilters = function (type, name) {
      var once = true;
      var alreadyPresentInFilters = false;
      $scope.filters.forEach(function (entry) {
        if (type == entry.type && name == entry.name) {
          alreadyPresentInFilters = true;
        }
      });
      if (!alreadyPresentInFilters) {
        var typeExists = false;
        var feefilters = $scope.filters.slice();
        feefilters.forEach(function (entry) {
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
            if (tmp > highest)
              highest = tmp;
          }
          $scope.filters.push({
            type: type,
            name: name,
            priority: highest + 1,
            value: true
          });
        }  //salary_expext salay_exp  visa visa
      }
    };
    //removeFromFilters
    $scope.removeFromFilters = function (type, name) {
      $scope.filters.forEach(function (entry) {
        if (type == entry.type && name == entry.name)
          $scope.filters.splice($scope.filters.indexOf(entry), 1);
      });
      $scope.findJobs($scope.skip, $scope.itemsPerPage, $scope.filters, false);
    };
    $scope.openFilterModal = function (filterArray, name) {
      var modalInstance = $modal.open({
          templateUrl: '/modules/empoyer-jobs/views/employer-job-candidates/filter-modal.html',
          controller: 'FilterModalCtrl',
          resolve: {
            filter: function () {
              return {
                values: angular.copy(filterArray),
                name: name
              };
            }
          }
        });
      modalInstance.result.then(function (filterObject) {
        var filternames = [];
        filterObject.filters.forEach(function (filter) {
          if (filter.value) {
            filternames.push(filter.name);
          }
        });
        if (filterObject.name) {
          filternames.forEach(function (filter) {
            $scope.addToFilters(filterObject.name, filter);
          });
        }
        $scope.findJobs($scope.skip, $scope.itemsPerPage, $scope.filters, false);
      }, function () {
      });
    };
  }
]).controller('FilterModalCtrl', [
  '$scope',
  '$modalInstance',
  'filter',
  function ($scope, $modalInstance, filter) {
    $scope.filters = filter.values;
    $scope.name = filter.name;
    $scope.ok = function () {
      // $scope.$parent.findCandidates($scope.$parent.skip, $scope.$parent.itemsPerPage, $scope.$parent.filters, false);
      $modalInstance.close({
        name: $scope.name,
        filters: $scope.filters
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);'use strict';
angular.module('candidate-jobs').controller('SearchJobsController', [
  '$scope',
  'Jobs',
  '$http',
  'Authentication',
  'Candidates',
  '$location',
  'Socket',
  '$rootScope',
  '$stateParams',
  function ($scope, Jobs, $http, Authentication, Candidates, $location, Socket, $rootScope, $stateParams) {
    console.log($rootScope.coords.lat + ',' + $rootScope.coords.longi);
    $scope.itemsPerPage = 10;
    $scope.currentPage = 0;
    $scope.isPageChange = false;
    $scope.skip = 0;
    $scope.user = Authentication.user;
    $scope.firsttime = true;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    $scope.range = function () {
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
    $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };
    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 0 ? 'disabled' : '';
    };
    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount() - 1) {
        $scope.currentPage++;
      }
    };
    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() - 1 ? 'disabled' : '';
    };
    $scope.pageCount = function () {
      return Math.ceil($scope.total / $scope.itemsPerPage);
    };
    $scope.setPage = function (n) {
      if (n >= 0 && n < $scope.pageCount()) {
        $scope.currentPage = n;
      }
    };
    $scope.candidate = Candidates.get({ candidateId: $scope.user.candidate });
    // 		Socket.on('job_posted',function(data){
    // 		console.log(data);
    //            $scope.jobs.push(data.job);
    // console.log( $rootScope.coords.lat+","+ $rootScope.coords.longi);
    // 	});
    $scope.findJobs = function (skip, limit, isPageChange) {
      $http.put('jobs/searchedJobs/' + $scope.user._id, {
        keyword: $stateParams.keyword,
        skip: skip,
        limit: limit,
        isPageChange: isPageChange
      }).success(function (job) {
        $scope.jobs = job.jobs;
        $scope.total = job.total;
      });
    };
    $scope.$watch('currentPage', function (newValue, oldValue) {
      $scope.skip = newValue * $scope.itemsPerPage;
      if ($scope.skip == 0) {
        //   if first page
        $scope.findJobs($scope.skip, $scope.itemsPerPage, false);
      } else {
        $scope.findJobs($scope.skip, $scope.itemsPerPage, true);
      }
    });
    $scope.hasApplied = function (job) {
      if ($scope.candidate.jobs.indexOf(job._id) > -1) {
        return true;
      } else {
        return false;
      }
    };
    // Apply for a Job
    $scope.apply = function (job) {
      $http.put('jobs/apply/' + job._id, job).success(function (response) {
        $scope.candidate.jobs.push(job);
        $scope.jobs.splice($scope.jobs.indexOf(job), 1);
        $scope.$apply();
        //And redirect to the index page
        $location.path('jobs/' + job._id);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.filterChanged = function (type, name) {
      $scope.filters1.forEach(function (entry) {
        if (name == entry.name) {
          entry.value = !entry.value;
          if (entry.value == true)
            $scope.addToFilters(entry.type, entry.name);
          else
            $scope.removeFromFilters(entry.type, entry.name);
        }
      });  //$scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);
    };
    //addToFilters
    $scope.addToFilters = function (type, name) {
      var once = true;
      var alreadyPresentInFilters = false;
      $scope.filters.forEach(function (entry) {
        if (type == entry.type && name == entry.name) {
          alreadyPresentInFilters = true;
        }
      });
      if (!alreadyPresentInFilters) {
        var typeExists = false;
        var feefilters = $scope.filters.slice();
        feefilters.forEach(function (entry) {
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
            if (tmp > highest)
              highest = tmp;
          }
          $scope.filters.push({
            type: type,
            name: name,
            priority: highest + 1,
            value: true
          });
        }  //salary_expext salay_exp  visa visa
      }
    };
    //removeFromFilters
    $scope.removeFromFilters = function (type, name) {
      $scope.filters.forEach(function (entry) {
        if (type == entry.type && name == entry.name)
          $scope.filters.splice($scope.filters.indexOf(entry), 1);
      });  //  $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);
    };
    $scope.openFilterModal = function (filterArray, name) {
      var modalInstance = $modal.open({
          templateUrl: '/modules/candidate-jobs/views/search-job/filter-modal.html',
          controller: 'FilterModalCtrl',
          resolve: {
            filter: function () {
              return {
                values: angular.copy(filterArray),
                name: name
              };
            }
          }
        });
      modalInstance.result.then(function (filterObject) {
        var filternames = [];
        filterObject.filters.forEach(function (filter) {
          if (filter.value) {
            filternames.push(filter.name);
          }
        });
        if (filterObject.name) {
          filternames.forEach(function (filter) {
            $scope.addToFilters(filterObject.name, filter);
          });
        }  //$scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);
      }, function () {
      });
    };
  }
]).controller('FilterModalCtrl', [
  '$scope',
  '$modalInstance',
  'filter',
  function ($scope, $modalInstance, filter) {
    $scope.filters = filter.values;
    $scope.name = filter.name;
    $scope.ok = function () {
      // $scope.$parent.findCandidates($scope.$parent.skip, $scope.$parent.itemsPerPage, $scope.$parent.filters, false);
      $modalInstance.close({
        name: $scope.name,
        filters: $scope.filters
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);'use strict';
angular.module('candidate-jobs').directive('filterListOpenJobs', [
  '$compile',
  function ($compile) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Test directive directive logic
        // ...
        var filterName = attrs.filterName;
        var filterNameString = '\'' + attrs.filterName + '\'';
        var count = '\'count\'';
        var type = '';
        var filterHeading = '';
        switch (filterName) {
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
          filterHeading = 'Industry';
          break;
        case 'location':
          filterHeading = 'Location';
          break;
        case 'salary_range':
          filterHeading = 'Salary Range';
        }
        scope.$watch('filters1', function (v) {
          filterName = attrs.filterName;
          filterNameString = '\'' + attrs.filterName + '\'';
          count = '\'count\'';
          scope.dummyfilters = [];
          console.log('FILTERS ' + filterName);
          for (var h = 0, j = v.length; h < j; h++) {
            if (filterName == v[h].type)
              scope.dummyfilters.push(v[h]);
          }
          console.log(scope.dummyfilters);
          var html = '<article>' + '<label><strong>' + filterHeading + '</strong></label>' + '<ul>' + '<li class="checkbox i-checks" data-ng-repeat="' + filterName + 'Filter in dummyfilters | orderBy:' + count + ':true  | limitTo: filterLimit">' + '<label>' + '<input type="checkbox" data-ng-click="filterChanged(' + filterNameString + ',' + filterName + 'Filter.name)" data-ng-model="' + filterName + 'Filter.value" id="{{' + filterName + ' + ' + filterName + 'Filter.name}}" />' + '<i></i>' + '<label ng-if="' + filterName + 'Filter.name" for="{{' + filterName + ' + ' + filterName + 'Filter.name}}" >{{' + filterName + 'Filter.name}} ({{' + filterName + 'Filter.count}})</label>' + '<label ng-if="!' + filterName + 'Filter.name" for="{{' + filterName + ' + ' + filterName + 'Filter.name}}" >Not Mentioned ({{' + filterName + 'Filter.count}})</label>' + '</label>' + '</li>' + '</ul>' + '<a href="" data-ng-if="dummyfilters.length > filterLimit" data-ng-click="openFilterModal(dummyfilters, ' + filterNameString + ')">more choices...</a>' + '</article>';
          var e = $compile(html)(scope);
          element.replaceWith(e);
        }, true);
      }
    };
  }
]);'use strict';
angular.module('candidate-jobs').directive('googleMaps', [
  '$compile',
  function ($compile) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.$watch('lat', function (v) {
          console.log('WTF' + scope.lat);
          var html = '<map zoom="11" center="[{{lat}},{{longi}}]"><marker position="[{{lat}},{{longi}}]" draggable="true" /><control name="overviewMap" opened="false" /></map>';
          var e = $compile(html)(scope);
          element.replaceWith(e);
        }, true);
      }
    };
  }
]);'use strict';
//Setting up route
angular.module('candidate-signup-wizard').config([
  '$stateProvider',
  function ($stateProvider) {
    // Candidate signup wizard state routing
    $stateProvider.state('candidate-wizard-five', {
      url: '/candidate-wizard-five',
      templateUrl: 'modules/candidate-signup-wizard/views/candidate-wizard-five.client.view.html'
    }).state('candidate-wizard-four', {
      url: '/candidate-wizard-four',
      templateUrl: 'modules/candidate-signup-wizard/views/candidate-wizard-four.client.view.html'
    }).state('candidate-wizard-three', {
      url: '/candidate-wizard-three',
      templateUrl: 'modules/candidate-signup-wizard/views/candidate-wizard-three.client.view.html'
    }).state('candidate-wizard-two', {
      url: '/candidate-wizard-two',
      templateUrl: 'modules/candidate-signup-wizard/views/candidate-wizard-two.client.view.html'
    }).state('candidate-wizard-one', {
      url: '/candidate-wizard-one/:tokenId',
      templateUrl: 'modules/candidate-signup-wizard/views/candidate-wizard-one.client.view.html'
    });
  }
]);'use strict';
angular.module('candidate-signup-wizard').controller('CandidateSignupController', [
  '$modalInstance',
  '$location',
  '$scope',
  '$modal',
  '$http',
  function ($modalInstance, $location, $scope, $modal, $http) {
    // Candidate signup controller logic
    // ...
    $scope.credentials = {};
    $scope.signup = function () {
      $scope.credentials.userType = 'candidate';
      $http.post('/signupcandidate', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        if (response.status) {
          $location.path('/signup-email-activation');
          $modalInstance.dismiss();
        }  //And redirect to the index page
           // $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('candidate-signup-wizard').controller('CandidateWizardFiveController', [
  '$scope',
  '$http',
  '$state',
  'Authentication',
  'Candidates',
  function ($scope, $http, $state, Authentication, Candidates) {
    // Controller Logic
    // ...
    $scope.candidate = {};
    $scope.LoadInitialData = function () {
      $scope.authentication = Authentication;
      // Find existing Candidate
      $scope.candidate = Candidates.get({ candidateId: $scope.authentication.user.candidate });
    };
    $scope.SaveAndRedirect = function () {
      $scope.success = $scope.error = null;
      if ($scope.candidate.stage == 'Five')
        $scope.candidate.stage = 'Complete';
      var candidate = $scope.candidate;
      candidate.$update(function () {
        $state.go('candidate-wizard-four');
      }, function (errorResponse) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('candidate-signup-wizard').controller('CandidateWizardFourController', [
  '$scope',
  '$http',
  '$state',
  'Authentication',
  'Candidates',
  'locationVarification',
  '$location',
  function ($scope, $http, $state, Authentication, Candidates, locationVarification, $location) {
    $scope.authentication = Authentication;
    var cityFromRootScope, countryFromRootScope;
    var useGeoLocationInformation = false;
    if (!$scope.authentication.user)
      $state.go('home');
    var marker;
    var geocoder = new google.maps.Geocoder();
    $scope.candidate = {};
    $scope.LoadInitialData = function () {
      console.log($scope.authentication.user.candidate);
      $scope.candidate = Candidates.get({ candidateId: $scope.authentication.user.candidate }, function success() {
        console.log($scope.candidate);
        var promise = locationVarification.validateLocation($scope.candidate.location, $scope.candidate.country, $scope.candidate.coordinates.latitude, $scope.candidate.coordinates.longitude).then(function (responseFromLocationFactory) {
            console.log(responseFromLocationFactory[0]);
            if (responseFromLocationFactory[0] == 'true') {
              geocoder.geocode({ 'address': $scope.candidate.location + ',' + $scope.candidate.country }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  var map = $scope.map;
                  map.center = results[0].geometry.location;
                  $scope.map.setCenter(results[0].geometry.location);
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng($scope.candidate.coordinates.latitude, $scope.candidate.coordinates.longitude),
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    title: 'Select your company Location!'
                  });
                } else {
                  alert('Geocode was not successful for the following reason: ' + status);
                }
              });
            } else {
              geocoder.geocode({ 'address': $scope.candidate.location + ',' + $scope.candidate.country }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  console.log(results[0].geometry.location.lat());
                  $scope.candidate.coordinates.latitude = results[0].geometry.location.lat();
                  $scope.candidate.coordinates.longitude = results[0].geometry.location.lng();
                  var map = $scope.map;
                  map.center = results[0].geometry.location;
                  $scope.map.setCenter(results[0].geometry.location);
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng($scope.candidate.coordinates.latitude, $scope.candidate.coordinates.longitude),
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    title: 'Select your company Location!'
                  });
                } else {
                  alert('Geocode was not successful for the following reason: ' + status);
                }
              });
            }
          });
      });  // $scope.authentication = Authentication;
           // Find existing Candidate
           // $scope.candidate = Candidates.get({ 
           //     candidateId: $scope.authentication.user.candidate
           // });
    };
    $scope.Back = function () {
      $location.path('candidate-wizard-three');
    };
    $scope.SaveAndRedirect = function () {
      $scope.success = $scope.error = null;
      if ($scope.candidate.stage == 'Four') {
        //$scope.candidate.stage = 'Five';
        $scope.candidate.stage = 'Complete';
      }
      var candidate = $scope.candidate;
      candidate.coordinates.latitude = marker.position.k;
      candidate.coordinates.longitude = marker.position.D;
      console.log(candidate);
      candidate.$update(function () {
        $state.go('home');  // redirect to page five which contains MCQs
      }, function (errorResponse) {
        $scope.error = response.message;
      });
    };
    $scope.SkipAndRedirect = function () {
      $scope.success = $scope.error = null;
      if ($scope.candidate.stage == 'Four') {
        //$scope.candidate.stage = 'Five';
        $scope.candidate.stage = 'Complete';
      }
      var candidate = $scope.candidate;
      candidate.$update(function () {
        $state.go('home');  // redirect to page five which contains MCQs
      }, function (errorResponse) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('candidate-signup-wizard').controller('CandidateWizardOneController', [
  '$scope',
  '$http',
  '$state',
  '$stateParams',
  'Authentication',
  '$modal',
  'Countries',
  'geolocation',
  function ($scope, $http, $state, $stateParams, Authentication, $modal, Countries, geolocation) {
    // Controller Logic
    // ...
    var city1 = '';
    var country1 = '';
    var lat = 0, lng = 0;
    var countrycityset = true;
    $scope.candidate = {
      coordinates: {
        longitude: 0,
        latitude: 0
      },
      country: {},
      city: {}
    };
    $scope.LoadInitialData = function () {
      if ($stateParams.tokenId) {
        $http.post('/validatetoken', { token: $stateParams.tokenId }).success(function (response) {
          $scope.user = response.user;
          if ($scope.user.user == 'nothing') {
            $state.go('home');
          } else {
            $scope.authentication = Authentication;
            $scope.authentication.user = response.user;
            $scope.candidate = response.candidate;
            $scope.candidate.visa_status = 'No Visa';
            $scope.candidate.gender = 'Male';
            $scope.candidate.career_level = 'Student/Internship';
            $scope.candidate.employee_status = 'Part Time';
            $scope.candidate.employee_type = 'Permanent';
            $scope.candidate.salary_expectation = '$1000 - $2000';
            if ($scope.candidate.country === 'choose a country')
              countrycityset = false;
            Countries.getCountries(function (countries) {
              $scope.countries = countries;
              console.log($scope.candidate.country);
              if (!countrycityset) {
                console.log($scope.countries[1]);
                $scope.candidate.country = $scope.countries[1];
                $scope.getCountryCities();
                InitlocationData();
              } else {
                angular.forEach($scope.countries, function (country) {
                  if ($scope.candidate.country == country.name) {
                    $scope.candidate.country = country;
                    $scope.getCountryCities();
                  }
                });
              }
            });
          }
        }).error(function (response) {
          $scope.error = response.message;
        });
      } else {
        $state.go('home');
      }
    };
    $scope.SaveAndRedirect = function () {
      console.log($scope.candidate);
      $scope.success = $scope.error = null;
      if ($scope.candidate.stage == 'One')
        $scope.candidate.stage = 'Two';
      $http.post('/savecandidatewizardonedata', { candidate: $scope.candidate }).success(function (response) {
        $state.go('candidate-wizard-two');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    var InitlocationData = function () {
      var geocoder = new google.maps.Geocoder();
      geolocation.getLocation().then(function (data) {
        lat = parseFloat(data.coords.latitude);
        lng = parseFloat(data.coords.longitude);
        $scope.candidate.coordinates.longitude = lng;
        $scope.candidate.coordinates.latitude = lat;
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              var citycountry = results[1].formatted_address;
              var res = citycountry.split(',');
              country1 = res[res.length - 1];
              city1 = res[res.length - 2];
              city1 = city1.trim();
              country1 = country1.trim();
              console.log(country1 + ' ' + city1);
              angular.forEach($scope.countries, function (country) {
                if (countrycityset)
                  country1 = $scope.candidate.country;
                if (country1 == country.name) {
                  $scope.candidate.country = country;
                  $scope.getCountryCities();
                }
              });
            } else {
              $scope.candidate.country = $scope.countries[0];
              $scope.getCountryCities();
            }
          } else {
            $scope.candidate.country = $scope.countries[0];
            $scope.getCountryCities();
          }
        });
      });
    };
    $scope.getCountryCities = function () {
      var foundit = false;
      console.log($scope.candidate.country);
      $http.get('/countries/' + $scope.candidate.country.name).success(function (response) {
        $scope.cities = response.cities;
        angular.forEach($scope.cities, function (city) {
          if (countrycityset)
            city1 = $scope.candidate.location;
          if (city.name == city1)
            //fuck my life
            {
              console.log(city);
              $scope.candidate.location = city;
              foundit = true;
            }
        });
        if (!foundit)
          $scope.candidate.location = $scope.cities[0];
      });
    };
    $scope.openCandidatePictureModal = function () {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/candidate-features/views/cv-partials/picture-partial.html',
        controller: 'CandidatePictureModalCtrl'
      });
      modalInstance.result.then(function (result) {
        $scope.candidate.picture_url = result.picture_url;
      }, function () {
      });
    };
  }
]).controller('CandidatePictureModalCtrl', [
  '$scope',
  '$modalInstance',
  '$upload',
  function ($scope, $modalInstance, $upload) {
    var convert = function convertDataURIToBlob(dataURI, mimetype) {
      var BASE64_MARKER = ';base64,';
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      var bb = new Blob([uInt8Array.buffer], { type: mimetype });
      return bb;
    };
    $scope.upload = function (image) {
      $scope.formData = convert(image.dataURL, image.type);
      $scope.upload = $upload.upload({
        url: '/uploadCandidatePicture',
        method: 'POST',
        headers: { 'Content-Type': 'undefined' },
        data: { myObj: $scope.myModelObj },
        file: $scope.formData
      }).progress(function (evt) {
        console.log('percent: ' + parseInt(100 * evt.loaded / evt.total));
      }).success(function (data, status, headers, config) {
        // file is uploaded successfully
        $scope.response = data;
        console.log(data);
        $modalInstance.close({ picture_url: data });
      });
    };
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        picture_url: $scope.picture_url
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);'use strict';
angular.module('candidate-signup-wizard').controller('CandidateWizardThreeController', [
  '$scope',
  '$http',
  '$state',
  'Authentication',
  'Candidates',
  function ($scope, $http, $state, Authentication, Candidates) {
    // Controller Logic
    // ....
    $scope.candidate = {};
    $scope.questions = [
      { title: 'Write about yourself' },
      { title: 'Describe your strengths' },
      { title: 'Describe your weekness' }
    ];
    $scope.LoadInitialData = function () {
      $scope.authentication = Authentication;
      // Find existing Candidate
      $scope.candidate = Candidates.get({ candidateId: $scope.authentication.user.candidate });
    };
    $scope.SaveAndRedirect = function () {
      $scope.success = $scope.error = null;
      if ($scope.candidate.stage == 'Three')
        $scope.candidate.stage = 'Four';
      var candidate = $scope.candidate;
      if (!candidate.questions)
        candidate.questions = [];
      angular.forEach($scope.questions, function (question) {
        if ($scope.questions && $scope.question != '') {
          candidate.interview_questions.push(question);
        }
      });
      candidate.$update(function () {
        $state.go('candidate-wizard-four');
      }, function (errorResponse) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('candidate-signup-wizard').controller('CandidateWizardTwoController', [
  '$scope',
  '$http',
  '$state',
  'Authentication',
  'Candidates',
  '$location',
  function ($scope, $http, $state, Authentication, Candidates, $location) {
    // Controller Logic
    // ...
    $scope.candidate = {};
    $scope.degree_titles = [
      'High School',
      'Associate Degree',
      'Bachelor Degree',
      'Master Degree',
      'Master of Business Administration (M.B.A.)',
      'Juris Doctor (J.D.)',
      'Doctor of Medicine (M.D.)',
      'Doctor of Philosophy (Ph.D.)',
      'Engineers Degree'
    ];
    $scope.LoadInitialData = function () {
      $scope.authentication = Authentication;
      // Find existing Candidate
      $scope.candidate = Candidates.get({ candidateId: $scope.authentication.user.candidate });
    };
    //**********Education***********
    // Add Education
    $scope.addEducation = function () {
      if ($scope.newEducation.degree_title != '') {
        $scope.candidate.educations.push($scope.newEducation);
        $scope.newEducation = {};
      }
    };
    //Remove Education
    $scope.removeEducation = function (index) {
      $scope.candidate.educations.splice(index, 1);
    };
    //**********Position***********
    // Add Position
    $scope.addPosition = function () {
      if ($scope.newPosition.company != '') {
        $scope.candidate.positions.push($scope.newPosition);
        $scope.newPosition = { name: '' };
      }
    };
    //Remove Position
    $scope.removePosition = function (index) {
      $scope.candidate.positions.splice(index, 1);
    };
    //**********Position***********
    // Add Position
    $scope.addProject = function () {
      if ($scope.newProject.company != '') {
        $scope.candidate.projects.push($scope.newProject);
        $scope.newProject = { name: '' };
      }
    };
    //Remove Position
    $scope.removeProject = function (index) {
      $scope.candidate.projects.splice(index, 1);
    };
    //**********Skills***********
    // Add Skills
    $scope.addSkill = function () {
      if ($scope.newSkill.title != '') {
        $scope.candidate.skills.push($scope.newSkill);
        $scope.newSkill = { name: '' };
      }
    };
    //Remove Skills
    $scope.removeSkill = function (index) {
      $scope.candidate.skills.splice(index, 1);
    };
    $scope.GoBack = function () {
      $location.path('candidate-wizard-one/' + Authentication.user.activeToken);
    };
    $scope.SaveAndRedirect = function () {
      $scope.success = $scope.error = null;
      if ($scope.candidate.stage == 'Two') {
        // $scope.candidate.stage = 'Three';
        $scope.candidate.stage = 'Four';
      }
      var candidate = $scope.candidate;
      candidate.$update(function () {
        $state.go('candidate-wizard-four');  // redirect to page three which contains basic question answers
      }, function (errorResponse) {
        $scope.error = response.message;
      });  // $http.post('/savecandidatewizardonedata', {
           //         candidate: $scope.candidate
           //     }).success(function(response) {
           //         $state.go('candidate-wizard-three');
           //     }).error(function(response) {
           //          $scope.error = response.message;
           //     });
    };
  }
]);'use strict';
// Configuring the Articles module
angular.module('candidates').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Candidates', 'candidates', 'dropdown', '/candidates(/create)?');
    Menus.addSubMenuItem('topbar', 'candidates', 'List Candidates', 'candidates');
    Menus.addSubMenuItem('topbar', 'candidates', 'New Candidate', 'candidates/create');
  }
]);'use strict';
//Setting up route
angular.module('candidates').config([
  '$stateProvider',
  function ($stateProvider) {
    // Candidates state routing
    $stateProvider.state('listCandidates', {
      url: '/candidates',
      templateUrl: 'modules/candidates/views/list-candidates.client.view.html'
    }).state('createCandidate', {
      url: '/candidates/create',
      templateUrl: 'modules/candidates/views/create-candidate.client.view.html'
    }).state('viewCandidate', {
      url: '/candidates/:candidateId',
      templateUrl: 'modules/candidates/views/view-candidate.client.view.html'
    }).state('editCandidate', {
      url: '/candidates/:candidateId/edit',
      templateUrl: 'modules/candidates/views/edit-candidate.client.view.html'
    });
  }
]);'use strict';
// Candidates controller
angular.module('candidates').controller('CandidatesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Candidates',
  function ($scope, $stateParams, $location, Authentication, Candidates) {
    $scope.authentication = Authentication;
    // Create new Candidate
    $scope.create = function () {
      // Create new Candidate object
      var candidate = new Candidates({ name: this.name });
      // Redirect after save
      candidate.$save(function (response) {
        $location.path('candidates/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Candidate
    $scope.remove = function (candidate) {
      if (candidate) {
        candidate.$remove();
        for (var i in $scope.candidates) {
          if ($scope.candidates[i] === candidate) {
            $scope.candidates.splice(i, 1);
          }
        }
      } else {
        $scope.candidate.$remove(function () {
          $location.path('candidates');
        });
      }
    };
    // Update existing Candidate
    $scope.update = function () {
      var candidate = $scope.candidate;
      candidate.$update(function () {
        $location.path('candidates/' + candidate._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Candidates
    $scope.find = function () {
      $scope.candidates = Candidates.query();
    };
    // Find existing Candidate
    $scope.findOne = function () {
      $scope.candidate = Candidates.get({ candidateId: $stateParams.candidateId });
    };
  }
]);'use strict';
//Candidates service used to communicate Candidates REST endpoints
angular.module('candidates').factory('Candidates', [
  '$resource',
  function ($resource) {
    return $resource('candidates/:candidateId', { candidateId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Configuring the Articles module
angular.module('companies').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Companies', 'companies', 'dropdown', '/companies(/create)?');
    Menus.addSubMenuItem('topbar', 'companies', 'List Companies', 'companies');
    Menus.addSubMenuItem('topbar', 'companies', 'New Company', 'companies/create');
  }
]);'use strict';
//Setting up route
angular.module('companies').config([
  '$stateProvider',
  function ($stateProvider) {
    // Companies state routing
    $stateProvider.state('listCompanies', {
      url: '/companies',
      templateUrl: 'modules/companies/views/list-companies.client.view.html'
    }).state('createCompany', {
      url: '/companies/create',
      templateUrl: 'modules/companies/views/create-company.client.view.html'
    }).state('viewCompany', {
      url: '/companies/:companyId',
      templateUrl: 'modules/companies/views/view-company.client.view.html'
    }).state('editCompany', {
      url: '/companies/:companyId/edit',
      templateUrl: 'modules/companies/views/edit-company.client.view.html'
    });
  }
]);'use strict';
// Companies controller
angular.module('companies').controller('CompaniesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Companies',
  function ($scope, $stateParams, $location, Authentication, Companies) {
    $scope.authentication = Authentication;
    // Create new Company
    $scope.create = function () {
      // Create new Company object
      var company = new Companies({ name: this.name });
      // Redirect after save
      company.$save(function (response) {
        $location.path('companies/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Company
    $scope.remove = function (company) {
      if (company) {
        company.$remove();
        for (var i in $scope.companies) {
          if ($scope.companies[i] === company) {
            $scope.companies.splice(i, 1);
          }
        }
      } else {
        $scope.company.$remove(function () {
          $location.path('companies');
        });
      }
    };
    // Update existing Company
    $scope.update = function () {
      var company = $scope.company;
      company.$update(function () {
        $location.path('companies/' + company._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Companies
    $scope.find = function () {
      $scope.companies = Companies.query();
    };
    // Find existing Company
    $scope.findOne = function () {
      $scope.company = Companies.get({ companyId: $stateParams.companyId });
    };
  }
]);'use strict';
//Companies service used to communicate Companies REST endpoints
angular.module('companies').factory('Companies', [
  '$resource',
  function ($resource) {
    return $resource('companies/:companyId', { companyId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('employer-landing', {
      url: '/employer-landing',
      templateUrl: 'modules/core/views/employer-landing.client.view.html'
    }).state('test', {
      url: '/test',
      templateUrl: 'modules/core/views/test.client.view.html'
    }).state('transition', {
      url: '/transition',
      templateUrl: 'modules/core/views/transition.client.view.html',
      controller: 'TransitionController'
    }).state('transition.userType', {
      url: '/userType',
      templateUrl: 'modules/core/views/transition-userType.client.view.html'
    }).state('transition.importCv', {
      url: '/importCv',
      templateUrl: 'modules/core/views/transition-importCv.client.view.html'
    }).state('home', {
      url: '/',
      templateUrl: 'modules/core/views/landing-page/index.html'
    }).state('employerDashboard', {
      url: '/employer',
      templateUrl: 'modules/core/views/employer-home.client.view.html'
    }).state('candidateDashboard', {
      url: '/candidate',
      templateUrl: 'modules/core/views/candidate-home.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  '$state',
  function ($scope, $http, $location, Authentication, $state) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    //be sure to inject $scope and $location
    var changeLocation = function (url, forceReload) {
      $scope = $scope || angular.element(document).scope();
      if (forceReload || $scope.$$phase) {
        window.location = url;
      } else {
        //only use this if you want to replace the history stack
        //$location.path(url).replace();
        //this this if you want to change the URL and add it to the history stack
        $location.path(url);
        $scope.$apply();
      }
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        // $location.path('/');
        changeLocation('/');
      }).error(function (response) {
        console.log(response.message);
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('core').controller('EmployerLandingController', [
  '$scope',
  '$modal',
  function ($scope, $modal) {
    // Controller Logic
    // ...
    // open signin
    $scope.openPostjobModal = function () {
      var modalInstance = $modal.open({
          templateUrl: '/modules/employer-signup-wizard/views/partials/employer-signup-partial.html',
          controller: 'EmpSignupController'
        });
      modalInstance.result.then(function (result) {
        console.log(result);  //    $scope.sendmessage = result.sendmessage;
      }, function () {
      });
    };
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  'Socket',
  '$http',
  '$location',
  '$rootScope',
  'toaster',
  function ($scope, Authentication, Menus, Socket, $http, $location, $rootScope, toaster) {
    console.log('HEADER CLIENT CONTROLLER');
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.threads = [];
    $scope.unreadnotificationslength = 0;
    $scope.user = $scope.authentication.user;
    console.log(Authentication);
    $scope.notifications = [];
    var thread = [];
    $scope.list = ' ';
    $scope.texts = ' ';
    $scope.submit = function () {
      if ($scope.texts) {
        $scope.list = this.texts;
        $rootScope = $scope.list;
        $scope.texts = ' ';
        $location.path('/search-jobs/' + $scope.list);
      }
    };
    $scope.findMeAJob = function () {
      $location.path('/search-jobs/find-me-a-job');
    };
    $scope.notificationRead = function (data) {
      $http.post('/users/readNotification/' + $scope.authentication.user._id, data).success(function (res) {
        if (res.outgoing == 'not-read')
          $scope.unreadnotificationslength--;
        for (var i in $scope.notifications) {
          if ($scope.notifications[i] === data && $scope.notifications.length > 10) {
            $scope.notifications.splice(i, 1);
          }
        }
        $scope.apply();
      }).error(function (data, status, headers, confige) {
      });
    };
    if ($scope.authentication.user) {
      $scope.isCandidate = function () {
        if ($scope.authentication.user.userType === 'candidate')
          return true;
        else
          return false;
      };
      var count = 0;
      var y = $scope.authentication.user.notifications.length;
      for (var x = 0; x < y; x++)
        if (!$scope.authentication.user.notifications[x].isRead) {
          $scope.notifications = $scope.authentication.user.notifications[x];
          count++;
        }
      $scope.unreadnotificationslength = count--;
      if (count < 10 && y >= 10) {
        var x = 0;
        while (count < 10) {
          if ($scope.authentication.user.notifications[x].isRead)
            $scope.notifications = $scope.authentication.user.notifications[x];
          count++;
          x++;
        }
      }
      $scope.notifications = $scope.authentication.user.notifications;
      Socket.on('take_the_test_notification', function (data) {
        console.log('GOT A HIT');
        if (data.userid == $scope.authentication.user._id) {
          var present = false;
          for (var d = 0, len = $scope.notifications.length; d < len; d++) {
            if ($scope.notifications[d]._id == data.notification._id) {
              present = true;
              break;
            }
          }
          if (!present) {
            $scope.notifications.push(data.notification);
            $scope.unreadnotificationslength++;
          }
        }
      });
      Socket.on('watched_thread_to', function (event, args) {
        $scope.threads = [];
        console.log('wactched_thread_to works');
        $http.get('/users/getMessages/' + $scope.authentication.user._id).success(function (res) {
          if (res.length > 1) {
            for (var x = 1; x < res.length; x++)
              $scope.threads.push(res[x]);
          }
        }).error(function (data, status, headers, confige) {
          console.log('Shouldnt have happened');
        });
      });
      console.log($scope.authentication.user._id);
      $http.get('/users/getMessages/' + $scope.authentication.user._id).success(function (res) {
        console.log('GETMESSAGE' + res);
        if (res.length > 1) {
          for (var x = 1; x < res.length; x++) {
            if (res[x].senderName == null)
              res[x].senderName = 'From Recreal Team';
            $scope.threads.push(res[x]);
          }
        }
      }).error(function (data, status, headers, confige) {
        console.log('Shouldnt have happened');
      });
      Socket.on('message_sent_to', function (data) {
        if (data.message.receiver === $scope.authentication.user._id) {
          var alreadyexists = false;
          console.log(data);
          var thread = {
              id: data.message.idc,
              senderName: data.message.sender.displayName,
              created: data.message.messages.created,
              count: 1
            };
          for (var d = 0, h = $scope.threads.length; d < h; d++) {
            if ($scope.threads[d].id == thread.id) {
              $scope.threads[d].count++;
              alreadyexists = true;
              break;
            }
          }
          if (!alreadyexists) {
            $scope.threads.push(thread);
            toaster.pop('success', 'Message received', data.message.sender.displayName);
          }
        }
      });
    }
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  '$modal',
  'Authentication',
  '$state',
  '$rootScope',
  'Employers',
  'Companies',
  'Candidates',
  'Socket',
  '$location',
  function ($scope, $modal, Authentication, $state, $rootScope, Employers, Companies, Candidates, Socket, $location) {
    // This provides Authentication context.
    $scope.OpenCandidateSignUpModal = function () {
      var modalInstance = $modal.open({
          templateUrl: '/modules/candidate-signup-wizard/views/partials/candidate-signup-partial.html',
          controller: 'CandidateSignupController'
        });
      modalInstance.result.then(function (result) {
        console.log(result);  //    $scope.sendmessage = result.sendmessage;
      }, function () {
      });
    };
    $scope.authentication = Authentication;
    var user = $scope.authentication.user;
    console.log(user);
    if (!user)
      $state.go('home');
    else if (user.userType === 'employer') {
      if ($scope.authentication.user.stage == 'Basic')
        $location.path('emp-wizard-one/' + $scope.authentication.user.activeToken);
      if ($scope.authentication.user.stage == 'CompanyLocation')
        $location.path('emp-wizard-two');
      if ($scope.authentication.user.stage == 'NoJobs') {
        $scope.employer = Employers.get({ employerId: $scope.authentication.user.employer }, function (employer) {
          console.log(employer);
          if (employer.jobs.length > 0) {
            // edit first job
            $location.path('emp-job-post-two/' + employer.jobs[0]);
          } else {
            // create new job
            $location.path('emp-job-post-one');
          }
        });
      }
      if ($scope.authentication.user.stage == 'Active') {
        $rootScope.employer = Employers.get({ employerId: $scope.authentication.user.employer }, function (employer) {
          $rootScope.company = Companies.get({ companyId: employer.company });
        });
        $state.go('company-open-jobs');
      }
    } else if (user.userType === 'candidate') {
      $rootScope.candidate = Candidates.get({ candidateId: $scope.authentication.user.candidate }, function (candidate) {
        switch (candidate.stage) {
        case 'One':
          $location.path('candidate-wizard-one/' + $scope.authentication.user.activeToken);
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
      $state.go('transition');
    }
    var monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
    var d1 = [];
    for (var i = 0; i <= 11; i += 1) {
      d1.push([
        i,
        parseInt(Math.floor(Math.random() * (1 + 20 - 10)) + 10)
      ]);
    }
    $('#flot-1ine').length && $.plot($('#flot-1ine'), [{ data: d1 }], {
      series: {
        lines: {
          show: true,
          lineWidth: 1,
          fill: true,
          fillColor: {
            colors: [
              { opacity: 0.3 },
              { opacity: 0.3 }
            ]
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
        tickColor: '#f0f0f0',
        borderWidth: 1,
        color: '#f0f0f0'
      },
      colors: ['#1bb399'],
      xaxis: {},
      yaxis: { ticks: 5 },
      tooltip: true,
      tooltipOpts: {
        content: 'chart: %x.1 is %y.4',
        defaultTheme: false,
        shifts: {
          x: 0,
          y: 20
        }
      }
    });
    var d0 = [
        [
          0,
          0
        ],
        [
          1,
          0
        ],
        [
          2,
          1
        ],
        [
          3,
          2
        ],
        [
          4,
          15
        ],
        [
          5,
          5
        ],
        [
          6,
          12
        ],
        [
          7,
          10
        ],
        [
          8,
          55
        ],
        [
          9,
          13
        ],
        [
          10,
          25
        ],
        [
          11,
          10
        ],
        [
          12,
          12
        ],
        [
          13,
          6
        ],
        [
          14,
          2
        ],
        [
          15,
          0
        ],
        [
          16,
          0
        ]
      ];
    var d00 = [
        [
          0,
          0
        ],
        [
          1,
          0
        ],
        [
          2,
          1
        ],
        [
          3,
          0
        ],
        [
          4,
          1
        ],
        [
          5,
          0
        ],
        [
          6,
          2
        ],
        [
          7,
          0
        ],
        [
          8,
          3
        ],
        [
          9,
          1
        ],
        [
          10,
          0
        ],
        [
          11,
          1
        ],
        [
          12,
          0
        ],
        [
          13,
          2
        ],
        [
          14,
          1
        ],
        [
          15,
          0
        ],
        [
          16,
          0
        ]
      ];
    $('#flot-sp1ine').length && $.plot($('#flot-sp1ine'), [
      d0,
      d00
    ], {
      series: {
        lines: { show: false },
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
        tickColor: '#d9dee9',
        borderWidth: 1,
        color: '#d9dee9'
      },
      colors: [
        '#19b39b',
        '#644688'
      ],
      xaxis: {},
      yaxis: { ticks: 4 },
      tooltip: true,
      tooltipOpts: {
        content: 'chart: %x.1 is %y.4',
        defaultTheme: false,
        shifts: {
          x: 0,
          y: 20
        }
      }
    });
    var d2 = [];
    for (var i = 0; i <= 6; i += 1) {
      d2.push([
        i,
        parseInt(Math.floor(Math.random() * (1 + 30 - 10)) + 10)
      ]);
    }
    var d3 = [];
    for (var i = 0; i <= 6; i += 1) {
      d3.push([
        i,
        parseInt(Math.floor(Math.random() * (1 + 30 - 10)) + 10)
      ]);
    }
    $('#flot-chart').length && $.plot($('#flot-chart'), [
      {
        data: d2,
        label: 'Unique Visits'
      },
      {
        data: d3,
        label: 'Page Views'
      }
    ], {
      series: {
        lines: {
          show: true,
          lineWidth: 1,
          fill: true,
          fillColor: {
            colors: [
              { opacity: 0.3 },
              { opacity: 0.3 }
            ]
          }
        },
        points: { show: true },
        shadowSize: 2
      },
      grid: {
        hoverable: true,
        clickable: true,
        tickColor: '#f0f0f0',
        borderWidth: 0
      },
      colors: [
        '#1bb399',
        '#177bbb'
      ],
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
        content: '\'%s\' of %x.1 is %y.4',
        defaultTheme: false,
        shifts: {
          x: 0,
          y: 20
        }
      }
    });
    // live update
    var data = [], totalPoints = 300;
    function getRandomData() {
      if (data.length > 0)
        data = data.slice(1);
      // Do a random walk
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50, y = prev + Math.random() * 10 - 5;
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
        res.push([
          i,
          data[i]
        ]);
      }
      return res;
    }
    var updateInterval = 30, live;
    $('#flot-live').length && (live = $.plot('#flot-live', [getRandomData()], {
      series: {
        lines: {
          show: true,
          lineWidth: 1,
          fill: true,
          fillColor: {
            colors: [
              { opacity: 0.2 },
              { opacity: 0.1 }
            ]
          }
        },
        shadowSize: 2
      },
      colors: ['#cccccc'],
      yaxis: {
        min: 0,
        max: 100
      },
      xaxis: { show: false },
      grid: {
        tickColor: '#f0f0f0',
        borderWidth: 0
      }
    })) && update();
    function update() {
      live.setData([getRandomData()]);
      // Since the axes don't change, we don't need to call plot.setupGrid()
      live.draw();
      setTimeout(update, updateInterval);
    }
    ;
    // bar
    var d1_1 = [
        [
          10,
          120
        ],
        [
          20,
          70
        ],
        [
          30,
          100
        ],
        [
          40,
          60
        ]
      ];
    var d1_2 = [
        [
          10,
          80
        ],
        [
          20,
          60
        ],
        [
          30,
          30
        ],
        [
          40,
          35
        ]
      ];
    var d1_3 = [
        [
          10,
          80
        ],
        [
          20,
          40
        ],
        [
          30,
          30
        ],
        [
          40,
          20
        ]
      ];
    var data1 = [
        {
          label: 'Product 1',
          data: d1_1,
          bars: {
            show: true,
            fill: true,
            lineWidth: 1,
            order: 1,
            fillColor: {
              colors: [
                { opacity: 0.5 },
                { opacity: 0.9 }
              ]
            }
          },
          color: '#6783b7'
        },
        {
          label: 'Product 2',
          data: d1_2,
          bars: {
            show: true,
            fill: true,
            lineWidth: 1,
            order: 2,
            fillColor: {
              colors: [
                { opacity: 0.5 },
                { opacity: 0.9 }
              ]
            }
          },
          color: '#4fcdb7'
        },
        {
          label: 'Product 3',
          data: d1_3,
          bars: {
            show: true,
            fill: true,
            lineWidth: 1,
            order: 3,
            fillColor: {
              colors: [
                { opacity: 0.5 },
                { opacity: 0.9 }
              ]
            }
          },
          color: '#8dd168'
        }
      ];
    var d2_1 = [
        [
          90,
          10
        ],
        [
          70,
          20
        ]
      ];
    var d2_2 = [
        [
          80,
          10
        ],
        [
          60,
          20
        ]
      ];
    var d2_3 = [
        [
          120,
          10
        ],
        [
          50,
          20
        ]
      ];
    var data2 = [
        {
          label: 'Product 1',
          data: d2_1,
          bars: {
            horizontal: true,
            show: true,
            fill: true,
            lineWidth: 1,
            order: 1,
            fillColor: {
              colors: [
                { opacity: 0.5 },
                { opacity: 1 }
              ]
            }
          },
          color: '#6783b7'
        },
        {
          label: 'Product 2',
          data: d2_2,
          bars: {
            horizontal: true,
            show: true,
            fill: true,
            lineWidth: 1,
            order: 2,
            fillColor: {
              colors: [
                { opacity: 0.5 },
                { opacity: 1 }
              ]
            }
          },
          color: '#4fcdb7'
        },
        {
          label: 'Product 3',
          data: d2_3,
          bars: {
            horizontal: true,
            show: true,
            fill: true,
            lineWidth: 1,
            order: 3,
            fillColor: {
              colors: [
                { opacity: 0.5 },
                { opacity: 1 }
              ]
            }
          },
          color: '#8dd168'
        }
      ];
    $('#flot-bar').length && $.plot($('#flot-bar'), data1, {
      xaxis: {},
      yaxis: {},
      grid: {
        hoverable: true,
        clickable: false,
        borderWidth: 0
      },
      legend: {
        labelBoxBorderColor: 'none',
        position: 'left'
      },
      series: { shadowSize: 1 },
      tooltip: true
    });
    $('#flot-bar-h').length && $.plot($('#flot-bar-h'), data2, {
      xaxis: {},
      yaxis: {},
      grid: {
        hoverable: true,
        clickable: false,
        borderWidth: 0
      },
      legend: {
        labelBoxBorderColor: 'none',
        position: 'left'
      },
      series: { shadowSize: 1 },
      tooltip: true
    });
    // pie
    var da = [
        {
          label: 'iPhone5S',
          data: 40
        },
        {
          label: 'iPad Mini',
          data: 10
        },
        {
          label: 'iPad Mini Retina',
          data: 20
        },
        {
          label: 'iPhone4S',
          data: 12
        },
        {
          label: 'iPad Air',
          data: 18
        }
      ], da1 = [], series = Math.floor(Math.random() * 4) + 3;
    for (var i = 0; i < series; i++) {
      da1[i] = {
        label: 'Series' + (i + 1),
        data: Math.floor(Math.random() * 100) + 1
      };
    }
    $('#flot-pie-donut').length && $.plot($('#flot-pie-donut'), da, {
      series: {
        pie: {
          innerRadius: 0.4,
          show: true,
          stroke: { width: 0 },
          label: {
            show: true,
            threshold: 0.05
          }
        }
      },
      colors: [
        '#65b5c2',
        '#4da7c1',
        '#3993bb',
        '#2e7bad',
        '#23649e'
      ],
      grid: {
        hoverable: true,
        clickable: false
      },
      tooltip: true,
      tooltipOpts: { content: '%s: %p.0%' }
    });
    $('#flot-pie').length && $.plot($('#flot-pie'), da, {
      series: {
        pie: {
          combine: {
            color: '#999',
            threshold: 0.05
          },
          show: true
        }
      },
      colors: [
        '#65b5c2',
        '#4da7c1',
        '#3993bb',
        '#2e7bad',
        '#23649e'
      ],
      legend: { show: false },
      grid: {
        hoverable: true,
        clickable: false
      },
      tooltip: true,
      tooltipOpts: { content: '%s: %p.0%' }
    });
    var cTime = new Date(), month = cTime.getMonth() + 1, year = cTime.getFullYear();
    var theMonths = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
    var theDays = [
        'S',
        'M',
        'T',
        'W',
        'T',
        'F',
        'S'
      ];
    var events = [
        [
          '4/' + month + '/' + year,
          'Meet a friend',
          '#',
          '#177bbb',
          'Contents here'
        ],
        [
          '7/' + month + '/' + year,
          'Kick off meeting!',
          '#',
          '#1bbacc',
          'Have a kick off meeting with .inc company'
        ],
        [
          '17/' + month + '/' + year,
          'Milestone release',
          '#',
          '#fcc633',
          'Contents here'
        ],
        [
          '19/' + month + '/' + year,
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
]);'use strict';
angular.module('core').controller('TestController', [
  '$scope',
  function ($scope) {
  }
]);'use strict';
angular.module('core').controller('TransitionController', [
  '$scope',
  'Authentication',
  '$http',
  '$state',
  '$rootScope',
  'Employers',
  'Companies',
  'Candidates',
  'Socket',
  '$location',
  function ($scope, Authentication, $http, $state, $rootScope, Employers, Companies, Candidates, Socket, $location) {
    $scope.authentication = Authentication;
    $scope.formData = { userType: '' };
    // function to process the form
    $scope.$watch('formData.userType', function () {
      if ($scope.formData.userType == 'Employer') {
        becomeEmployer();
      }
    });
    $scope.$watch('formData.importCV', function () {
      if ($scope.formData.importCV == 'import') {
        // $location.go();
        $location.path('/linkedin-cv');
      } else if ($scope.formData.importCV == 'dontimport') {
        becomeEmployee();
      }
    });
    var becomeEmployer = function () {
      console.log($scope.authentication.user.userType);
      if ($scope.authentication.user.userType == 'transition') {
        $http.put('/users/setUserType/' + $scope.authentication.user._id, { userType: 'employer' }).success(function (user) {
          // Socket.on('applied_on_job', function (data) {
          //       		    console.log(data.candidate.displayName + ' applied on job : ' + data.job.title);
          //       		    if(user.userType === 'employer')
          //       		    	alert(data.candidate.displayName + ' applied on job : ' + data.job.title);
          //       		  });
          $rootScope.employer = Employers.get({ employerId: user.employer }, function (employer) {
            $rootScope.company = Companies.get({ companyId: employer.company });
          });
          $scope.authentication.user.userType = 'employer';
          $location.path('/company-profile');
        });
      }
    };
    var becomeEmployee = function () {
      if ($scope.authentication.user.userType == 'transition') {
        $http.put('/users/setUserType/' + $scope.authentication.user._id, { userType: 'candidate' }).success(function (user) {
          console.log(user);
        });
        $rootScope.candidate = Candidates.get({ candidate: $scope.authentication.user.candidate });
        $scope.authentication.user.userType = 'candidate';
        $state.go('candidate-home');
      }
    };
  }
]);'use strict';
angular.module('core').directive('image', [
  '$q',
  function ($q) {
    var URL = window.URL || window.webkitURL;
    var getResizeArea = function () {
      var resizeAreaId = 'fileupload-resize-area';
      var resizeArea = document.getElementById(resizeAreaId);
      if (!resizeArea) {
        resizeArea = document.createElement('canvas');
        resizeArea.id = resizeAreaId;
        resizeArea.style.visibility = 'hidden';
        document.body.appendChild(resizeArea);
      }
      return resizeArea;
    };
    var resizeImage = function (origImage, options) {
      var maxHeight = options.resizeMaxHeight || 300;
      var maxWidth = options.resizeMaxWidth || 250;
      var quality = options.resizeQuality || 0.7;
      var type = options.resizeType || 'image/jpg';
      var canvas = getResizeArea();
      var height = origImage.height;
      var width = origImage.width;
      // calculate the width and height, constraining the proportions
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round(height *= maxWidth / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round(width *= maxHeight / height);
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      //draw image on canvas
      var ctx = canvas.getContext('2d');
      ctx.drawImage(origImage, 0, 0, width, height);
      // get the data from canvas as 70% jpg (or specified type).
      return canvas.toDataURL(type, quality);
    };
    var createImage = function (url, callback) {
      var image = new Image();
      image.onload = function () {
        callback(image);
      };
      image.src = url;
    };
    var fileToDataURL = function (file) {
      var deferred = $q.defer();
      var reader = new FileReader();
      reader.onload = function (e) {
        deferred.resolve(e.target.result);
      };
      reader.readAsDataURL(file);
      return deferred.promise;
    };
    return {
      restrict: 'A',
      scope: {
        image: '=',
        resizeMaxHeight: '@?',
        resizeMaxWidth: '@?',
        resizeQuality: '@?',
        resizeType: '@?'
      },
      link: function postLink(scope, element, attrs, ctrl) {
        var doResizing = function (imageResult, callback) {
          createImage(imageResult.url, function (image) {
            var dataURL = resizeImage(image, scope);
            imageResult.resized = {
              dataURL: dataURL,
              type: dataURL.match(/:(.+\/.+);/)[1]
            };
            callback(imageResult);
          });
        };
        var applyScope = function (imageResult) {
          scope.$apply(function () {
            //console.log(imageResult);
            if (attrs.multiple)
              scope.image.push(imageResult);
            else
              scope.image = imageResult;
          });
        };
        element.bind('change', function (evt) {
          //when multiple always return an array of images
          if (attrs.multiple)
            scope.image = [];
          var files = evt.target.files;
          for (var i = 0; i < files.length; i++) {
            //create a result object for each file in files
            var imageResult = {
                file: files[i],
                url: URL.createObjectURL(files[i])
              };
            fileToDataURL(files[i]).then(function (dataURL) {
              imageResult.dataURL = dataURL;
            });
            if (scope.resizeMaxHeight || scope.resizeMaxWidth) {
              //resize image
              doResizing(imageResult, function (imageResult) {
                applyScope(imageResult);
              });
            } else {
              //no resizing
              applyScope(imageResult);
            }
          }
        });
      }
    };
  }
]);'use strict';
angular.module('core').directive('triggerJobList', [
  '$compile',
  '$rootScope',
  '$http',
  'Jobs',
  'Employers',
  'Companies',
  function ($compile, $rootScope, $http, Jobs, Employers, Companies) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        $rootScope.$on('inEmployerJobupdateHeader', function (args) {
          scope.jobs = [];
          scope.employer = Employers.get({ employerId: scope.user.employer }, function (employer) {
            scope.company = Companies.get({ companyId: employer.company }, function (company) {
              var gg = company.jobs;
              $http.put('jobs/jobsByIDs/' + scope.user._id, gg).success(function (res) {
                scope.jobslist = [];
                for (var d, g = res.length; d < g; d++) {
                  scope.jobslist.push({
                    name: res[d].title,
                    id: res[d]._id
                  });
                }
                scope.myColor = scope.jobslist[1];
                if (args.trigger)
                  var html = '<select ng-model="myColor" ng-options="joblist.name for joblist in jobslist">' + '</select><br>';
                else
                  var html = '';
                var e = $compile(html)(scope);
                element.replaceWith(e);
              });
            });
          });
        });
      }
    };
  }
]);'use strict';
angular.module('core').filter('truncate', [function () {
    return function (text, length, end) {
      if (isNaN(length))
        length = 10;
      if (end === undefined)
        end = '...';
      if (text.length <= length || text.length - end.length <= length) {
        return text;
      } else {
        return String(text).substring(0, length - end.length) + end;
      }
    };
  }]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['user'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic || this.menus[menuId].isPublic,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic || this.menus[menuId].isPublic,
            roles: roles || this.defaultRoles,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
angular.module('core').factory('Socket', [
  '$rootScope',
  'Authentication',
  'geolocation',
  function ($rootScope, Authentication, geolocation) {
    //console.log(Authentication.user);
    if (Authentication.user && !socket) {
      console.log('SOCKET CLIENT FACTORY');
      $rootScope.coords = {
        lat: 0,
        longi: 0
      };
      geolocation.getLocation().then(function (data) {
        $rootScope.coords = {
          lat: data.coords.latitude,
          longi: data.coords.longitude
        };
      });
      var socket = io.connect('http://localhost:3000');
      socket.emit('user_data', Authentication.user);
    }
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  }
]);'use strict';
//Setting up route
angular.module('employer-company').config([
  '$stateProvider',
  function ($stateProvider) {
    // Employer company state routing
    $stateProvider.state('employer-profile-view', {
      url: '/employer-profile-view',
      templateUrl: 'modules/employer-company/views/employer-profile-view.client.view.html'
    }).state('company-profile-view', {
      url: '/company-profile-view',
      templateUrl: 'modules/employer-company/views/company-profile-view.client.view.html'
    }).state('employer-profile', {
      url: '/employer-profile',
      templateUrl: 'modules/employer-company/views/employer-profile.client.view.html'
    }).state('company-profile', {
      url: '/company-profile',
      templateUrl: 'modules/employer-company/views/company-profile.client.view.html'
    });  // state('logo-partial', {
         // 	url: '/logo-partial',
         // 	templateUrl: 'modules/employer-company/views/logo/logo-partial.html'
         // });
  }
]);'use strict';
angular.module('employer-company').controller('CompanyProfileViewController', [
  '$scope',
  'Industries',
  'Authentication',
  'Employers',
  'Companies',
  '$location',
  function ($scope, Industries, Authentication, Employers, Companies, $location) {
    $scope.user = Authentication.user;
    $scope.industries = Industries.getIndustries();
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    $scope.findOne = function () {
      $scope.employer = Employers.get({ employerId: $scope.user.employer }, function (employer) {
        $scope.company = Companies.get({ companyId: employer.company });
      });
    };
  }
]);'use strict';
angular.module('employer-company').controller('CompanyProfileController', [
  '$scope',
  '$http',
  'Industries',
  'Authentication',
  'Employers',
  'Companies',
  '$location',
  '$modal',
  function ($scope, $http, Industries, Authentication, Employers, Companies, $location, $modal) {
    $scope.user = Authentication.user;
    $scope.industries = Industries.getIndustries();
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    // Find existing Employer
    // $scope.findOne = function() {
    // 	$scope.employer = Employers.get({ 
    // 		employerId: $scope.user.employer
    // 	}, function(employer){
    // 		$scope.company = Companies.get({
    // 			companyId: employer.company
    // 		});
    // 	});
    // };
    $scope.findOne = function () {
      $scope.employer = Employers.get({ employerId: $scope.user.employer }, function (employer) {
        $scope.company = Companies.get({ companyId: employer.company });
      });
    };
    //Speciality
    $scope.addSpeciality = function () {
      $scope.company.specialties.push({ name: '' });
    };
    $scope.removeSpeciality = function (index) {
      $scope.company.specialties.splice(index, 1);
    };
    // Update existing Company
    $scope.update = function () {
      var company = $scope.company;
      company.$update(function () {
        $location.path('company-profile-view');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.openPictureModal = function () {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/employer-company/views/logo/logo-partial.html',
        controller: 'CompPictureModalCtrl'
      });
      modalInstance.result.then(function (result) {
        $scope.company.logo_url = result.logo_url;
      }, function () {
      });
    };
  }
]).controller('CompPictureModalCtrl', [
  '$scope',
  '$modalInstance',
  '$upload',
  function ($scope, $modalInstance, $upload) {
    var convert = function convertDataURIToBlob(dataURI, mimetype) {
      var BASE64_MARKER = ';base64,';
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      var bb = new Blob([uInt8Array.buffer], { type: mimetype });
      return bb;
    };
    $scope.upload = function (image) {
      $scope.formData = convert(image.dataURL, image.type);
      $scope.upload = $upload.upload({
        url: '/uploadCompPicture',
        method: 'POST',
        headers: { 'Content-Type': 'undefined' },
        data: { myObj: $scope.myModelObj },
        file: $scope.formData
      }).progress(function (evt) {
        console.log('percent: ' + parseInt(100 * evt.loaded / evt.total));
      }).success(function (data, status, headers, config) {
        // file is uploaded successfully
        $scope.response = data;
        console.log(data);
        $modalInstance.close({ logo_url: data });
      });
    };
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        logo_url: $scope.logo_url
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);'use strict';
angular.module('employer-company').controller('EmployerProfileViewController', [
  '$scope',
  'Countries',
  'Authentication',
  'Employers',
  '$location',
  function ($scope, Countries, Authentication, Employers, $location) {
    $scope.user = Authentication.user;
    $scope.countries = Countries.getCountries();
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    // Find existing Employer
    $scope.findOne = function () {
      $scope.employer = Employers.get({ employerId: $scope.user.employer });
    };
  }
]);'use strict';
angular.module('employer-company').controller('EmployerProfileController', [
  '$scope',
  '$http',
  'Countries',
  'Authentication',
  'Employers',
  '$location',
  '$modal',
  function ($scope, $http, Countries, Authentication, Employers, $location, $modal) {
    $scope.user = Authentication.user;
    $scope.countries = Countries.getCountries();
    $scope.isEditing = false;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    // Find existing Employer
    $scope.findOne = function () {
      $scope.employer = Employers.get({ employerId: $scope.user.employer });
    };
    // 	$scope.myCtrl = function() {
    // 			var divisionOptions = ["Accounts", "Sales", "Business", "Marketing"];
    // 			var departmentOptions = [["Finance"],
    //                ["Admin"],
    //                ["Software"],
    //                ["HR"]];
    // // 
    // 			    $scope.division = divisionOptions;
    // 			    $scope.department = []; // we'll get these later
    // 			    $scope.getDepartment = function(){
    // 			        // just some silly stuff to get the key of what was selected since we are using simple arrays.
    // 			        var key = $scope.division.indexOf($scope.division);
    // 			        // Here you could actually go out and fetch the options for a server.
    // 			        var myNewOptions = departmentOptions[key];
    // 			        // Now set the options.
    // 			        // If you got the results from a server, this would go in the callback
    // 			        $scope.department = myNewOptions;
    // 			    };
    // Update existing Employer
    $scope.update = function () {
      var employer = $scope.employer;
      employer.$update(function () {
        $location.path('employer-profile-view');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.openPictureModal = function () {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/employer-company/views/picture-partial.html',
        controller: 'EmpPictureModalCtrl'
      });
      modalInstance.result.then(function (result) {
        $scope.this.user.picture_url = result.picture_url;
      }, function () {
      });
    };
  }
]).controller('EmpPictureModalCtrl', [
  '$scope',
  '$modalInstance',
  '$upload',
  function ($scope, $modalInstance, $upload) {
    var convert = function convertDataURIToBlob(dataURI, mimetype) {
      var BASE64_MARKER = ';base64,';
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      var bb = new Blob([uInt8Array.buffer], { type: mimetype });
      return bb;
    };
    $scope.upload = function (image) {
      $scope.formData = convert(image.dataURL, image.type);
      $scope.upload = $upload.upload({
        url: '/uploadEmpPicture',
        method: 'POST',
        headers: { 'Content-Type': 'undefined' },
        data: { myObj: $scope.myModelObj },
        file: $scope.formData
      }).progress(function (evt) {
        console.log('percent: ' + parseInt(100 * evt.loaded / evt.total));
      }).success(function (data, status, headers, config) {
        // file is uploaded successfully
        $scope.response = data;
        console.log(data);
        $modalInstance.close({ picture_url: data });
      });
    };
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        picture_url: $scope.picture_url
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);'use strict';
//Setting up route
angular.module('employer-signup-wizard').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    // Employer signup wizard state routing
    $stateProvider.state('signup-email-activation', {
      url: '/signup-email-activation',
      templateUrl: 'modules/employer-signup-wizard/views/signup-email-activation.client.view.html'
    }).state('emp-wizard-two', {
      url: '/emp-wizard-two',
      templateUrl: 'modules/employer-signup-wizard/views/emp-wizard-two.client.view.html'
    }).state('emp-wizard-one', {
      url: '/emp-wizard-one/:tokenId',
      templateUrl: 'modules/employer-signup-wizard/views/emp-wizard-one.client.view.html'
    });
  }
]);'use strict';
angular.module('employer-signup-wizard').controller('EmpSignupController', [
  '$modalInstance',
  '$scope',
  '$modal',
  '$location',
  '$http',
  function ($modalInstance, $scope, $modal, $location, $http) {
    // Controller Logic
    // ...
    $scope.credentials = {};
    $scope.signupemployer = function () {
      $scope.credentials.userType = 'employer';
      $http.post('/empsignupwizard/signupemployer', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        if (response.status) {
          $location.path('/signup-email-activation');
          $modalInstance.dismiss();
        }  //And redirect to the index page
           // $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('employer-signup-wizard').controller('EmpWizardOneController', [
  '$scope',
  '$http',
  'Industries',
  'Countries',
  '$rootScope',
  'geolocation',
  '$stateParams',
  '$state',
  'Authentication',
  '$modal',
  function ($scope, $http, Industries, Countries, $rootScope, geolocation, $stateParams, $state, Authentication, $modal) {
    // Controller Logic
    // ...
    var city1 = '';
    var country1 = '';
    var gotcompanycountryundefined = false;
    $scope.gotCompanyFromDB = false;
    $scope.user = Authentication.user;
    var lat = 0, lng = 0;
    $rootScope.coords = {};
    $scope.company = {
      website: '',
      coordinates: {
        longitude: 0,
        latitude: 0
      }
    };
    $scope.employer = {};
    $scope.company.specialities = [];
    $rootScope.coords = {};
    $scope.newSpeciality = { name: '' };
    $scope.employer.role = 'Admin';
    $scope.user = {};
    //Load initial data
    $scope.LoadInitialData = function () {
      if ($stateParams.tokenId) {
        $http.post('/validateTokenEmployer', { token: $stateParams.tokenId }).success(function (response) {
          $scope.user = response.user;
          console.log(response.user + ' ' + response.company);
          if (response.company != null) {
            $scope.company = response.company;
            $scope.gotCompanyFromDB = true;
          }
          console.log(response);
          if ($scope.user.user == 'nothing') {
            $state.go('home');
          } else {
            $scope.authentication = Authentication;
            $scope.authentication.user = response.user;
            if (!$scope.gotCompanyFromDB)
              $scope.company.specialities.push({ name: 'Product Development' });
            $scope.industries = Industries.getIndustries();
            Countries.getCountries(function (countries) {
              $scope.countries = countries;
              // $scope.countries.splice(0, 1);
              if (!$scope.gotCompanyFromDB) {
                $scope.company.country = $scope.countries[1];
                $scope.getCountryCities();
              } else {
                if ($scope.company.country !== undefined) {
                  gotcompanycountryundefined = true;
                  angular.forEach($scope.countries, function (country) {
                    country1 = $scope.company.country;
                    if (country1 == country.name) {
                      $scope.company.country = country;
                      $scope.getCountryCities();
                    }
                  });
                } else {
                  $scope.company.country = $scope.countries[1];
                  $scope.getCountryCities();
                  InitlocationData();
                }
              }
            });
            $scope.company.industry = $scope.industries[0].name;
            $scope.company.company_size = '1 - 10';
            $scope.company.company_type = 'Sole Proprietorship';
            if (!$scope.gotCompanyFromDB)
              InitlocationData();
          }
        }).error(function (response) {
          $scope.error = response.message;
        });
        console.log($stateParams.tokenId);
      } else {
        $state.go('home');
      }
    };
    var InitlocationData = function () {
      var geocoder = new google.maps.Geocoder();
      geolocation.getLocation().then(function (data) {
        lat = parseFloat(data.coords.latitude);
        lng = parseFloat(data.coords.longitude);
        $scope.company.coordinates.longitude = lng;
        $scope.company.coordinates.latitude = lat;
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              var citycountry = results[1].formatted_address;
              var res = citycountry.split(',');
              country1 = res[res.length - 1];
              city1 = res[res.length - 2];
              city1 = city1.trim();
              country1 = country1.trim();
              console.log(country1 + ' ' + city1);
              angular.forEach($scope.countries, function (country) {
                if ($scope.gotCompanyFromDB && gotcompanycountryundefined)
                  country1 = $scope.company.country;
                if (country1 == country.name) {
                  $scope.company.country = country;
                  $scope.getCountryCities();
                }
              });
            } else {
              $scope.company.country = $scope.countries[0];
              $scope.getCountryCities();
            }
          } else {
            $scope.company.country = $scope.countries[0];
            $scope.getCountryCities();
          }
        });
      });
    };
    $scope.getCountryCities = function () {
      var foundit = false;
      $http.get('/countries/' + $scope.company.country.name).success(function (response) {
        $scope.cities = response.cities;
        angular.forEach($scope.cities, function (city) {
          console.log(city.name + ' ' + city1);
          if ($scope.gotCompanyFromDB && gotcompanycountryundefined)
            city1 = $scope.company.city;
          if (city.name == city1)
            //fuck my life
            {
              console.log(city);
              $scope.company.city = city;
              foundit = true;
            }
        });
        if (!foundit)
          $scope.company.city = $scope.cities[0];
      });
    };
    $scope.SaveAndRedirect = function () {
      $scope.success = $scope.error = null;
      $http.post('/SaveEmpSignUpWizardOneData', {
        user: $scope.user,
        company: $scope.company,
        employer: $scope.employer
      }).success(function (response) {
        $state.go('emp-wizard-two');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    //Add specialities
    $scope.addSpeciality = function () {
      if ($scope.newSpeciality.name != '') {
        $scope.company.specialities.push($scope.newSpeciality);
        $scope.newSpeciality = { name: '' };
      }
    };
    //Remove Speciality
    $scope.removeSpeciality = function (index) {
      $scope.company.specialities.splice(index, 1);
    };
    $scope.openEmpPictureModal = function () {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/employer-company/views/picture-partial.html',
        controller: 'EmpPictureModalCtrl'
      });
      modalInstance.result.then(function (result) {
        $scope.user.picture_url = result.picture_url;
      }, function () {
      });
    };
    $scope.openCompPictureModal = function () {
      var modalInstance;
      modalInstance = $modal.open({
        templateUrl: '/modules/employer-company/views/logo/logo-partial.html',
        controller: 'CompPictureModalCtrl'
      });
      modalInstance.result.then(function (result) {
        $scope.company.logo_url = result.logo_url;
      }, function () {
      });
    };
  }
]).controller('EmpPictureModalCtrl', [
  '$scope',
  '$modalInstance',
  '$upload',
  function ($scope, $modalInstance, $upload) {
    var convert = function convertDataURIToBlob(dataURI, mimetype) {
      var BASE64_MARKER = ';base64,';
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      var bb = new Blob([uInt8Array.buffer], { type: mimetype });
      return bb;
    };
    $scope.upload = function (image) {
      $scope.formData = convert(image.dataURL, image.type);
      $scope.upload = $upload.upload({
        url: '/uploadEmpPicture',
        method: 'POST',
        headers: { 'Content-Type': 'undefined' },
        data: { myObj: $scope.myModelObj },
        file: $scope.formData
      }).progress(function (evt) {
        console.log('percent: ' + parseInt(100 * evt.loaded / evt.total));
      }).success(function (data, status, headers, config) {
        // file is uploaded successfully
        $scope.response = data;
        console.log(data);
        $modalInstance.close({ picture_url: data });
      });
    };
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        picture_url: $scope.picture_url
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]).controller('CompPictureModalCtrl', [
  '$scope',
  '$modalInstance',
  '$upload',
  function ($scope, $modalInstance, $upload) {
    var convert = function convertDataURIToBlob(dataURI, mimetype) {
      var BASE64_MARKER = ';base64,';
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      var bb = new Blob([uInt8Array.buffer], { type: mimetype });
      return bb;
    };
    $scope.upload = function (image) {
      console.log(image);
      $scope.formData = convert(image.dataURL, image.type);
      $scope.upload = $upload.upload({
        url: '/uploadCompPicture',
        method: 'POST',
        headers: { 'Content-Type': 'undefined' },
        data: { myObj: $scope.myModelObj },
        file: $scope.formData
      }).progress(function (evt) {
        console.log('percent: ' + parseInt(100 * evt.loaded / evt.total));
      }).success(function (data, status, headers, config) {
        // file is uploaded successfully
        $scope.response = data;
        console.log(data);
        $modalInstance.close({ logo_url: data });
      });
    };
    $scope.ok = function (action) {
      $modalInstance.close({
        action: action,
        logo_url: $scope.logo_url
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);'use strict';
angular.module('employer-signup-wizard').controller('EmpWizardTwoController', [
  '$scope',
  'Users',
  'Employers',
  '$interval',
  'Authentication',
  '$state',
  '$http',
  '$location',
  '$rootScope',
  'locationVarification',
  function ($scope, Users, Employers, $interval, Authentication, $state, $http, $location, $rootScope, locationVarification) {
    $scope.authentication = Authentication;
    var cityFromRootScope, countryFromRootScope;
    var useGeoLocationInformation = false;
    if (!$scope.authentication.user)
      $state.go('home');
    $scope.latitude = 0;
    $scope.longitude = 0;
    $scope.myValue = true;
    var marker;
    var geocoder = new google.maps.Geocoder();
    $scope.SaveAndRedirect = function () {
      console.log(marker.position.D);
      $http.post('/savelatlong', {
        user: $scope.authentication.user,
        latitude: marker.position.k,
        longitude: marker.position.D
      }).success(function (response) {
        console.log(response);
        $scope.employer = Employers.get({ employerId: response }, function (employer) {
          console.log(employer);
          if (employer.jobs.length > 0) {
            // edit first job
            $location.path('emp-job-post-one-edit/' + employer.jobs[0]);
          } else {
            // create new job
            $location.path('emp-job-post-one');
          }
        });
      });
    };
    $scope.SkipAndRedirect = function () {
      var user = new Users($scope.authentication.user);
      if (user.stage == 'CompanyLocation') {
        user.stage = 'NoJobs';
      }
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
        $location.path('emp-job-post-one/');
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
    $scope.Back = function () {
      $location.path('emp-wizard-one/' + $scope.authentication.user.activeToken);
    };
    $scope.LoadInitialData = function () {
      $http.post('/getCountryCity', { user: $scope.authentication.user }).success(function (response) {
        var promise = locationVarification.validateLocation(response.city, response.country, response.latitude, response.longitude).then(function (responseFromLocationFactory) {
            if (responseFromLocationFactory[0] == 'true') {
              geocoder.geocode({ 'address': response.city + ',' + response.country }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  var map = $scope.map;
                  map.center = results[0].geometry.location;
                  $scope.map.setCenter(results[0].geometry.location);
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng(response.latitude, response.longitude),
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    title: 'Select your company Location!'
                  });
                } else {
                  alert('Geocode was not successful for the following reason: ' + status);
                }
              });
            } else {
              geocoder.geocode({ 'address': response.city + ',' + response.country }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  console.log(results[0].geometry.location.lat());
                  $scope.latitude = results[0].geometry.location.lat();
                  $scope.longitude = results[0].geometry.location.lng();
                  var map = $scope.map;
                  map.center = results[0].geometry.location;
                  $scope.map.setCenter(results[0].geometry.location);
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng($scope.latitude, $scope.longitude),
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    title: 'Select your company Location!'
                  });
                } else {
                  alert('Geocode was not successful for the following reason: ' + status);
                }
              });
            }
          });
      });
    };
  }
]);'use strict';
angular.module('employer-signup-wizard').controller('SignupEmailActivationController', [
  '$scope',
  function ($scope) {
  }
]);angular.module('employer-signup-wizard').factory('locationVarification', [
  '$rootScope',
  'geolocation',
  '$q',
  function ($rootScope, geolocation, $q) {
    return {
      validateLocation: function (city, country, lat, lng) {
        var deferred = $q.defer();
        if (lat != 0) {
          var geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng(lat, lng);
          geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                var citycountry = results[1].formatted_address;
                var res = citycountry.split(',');
                countryFromDB = res[res.length - 1].trim();
                cityFromDB = res[res.length - 2].trim();
                console.log(cityFromDB + ' ' + countryFromDB);
                if (countryFromDB == country && cityFromDB == city)
                  deferred.resolve(['true']);
                else
                  deferred.resolve(['false']);
              }
            }
          });
          return deferred.promise;
        }
      }
    };
  }
]);'use strict';
// Configuring the Articles module
angular.module('employers').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Employers', 'employers', 'dropdown', '/employers(/create)?');
    Menus.addSubMenuItem('topbar', 'employers', 'List Employers', 'employers');
    Menus.addSubMenuItem('topbar', 'employers', 'New Employer', 'employers/create');
  }
]);'use strict';
//Setting up route
angular.module('employers').config([
  '$stateProvider',
  function ($stateProvider) {
    // Employers state routing
    $stateProvider.state('listEmployers', {
      url: '/employers',
      templateUrl: 'modules/employers/views/list-employers.client.view.html'
    }).state('createEmployer', {
      url: '/employers/create',
      templateUrl: 'modules/employers/views/create-employer.client.view.html'
    }).state('viewEmployer', {
      url: '/employers/:employerId',
      templateUrl: 'modules/employers/views/view-employer.client.view.html'
    }).state('editEmployer', {
      url: '/employers/:employerId/edit',
      templateUrl: 'modules/employers/views/edit-employer.client.view.html'
    });
  }
]);'use strict';
// Employers controller
angular.module('employers').controller('EmployersController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Employers',
  function ($scope, $stateParams, $location, Authentication, Employers) {
    $scope.authentication = Authentication;
    // Create new Employer
    $scope.create = function () {
      // Create new Employer object
      var employer = new Employers({ name: this.name });
      // Redirect after save
      employer.$save(function (response) {
        $location.path('employers/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Employer
    $scope.remove = function (employer) {
      if (employer) {
        employer.$remove();
        for (var i in $scope.employers) {
          if ($scope.employers[i] === employer) {
            $scope.employers.splice(i, 1);
          }
        }
      } else {
        $scope.employer.$remove(function () {
          $location.path('employers');
        });
      }
    };
    // Update existing Employer
    $scope.update = function () {
      var employer = $scope.employer;
      employer.$update(function () {
        $location.path('employers/' + employer._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Employers
    $scope.find = function () {
      $scope.employers = Employers.query();
    };
    // Find existing Employer
    $scope.findOne = function () {
      $scope.employer = Employers.get({ employerId: $stateParams.employerId });
    };
  }
]);'use strict';
//Employers service used to communicate Employers REST endpoints
angular.module('employers').factory('Employers', [
  '$resource',
  function ($resource) {
    return $resource('employers/:employerId', { employerId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
//Setting up route
angular.module('empoyer-jobs').config([
  '$stateProvider',
  function ($stateProvider) {
    // Empoyer jobs state routing   /jobs/:jobId
    $stateProvider.state('emp-job-post-three', {
      url: '/emp-job-post-three',
      templateUrl: 'modules/empoyer-jobs/views/emp-job-post-three.client.view.html'
    }).state('emp-job-post-two', {
      url: '/emp-job-post-two/:jobId',
      templateUrl: 'modules/empoyer-jobs/views/emp-job-post-two.client.view.html'
    }).state('emp-job-post-one', {
      url: '/emp-job-post-one',
      templateUrl: 'modules/empoyer-jobs/views/emp-job-post-one.client.view.html'
    }).state('emp-job-post-one-edit', {
      url: '/emp-job-post-one-edit/:jobId',
      templateUrl: 'modules/empoyer-jobs/views/emp-job-post-one.edit.client.view.html'
    }).state('employer-job-candidates', {
      url: '/employer-job-candidates/:jobId',
      templateUrl: 'modules/empoyer-jobs/views/employer-job-candidates.client.view.html'
    }).state('company-open-jobs', {
      url: '/company-open-jobs',
      templateUrl: 'modules/empoyer-jobs/views/company-open-jobs.client.view.html'
    }).state('post-job', {
      url: '/post-job',
      templateUrl: 'modules/empoyer-jobs/views/post-job.client.view.html'
    });
  }
]);'use strict';
angular.module('empoyer-jobs').controller('CompanyOpenJobsController', [
  '$scope',
  'Authentication',
  'Jobs',
  'Employers',
  'Companies',
  '$location',
  'Socket',
  function ($scope, Authentication, Jobs, Employers, Companies, $location, Socket) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    //		$scope.employer = $rootScope.employer;
    //		$scope.company = $rootScope.company;
    $scope.jobs = [];
    $scope.employer = Employers.get({ employerId: $scope.user.employer }, function (employer) {
      $scope.company = Companies.get({ companyId: employer.company }, function (company) {
        angular.forEach(company.jobs, function (job, key) {
          Jobs.get({ jobId: job }, function (job) {
            $scope.jobs.push(job);
          });
        });
      });
    });
    Socket.on('applied_on_job', function (data) {
      for (var d = 0, h = $scope.jobs.length; d < h; d++) {
        if ($scope.jobs[d]._id == data.job._id) {
          $scope.jobs[d] = data.job;
          break;
        }
      }
    });
  }  // 	$scope.employer = Employers.get({
     //                employerId: $scope.user.employer
     //            }, function(employer){
     // 			$scope.company = Companies.get({
     // 				companyId: employer.company
     // 			}, function(company){
     // 				angular.forEach(company.jobs, function(job, key){
     // 					Jobs.get({
     // 						jobId: job
     // 					}, function(job){
     // 						$scope.jobs.push(job);
     // 					});
     // 				});
     // 			});
     // 		});
     // }
]);'use strict';
angular.module('empoyer-jobs').controller('EmpJobPostOneController', [
  '$scope',
  '$http',
  '$location',
  'Jobs',
  '$stateParams',
  'Authentication',
  '$state',
  'Countries',
  'locationVarification',
  function ($scope, $http, $location, Jobs, $stateParams, Authentication, $state, Countries, locationVarification) {
    // Controller Logic
    // ...
    // $scope.industries = Industries.getIndustries();
    $scope.country = {};
    $scope.city = {};
    $scope.user = Authentication.user;
    if (!$scope.user)
      $state.go('home');
    $scope.job = {};
    $scope.job.industry = {};
    $scope.job.coordinates = {};
    //checks whether if this is going to create or update a job 
    $scope.initialize = function () {
      if (!$stateParams.jobId) {
        // new job
        LoadDefaultData();
      } else {
        //update old job
        findOne();
      }
    };
    var LoadDefaultData = function () {
      $http.post('/getCompanyByUserId', { id: $scope.user._id }).success(function (response) {
        console.log(response);
        $scope.job.employee_type = 'Contract';
        $scope.job.employee_status = 'Full Time';
        $scope.job.shift = 'Morning';
        $scope.job.no_of_positions = '1';
        $scope.job.travel_required = 'No Travelling';
        $scope.job.visa_status = 'Citizen';
        $scope.job.salary_range = 'Less than $1000';
        $scope.job.country = response.country;
        $scope.job.city = response.city;
        $scope.job.coordinates.latitude = response.latitude;
        $scope.job.coordinates.longitude = response.longitude;
        getCountry();
        getIndustry();
      });
    };
    $scope.getCountryCities = function () {
      var foundit = false;
      var city1;
      $http.get('/countries/' + $scope.country.name).success(function (response) {
        $scope.cities = response.cities;
        angular.forEach($scope.cities, function (city) {
          city1 = $scope.job.city;
          if (city.name == city1)
            //fuck my life
            {
              console.log(city);
              $scope.city = city;
              foundit = true;
            }
        });
        if (!foundit)
          $scope.city = $scope.cities[0];
      });
    };
    var getCountry = function () {
      var foundit = false;
      var country1;
      Countries.getCountries(function (countries) {
        $scope.countries = countries;
        angular.forEach($scope.countries, function (cunt) {
          country1 = $scope.job.country;
          console.log(country1 + 'DSF');
          if (country1 == cunt.name) {
            foundit = true;
            $scope.country = cunt;
            $scope.getCountryCities();
          }
        });
        if (!foundit) {
          $scope.country = $scope.countries[0];
          $scope.getCountryCities();
        }
      });
    };
    var getIndustry = function () {
      $http.get('/industries').success(function (response) {
        $scope.industries = response;
        $scope.job.industry = $scope.industries[0];
        $scope.getIndustryJobRoles();
      });
    };
    $scope.getIndustryJobRoles = function () {
      $http.get('/industries/' + $scope.job.industry.name).success(function (response) {
        $scope.job_roles = response.job_roles;
        $scope.job.job_role = $scope.job_roles[0];
        $scope.job.title = $scope.job.job_role.name;
        $scope.job.responsibilities = $scope.job.job_role.responsibilities;
        $scope.job.educations = $scope.job.job_role.educations;
        $scope.job.qualifications = $scope.job.job_role.qualifications;
        $scope.job.skills = $scope.job.job_role.skills;
      });
    };
    $scope.bindJobRoles = function (jobRole) {
      $scope.job.title = jobRole.name;
      $scope.job.responsibilities = jobRole.responsibilities;
      $scope.job.educations = jobRole.educations;
      $scope.job.qualifications = jobRole.qualifications;
      $scope.job.skills = jobRole.skills;
    };
    // Find existing Job
    var findOne = function () {
      $http.get('/industries').success(function (response) {
        $scope.industries = response;
        //get the job
        Jobs.get({ jobId: $stateParams.jobId }, function (job) {
          $scope.job = job;
          console.log($scope.job);
          getCountry();
          $scope.job.due_date = new Date($scope.job.due_date);
          //get industry job_roles
          $http.get('/industries/' + $scope.job.industry).success(function (response) {
            $scope.job_roles = response.job_roles;
            //set industry
            angular.forEach($scope.industries, function (industry) {
              if (industry.name === $scope.job.industry) {
                $scope.job.industry = industry;
              }
            });
            // set job_role
            angular.forEach($scope.job_roles, function (job_role) {
              if (job_role._id == $scope.job.job_role) {
                // never executes. even when the statement is true
                $scope.job.job_role = job_role;
              }
            });
          });
        });
      });
    };
    $scope.SaveAndRedirect = function () {
      $scope.success = $scope.error = null;
      $scope.job.country = $scope.country.name;
      $scope.job.city = $scope.city.name;
      $scope.job.industry = $scope.job.industry.name;
      $scope.job.job_role = $scope.job.job_role._id;
      if ($scope.job.stage == 'JobOne') {
        $scope.job.stage = 'JobTwo';
      }
      if (!$stateParams.jobId) {
        // new job
        $http.post('/SaveEmpJobPostOneData', $scope.job).success(function (response) {
          $location.path('emp-job-post-two/' + response._id);
        }).error(function (response) {
          $scope.error = response.message;
        });
      } else {
        //update old job
        var job = $scope.job;
        job.company = job.company._id;
        // find job from backend returns populated company which produces error while saving
        job.$update(function () {
          $location.path('emp-job-post-two/' + job._id);
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }  //     locationVarification.validateLocation().then(function(response){
         // //     	if(response[0]=='false')
         // //     	{
         // // var geocoder = new google.maps.Geocoder();
         // //                geocoder.geocode({
         // //             'address': $scope.job.city + "," + $scope.job.country
         // //         }, function(results, status) {
         // //             if (status == google.maps.GeocoderStatus.OK) {
         // //                 console.log(results[0].geometry.location.lat());
         // //                 $scope.job.coordinates.latitude = results[0].geometry.location.lat();
         // //                 $scope.job.coordinates.longitude = results[0].geometry.location.lng();
         // //             } else {
         // //                 alert('Geocode was not successful for the following reason: ' + status);
         // //             }
         // //         });
         // //     	}
         //     });
    };
  }
]);'use strict';
angular.module('empoyer-jobs').controller('EmpJobPostThreeController', [
  '$scope',
  function ($scope) {
  }
]);'use strict';
angular.module('empoyer-jobs').controller('EmpJobPostTwoController', [
  '$scope',
  '$http',
  'Jobs',
  'Users',
  '$stateParams',
  '$location',
  'Employers',
  'Authentication',
  function ($scope, $http, Jobs, Users, $stateParams, $location, Employers, Authentication) {
    $scope.job = {};
    $scope.job.responsibilities = [];
    $scope.job.qualifications = [];
    $scope.newResponsibility = { name: '' };
    $scope.newSkill = { title: '' };
    $scope.priorities = [
      'Must',
      'Important',
      'Nice to have'
    ];
    $scope.degree_titles = [
      'High School',
      'Associate Degree',
      'Bachelor Degree',
      'Master Degree',
      'Master of Business Administration (M.B.A.)',
      'Juris Doctor (J.D.)',
      'Doctor of Medicine (M.D.)',
      'Doctor of Philosophy (Ph.D.)',
      'Engineers Degree'
    ];
    $scope.newQualification = { name: '' };
    //Find Job
    $scope.findOne = function () {
      $scope.job = Jobs.get({ jobId: $stateParams.jobId });
    };
    // $scope.job.responsibilities.push({
    //                     name: 'Product Development'
    //                 });
    //**********Responsibilities***********
    // Add Responsibility
    $scope.addResponsibility = function () {
      if ($scope.newResponsibility.name != '') {
        $scope.job.responsibilities.push($scope.newResponsibility);
        $scope.newResponsibility = { name: '' };
      }
    };
    //Remove Responsibility
    $scope.removeResponsibility = function (index) {
      $scope.job.responsibilities.splice(index, 1);
    };
    //**********Qualification***********
    // Add Qualification
    $scope.addQualification = function () {
      if ($scope.newQualification.name != '') {
        $scope.job.qualifications.push($scope.newQualification);
        $scope.newQualification = { name: '' };
      }
    };
    //Remove Qualification
    $scope.removeQualification = function (index) {
      $scope.job.qualifications.splice(index, 1);
    };
    //**********Education***********
    // Add Education
    $scope.addEducation = function () {
      if ($scope.newEducation.degree_title != '') {
        $scope.job.educations.push($scope.newEducation);
        $scope.newEducation = { name: '' };
      }
    };
    //Remove Education
    $scope.removeEducation = function (index) {
      $scope.job.educations.splice(index, 1);
    };
    //**********Skills***********
    // Add Skills
    $scope.addSkill = function () {
      if ($scope.newSkill.title != '') {
        $scope.job.skills.push($scope.newSkill);
        $scope.newSkill = { title: '' };
      }
    };
    //Remove Skills
    $scope.removeSkill = function (index) {
      $scope.job.skills.splice(index, 1);
    };
    //Save and Redirect
    $scope.SaveAndRedirect = function () {
      $scope.success = $scope.error = null;
      var job = $scope.job;
      job.company = job.company._id;
      // find job from backend returns populated company which produces error while saving
      if (job.stage == 'JobOne')
        job.stage = 'Active';
      job.$update(function () {
        Authentication.user.stage = 'Active';
        $location.path('/');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    //Dont save and go back
    $scope.GoBack = function () {
      $location.path('emp-job-post-one-edit/' + $stateParams.jobId);
    };
  }
]);'use strict';
angular.module('empoyer-jobs').controller('EmployerJobCandidatesController', [
  '$scope',
  '$filter',
  'Jobs',
  '$stateParams',
  '$http',
  '$modal',
  '$location',
  'Authentication',
  'Socket',
  '$rootScope',
  function ($scope, $filter, Jobs, $stateParams, $http, $modal, $location, Authentication, Socket, $rootScope) {
    $rootScope.$broadcast('inEmployerJobupdateHeader', { trigger: true });
    $scope.firstTimeFetching = true;
    $scope.locationFilters = [];
    $scope.user = Authentication.user;
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
    $scope.priorities = [
      {
        'Id': 1,
        'Label': 'Career Level',
        'name': 'career_level',
        'nameinjob': 'career_level'
      },
      {
        'Id': 2,
        'Label': 'Salary Expectation',
        'name': 'salary_expectation',
        'nameinjob': 'salary_range'
      },
      {
        'Id': 3,
        'Label': 'Skills',
        'name': 'skills',
        'nameinjob': 'skills'
      },
      {
        'Id': 4,
        'Label': 'Education',
        'name': 'degree_title',
        'nameinjob': 'degree_title'
      },
      {
        'Id': 5,
        'Label': 'Gender',
        'name': 'gender',
        'nameinjob': 'gender'
      },
      {
        'Id': 6,
        'Label': 'Employment Status',
        'name': 'employee_status',
        'nameinjob': 'employee_status'
      },
      {
        'Id': 7,
        'Label': 'Employment Type',
        'name': 'employee_type',
        'nameinjob': 'employee_type'
      },
      {
        'Id': 8,
        'Label': 'Visa Status',
        'name': 'visa_status',
        'nameinjob': 'visa_status'
      }
    ];
    if (!$scope.user)
      $location.path('/signin');
    Socket.on('applied_on_job', function (data) {
      if ($scope.job._id == data.job._id) {
        $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
      }
    });
    Socket.on('WatchingJob', function (data) {
      for (var dd = 0, len = $scope.candidates.length; dd < len; dd++) {
        if (data.userId == $scope.candidates[dd].user._id) {
          $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
          break;
        }
      }
    });
    $scope.itemsList = { items1: [] };
    $scope.itemsList.items1 = $scope.priorities;
    $scope.sortableOptions = {
      containment: '#sortable-container',
      accept: function (sourceItemHandleScope, destSortableScope) {
        return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
      },
      orderChanged: function (event) {
        $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
      }
    };
    $scope.range = function () {
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
    $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };
    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 0 ? 'disabled' : '';
    };
    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount() - 1) {
        $scope.currentPage++;
      }
    };
    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() - 1 ? 'disabled' : '';
    };
    $scope.pageCount = function () {
      return Math.ceil($scope.total / $scope.itemsPerPage);
    };
    $scope.setPage = function (n) {
      if (n >= 0 && n < $scope.pageCount()) {
        $scope.currentPage = n;
      }
    };
    $scope.isShortListed = function (candidate) {
      var ans = false;
      angular.forEach($scope.job.shortListedCandidates, function (item) {
        if (item.candidate == candidate._id)
          ans = true;
      });
      return ans;
    };
    $scope.findCandidates = function (skip, limit, filters, isPageChange) {
      $http.put('jobs/getPaginatedCandidates/' + $stateParams.jobId, {
        skip: skip,
        limit: limit,
        filter: filters,
        isPageChange: isPageChange,
        priority: $scope.itemsList.items1
      }).success(function (job) {
        console.log(job);
        $scope.filters1 = [];
        $scope.job = job.job;
        // $scope.locationFilters=job.filters.locationFilters;
        $scope.total = job.totalentries;
        $scope.candidates = job.candidates;
        job.filters.forEach(function (entry) {
          $scope.filters1.push(entry);
        });
        if ($scope.firsttime) {
          $scope.firsttime = false;
          $scope.filters1.forEach(function (entry) {
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
    };
    // Add to Short List
    $scope.addCandidateToShortList = function (candidate) {
      var attribute = {
          jobId: $scope.job._id,
          candidateId: candidate._id
        };
      $http.put('jobs/addToShortList/' + $scope.job._id, attribute).success(function (response) {
        $scope.job.shortListedCandidates.push({ candidate: candidate._id });
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Remove from Short List
    $scope.removeCandidateFromShortList = function (candidate) {
      var attribute = {
          jobId: $scope.job._id,
          candidateId: candidate._id
        };
      $http.put('jobs/removeFromShortList/' + $scope.job._id, attribute).success(function (response) {
        angular.forEach($scope.job.shortListedCandidates, function (item) {
          if (item.candidate == candidate._id)
            $scope.job.shortListedCandidates.splice($scope.job.shortListedCandidates.indexOf(item), 1);
        });
        //And redirect to the index page
        $location.path('jobs/' + job._id);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    //only watch currentPage for pagination purposes 
    $scope.$watch('currentPage', function (newValue, oldValue) {
      $scope.skip = newValue * $scope.itemsPerPage;
      if ($scope.skip == 0) {
        //   if first page
        $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
      } else {
        $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, true);
      }
    });
    //Removes and adds filter for salary
    $scope.filterChanged = function (type, name) {
      $scope.filters1.forEach(function (entry) {
        if (name == entry.name) {
          entry.value = !entry.value;
          if (entry.value == true)
            $scope.addToFilters(entry.type, entry.name);
          else
            $scope.removeFromFilters(entry.type, entry.name);
        }
      });
      $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
    };
    //addToFilters
    $scope.addToFilters = function (type, name) {
      var once = true;
      var alreadyPresentInFilters = false;
      $scope.filters.forEach(function (entry) {
        if (type == entry.type && name == entry.name) {
          alreadyPresentInFilters = true;
        }
      });
      if (!alreadyPresentInFilters) {
        var typeExists = false;
        var feefilters = $scope.filters.slice();
        feefilters.forEach(function (entry) {
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
            if (tmp > highest)
              highest = tmp;
          }
          $scope.filters.push({
            type: type,
            name: name,
            priority: highest + 1,
            value: true
          });
        }  //salary_expext salay_exp  visa visa
      }
    };
    //removeFromFilters
    $scope.removeFromFilters = function (type, name) {
      $scope.filters.forEach(function (entry) {
        if (type == entry.type && name == entry.name)
          $scope.filters.splice($scope.filters.indexOf(entry), 1);
      });
      $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
    };
    $scope.openFilterModal = function (filterArray, name) {
      var modalInstance = $modal.open({
          templateUrl: '/modules/empoyer-jobs/views/employer-job-candidates/filter-modal.html',
          controller: 'FilterModalCtrl',
          resolve: {
            filter: function () {
              return {
                values: angular.copy(filterArray),
                name: name
              };
            }
          }
        });
      modalInstance.result.then(function (filterObject) {
        var filternames = [];
        filterObject.filters.forEach(function (filter) {
          if (filter.value) {
            filternames.push(filter.name);
          }
        });
        if (filterObject.name) {
          filternames.forEach(function (filter) {
            $scope.addToFilters(filterObject.name, filter);
          });
        }
        $scope.findCandidates($scope.skip, $scope.itemsPerPage, $scope.filters, false);
      }, function () {
      });
    };
    $scope.compareType = function (typeName, value) {
      if ($scope.job[typeName] === value) {
        return true;
      } else {
        return false;
      }
    };
  }
]).controller('FilterModalCtrl', [
  '$scope',
  '$modalInstance',
  'filter',
  function ($scope, $modalInstance, filter) {
    $scope.filters = filter.values;
    $scope.name = filter.name;
    $scope.ok = function () {
      // $scope.$parent.findCandidates($scope.$parent.skip, $scope.$parent.itemsPerPage, $scope.$parent.filters, false);
      $modalInstance.close({
        name: $scope.name,
        filters: $scope.filters
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);'use strict';
var gt = angular.module('empoyer-jobs');
gt.controller('PostJobController', [
  '$scope',
  'Industries',
  'Countries',
  'Studyfields',
  '$location',
  'Authentication',
  'Jobs',
  '$rootScope',
  function ($scope, Industries, Countries, Studyfields, $location, Authentication, Jobs, $rootScope) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    $scope.industries = Industries.getIndustries();
    Countries.getCountries(function (countries) {
      $scope.countries = countries;
    });
    // $scope.countries = Countries.getCountries();
    $scope.studyFields = Studyfields.getStudyFields();
    $scope.skills = [];
    $scope.skills.push({
      title: '',
      level: 'Beginner'
    });
    $scope.certificates = [];
    $scope.certificates.push({ name: '' });
    $scope.isTabMap = false;
    // $scope.setMapSelected =  function(){
    // 	$scope.isTabMap = true;
    // };
    // Create new Job
    $scope.create = function () {
      $scope.position = $scope.map.markers[0].position;
      // Create new Job object
      var job = new Jobs({
          title: this.title,
          description: this.description,
          requirement: this.requirements,
          due_date: this.due_date,
          gender: this.gender,
          work_permit: this.work_permit,
          employee_type: this.employee_type,
          salary_range: this.salary_range,
          industry: this.industry,
          department: this.department,
          no_of_positions: this.no_of_positions,
          shift: this.shift,
          location: this.location,
          country: this.country,
          career_level: this.career_level,
          experience: this.experience,
          degree_title: this.degree_title,
          study_field: this.study_field,
          travel_required: this.travel_required,
          skills: this.skills,
          certificates: this.certificates,
          coordinates: {
            latitude: $scope.position.k,
            longitude: $scope.position.B
          }
        });
      // Redirect after save
      job.$save(function (response) {
        $location.path('jobs/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
      this.description = '';
    };
    //Skills
    $scope.addSkill = function () {
      $scope.skills.push({
        title: '',
        level: 'Beginner'
      });
    };
    $scope.removeSkill = function (index) {
      $scope.skills.splice(index, 1);
    };
    //Certificates
    $scope.addCertificate = function () {
      $scope.certificates.push({ name: '' });
    };
    $scope.removeCertificate = function (index) {
      $scope.certificates.splice(index, 1);
    };
    $scope.bootupmapaccordingtogeolocation = function () {
      $scope.lat = $rootScope.coords.lat;
      $scope.longi = $rootScope.coords.longi;
      console.log($scope.lat);
    };
  }
]);'use strict';
angular.module('empoyer-jobs').directive('filterList', [
  '$compile',
  function ($compile) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Test directive directive logic
        // ...
        var filterName = attrs.filterName;
        var filterNameString = '\'' + attrs.filterName + '\'';
        var count = '\'count\'';
        var type = '';
        var filterHeading = '';
        switch (filterName) {
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
          break;
        case 'isOnline':
          filterHeading = 'Presence';
          break;
        }
        scope.$watch('filters1', function (v) {
          filterName = attrs.filterName;
          filterNameString = '\'' + attrs.filterName + '\'';
          count = '\'count\'';
          scope.dummyfilters = [];
          for (var h = 0, j = v.length; h < j; h++) {
            if (filterName == v[h].type)
              scope.dummyfilters.push(v[h]);
          }
          var html = '<article style="padding-top: 10px;">' + '<label><strong>' + filterHeading + '</strong></label>' + '<ul class="list-unstyled m-t-n-sm">' + '<li class="checkbox i-checks" data-ng-repeat="' + filterName + 'Filter in dummyfilters | orderBy:' + count + ':true  | limitTo: filterLimit">' + '<label>' + '<input type="checkbox" data-ng-click="filterChanged(' + filterNameString + ',' + filterName + 'Filter.name)" data-ng-model="' + filterName + 'Filter.value" id="{{' + filterName + ' + ' + filterName + 'Filter.name}}" />' + '<i></i>' + '<label ng-if="' + filterName + 'Filter.name" for="{{' + filterName + ' + ' + filterName + 'Filter.name}}" >{{' + filterName + 'Filter.name}} ({{' + filterName + 'Filter.count}})</label>' + '<label ng-if="!' + filterName + 'Filter.name" for="{{' + filterName + ' + ' + filterName + 'Filter.name}}" >Not Mentioned ({{' + filterName + 'Filter.count}})</label>' + '</label>' + '</li>' + '</ul>' + '<a href="" data-ng-if="dummyfilters.length > filterLimit" data-ng-click="openFilterModal(dummyfilters, ' + filterNameString + ')">more choices...</a>' + '</article>';
          var e = $compile(html)(scope);
          element.replaceWith(e);
        }, true);
      }
    };
  }
]);'use strict';
//Setting up route
angular.module('exams').config([
  '$stateProvider',
  function ($stateProvider) {
    // Exams state routing
    $stateProvider.state('exam-result', {
      url: '/exam-result/:examTakenId',
      templateUrl: 'modules/exams/views/exam-result.client.view.html'
    }).state('takeExam', {
      url: '/takeExam/:examId',
      templateUrl: 'modules/exams/views/take-exam.client.view.html'
    }).state('listExams', {
      url: '/exams',
      templateUrl: 'modules/exams/views/list-exams.client.view.html'
    }).state('createExam', {
      url: '/exams/create',
      templateUrl: 'modules/exams/views/create-exam.client.view.html'
    }).state('viewExam', {
      url: '/exams/:examId',
      templateUrl: 'modules/exams/views/view-exam.client.view.html'
    }).state('editExam', {
      url: '/exams/:examId/edit',
      templateUrl: 'modules/exams/views/edit-exam.client.view.html'
    });
  }
]);'use strict';
angular.module('exams').controller('ExamResultController', [
  '$scope',
  '$stateParams',
  '$http',
  function ($scope, $stateParams, $http) {
    // Controller Logic
    // ...
    // Find existing Exam
    $scope.findOne = function () {
      $http.get('/examResult/' + $stateParams.examTakenId).success(function (data) {
        $scope.examTaken = data;
      });
    };
  }
]);'use strict';
// Exams controller
angular.module('exams').controller('ExamsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Exams',
  function ($scope, $stateParams, $location, Authentication, Exams) {
    $scope.authentication = Authentication;
    // Create new Exam
    $scope.create = function () {
      // Create new Exam object
      var exam = new Exams({ name: this.name });
      // Redirect after save
      exam.$save(function (response) {
        $location.path('exams/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Exam
    $scope.remove = function (exam) {
      if (exam) {
        exam.$remove();
        for (var i in $scope.exams) {
          if ($scope.exams[i] === exam) {
            $scope.exams.splice(i, 1);
          }
        }
      } else {
        $scope.exam.$remove(function () {
          $location.path('exams');
        });
      }
    };
    // Update existing Exam
    $scope.update = function () {
      var exam = $scope.exam;
      exam.$update(function () {
        $location.path('exams/' + exam._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Exams
    $scope.find = function () {
      $scope.exams = Exams.query();
    };
    // Find existing Exam
    $scope.findOne = function () {
      $scope.exam = Exams.get({ examId: $stateParams.examId });
    };
  }
]);'use strict';
angular.module('exams').controller('TakeExamController', [
  '$scope',
  '$stateParams',
  'Exams',
  '$http',
  '$location',
  '$rootScope',
  function ($scope, $stateParams, Exams, $http, $location, $rootScope) {
    // Controller Logic
    // 
    // Find ...existing Exam
    $rootScope.preventNavigation = true;
    $scope.totalScore = 0;
    $scope.currentScore = 0;
    $scope.findOne = function () {
      Exams.get({ examId: $stateParams.examId }).$promise.then(function (data) {
        $scope.exam = data;
        $scope.currentQuestion = data.questions[0];
        $scope.questionIndex = 0;
        $scope.timeLimit = $scope.exam.timeLimit * 60;
        $scope.$broadcast('timer-add-cd-seconds', $scope.timeLimit - 3);
        angular.forEach($scope.exam.questions, function (question) {
          angular.forEach(question.answers, function (answer) {
            $scope.totalScore += answer.weight;
          });
        });
      }, function (error) {
      });
    };
    $scope.nextQuestion = function () {
      $scope.questionIndex++;
      $scope.currentQuestion = $scope.exam.questions[$scope.questionIndex];
    };
    $scope.prevQuestion = function () {
      $scope.questionIndex--;
      $scope.currentQuestion = $scope.exam.questions[$scope.questionIndex];
    };
    $scope.submitExam = function () {
      $scope.currentScore = 0;
      angular.forEach($scope.exam.questions, function (question) {
        angular.forEach(question.answers, function (answer) {
          if (answer.body === question.selectedAnswer)
            $scope.currentScore += answer.weight;
        });
      });
      $scope.percentage = $scope.currentScore / $scope.totalScore * 100;
      $scope.isPass = $scope.percentage > $scope.exam.passScore ? true : false;
      var examsTaken = {
          score: $scope.percentage,
          exam: $scope.exam._id,
          isPass: $scope.isPass
        };
      $http.put('/exams/saveExam/' + $scope.exam._id, examsTaken).success(function (response) {
        $location.path('exam-result/' + response._id);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.$on('timer-stopped', function (event, data) {
      console.log('Timer Stopped - data = ', data);
      $scope.submitExam();
    });
    $scope.$on('$destroy', function () {
      window.onbeforeunload = undefined;
    });
    window.onbeforeunload = function (event) {
      //Check if there was any change, if no changes, then simply let the user leave
      var message = 'You are about to leave this will cause the test to submit';
      if (typeof event == 'undefined') {
        event = window.event;
      }
      if (event) {
        event.returnValue = message;
      }
      return message;
    };
    //This works only when user changes routes, not when user refreshes the browsers, goes to previous page or try to close the browser
    $scope.$on('$locationChangeStart', function (event) {
      if (!$scope.form.$dirty)
        return;
      var answer = confirm('If you leave this page you are going to lose all unsaved changes, are you sure you want to leave?');
      if (!answer) {
        event.preventDefault();
      }
    });
  }
]);'use strict';
//Exams service used to communicate Exams REST endpoints
angular.module('exams').factory('Exams', [
  '$resource',
  function ($resource) {
    return $resource('exams/:examId', { examId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Configuring the Articles module
angular.module('jobs').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Jobs', 'jobs', 'dropdown', '/jobs(/create)?');
    Menus.addSubMenuItem('topbar', 'jobs', 'List Jobs', 'jobs');
    Menus.addSubMenuItem('topbar', 'jobs', 'New Job', 'jobs/create');
  }
]);'use strict';
//Setting up route
angular.module('jobs').config([
  '$stateProvider',
  function ($stateProvider) {
    // Jobs state routing
    $stateProvider.state('listJobs', {
      url: '/jobs',
      templateUrl: 'modules/jobs/views/list-jobs.client.view.html'
    }).state('createJob', {
      url: '/jobs/create',
      templateUrl: 'modules/jobs/views/create-job.client.view.html'
    }).state('viewJob', {
      url: '/jobs/:jobId',
      templateUrl: 'modules/jobs/views/view-job.client.view.html'
    }).state('editJob', {
      url: '/jobs/:jobId/edit',
      templateUrl: 'modules/jobs/views/edit-job.client.view.html'
    });
  }
]);'use strict';
// Jobs controller
angular.module('jobs').controller('JobsController', [
  '$http',
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Candidates',
  'Jobs',
  function ($http, $scope, $stateParams, $location, Authentication, Candidates, Jobs) {
    $scope.authentication = Authentication;
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    //Add one to view if the job was seen by the candidate
    // Create new Job
    $scope.create = function () {
      // Create new Job object
      var job = new Jobs({ title: this.title });
      // Redirect after save
      job.$save(function (response) {
        $location.path('jobs/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Job
    $scope.remove = function (job) {
      if (job) {
        job.$remove();
        for (var i in $scope.jobs) {
          if ($scope.jobs[i] === job) {
            $scope.jobs.splice(i, 1);
          }
        }
      } else {
        $scope.job.$remove(function () {
          $location.path('jobs');
        });
      }
    };
    // Update existing Job
    $scope.update = function () {
      var job = $scope.job;
      job.$update(function () {
        $location.path('jobs/' + job._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Apply for a Job
    $scope.apply = function (job) {
      $http.put('jobs/apply/' + job._id, job).success(function (response) {
        //And redirect to the index page
        $location.path('jobs/' + job._id);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Find a list of Jobs
    $scope.find = function () {
      $scope.jobs = Jobs.query();
    };
    // Find existing Job
    $scope.findOne = function () {
      $scope.job = Jobs.get({ jobId: $stateParams.jobId }, function (job) {
        $scope.candidate = Candidates.get({ candidateId: $scope.user.candidate }, function (candidate) {
          if ($scope.user.userType === 'candidate' && $scope.candidate.jobs.indexOf($scope.job._id) > 1) {
            $scope.isApplied = true;
          }
        });
      });
      $http.put('jobs/onePlusView/' + $stateParams.jobId, { user: $scope.user }).success(function (response) {
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
//Jobs service used to communicate Jobs REST endpoints
angular.module('jobs').factory('Jobs', [
  '$resource',
  function ($resource) {
    return $resource('jobs/:jobId', { jobId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
//Setting up route
angular.module('messages').config([
  '$stateProvider',
  function ($stateProvider) {
    // Messages state routing
    $stateProvider.state('list-user-messages', {
      url: '/list-user-messages',
      templateUrl: 'modules/messages/views/list-user-messages.client.view.html'
    }).state('list-user-messages.inboxs', {
      url: '/inboxs/:threadId',
      templateUrl: 'modules/messages/views/inbox.client.view.html'
    }).state('create-message', {
      url: '/create-message',
      templateUrl: 'modules/messages/views/create-message.client.view.html'
    });
  }
]);'use strict';
angular.module('messages').controller('ListUserMessagesController', [
  '$scope',
  'Authentication',
  '$location',
  function ($scope, Authentication, $location) {
    // Controller Logic
    // ...
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
  }
]);'use strict';
// Messages controller
angular.module('messages').controller('MessagesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Messages',
  '$http',
  'Socket',
  function ($scope, $stateParams, $location, Authentication, Messages, $http, Socket) {
    $scope.authentication = Authentication;
    $scope.threads = [];
    $scope.message = {};
    $scope.thread;
    $scope.balsamic = {};
    $scope.message.messages = [];
    $scope.displayNameOfReceiver;
    $scope.nomessages = false;
    $scope.unreadthreads = 0;
    console.log($stateParams.threadId);
    $scope.listThreads = function () {
      $http.get('/getAllMessagesWithFlagForUnread/' + $scope.authentication.user._id).success(function (res) {
        $scope.threads = res;
        console.log(res);
        for (var s = 0, len = $scope.threads.length; s < len; s++) {
          if ($scope.threads[s].receiver == $scope.authentication.user._id)
            if (!$scope.threads[s].readByReceiver)
              $scope.unreadthreads++;
          if ($scope.threads[s].sender == $scope.authentication.user._id)
            if (!$scope.threads[s].readBySender)
              $scope.unreadthreads++;
        }
        for (var s = 0, len = $scope.threads.length; s < len; s++)
          if ($stateParams.threadId != 'main' && $stateParams.threadId == $scope.threads[s]._id) {
            $scope.selectedmessage($scope.threads[s]);
            break;
          }
        if ($stateParams.threadId == 'main' && $scope.threads.length >= 1)
          $scope.selectedmessage($scope.threads[0]);
        if ($stateParams.threadId == 'main' && $scope.threads.length == 0)
          $scope.nomessages = true;
      });
    };
    $scope.selectedmessage = function (message) {
      $scope.thread = message;
      $scope.displayNameOfReceiver = '';
      $scope.messages = message.messages;
      console.log($scope.messages);
      for (var x = 0, len = $scope.messages.length; x < len; x++)
        if ($scope.messages[x].author._id != $scope.authentication.user._id) {
          $scope.displayNameOfReceiver = $scope.messages[x].author.displayName;
          break;
        }
      $scope.findOneAndMarkAsRead();
      $stateParams.threadId = $scope.thread._id;
    };
    // Create new Message
    $scope.create = function () {
      // Create new Message object
      var message = new Messages({ name: this.name });
      // Redirect after save
      message.$save(function (response) {
        $location.path('messages/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Message
    $scope.remove = function (message) {
      if (message) {
        message.$remove();
        for (var i in $scope.messages) {
          if ($scope.messages[i] === message) {
            $scope.messages.splice(i, 1);
          }
        }
      } else {
        $scope.message.$remove(function () {
          $location.path('messages');
        });
      }
    };
    // Update existing Message
    $scope.update = function () {
      var message = $scope.message;
      message.$update(function () {
        $location.path('messages/' + message._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Messages
    $scope.find = function () {
      $scope.messages = Messages.query();
    };
    // Find existing Message
    $scope.findOne = function () {
      $scope.message = Messages.get({ messageId: $stateParams.messageId });
    };
    $scope.sendMessage = function () {
      var threadId = $scope.thread._id;
      var message = {
          threadId: $scope.thread._id,
          messageBody: $scope.balsamic.message,
          author: $scope.authentication.user
        };
      if ($scope.authentication.user._id == $scope.thread.sender._id) {
        var thread = {
            idc: threadId,
            sender: { displayName: $scope.authentication.user.displayName },
            receiver: $scope.thread.receiver._id,
            messages: { created: Date.now() }
          };
        Socket.emit('message_sent_from', { message: thread });
      } else {
        var thread = {
            idc: threadId,
            sender: { displayName: $scope.authentication.user.displayName },
            receiver: $scope.thread.sender._id,
            messages: [{ created: Date.now() }]
          };
        Socket.emit('message_sent_from', { message: thread });
      }
      $http.put('/threads/updateThread/' + $scope.thread._id, message).success(function (messageBody) {
        console.log(messageBody);
        Socket.emit('update_threads', {
          sender: messageBody.sender,
          receiver: messageBody.receiver,
          threadId: $scope.thread._id,
          messageBody: $scope.balsamic.message,
          author: $scope.authentication.user,
          authordp: $scope.authentication.user.picture_url,
          created: Date.now()
        });
      });
    };
    Socket.on('i_am_here', function (data) {
      for (var x = 0, b = $scope.thread.messages.length; x < b; x++) {
        if ($scope.thread.messages[x].author._id === data.userId)
          $scope.thread.messages[x].author.isOnline = data.isOnline == 'Online' ? true : false;
        if ($scope.thread.messages[x].author.authorid == data.userId)
          $scope.thread.messages[x].author.isOnline = data.isOnline == 'Online' ? true : false;
      }
    });
    //socket incoming_thread start
    Socket.on('incoming_thread', function (data) {
      $scope.balsamic.message = '';
      $scope.newMessage = {
        messageBody: data.messageBody,
        author: {
          _id: data.id,
          displayName: data.author,
          picture_url: data.authordp,
          isOnline: 'Online'
        },
        created: data.created
      };
      $scope.unreadthreads++;
      for (var x = 0, len = $scope.threads.length; x < len; x++) {
        if ($scope.threads[x]._id == data.threadId) {
          $scope.threads[x].messages.unshift($scope.newMessage);
          break;
        }
      }
    });
    $scope.sortMessage = function (message) {
      var date = new Date(message.created);
      return date;
    };
    $scope.findOneAndMarkAsRead = function () {
      $http.put('/threads/getUserThread/' + $scope.thread._id, { id: $scope.authentication.user._id }).success(function (thread) {
        $scope.thread = thread.thread;
        if (!thread.alreadyRead && $scope.unreadthreads != 0)
          $scope.unreadthreads--;
        if (thread.thread.sender._id === $scope.authentication.user._id)
          $http.put('/users/addSubscriber/' + $scope.authentication.user._id, { id: thread.thread.receiver._id }).success(function () {
          });
        else
          $http.put('/users/addSubscriber/' + $scope.authentication.user._id, { id: thread.thread.sender._id }).success(function () {
          });
        Socket.emit('watched_thread', $scope.authentication.user._id);
      });
    };
  }
]);'use strict';
//Messages service used to communicate Messages REST endpoints
angular.module('messages').factory('Messages', [
  '$resource',
  function ($resource) {
    return $resource('messages/:messageId', { messageId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
//Setting up route
angular.module('short-list').config([
  '$stateProvider',
  function ($stateProvider) {
    // Short list state routing
    $stateProvider.state('shortlisted-candidates-skeleton', {
      url: '/shortlisted-candidates-skeleton',
      templateUrl: 'modules/core/views/shortlisted-candidates-skeleton.client.view.html'
    }).state('shortlisted-candidates', {
      url: '/shortlisted-candidates/:jobId',
      templateUrl: 'modules/short-list/views/shortlisted-candidates.client.view.html',
      controller: 'ShortlistedCandidatesController'
    }).state('shortlisted-candidates-test', {
      url: '/test',
      templateUrl: 'modules/short-list/views/shortlisted-candidates-test.client.view.html',
      controller: 'CandidatesTestController'
    });
  }
]);angular.module('short-list').controller('CandidatesTestController', [
  '$scope',
  '$http',
  '$stateParams',
  '$modal',
  '$rootScope',
  'Exams',
  'Authentication',
  function ($scope, $http, $stateParams, $modal, $rootScope, Exams, Authentication) {
    $scope.user = Authentication.user;
    // console.log($rootScope.selectedCandidates[0]);
    // Find a list of Exams
    $scope.find = function () {
      $scope.tests = Exams.query();
    };
    $scope.sendTest = function () {
      var tests = [];
      angular.forEach($scope.tests, function (test) {
        console.log(test);
        if (test.selected) {
          tests.push(test._id);
        }
      });
      var candidates = $rootScope.selectedCandidates;
      console.log(candidates);
      $http.put('/exams/sendTest/' + $scope.user._id, {
        candidates: candidates,
        tests: tests
      }).success(function (response) {
        console.log(response);
        if (response.data == 'none have given test') {
          alert('None have given the test ');
        }
        if (response.data == 'already given test') {
          alert('well it looks like someone has given the test already');
        }
      }).error(function (err) {
      });
    };
  }
]);'use strict';
angular.module('short-list').controller('messageController', [
  '$scope',
  'Socket',
  '$modalInstance',
  '$http',
  'reciever',
  'Threads',
  'Authentication',
  function ($scope, Socket, $modalInstance, $http, reciever, Threads, Authentication) {
    $scope.authentication = Authentication;
    $scope.user = Authentication.user;
    $scope.ok = function (action) {
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.recieverId = reciever._id;
    $scope.reciever = reciever;
    // 	// Remove from Short List
    // $scope.sendMessage = function(message) {
    // 	var attribute = {
    // 		recieverId: $scope.reciever.user,
    // 		sender: $scope.user,
    // 		subject: message.subject,
    // 		messageBody: message.messageBody
    // 	};
    // 	$http.put('/users/sendMessage/' + $scope.user._id , attribute).success(function(response) {
    // 		Socket.emit('message_sent_from', {message: attribute});
    // 		$modalInstance.dismiss('cancel');
    // 		// $location.path('jobs/' + job._id);
    // 	}).error(function(response) {
    // 		$scope.error = response.message;
    // 	});
    // };
    // Remove from Short List
    $scope.sendMessage = function (message) {
      // Create new Thread object
      var thread = new Threads({
          sender: $scope.user._id,
          receiver: $scope.reciever.user,
          subject: message.subject,
          readBySender: true,
          messages: [{
              messageBody: message.messageBody,
              author: $scope.user._id,
              created: Date.now()
            }]
        });
      thread.$save(function (response) {
        console.log(response.receiver);
        var thread1 = {
            idc: response._id,
            receiver: response.receiver,
            sender: { displayName: $scope.user.displayName },
            messages: { created: Date.now() }
          };
        console.log(Date.now());
        Socket.emit('message_sent_from', { message: thread1 });
        $modalInstance.dismiss('cancel');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);'use strict';
angular.module('short-list').controller('ShortlistedCandidatesController', [
  '$scope',
  '$http',
  '$stateParams',
  '$modal',
  '$rootScope',
  function ($scope, $http, $stateParams, $modal, $rootScope) {
    // Controller Logic
    // ...
    $rootScope.selectedCandidates = [];
    $scope.formData = { userType: '' };
    $http.get('jobs/shortListedCandidates/' + $stateParams.jobId).success(function (job) {
      $scope.job = job;
      $scope.shortListedObjects = job.shortListedCandidates;
    });
    $scope.$on('$destroy', function () {
      for (var d = 0, s = $scope.shortListedObjects.length; d < s; d++) {
        var f = $scope.shortListedObjects[d];
        console.log(f.selected);
        if (f.selected) {
          $rootScope.selectedCandidates.push($scope.shortListedObjects[d].candidate._id);
          console.log('WTF');
        }
      }
    });
    // Remove from Short List
    $scope.removeCandidateFromShortList = function (candidate) {
      var attribute = {
          jobId: $scope.job._id,
          candidateId: candidate._id
        };
      $http.put('jobs/removeFromShortList/' + $scope.job._id, attribute).success(function (response) {
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // send message
    $scope.openMessageModal = function (reciever) {
      var mesg = $modal.open({
          templateUrl: '/modules/short-list/views/message/message.html',
          controller: 'messageController',
          resolve: {
            reciever: function () {
              return reciever;
            }
          }
        });
      mesg.result.then(function (result) {
      }, function () {
      });
    };
  }
]);'use strict';
angular.module('static-factories').filter('locationFilter', [function () {
    return function (input, filter, isEnable) {
      var allUnchecked = true;
      // if isEnable then filter out wines
      angular.forEach(filter, function (filter) {
        if (filter.value) {
          allUnchecked = false;
        }
      });
      if (!allUnchecked && isEnable) {
        var result = [];
        angular.forEach(input, function (candidate) {
          angular.forEach(filter, function (filter) {
            if (filter.value && filter.name === candidate.location) {
              result.push(candidate);
            }
          });
        });
        return result;
      }  // otherwise just do not any filter just send input without changes
      else {
        return input;
      }
    };
  }]);
angular.module('static-factories').filter('salaryFilter', [function () {
    return function (input, filter, isEnable) {
      var allUnchecked = true;
      // if isEnable then filter out wines
      angular.forEach(filter, function (filter) {
        if (filter.value) {
          allUnchecked = false;
        }
      });
      if (!allUnchecked && isEnable) {
        var result = [];
        angular.forEach(input, function (candidate) {
          angular.forEach(filter, function (filter) {
            if (filter.value && filter.name === candidate.salary_expectation) {
              result.push(candidate);
            }
          });
        });
        return result;
      }  // otherwise just do not any filter just send input without changes
      else {
        return input;
      }
    };
  }]);
angular.module('static-factories').filter('visaFilter', [function () {
    return function (input, filter, isEnable) {
      var allUnchecked = true;
      // if isEnable then filter out wines
      angular.forEach(filter, function (filter) {
        if (filter.value) {
          allUnchecked = false;
        }
      });
      if (!allUnchecked && isEnable) {
        var result = [];
        angular.forEach(input, function (candidate) {
          angular.forEach(filter, function (filter) {
            if (filter.value && filter.name === candidate.visa_status) {
              result.push(candidate);
            }
          });
        });
        return result;
      }  // otherwise just do not any filter just send input without changes
      else {
        return input;
      }
    };
  }]);
angular.module('static-factories').filter('employeetypeFilter', [function () {
    return function (input, filter, isEnable) {
      var allUnchecked = true;
      // if isEnable then filter out wines
      angular.forEach(filter, function (filter) {
        if (filter.value) {
          allUnchecked = false;
        }
      });
      if (!allUnchecked && isEnable) {
        var result = [];
        angular.forEach(input, function (candidate) {
          angular.forEach(filter, function (filter) {
            if (filter.value && filter.name === candidate.employee_type) {
              result.push(candidate);
            }
          });
        });
        return result;
      }  // otherwise just do not any filter just send input without changes
      else {
        return input;
      }
    };
  }]);
angular.module('static-factories').filter('employeestatusFilter', [function () {
    return function (input, filter, isEnable) {
      var allUnchecked = true;
      // if isEnable then filter out wines
      angular.forEach(filter, function (filter) {
        if (filter.value) {
          allUnchecked = false;
        }
      });
      if (!allUnchecked && isEnable) {
        var result = [];
        angular.forEach(input, function (candidate) {
          angular.forEach(filter, function (filter) {
            if (filter.value && filter.name === candidate.employee_status) {
              result.push(candidate);
            }
          });
        });
        return result;
      }  // otherwise just do not any filter just send input without changes
      else {
        return input;
      }
    };
  }]);'use strict';
angular.module('static-factories').factory('Countries', [
  '$http',
  function ($http) {
    // Industries service logic
    // ...
    var factory = {};
    var cachedCountries = [];
    // Public API
    factory.getCountries = function (callback) {
      if (!cachedCountries) {
        callback(cachedCountries);
      } else {
        $http.get('/countries').success(function (countries) {
          cachedCountries = countries;
          callback(countries);
        });
      }
    };
    return factory;
  }
]);'use strict';
angular.module('static-factories').factory('Industries', [function () {
    // Industries service logic
    // ...
    var factory = {};
    var industries = [
        {
          group: 'corp fin',
          name: 'Accounting'
        },
        {
          group: 'man tech tran',
          name: 'Airlines/Aviation'
        },
        {
          group: 'leg org',
          name: 'Alternative Dispute Resolution'
        },
        {
          group: 'hlth',
          name: 'Alternative Medicine'
        },
        {
          group: 'art med',
          name: 'Animation'
        },
        {
          group: 'good',
          name: 'Apparel & Fashion'
        },
        {
          group: 'cons',
          name: 'Architecture & Planning'
        },
        {
          group: 'art med rec',
          name: 'Arts and Crafts\t'
        },
        {
          group: 'man',
          name: 'Automotive'
        },
        {
          group: 'gov man',
          name: 'Aviation & Aerospace'
        },
        {
          group: 'fin',
          name: 'Banking'
        },
        {
          group: 'gov hlth tech',
          name: 'Biotechnology'
        },
        {
          group: 'med rec',
          name: 'Broadcast Media'
        },
        {
          group: 'cons',
          name: 'Building Materials'
        },
        {
          group: 'corp man',
          name: 'Business Supplies and Equipment'
        },
        {
          group: 'fin',
          name: 'Capital Markets'
        },
        {
          group: 'man',
          name: 'Chemicals'
        },
        {
          group: 'org serv',
          name: 'Civic & Social Organization'
        },
        {
          group: 'cons gov',
          name: 'Civil Engineering'
        },
        {
          group: 'cons corp fin',
          name: 'Commercial Real Estate'
        },
        {
          group: 'tech',
          name: 'Computer & Network Security'
        },
        {
          group: 'med rec',
          name: 'Computer Games'
        },
        {
          group: 'tech',
          name: 'Computer Hardware'
        },
        {
          group: 'tech',
          name: 'Computer Networking'
        },
        {
          group: 'tech',
          name: 'Computer Software'
        },
        {
          group: 'cons',
          name: 'Construction'
        },
        {
          group: 'good man',
          name: 'Consumer Electronics'
        },
        {
          group: 'good man',
          name: 'Consumer Goods'
        },
        {
          group: 'org serv',
          name: 'Consumer Services'
        },
        {
          group: 'good',
          name: 'Cosmetics'
        },
        {
          group: 'agr',
          name: 'Dairy'
        },
        {
          group: 'gov tech',
          name: 'Defense & Space'
        },
        {
          group: 'art med',
          name: 'Design'
        },
        {
          group: 'edu',
          name: 'Education Management'
        },
        {
          group: 'edu org',
          name: 'E-Learning'
        },
        {
          group: 'good man',
          name: 'Electrical/Electronic Manufacturing'
        },
        {
          group: 'med rec',
          name: 'Entertainment'
        },
        {
          group: 'org serv',
          name: 'Environmental Services'
        },
        {
          group: 'corp rec serv',
          name: 'Events Services'
        },
        {
          group: 'gov',
          name: 'Executive Office'
        },
        {
          group: 'corp serv',
          name: 'Facilities Services'
        },
        {
          group: 'agr',
          name: 'Farming'
        },
        {
          group: 'fin',
          name: 'Financial Services'
        },
        {
          group: 'art med rec',
          name: 'Fine Art'
        },
        {
          group: 'agr',
          name: 'Fishery'
        },
        {
          group: 'rec serv',
          name: 'Food & Beverages'
        },
        {
          group: 'good man serv',
          name: 'Food Production'
        },
        {
          group: 'org',
          name: 'Fund-Raising'
        },
        {
          group: 'good man',
          name: 'Furniture'
        },
        {
          group: 'rec',
          name: 'Gambling & Casinos'
        },
        {
          group: 'cons man',
          name: 'Glass, Ceramics & Concrete'
        },
        {
          group: 'gov',
          name: 'Government Administration'
        },
        {
          group: 'gov',
          name: 'Government Relations'
        },
        {
          group: 'art med',
          name: 'Graphic Design'
        },
        {
          group: 'hlth rec',
          name: 'Health, Wellness and Fitness'
        },
        {
          group: 'edu',
          name: 'Higher Education'
        },
        {
          group: 'hlth',
          name: 'Hospital & Health Care'
        },
        {
          group: 'rec serv tran',
          name: 'Hospitality'
        },
        {
          group: 'corp',
          name: 'Human Resources'
        },
        {
          group: 'corp good tran',
          name: 'Import and Export'
        },
        {
          group: 'org serv',
          name: 'Individual & Family Services'
        },
        {
          group: 'cons man',
          name: 'Industrial Automation'
        },
        {
          group: 'med serv',
          name: 'Information Services'
        },
        {
          group: 'tech',
          name: 'Information Technology and Services'
        },
        {
          group: 'fin',
          name: 'Insurance'
        },
        {
          group: 'gov',
          name: 'International Affairs'
        },
        {
          group: 'gov org tran',
          name: 'International Trade and Development'
        },
        {
          group: 'tech',
          name: 'Internet'
        },
        {
          group: 'fin',
          name: 'Investment Banking'
        },
        {
          group: 'fin',
          name: 'Investment Management'
        },
        {
          group: 'gov leg',
          name: 'Judiciary'
        },
        {
          group: 'gov leg',
          name: 'Law Enforcement'
        },
        {
          group: 'leg',
          name: 'Law Practice'
        },
        {
          group: 'leg',
          name: 'Legal Services'
        },
        {
          group: 'gov leg',
          name: 'Legislative Office'
        },
        {
          group: 'rec serv tran',
          name: 'Leisure, Travel & Tourism'
        },
        {
          group: 'med rec serv',
          name: 'Libraries'
        },
        {
          group: 'corp tran',
          name: 'Logistics and Supply Chain'
        },
        {
          group: 'good',
          name: 'Luxury Goods & Jewelry'
        },
        {
          group: 'man',
          name: 'Machinery'
        },
        {
          group: 'corp',
          name: 'Management Consulting'
        },
        {
          group: 'tran',
          name: 'Maritime'
        },
        {
          group: 'corp',
          name: 'Market Research'
        },
        {
          group: 'corp med',
          name: 'Marketing and Advertising'
        },
        {
          group: 'cons gov man',
          name: 'Mechanical or Industrial Engineering'
        },
        {
          group: 'med rec',
          name: 'Media Production'
        },
        {
          group: 'hlth',
          name: 'Medical Devices'
        },
        {
          group: 'hlth',
          name: 'Medical Practice'
        },
        {
          group: 'hlth',
          name: 'Mental Health Care'
        },
        {
          group: 'gov',
          name: 'Military'
        },
        {
          group: 'man',
          name: 'Mining & Metals'
        },
        {
          group: 'art med rec',
          name: 'Motion Pictures and Film'
        },
        {
          group: 'art med rec',
          name: 'Museums and Institutions'
        },
        {
          group: 'art rec',
          name: 'Music'
        },
        {
          group: 'gov man tech',
          name: 'Nanotechnology'
        },
        {
          group: 'med rec',
          name: 'Newspapers'
        },
        {
          group: 'org',
          name: 'Non-Profit Organization Management'
        },
        {
          group: 'man',
          name: 'Oil & Energy'
        },
        {
          group: 'med',
          name: 'Online Media'
        },
        {
          group: 'corp',
          name: 'Outsourcing/Offshoring'
        },
        {
          group: 'serv tran',
          name: 'Package/Freight Delivery'
        },
        {
          group: 'good man',
          name: 'Packaging and Containers'
        },
        {
          group: 'man',
          name: 'Paper & Forest Products'
        },
        {
          group: 'art med rec',
          name: 'Performing Arts'
        },
        {
          group: 'hlth tech',
          name: 'Pharmaceuticals'
        },
        {
          group: 'org',
          name: 'Philanthropy'
        },
        {
          group: 'art med rec',
          name: 'Photography'
        },
        {
          group: 'man',
          name: 'Plastics'
        },
        {
          group: 'gov org',
          name: 'Political Organization'
        },
        {
          group: 'edu',
          name: 'Primary/Secondary Education'
        },
        {
          group: 'med rec',
          name: 'Printing'
        },
        {
          group: 'corp',
          name: 'Professional Training & Coaching'
        },
        {
          group: 'corp org',
          name: 'Program Development'
        },
        {
          group: 'gov',
          name: 'Public Policy'
        },
        {
          group: 'corp',
          name: 'Public Relations and Communications'
        },
        {
          group: 'gov',
          name: 'Public Safety'
        },
        {
          group: 'med rec',
          name: 'Publishing'
        },
        {
          group: 'man',
          name: 'Railroad Manufacture'
        },
        {
          group: 'agr',
          name: 'Ranching'
        },
        {
          group: 'cons fin good',
          name: 'Real Estate'
        },
        {
          group: 'rec serv',
          name: 'Recreational Facilities and Services'
        },
        {
          group: 'org serv',
          name: 'Religious Institutions'
        },
        {
          group: 'gov man org',
          name: 'Renewables & Environment'
        },
        {
          group: 'edu gov',
          name: 'Research'
        },
        {
          group: 'rec serv',
          name: 'Restaurants'
        },
        {
          group: 'good man',
          name: 'Retail'
        },
        {
          group: 'corp org serv',
          name: 'Security and Investigations'
        },
        {
          group: 'tech',
          name: 'Semiconductors'
        },
        {
          group: 'man',
          name: 'Shipbuilding'
        },
        {
          group: 'good rec',
          name: 'Sporting Goods'
        },
        {
          group: 'rec',
          name: 'Sports'
        },
        {
          group: 'corp',
          name: 'Staffing and Recruiting'
        },
        {
          group: 'good',
          name: 'Supermarkets'
        },
        {
          group: 'gov tech',
          name: 'Telecommunications'
        },
        {
          group: 'man',
          name: 'Textiles'
        },
        {
          group: 'gov org',
          name: 'Think Tanks'
        },
        {
          group: 'good',
          name: 'Tobacco'
        },
        {
          group: 'corp gov serv',
          name: 'Translation and Localization'
        },
        {
          group: 'tran',
          name: 'Transportation/Trucking/Railroad'
        },
        {
          group: 'man',
          name: 'Utilities'
        },
        {
          group: 'fin tech',
          name: 'Venture Capital & Private Equity'
        },
        {
          group: 'hlth',
          name: 'Veterinary'
        },
        {
          group: 'tran',
          name: 'Warehousing'
        },
        {
          group: 'good',
          name: 'Wholesale'
        },
        {
          group: 'good man rec',
          name: 'Wine and Spirits'
        },
        {
          group: 'tech',
          name: 'Wireless'
        },
        {
          group: 'art med rec',
          name: 'Writing and Editing'
        }
      ];
    // Public API
    factory.getIndustries = function () {
      return industries;
    };
    return factory;
  }]);'use strict';
angular.module('static-factories').factory('Locationz', [function () {
    // Industries service logic
    // ...
    var factory = {};
    var locationz = [
        { name: 'Bagh' },
        { name: 'Bhimber' },
        { name: 'khuiratta' },
        { name: 'Kotli' },
        { name: 'Mangla' },
        { name: 'Mirpur' },
        { name: 'Muzaffarabad' },
        { name: 'Plandri' },
        { name: 'Rawalakot' },
        { name: 'Punch' },
        { name: 'Amir Chah' },
        { name: 'Bazdar' },
        { name: 'Bela' },
        { name: 'Bellpat' },
        { name: 'Bagh' },
        { name: 'Burj' },
        { name: 'Chah Sandan' },
        { name: 'Chaman' },
        { name: 'Chakku' },
        { name: 'Chhatr' },
        { name: 'Dalbandin' },
        { name: 'Dera Bugti' },
        { name: 'Dhana Sar' },
        { name: 'Diwana' },
        { name: 'Duki' },
        { name: 'Dushi' },
        { name: 'Duzab' },
        { name: 'Gajar' },
        { name: 'Gandava' },
        { name: 'Garhi Khairo' },
        { name: 'Garruck' },
        { name: 'Ghazluna' },
        { name: 'Girdan' },
        { name: 'Gulistan' },
        { name: 'Gwadar' },
        { name: 'Gwash' },
        { name: 'Hab Chauki' },
        { name: 'Hameedabad' },
        { name: 'Harnai' },
        { name: 'Hinglaj' },
        { name: 'Hoshab' },
        { name: 'Ispikan' },
        { name: 'Jhal' },
        { name: 'Jhal Jhao' },
        { name: 'Jhatpat' },
        { name: 'Jiwani' },
        { name: 'Kalandi' },
        { name: 'Kalat' },
        { name: 'Kamararod' },
        { name: 'Kanak' },
        { name: 'Kandi' },
        { name: 'Kanpur' },
        { name: 'Kapip' },
        { name: 'Kappar' },
        { name: 'Karodi' },
        { name: 'Katuri' },
        { name: 'Kharan' },
        { name: 'Khuzdar' },
        { name: 'Kikki' },
        { name: 'Kohan' },
        { name: 'Kohlu' },
        { name: 'Korak' },
        { name: 'Lahri' },
        { name: 'Lasbela' },
        { name: 'Liari' },
        { name: 'Loralai' },
        { name: 'Mach' },
        { name: 'Mand' },
        { name: 'Mangucha' },
        { name: 'Mashki Chah' },
        { name: 'Maslti' },
        { name: 'Mastung' },
        { name: 'Mekhtar' },
        { name: 'Merui' },
        { name: 'Mianez' },
        { name: 'Murgha Kibzai' },
        { name: 'Musa Khel Bazar' },
        { name: 'Nagha Kalat' },
        { name: 'Nal' },
        { name: 'Naseerabad' },
        { name: 'Nauroz Kalat' },
        { name: 'Nur Gamma' },
        { name: 'Nushki' },
        { name: 'Nuttal' },
        { name: 'Ormara' },
        { name: 'Palantuk' },
        { name: 'Panjgur' },
        { name: 'Pasni' },
        { name: 'Piharak' },
        { name: 'Pishin' },
        { name: 'Qamruddin Karez' },
        { name: 'Qila Abdullah' },
        { name: 'Qila Ladgasht' },
        { name: 'Qila Safed' },
        { name: 'Qila Saifullah' },
        { name: 'Quetta' },
        { name: 'Rakhni' },
        { name: 'Robat Thana' },
        { name: 'Rodkhan' },
        { name: 'Saindak' },
        { name: 'Sanjawi' },
        { name: 'Saruna' },
        { name: 'Shabaz Kalat' },
        { name: 'Shahpur' },
        { name: 'Sharam Jogizai' },
        { name: 'Shingar' },
        { name: 'Shorap' },
        { name: 'Sibi' },
        { name: 'Sonmiani' },
        { name: 'Spezand' },
        { name: 'Spintangi' },
        { name: 'Sui' },
        { name: 'Suntsar' },
        { name: 'Surab' },
        { name: 'Thalo' },
        { name: 'Tump' },
        { name: 'Turbat' },
        { name: 'Umarao' },
        { name: 'pirMahal' },
        { name: 'Uthal' },
        { name: 'Vitakri' },
        { name: 'Wadh' },
        { name: 'Washap' },
        { name: 'Wasjuk' },
        { name: 'Yakmach' },
        { name: 'Zhob' },
        { name: 'Astor' },
        { name: 'Baramula' },
        { name: 'Hunza' },
        { name: 'Gilgit' },
        { name: 'Nagar' },
        { name: 'Skardu' },
        { name: 'Shangrila' },
        { name: 'Shandur' },
        { name: 'Bajaur' },
        { name: 'Hangu' },
        { name: 'Malakand' },
        { name: 'Miram Shah' },
        { name: 'Mohmand' },
        { name: 'Khyber' },
        { name: 'Kurram' },
        { name: 'North Waziristan' },
        { name: 'South Waziristan' },
        { name: 'Wana' },
        { name: 'NWFP' },
        { name: 'Abbottabad' },
        { name: 'Ayubia' },
        { name: 'Adezai' },
        { name: 'Banda Daud Shah' },
        { name: 'Bannu' },
        { name: 'Batagram' },
        { name: 'Birote' },
        { name: 'Buner' },
        { name: 'Chakdara' },
        { name: 'Charsadda' },
        { name: 'Chitral' },
        { name: 'Dargai' },
        { name: 'Darya Khan' },
        { name: 'Dera Ismail Khan' },
        { name: 'Drasan' },
        { name: 'Drosh' },
        { name: 'Hangu' },
        { name: 'Haripur' },
        { name: 'Kalam' },
        { name: 'Karak' },
        { name: 'Khanaspur' },
        { name: 'Kohat' },
        { name: 'Kohistan' },
        { name: 'Lakki Marwat' },
        { name: 'Latamber' },
        { name: 'Lower Dir' },
        { name: 'Madyan' },
        { name: 'Malakand' },
        { name: 'Mansehra' },
        { name: 'Mardan' },
        { name: 'Mastuj' },
        { name: 'Mongora' },
        { name: 'Nowshera' },
        { name: 'Paharpur' },
        { name: 'Peshawar' },
        { name: 'Saidu Sharif' },
        { name: 'Shangla' },
        { name: 'Sakesar' },
        { name: 'Swabi' },
        { name: 'Swat' },
        { name: 'Tangi' },
        { name: 'Tank' },
        { name: 'Thall' },
        { name: 'Tordher' },
        { name: 'Upper Dir' },
        { name: 'Ahmedpur East' },
        { name: 'Ahmed Nager Chatha' },
        { name: 'Ali Pur' },
        { name: 'Arifwala' },
        { name: 'Attock' },
        { name: 'Basti Malook' },
        { name: 'Bhagalchur' },
        { name: 'Bhalwal' },
        { name: 'Bahawalnagar' },
        { name: 'Bahawalpur' },
        { name: 'Bhaipheru' },
        { name: 'Bhakkar' },
        { name: 'Burewala' },
        { name: 'Chailianwala' },
        { name: 'Chakwal' },
        { name: 'Chichawatni' },
        { name: 'Chiniot' },
        { name: 'Chowk Azam' },
        { name: 'Chowk Sarwar Shaheed' },
        { name: 'Daska' },
        { name: 'Darya Khan' },
        { name: 'Dera Ghazi Khan' },
        { name: 'Derawar Fort' },
        { name: 'Dhaular' },
        { name: 'Dina City' },
        { name: 'Dinga' },
        { name: 'Dipalpur' },
        { name: 'Faisalabad' },
        { name: 'Fateh Jang' },
        { name: 'Gadar' },
        { name: 'Ghakhar Mandi' },
        { name: 'Gujranwala' },
        { name: 'Gujrat' },
        { name: 'Gujar Khan' },
        { name: 'Hafizabad' },
        { name: 'Haroonabad' },
        { name: 'Hasilpur' },
        { name: 'Haveli Lakha' },
        { name: 'Jampur' },
        { name: 'Jhang' },
        { name: 'Jhelum' },
        { name: 'Kalabagh' },
        { name: 'Karor Lal Esan' },
        { name: 'Kasur' },
        { name: 'Kamalia' },
        { name: 'Kamokey' },
        { name: 'Khanewal' },
        { name: 'Khanpur' },
        { name: 'Kharian' },
        { name: 'Khushab' },
        { name: 'Kot Addu' },
        { name: 'Jahania' },
        { name: 'Jalla Araain' },
        { name: 'Jauharabad' },
        { name: 'Laar' },
        { name: 'Lahore' },
        { name: 'Lalamusa' },
        { name: 'Layyah' },
        { name: 'Lodhran' },
        { name: 'Mamoori' },
        { name: 'Mandi Bahauddin' },
        { name: 'Makhdoom Aali' },
        { name: 'Mandi Warburton' },
        { name: 'Mailsi' },
        { name: 'Mian Channu' },
        { name: 'Minawala' },
        { name: 'Mianwali' },
        { name: 'Multan' },
        { name: 'Murree' },
        { name: 'Muridke' },
        { name: 'Muzaffargarh' },
        { name: 'Narowal' },
        { name: 'Okara' },
        { name: 'Renala Khurd' },
        { name: 'Rajan Pur' },
        { name: 'Pak Pattan' },
        { name: 'Panjgur' },
        { name: 'Pattoki' },
        { name: 'Pirmahal' },
        { name: 'Qila Didar Singh' },
        { name: 'Rabwah' },
        { name: 'Raiwind' },
        { name: 'Rajan Pur' },
        { name: 'Rahim Yar Khan' },
        { name: 'Rawalpindi' },
        { name: 'Rohri' },
        { name: 'Sadiqabad' },
        { name: 'Safdar Abad \u2013 (Dhaban Singh)' },
        { name: 'Sahiwal' },
        { name: 'Sangla Hill' },
        { name: 'Samberial' },
        { name: 'Sarai Alamgir' },
        { name: 'Sargodha' },
        { name: 'Shakargarh' },
        { name: 'Shafqat Shaheed Chowk' },
        { name: 'Sheikhupura' },
        { name: 'Sialkot' },
        { name: 'Sohawa' },
        { name: 'Sooianwala' },
        { name: 'Sundar (city)' },
        { name: 'Talagang' },
        { name: 'Tarbela' },
        { name: 'Takhtbai' },
        { name: 'Taxila' },
        { name: 'Toba Tek Singh' },
        { name: 'Vehari' },
        { name: 'Wah Cantonment' },
        { name: 'Wazirabad' },
        { name: 'Ali Bandar' },
        { name: 'Baden' },
        { name: 'Chachro' },
        { name: 'Dadu' },
        { name: 'Digri' },
        { name: 'Diplo' },
        { name: 'Dokri' },
        { name: 'Gadra' },
        { name: 'Ghanian' },
        { name: 'Ghauspur' },
        { name: 'Ghotki' },
        { name: 'Hala' },
        { name: 'Hyderabad' },
        { name: 'Islamkot' },
        { name: 'Jacobabad' },
        { name: 'Jamesabad' },
        { name: 'Jamshoro' },
        { name: 'Janghar' },
        { name: 'Jati (Mughalbhin)' },
        { name: 'Jhudo' },
        { name: 'Jungshahi' },
        { name: 'Kandiaro' },
        { name: 'Karachi' },
        { name: 'Kashmor' },
        { name: 'Keti Bandar' },
        { name: 'Khairpur' },
        { name: 'Khora' },
        { name: 'Klupro' },
        { name: 'Khokhropur' },
        { name: 'Korangi' },
        { name: 'Kotri' },
        { name: 'Kot Sarae' },
        { name: 'Larkana' },
        { name: 'Lund' },
        { name: 'Mathi' },
        { name: 'Matiari' },
        { name: 'Mehar' },
        { name: 'Mirpur Batoro' },
        { name: 'Mirpur Khas' },
        { name: 'Mirpur Sakro' },
        { name: 'Mithi' },
        { name: 'Mithani' },
        { name: 'Moro' },
        { name: 'Nagar Parkar' },
        { name: 'Naushara' },
        { name: 'Naudero' },
        { name: 'Noushero Feroz' },
        { name: 'Nawabshah' },
        { name: 'Nazimabad' },
        { name: 'Naokot' },
        { name: 'Pendoo' },
        { name: 'Pokran' },
        { name: 'Qambar' },
        { name: 'Qazi Ahmad' },
        { name: 'Ranipur' },
        { name: 'Ratodero' },
        { name: 'Rohri' },
        { name: 'Saidu Sharif' },
        { name: 'Sakrand' },
        { name: 'Sanghar' },
        { name: 'Shadadkhot' },
        { name: 'Shahbandar' },
        { name: 'Shahdadpur' },
        { name: 'Shahpur Chakar' },
        { name: 'Shikarpur' },
        { name: 'Sujawal' },
        { name: 'Sukkur' },
        { name: 'Tando Adam' },
        { name: 'Tando Allahyar' },
        { name: 'Tando Bago' },
        { name: 'Tar Ahamd Rind' },
        { name: 'Thatta' },
        { name: 'Tujal' },
        { name: 'Umarkot' },
        { name: 'Veirwaro' },
        { name: 'Warah' }
      ];
    // Public API
    factory.getLocationz = function () {
      return locationz;
    };
    return factory;
  }]);'use strict';
angular.module('static-factories').factory('Studyfields', [function () {
    // Industries service logic
    // ...
    var factory = {};
    var studyfields = [
        {
          group: 'bac',
          name: 'Bachelor of Architecture'
        },
        {
          group: 'bac',
          name: 'Bachelor of Biomedical Science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Business Administration'
        },
        {
          group: 'bac',
          name: 'Bachelor of Clinical Science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Commerce'
        },
        {
          group: 'bac',
          name: 'Bachelor of Computer Information Systems'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Construction Technology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Criminal Justice'
        },
        {
          group: 'bac',
          name: 'Bachelor of Divinity'
        },
        {
          group: 'bac',
          name: 'Bachelor of Economics'
        },
        {
          group: 'bac',
          name: 'Bachelor of Education'
        },
        {
          group: 'bac',
          name: 'Bachelor of Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Fine Arts'
        },
        {
          group: 'bac',
          name: 'Bachelor of Information Systems'
        },
        {
          group: 'bac',
          name: 'Bachelor of Management'
        },
        {
          group: 'bac',
          name: 'Bachelor of Music'
        },
        {
          group: 'bac',
          name: 'Bachelor of Pharmacy'
        },
        {
          group: 'bac',
          name: 'Bachelor of Philosophy'
        },
        {
          group: 'bac',
          name: 'Bachelor of Social Work'
        },
        {
          group: 'bac',
          name: 'Bachelor of Accountancy'
        },
        {
          group: 'bac',
          name: 'Bachelor of Arts in American Studies'
        },
        {
          group: 'bac',
          name: 'Bachelor of Arts in American Indian Studies'
        },
        {
          group: 'bac',
          name: 'Bachelor of Arts in Applied Psychology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Arts in Biology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Arts in Anthropology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Arts in Child Advocacy'
        },
        {
          group: 'bac',
          name: 'Bachelor of Arts in Clinical Psychology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Arts in Forensic Psychology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Arts in Organizational Psychology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Aerospace Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Actuarial'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Agriculture'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Architecture'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Architectural Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Biology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Biomedical Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Business Administration'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Chemical Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Chemistry'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Civil Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Clinical Laboratory Science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Cognitive Science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Computer Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Computer Science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Construction Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Construction Management'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Criminal Justice'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Criminology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Diagnostic Radiography'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Education'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Electrical Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Engineering Physics'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Engineering Science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Engineering Technology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in English Literature'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Environmental Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Environmental Science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Environmental Studies'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Food Science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Foreign Service'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Forensic Science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Forestry'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in History'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Hospitality Management'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Human Resources Management'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Industrial Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Information Technology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Information Systems'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Integrated Science, Business and Technology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in International Relations'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Journalism'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Management'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Manufacturing Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Marketing'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Mathematics'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Mechanical Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Medical Technology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Meteorology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Microbiology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Mining Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Molecular Biology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Neuroscience'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Nursing'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Nutrition science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Software Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Petroleum Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Podiatry'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Pharmacology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Pharmacy'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Physical Therapy'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Physics'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Plant Science'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Politics'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Psychology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Quantity Surveying Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Radiologic Technology'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Real-Time Interactive Simulation'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Religion'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Respiratory Therapy'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Risk Management and Insurance'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Science Education'
        },
        {
          group: 'bac',
          name: 'Bachelor of Science in Systems Engineering'
        },
        {
          group: 'bac',
          name: 'Bachelor of Music in Jazz Studies'
        },
        {
          group: 'bac',
          name: 'Bachelor of Music in Composition'
        },
        {
          group: 'bac',
          name: 'Bachelor of Music in Performance'
        },
        {
          group: 'bac',
          name: 'Bachelor of Music in Theory'
        },
        {
          group: 'bac',
          name: 'Bachelor of Music in Music Education'
        },
        {
          group: 'bac',
          name: 'Bachelor of Sports Management'
        },
        {
          group: 'mas',
          name: 'Master by Research'
        },
        {
          group: 'mas',
          name: 'Master of Accountancy'
        },
        {
          group: 'mas',
          name: 'Master of Advanced Study'
        },
        {
          group: 'mas',
          name: 'Master of Applied Mathematical Sciences'
        },
        {
          group: 'mas',
          name: 'Master of Applied Science'
        },
        {
          group: 'mas',
          name: 'Master of Architecture'
        },
        {
          group: 'mas',
          name: 'Master of Arts'
        },
        {
          group: 'mas',
          name: 'Master of Arts in Liberal Studies'
        },
        {
          group: 'mas',
          name: 'Master of Arts in Strategic Communication Management'
        },
        {
          group: 'mas',
          name: 'Master of Arts in Teaching'
        },
        {
          group: 'mas',
          name: 'Master of Bioinformatics'
        },
        {
          group: 'mas',
          name: 'Master of Business Administration'
        },
        {
          group: 'mas',
          name: 'Master of Business'
        },
        {
          group: 'mas',
          name: 'Master of Business Economics'
        },
        {
          group: 'mas',
          name: 'Master of Business Engineering'
        },
        {
          group: 'mas',
          name: 'Master of Business Informatics'
        },
        {
          group: 'mas',
          name: 'Master of Chemistry'
        },
        {
          group: 'mas',
          name: 'Master of City Planning'
        },
        {
          group: 'mas',
          name: 'Master of Commerce'
        },
        {
          group: 'mas',
          name: 'Master of Computational Finance'
        },
        {
          group: 'mas',
          name: 'Master of Computer Applications'
        },
        {
          group: 'mas',
          name: 'Master of Computer Science'
        },
        {
          group: 'mas',
          name: 'Master of Communication'
        },
        {
          group: 'mas',
          name: 'Master of Counselling'
        },
        {
          group: 'mas',
          name: 'Master of Criminal Justice'
        },
        {
          group: 'mas',
          name: 'Master in Creative Technologies'
        },
        {
          group: 'mas',
          name: 'Master of Design'
        },
        {
          group: 'mas',
          name: 'Master of Divinity'
        },
        {
          group: 'mas',
          name: 'Master of Economics'
        },
        {
          group: 'mas',
          name: 'Master of Education'
        },
        {
          group: 'mas',
          name: 'Master of Educational Technology'
        },
        {
          group: 'mas',
          name: 'Master of Engineering'
        },
        {
          group: 'mas',
          name: 'Master of Engineering Management'
        },
        {
          group: 'mas',
          name: 'Master of Enterprise'
        },
        {
          group: 'mas',
          name: 'Master of European Law'
        },
        {
          group: 'mas',
          name: 'Master of Finance'
        },
        {
          group: 'mas',
          name: 'Master of Financial Economics'
        },
        {
          group: 'mas',
          name: 'Master of Financial Engineering'
        },
        {
          group: 'mas',
          name: 'Master of Financial Mathematics'
        },
        {
          group: 'mas',
          name: 'Master of Fine Arts'
        },
        {
          group: 'mas',
          name: 'Master of Health Administration'
        },
        {
          group: 'mas',
          name: 'Master of Health Science'
        },
        {
          group: 'mas',
          name: 'Master of Humanities'
        },
        {
          group: 'mas',
          name: 'Master of Industrial and Labor Relations'
        },
        {
          group: 'mas',
          name: 'Master of International Affairs'
        },
        {
          group: 'mas',
          name: 'Master of International Business'
        },
        {
          group: 'mas',
          name: 'Masters in International Economics'
        },
        {
          group: 'mas',
          name: 'Master of International Public Policy'
        },
        {
          group: 'mas',
          name: 'Master of International Studies'
        },
        {
          group: 'mas',
          name: 'Master of Information'
        },
        {
          group: 'mas',
          name: 'Master of Information Management'
        },
        {
          group: 'mas',
          name: 'Master of Information System Management'
        },
        {
          group: 'mas',
          name: 'Master of Islamic Studies'
        },
        {
          group: 'mas',
          name: 'Master of IT'
        },
        {
          group: 'mas',
          name: 'Master of Jurisprudence'
        },
        {
          group: 'mas',
          name: 'Master of Laws'
        },
        {
          group: 'mas',
          name: 'Master of Studies in Law'
        },
        {
          group: 'mas',
          name: 'Master of Landscape Architecture'
        },
        {
          group: 'mas',
          name: 'Master of Letters'
        },
        {
          group: 'mas',
          name: 'Master of Liberal Arts'
        },
        {
          group: 'mas',
          name: 'Master of Library and Information Science'
        },
        {
          group: 'mas',
          name: 'Master of Management'
        },
        {
          group: 'mas',
          name: 'Master of Mass Communication and Journalism'
        },
        {
          group: 'mas',
          name: 'Master of Mathematical Finance'
        },
        {
          group: 'mas',
          name: 'Master of Mathematics'
        },
        {
          group: 'mas',
          name: 'Master of Mathematics and Computer Science'
        },
        {
          group: 'mas',
          name: 'Master of Mathematics and Philosophy'
        },
        {
          group: 'mas',
          name: 'Master of Medical Science'
        },
        {
          group: 'mas',
          name: 'Master of Medicine'
        },
        {
          group: 'mas',
          name: 'Masters of Military Art and Science'
        },
        {
          group: 'mas',
          name: 'Master of Music'
        },
        {
          group: 'mas',
          name: 'Master of Network and Communications Management'
        },
        {
          group: 'mas',
          name: 'Master of Occupational Therapy'
        },
        {
          group: 'mas',
          name: 'Master of Pharmacy'
        },
        {
          group: 'mas',
          name: 'Master of Philosophy'
        },
        {
          group: 'mas',
          name: 'Master of Physician Assistant Studies'
        },
        {
          group: 'mas',
          name: 'Master of Physics'
        },
        {
          group: 'mas',
          name: 'Master of Political Science'
        },
        {
          group: 'mas',
          name: 'Master of Professional Studies'
        },
        {
          group: 'mas',
          name: 'Master of Public Administration'
        },
        {
          group: 'mas',
          name: 'Master of Public Affairs'
        },
        {
          group: 'mas',
          name: 'Master of Public Diplomacy'
        },
        {
          group: 'mas',
          name: 'Master of Public Health'
        },
        {
          group: 'mas',
          name: 'Master of Public Management'
        },
        {
          group: 'mas',
          name: 'Master of Public Policy'
        },
        {
          group: 'mas',
          name: 'Master of Public Relations'
        },
        {
          group: 'mas',
          name: 'Master of Public Service'
        },
        {
          group: 'mas',
          name: 'Master of Quantitative Finance'
        },
        {
          group: 'mas',
          name: 'Master of Rabbinic Studies'
        },
        {
          group: 'mas',
          name: 'Master of Real Estate Development'
        },
        {
          group: 'mas',
          name: 'Master of Religious Education'
        },
        {
          group: 'mas',
          name: 'Master of Research'
        },
        {
          group: 'mas',
          name: 'Master of Sacred Music'
        },
        {
          group: 'mas',
          name: 'Master of Sacred Theology'
        },
        {
          group: 'mas',
          name: 'Master of Science'
        },
        {
          group: 'mas',
          name: 'Master of Science in Applied Cognition and Neuroscience'
        },
        {
          group: 'mas',
          name: 'Master of Science in Bioinformatics'
        },
        {
          group: 'mas',
          name: 'Master of Science in Clinical Epidemiology'
        },
        {
          group: 'mas',
          name: 'Master of Science in Computing Research'
        },
        {
          group: 'mas',
          name: 'Master of Science in Cyber Security'
        },
        {
          group: 'mas',
          name: 'Master of Science in Education'
        },
        {
          group: 'mas',
          name: 'Master of Science in Engineering'
        },
        {
          group: 'mas',
          name: 'Master of Science in Development Administration'
        },
        {
          group: 'mas',
          name: 'Master of Science in Finance'
        },
        {
          group: 'mas',
          name: 'Master of Science in Governance & Organizational Sciences'
        },
        {
          group: 'mas',
          name: 'Master of Science in Government Contracts'
        },
        {
          group: 'mas',
          name: 'Master of Science in Health Informatics'
        },
        {
          group: 'mas',
          name: 'Master of Science in Human Resource Development'
        },
        {
          group: 'mas',
          name: 'Master of Science in Information Assurance'
        },
        {
          group: 'mas',
          name: 'Master of Science in Information Systems'
        },
        {
          group: 'mas',
          name: 'Master of Science in Information Technology'
        },
        {
          group: 'mas',
          name: 'Master of Science in Leadership'
        },
        {
          group: 'mas',
          name: 'Master of Science in Management'
        },
        {
          group: 'mas',
          name: 'Master of Science in Nursing'
        },
        {
          group: 'mas',
          name: 'Master of Science in Project Management'
        },
        {
          group: 'mas',
          name: 'Master of Science in Quality Assurance'
        },
        {
          group: 'mas',
          name: 'Master of Science in Risk Management'
        },
        {
          group: 'mas',
          name: 'Master of Science in Supply Chain Management'
        },
        {
          group: 'mas',
          name: 'Master of Science in Teaching'
        },
        {
          group: 'mas',
          name: 'Master of Science in Taxation'
        },
        {
          group: 'mas',
          name: 'Master of Social Science'
        },
        {
          group: 'mas',
          name: 'Master of Social Work'
        },
        {
          group: 'mas',
          name: 'Master of Statistics'
        },
        {
          group: 'mas',
          name: 'Master of Studies'
        },
        {
          group: 'mas',
          name: 'Master of Surgery'
        },
        {
          group: 'mas',
          name: 'Master of Theological Studies'
        },
        {
          group: 'mas',
          name: 'Master of Technology'
        },
        {
          group: 'mas',
          name: 'Master of Theology'
        },
        {
          group: 'mas',
          name: 'Master of Urban Planning'
        },
        {
          group: 'mas',
          name: 'Master of Veterinary Science'
        },
        {
          group: 'doc',
          name: 'Doctor of Business Administration'
        },
        {
          group: 'doc',
          name: 'Doctor of Canon Law'
        },
        {
          group: 'doc',
          name: 'Doctor of Chiropractic'
        },
        {
          group: 'doc',
          name: 'Doctor of Commerce'
        },
        {
          group: 'doc',
          name: 'Doctor of Dental Surgery'
        },
        {
          group: 'doc',
          name: 'Doctor of Divinity'
        },
        {
          group: 'doc',
          name: 'Doctor of Education'
        },
        {
          group: 'doc',
          name: 'Doctor of Engineering'
        },
        {
          group: 'doc',
          name: 'Doctor of Health Administration'
        },
        {
          group: 'doc',
          name: 'Doctor of Health Science'
        },
        {
          group: 'doc',
          name: 'Doctor of Juridical Science'
        },
        {
          group: 'doc',
          name: 'Doctor of Law'
        },
        {
          group: 'doc',
          name: 'Doctor of Liberal Studies'
        },
        {
          group: 'doc',
          name: 'Doctor of Management'
        },
        {
          group: 'doc',
          name: 'Doctor of Medicine'
        },
        {
          group: 'doc',
          name: 'Doctor of Ministry'
        },
        {
          group: 'doc',
          name: 'Doctor of Musical Arts'
        },
        {
          group: 'doc',
          name: 'Doctor of Naturopathic Medicine'
        },
        {
          group: 'doc',
          name: 'Doctor of Optometry'
        },
        {
          group: 'doc',
          name: 'Doctor of Osteopathic Medicine'
        },
        {
          group: 'doc',
          name: 'Doctor of Pharmacy'
        },
        {
          group: 'doc',
          name: 'Doctor of Philosophy'
        },
        {
          group: 'doc',
          name: 'Doctor of Public Administration'
        },
        {
          group: 'doc',
          name: 'Doctor of Science'
        },
        {
          group: 'doc',
          name: 'Doctor of Theology'
        },
        {
          group: 'doc',
          name: 'Doctor of Veterinary Medicine'
        }
      ];
    // Public API
    factory.getStudyFields = function () {
      return studyfields;
    };
    return factory;
  }]);'use strict';
//Setting up route
angular.module('threads').config([
  '$stateProvider',
  function ($stateProvider) {
    // Threads state routing
    $stateProvider.state('listThreads', {
      url: '/threads',
      templateUrl: 'modules/threads/views/list-threads.client.view.html'
    }).state('createThread', {
      url: '/threads/create',
      templateUrl: 'modules/threads/views/create-thread.client.view.html'
    }).state('viewThread', {
      url: '/threads/:threadId',
      templateUrl: 'modules/threads/views/view-thread.client.view.html'
    }).state('editThread', {
      url: '/threads/:threadId/edit',
      templateUrl: 'modules/threads/views/edit-thread.client.view.html'
    });
  }
]);'use strict';
// Threads controller
angular.module('threads').controller('ThreadsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Threads',
  '$http',
  'Socket',
  '$rootScope',
  function ($scope, $stateParams, $location, Authentication, Threads, $http, Socket, $rootScope) {
    $scope.authentication = Authentication;
    $scope.color = 'color:green';
    $scope.color2 = 'color:red';
    Socket.on('i_am_here', function (data) {
      for (var x = 0, b = $scope.thread.messages.length; x < b; x++) {
        if ($scope.thread.messages[x].author._id === data.userId)
          $scope.thread.messages[x].author.isOnline = data.isOnline == 'Online' ? true : false;
        if ($scope.thread.messages[x].author.authorid == data.userId)
          $scope.thread.messages[x].author.isOnline = data.isOnline == 'Online' ? true : false;
      }
    });
    //socket incoming_thread start
    Socket.on('incoming_thread', function (data) {
      $http.put('/threads/getUserThread/' + $stateParams.threadId, { id: $scope.authentication.user._id }).success(function (thread) {
        Socket.emit('watched_thread', $scope.authentication.user._id);
      });
      $scope.thread.messages.push({
        messageBody: data.messageBody,
        author: {
          authorid: data.id,
          displayName: data.author,
          picture_url: data.authordp,
          isOnline: 'Online'
        },
        created: data.created
      });
    });
    //socket incoming_thread end
    // $scope.$on("$destroy", function handler() 
    //    {
    //     if($scope.thread.sender._id===$scope.authentication.user._id)
    //         $http.put('/users/deleteSubscriber/'+$scope.authentication.user._id,{id:$scope.thread.receiver._id}).success(function(){});                     
    //     else
    //           $http.put('/users/deleteSubscriber/'+$scope.authentication.user._id,{id:$scope.thread.sender._id}).success(function(){});                     
    //    });
    $scope.showOnline = function (data) {
      if (data.author.isOnline == 'Online')
        return true;
      else
        return false;
    };
    $scope.showOffline = function (data) {
      if (data.author.isOnline == 'Online')
        return false;
      else
        return true;
    };
    // Create new Thread
    $scope.create = function () {
      // Create new Thread object
      var thread = new Threads({ name: this.name });
      // Redirect after save
      thread.$save(function (response) {
        $location.path('threads/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Thread
    $scope.remove = function (thread) {
      if (thread) {
        thread.$remove();
        for (var i in $scope.threads) {
          if ($scope.threads[i] === thread) {
            $scope.threads.splice(i, 1);
          }
        }
      } else {
        $scope.thread.$remove(function () {
          $location.path('threads');
        });
      }
    };
    $scope.sendMessage = function () {
      var threadId = $scope.thread._id;
      console.log('{Thread} {SendMessage} running' + ' THREAD ID' + threadId);
      var message = {
          threadId: $scope.thread._id,
          messageBody: $scope.messageBody,
          author: $scope.authentication.user
        };
      console.log('USER ID:' + $scope.authentication.user._id + ' Sender ID' + $scope.thread.sender + ' Receiver ID:' + $scope.thread.receiver);
      //
      if ($scope.authentication.user._id == $scope.thread.sender._id) {
        var thread = {
            idc: threadId,
            sender: { displayName: $scope.authentication.user.displayName },
            receiver: $scope.thread.receiver._id,
            messages: { created: Date.now() }
          };
        Socket.emit('message_sent_from', { message: thread });
      } else {
        var thread = {
            idc: threadId,
            sender: { displayName: $scope.authentication.user.displayName },
            receiver: $scope.thread.sender._id,
            messages: [{ created: Date.now() }]
          };
        Socket.emit('message_sent_from', { message: thread });
      }
      $http.put('/threads/updateThread/' + $scope.thread._id, message).success(function (messageBody) {
        Socket.emit('update_threads', {
          sender: messageBody.sender,
          receiver: messageBody.receiver,
          threadId: $scope.thread._id,
          messageBody: $scope.messageBody,
          author: $scope.authentication.user,
          authordp: $scope.authentication.user.picture_url,
          created: Date.now()
        });
        $scope.messageBody = '';
      });
    };
    // Update existing Thread
    $scope.update = function () {
      var thread = $scope.thread;
      thread.$update(function () {
        $location.path('threads/' + thread._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Threads
    $scope.find = function () {
      $scope.threads = Threads.query();
    };
    // Find a list of Threads
    $scope.findUserThreads = function () {
      console.log('FINDUSERTHREADS RAN');
      $http.get('/threads/getUserThreads/' + $scope.authentication.user._id).success(function (threads) {
        $scope.threads = threads;
      });
    };
    // Find existing Thread
    $scope.findOne = function () {
      $scope.thread = Threads.get({ threadId: $stateParams.threadId });
      Socket.emit('watched_thread', 'iraq');
    };
    //chatting html view aka view-thread.client.view.html
    $scope.findOneAndMarkAsRead = function () {
      $http.put('/threads/getUserThread/' + $stateParams.threadId, { id: $scope.authentication.user._id }).success(function (thread) {
        $scope.thread = thread;
        console.log(thread.sender._id);
        if (thread.sender._id === $scope.authentication.user._id)
          $http.put('/users/addSubscriber/' + $scope.authentication.user._id, { id: thread.receiver._id }).success(function () {
          });
        else
          $http.put('/users/addSubscriber/' + $scope.authentication.user._id, { id: thread.sender._id }).success(function () {
          });
        Socket.emit('watched_thread', $scope.authentication.user._id);
      });
    };
    $scope.cancelCompose = function () {
      $scope.isCompose = false;
    };
    $scope.startCompose = function () {
      $scope.isCompose = true;
    };
    // Check / Uncheck All
    $scope.checkAll = function () {
      for (var i = 0; i < $scope.threads.length; i++) {
        $scope.threads[i].selected = $scope.allChecked;
      }
    };
    // Change the status of the 'Check All' checkbox
    // According to the other checkboxes
    $scope.changeCheckAll = function () {
      for (var i = 0; i < $scope.threads.length; i++) {
        // If there is an unchecked input
        // Change the status and exit the function
        if (!$scope.threads[i].selected) {
          $scope.allChecked = false;
          return false;
        }
      }
      // If all are checked
      $scope.allChecked = true;
    };
  }
]);'use strict';
//Threads service used to communicate Threads REST endpoints
angular.module('threads').factory('Threads', [
  '$resource',
  function ($resource) {
    return $resource('threads/:threadId', { threadId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/signin.client.view.html'
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invlaid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  '$state',
  function ($scope, $http, $location, Authentication, $state) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        console.log($scope.authentication.user);
        //And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    //be sure to inject $scope and $location
    var changeLocation = function (url, forceReload) {
      $scope = $scope || angular.element(document).scope();
      if (forceReload || $scope.$$phase) {
        window.location = url;
      } else {
        //only use this if you want to replace the history stack
        //$location.path(url).replace();
        //this this if you want to change the URL and add it to the history stack
        $location.path(url);
        $scope.$apply();
      }
    };
    $scope.signin = function () {
      console.log('SIGNINGWTF' + $scope.credentials);
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        console.log(response);
        //And redirect to the index page
        // $location.path('/');
        changeLocation('/');
      }).error(function (response) {
        console.log(response.message);
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;
      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };
    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;
        // Attach user profile
        Authentication.user = response;
        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function () {
      $scope.success = $scope.error = null;
      var user = new Users($scope.user);
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);