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
        'textAngular'
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
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('candidates');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('companies');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('employer-company');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('employers');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('empoyer-jobs');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('jobs');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('messages');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('short-list');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('static-factories');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
//Setting up route
angular.module('candidate-features').config([
  '$stateProvider',
  function ($stateProvider) {
    // Candidate features state routing
    $stateProvider.state('edit-cv', {
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
    $scope.countries = Countries.getCountries();
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
    $scope.newSkill = {
      title: '',
      experience: 1,
      level: 'Beginner'
    };
    $scope.openSkillModal = function (skill) {
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
              $http.post('/candidates/deleteSkill', cSkill).success(function (response) {
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
              if (cSkill._id === skill._id)
                cSkill.title = skill.title;
            });
          } else {
            $scope.candidate.skills.push(skill);
            $scope.newSkill = {
              title: '',
              experience: 1,
              level: 'Beginner'
            };
          }
        }
      }, function () {
      });
    };
    $scope.openPictureModal = function () {
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
]).controller('PictureModalCtrl', [
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
        url: '/uploadpicture',
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
        skill: $scope.skill
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
        Socket.emit('applied_on_job', {
          job: job,
          candidate: $scope.candidate
        });
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
    $stateProvider.state('home', {
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
angular.module('core').controller('HeaderController', [
  '$scope',
  'Socket',
  'Authentication',
  'Menus',
  function ($scope, Socket, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    Socket.on('message_sent', function (data) {
      if (data.message.recieverId === $scope.authentication.user._id)
        var thread = {
            senderName: 'Ch. Rehmat Ali',
            subject: data.message.subject,
            created: Date.now(),
            messages: [{ messageBody: data.message.messageBody }]
          };
      $scope.authentication.user.threads.push(thread);
      $scope.$apply();  // alert(data.message.subject + ' --------------> ' + data.message.messageBody);
    });
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
  'Authentication',
  '$state',
  '$rootScope',
  'Employers',
  'Companies',
  'Candidates',
  'Socket',
  function ($scope, Authentication, $state, $rootScope, Employers, Companies, Candidates, Socket) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    var user = $scope.authentication.user;
    Socket.emit('message', { message: 'message' });
    Socket.on('entrance', function (data) {
      console.log(data);
      Socket.emit('my other event', { my: 'data' });
    });
    Socket.on('exit', function (data) {
      console.log(data);
      Socket.emit('my other event', { my: 'data' });
    });
    Socket.on('applied_on_job', function (data) {
      console.log(data.candidate.displayName + ' applied on job : ' + data.job.title);
      if (user.userType === 'employer')
        alert(data.candidate.displayName + ' applied on job : ' + data.job.title);
    });
    if (!user)
      $state.go('home');
    else if (user.userType === 'employer') {
      $rootScope.employer = Employers.get({ employerId: $scope.authentication.user.employer }, function (employer) {
        $rootScope.company = Companies.get({ companyId: employer.company });
      });
      $state.go('employerDashboard');
    } else if (user.userType === 'candidate') {
      $scope.candidate = Candidates.get({ candidate: $scope.authentication.user.candidate });
      $state.go('candidate-home');
    }
  }
]);'use strict';
angular.module('core').directive('collapseNav', [function () {
    return {
      restrict: 'A',
      compile: function (ele, attrs) {
        var $a, $aRest, $lists, $listsRest;
        $lists = ele.find('ul').parent('li');
        $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>');
        $a = $lists.children('a');
        $listsRest = ele.children('li').not($lists);
        $aRest = $listsRest.children('a');
        $a.on('click', function (event) {
          var $parent, $this;
          $this = $(this);
          $parent = $this.parent('li');
          $lists.not($parent).removeClass('open').find('ul').slideUp();
          $parent.toggleClass('open').find('ul').slideToggle();
          return event.preventDefault();
        });
        return $aRest.on('click', function (event) {
          return $lists.removeClass('open').find('ul').slideUp();
        });
      }
    };
  }]).directive('highlightActive', [function () {
    return {
      restrict: 'A',
      controller: [
        '$scope',
        '$element',
        '$attrs',
        '$location',
        function ($scope, $element, $attrs, $location) {
          var highlightActive, links, path;
          links = $element.find('a');
          path = function () {
            return $location.path();
          };
          highlightActive = function (links, path) {
            path = '#!' + path;
            return angular.forEach(links, function (link) {
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
          return $scope.$watch(path, function (newVal, oldVal) {
            if (newVal === oldVal) {
              return;
            }
            return highlightActive(links, $location.path());
          });
        }
      ]
    };
  }]).directive('toggleOffCanvas', [function () {
    return {
      restrict: 'A',
      link: function (scope, ele, attrs) {
        return ele.on('click', function () {
          return $('#app').toggleClass('on-canvas');
        });
      }
    };
  }]).directive('slimScroll', [function () {
    return {
      restrict: 'A',
      link: function (scope, ele, attrs) {
        return ele.slimScroll({ height: '100%' });
      }
    };
  }]);'use strict';
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
angular.module('core').factory('Socket', [function () {
    var socket = io.connect('http://muddaser-pc:3000');
    return socket;
  }]);'use strict';
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
    });
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
    // Update existing Employer
    $scope.update = function () {
      var employer = $scope.employer;
      employer.$update(function () {
        $location.path('employer-profile-view');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
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
    $stateProvider.state('employer-job-candidates', {
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
  function ($scope, Authentication, Jobs, Employers, Companies, $location) {
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
  }
]);'use strict';
angular.module('empoyer-jobs').controller('EmployerJobCandidatesController', [
  '$scope',
  '$filter',
  'Jobs',
  '$stateParams',
  '$http',
  function ($scope, $filter, Jobs, $stateParams, $http) {
    $scope.locationFilters = [];
    $scope.salaryFilters = [];
    $scope.visaFilters = [];
    $scope.employeetypeFilters = [];
    $scope.employeestatusFilters = [];
    $scope.isShortListed = function (candidate) {
      // job.candidates = [];
      // job.shortListedCandidates = [];
      return false;
    };
    $http.get('jobs/candidates/' + $stateParams.jobId).success(function (job) {
      $scope.job = job;
      $scope.candidates = job.candidates;
      $scope.filteredCandidates = $scope.candidates;
      populateLocationFilters();
      populateSalaryFilters();
      populateVisaFilters();
      populateEmployeetypeFilters();
      populateEmployeestatusFilters();
    });
    // $http.get('jobs/candidates/' + $stateParams.jobId).success(function(job) {
    // 	$scope.job = job;
    // 	$scope.candidates = job.candidates;
    // 	$scope.filteredCandidates = $scope.candidates;
    // Add to Short List
    $scope.addCandidateToShortList = function (candidate) {
      var attribute = {
          jobId: $scope.job._id,
          candidateId: candidate._id
        };
      $http.put('jobs/addToShortList/' + $scope.job._id, attribute).success(function (response) {
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
        //And redirect to the index page
        $location.path('jobs/' + job._id);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // });
    // $scope.search.name = 'Rawalpindi';
    var populateLocationFilters = function () {
      $scope.candidates = $filter('orderBy')($scope.candidates, 'location');
      var filterValue = 'invalid_value';
      for (var i = 0; i < $scope.candidates.length; i++) {
        var candidate = $scope.candidates[i];
        if (candidate.location !== filterValue) {
          filterValue = candidate.location;
          $scope.locationFilters.push({
            name: filterValue,
            count: 0,
            value: false
          });
        }
        $scope.locationFilters[$scope.locationFilters.length - 1].count++;
      }
    };
    var populateSalaryFilters = function () {
      $scope.candidates = $filter('orderBy')($scope.candidates, 'salary_expectation');
      var filterValue = 'invalid_value';
      for (var i = 0; i < $scope.candidates.length; i++) {
        var candidate = $scope.candidates[i];
        if (candidate.salary_expectation !== filterValue) {
          filterValue = candidate.salary_expectation;
          $scope.salaryFilters.push({
            name: filterValue,
            count: 0,
            value: false
          });
        }
        $scope.salaryFilters[$scope.salaryFilters.length - 1].count++;
      }
    };
    var populateVisaFilters = function () {
      $scope.candidates = $filter('orderBy')($scope.candidates, 'visa_status');
      var filterValue = 'invalid_value';
      for (var i = 0; i < $scope.candidates.length; i++) {
        var candidate = $scope.candidates[i];
        if (candidate.visa_status !== filterValue) {
          filterValue = candidate.visa_status;
          $scope.visaFilters.push({
            name: filterValue,
            count: 0,
            value: false
          });
        }
        $scope.visaFilters[$scope.visaFilters.length - 1].count++;
      }
    };
    var populateEmployeetypeFilters = function () {
      $scope.candidates = $filter('orderBy')($scope.candidates, 'visa_status');
      var filterValue = 'invalid_value';
      for (var i = 0; i < $scope.candidates.length; i++) {
        var candidate = $scope.candidates[i];
        if (candidate.visa_status !== filterValue) {
          filterValue = candidate.visa_status;
          $scope.visaFilters.push({
            name: filterValue,
            count: 0,
            value: false
          });
        }
        $scope.employeetypeFilters[$scope.employeetypeFilters.length - 1].count++;
      }
    };
    var populateEmployeestatusFilters = function () {
      $scope.candidates = $filter('orderBy')($scope.candidates, 'employee_status');
      var filterValue = 'invalid_value';
      for (var i = 0; i < $scope.candidates.length; i++) {
        var candidate = $scope.candidates[i];
        if (candidate.employee_status !== filterValue) {
          filterValue = candidate.employee_status;
          $scope.employeestatusFilters.push({
            name: filterValue,
            count: 0,
            value: false
          });
        }
        $scope.visaFilters[$scope.visaFilters.length - 1].count++;
      }
    };
    var populateEmployeetypeFilters = function () {
      $scope.candidates = $filter('orderBy')($scope.candidates, 'employee_type');
      var filterValue = 'invalid_value';
      for (var i = 0; i < $scope.candidates.length; i++) {
        var candidate = $scope.candidates[i];
        if (candidate.employee_type !== filterValue) {
          filterValue = candidate.employee_type;
          $scope.employeetypeFilters.push({
            name: filterValue,
            count: 0,
            value: false
          });
        }
        $scope.employeetypeFilters[$scope.employeetypeFilters.length - 1].count++;
      }
    };
    var populateEmployeestatusFilters = function () {
      $scope.candidates = $filter('orderBy')($scope.candidates, 'employee_status');
      var filterValue = 'invalid_value';
      for (var i = 0; i < $scope.candidates.length; i++) {
        var candidate = $scope.candidates[i];
        if (candidate.employee_status !== filterValue) {
          filterValue = candidate.employee_status;
          $scope.employeestatusFilters.push({
            name: filterValue,
            count: 0,
            value: false
          });
        }
        $scope.employeestatusFilters[$scope.employeestatusFilters.length - 1].count++;
      }
    };
  }
]);'use strict';
angular.module('empoyer-jobs').controller('PostJobController', [
  '$scope',
  'Industries',
  'Countries',
  'Studyfields',
  '$location',
  'Authentication',
  'Jobs',
  function ($scope, Industries, Countries, Studyfields, $location, Authentication, Jobs) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/signin');
    $scope.industries = Industries.getIndustries();
    // $scope.industry =$scope.industries[0].name;
    $scope.countries = Countries.getCountries();
    $scope.studyFields = Studyfields.getStudyFields();
    // $scope.texting = IndustriesFactory.sayHello('world');
    $scope.skills = [];
    $scope.skills.push({ title: '' });
    $scope.certificates = [];
    $scope.certificates.push({ name: '' });
    // Create new Job
    $scope.create = function () {
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
          certificates: this.certificates
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
      $scope.skills.push({ title: '' });
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
//Setting up route
angular.module('short-list').config([
  '$stateProvider',
  function ($stateProvider) {
    // Short list state routing
    $stateProvider.state('shortlisted-candidates', {
      url: '/shortlisted-candidates/:jobId',
      templateUrl: 'modules/short-list/views/shortlisted-candidates.client.view.html'
    });
  }
]);'use strict';
angular.module('short-list').controller('messageController', [
  '$scope',
  'Socket',
  '$modalInstance',
  '$http',
  'reciever',
  'Authentication',
  function ($scope, Socket, $modalInstance, $http, reciever, Authentication) {
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
    // Remove from Short List
    $scope.sendMessage = function (message) {
      var attribute = {
          recieverId: $scope.reciever.user,
          subject: message.subject,
          messageBody: message.messageBody
        };
      $http.put('/users/sendMessage/' + $scope.user._id, attribute).success(function (response) {
        Socket.emit('message_sent', { message: attribute });
        $modalInstance.dismiss('cancel');  // $location.path('jobs/' + job._id);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('short-list').controller('ShortlistedCandidatesController', [
  '$scope',
  '$http',
  '$stateParams',
  '$modal',
  function ($scope, $http, $stateParams, $modal) {
    // Controller Logic
    // ...
    $http.get('jobs/shortListedCandidates/' + $stateParams.jobId).success(function (job) {
      $scope.job = job;
      $scope.shortListedObjects = job.shortListedCandidates;  // $scope.filteredCandidates = $scope.candidates;
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
angular.module('static-factories').factory('Countries', [function () {
    // Industries service logic
    // ...
    var factory = {};
    var countries = [
        { name: 'Afghanistan' },
        { name: 'Albania' },
        { name: 'Algeria' },
        { name: 'American Samoa' },
        { name: 'Andorra' },
        { name: 'Angola' },
        { name: 'Anguilla' },
        { name: 'Antarctica' },
        { name: 'Antigua and Barbuda' },
        { name: 'Argentina' },
        { name: 'Armenia' },
        { name: 'Aruba' },
        { name: 'Australia' },
        { name: 'Austria' },
        { name: 'Azerbaijan' },
        { name: 'Bahamas' },
        { name: 'Bahrain' },
        { name: 'Bangladesh' },
        { name: 'Barbados' },
        { name: 'Belarus' },
        { name: 'Belgium' },
        { name: 'Belize' },
        { name: 'Benin' },
        { name: 'Bermuda' },
        { name: 'Bhutan' },
        { name: 'Bolivia' },
        { name: 'Bosnia and Herzegovina' },
        { name: 'Botswana' },
        { name: 'Bouvet Island' },
        { name: 'Brazil' },
        { name: 'British Indian Ocean Territories' },
        { name: 'Brunei Darussalam' },
        { name: 'Bulgaria' },
        { name: 'Burkina Faso' },
        { name: 'Burundi' },
        { name: 'Cambodia' },
        { name: 'Cameroon' },
        { name: 'Canada' },
        { name: 'Cape Verde' },
        { name: 'Cayman Islands' },
        { name: 'Central African Republic' },
        { name: 'Chad' },
        { name: 'Chile' },
        { name: 'China' },
        { name: 'Christmas Island' },
        { name: 'Cocos Islands' },
        { name: 'Colombia' },
        { name: 'Comoros' },
        { name: 'Congo' },
        { name: 'Cook Islands' },
        { name: 'Costa Rica' },
        { name: 'Cote Divoire' },
        { name: 'Croatia' },
        { name: 'Cuba' },
        { name: 'Cyprus' },
        { name: 'Czech Republic' },
        { name: 'Denmark' },
        { name: 'Djibouti' },
        { name: 'Dominica' },
        { name: 'Dominican Republic' },
        { name: 'East Timor' },
        { name: 'Ecuador' },
        { name: 'Egypt' },
        { name: 'El Salvador' },
        { name: 'Equatorial Guinea' },
        { name: 'Eritrea' },
        { name: 'Estonia' },
        { name: 'Ethiopia' },
        { name: 'Falkland Islands' },
        { name: 'Faroe Islands' },
        { name: 'Fiji' },
        { name: 'Finland' },
        { name: 'France' },
        { name: 'France, Metropolitan' },
        { name: 'French Guiana' },
        { name: 'French Polynesia' },
        { name: 'French Southern Territories' },
        { name: 'FYROM' },
        { name: 'Gabon' },
        { name: 'Gambia' },
        { name: 'Georgia' },
        { name: 'Germany' },
        { name: 'Ghana' },
        { name: 'Gibraltar' },
        { name: 'Greece' },
        { name: 'Greenland' },
        { name: 'Grenada' },
        { name: 'Guadeloupe' },
        { name: 'Guam' },
        { name: 'Guatemala' },
        { name: 'Guinea' },
        { name: 'Guinea-Bissau' },
        { name: 'Guyana' },
        { name: 'Haiti' },
        { name: 'Heard Island And Mcdonald Islands' },
        { name: 'Honduras' },
        { name: 'Hong Kong' },
        { name: 'Hungary' },
        { name: 'Iceland' },
        { name: 'India' },
        { name: 'Indonesia' },
        { name: 'Iran' },
        { name: 'Iraq' },
        { name: 'Ireland' },
        { name: 'Israel' },
        { name: 'Italy' },
        { name: 'Jamaica' },
        { name: 'Japan' },
        { name: 'Jordan' },
        { name: 'Kazakhstan' },
        { name: 'Kenya' },
        { name: 'Kiribati' },
        { name: 'Korea, Democratic People&amp;#39;s Republic of' },
        { name: 'Korea, Republic of' },
        { name: 'Kuwait' },
        { name: 'Kyrgyzstan' },
        { name: 'Lao Peoples Democratic Republic' },
        { name: 'Latvia' },
        { name: 'Lebanon' },
        { name: 'Lesotho' },
        { name: 'Liberia' },
        { name: 'Libyan Arab Jamahiriya' },
        { name: 'Liechtenstein' },
        { name: 'Lithuania' },
        { name: 'Luxembourg' },
        { name: 'Macau' },
        { name: 'Madagascar' },
        { name: 'Malawi' },
        { name: 'Malaysia' },
        { name: 'Maldives' },
        { name: 'Mali' },
        { name: 'Malta' },
        { name: 'Marshall Islands' },
        { name: 'Martinique' },
        { name: 'Mauritania' },
        { name: 'Mauritius' },
        { name: 'Mayotte' },
        { name: 'Mexico' },
        { name: 'Micronesia' },
        { name: 'Moldova' },
        { name: 'Monaco' },
        { name: 'Mongolia' },
        { name: 'Montserrat' },
        { name: 'Morocco' },
        { name: 'Mozambique' },
        { name: 'Myanmar' },
        { name: 'Namibia' },
        { name: 'Nauru' },
        { name: 'Nepal' },
        { name: 'Netherlands' },
        { name: 'Netherlands Antilles' },
        { name: 'New Caledonia' },
        { name: 'New Zealand' },
        { name: 'Nicaragua' },
        { name: 'Niger' },
        { name: 'Nigeria' },
        { name: 'Niue' },
        { name: 'Norfolk Island' },
        { name: 'Northern Mariana Islands' },
        { name: 'Norway' },
        { name: 'Oman' },
        { name: 'Palau' },
        { name: 'Panama' },
        { name: 'Papua New Guinea' },
        { name: 'Pakistan' },
        { name: 'Paraguay' },
        { name: 'Peru' },
        { name: 'Philippines' },
        { name: 'Pitcairn' },
        { name: 'Poland' },
        { name: 'Portugal' },
        { name: 'Puerto Rico' },
        { name: 'Qatar' },
        { name: 'Reunion' },
        { name: 'Romania' },
        { name: 'Russian Federation' },
        { name: 'Rwanda' },
        { name: 'Saint Helena' },
        { name: 'Saint Kitts and Nevis' },
        { name: 'Saint Lucia' },
        { name: 'Saint Pierre and Miquelon' },
        { name: 'Saint Vincent and The Grenadines' },
        { name: 'Samoa' },
        { name: 'San Marino' },
        { name: 'Sao Tome and Principe' },
        { name: 'Saudi Arabia' },
        { name: 'Senegal' },
        { name: 'Seychelles' },
        { name: 'Sierra Leone' },
        { name: 'Singapore' },
        { name: 'Slovakia' },
        { name: 'Slovenia' },
        { name: 'Solomon Islands' },
        { name: 'Somalia' },
        { name: 'South Africa' },
        { name: 'South Georgia and Sandwich Islands' },
        { name: 'Spain' },
        { name: 'Sri Lanka' },
        { name: 'Sudan' },
        { name: 'Suriname' },
        { name: 'Svalbard and Jan Mayen' },
        { name: 'Swaziland' },
        { name: 'Sweden' },
        { name: 'Switzerland' },
        { name: 'Syrian Arab Republic' },
        { name: 'Taiwan' },
        { name: 'Tajikistan' },
        { name: 'Tanzania' },
        { name: 'Thailand' },
        { name: 'Togo' },
        { name: 'Tokelau' },
        { name: 'Tonga' },
        { name: 'Trinidad and Tobago' },
        { name: 'Tunisia' },
        { name: 'Turkey' },
        { name: 'Turkmenistan' },
        { name: 'Turks and Caicos Islands' },
        { name: 'Tuvalu' },
        { name: 'Uganda' },
        { name: 'Ukraine' },
        { name: 'United Arab Emirates' },
        { name: 'United Kingdom' },
        { name: 'United States' },
        { name: 'United States Minor Outlying Islands' },
        { name: 'Uruguay' },
        { name: 'Uzbekistan' },
        { name: 'Vanuatu' },
        { name: 'Vatican City State' },
        { name: 'Venezuela' },
        { name: 'Vietnam' },
        { name: 'Virgin Islands (British)' },
        { name: 'Virgin Islands (U.S.)' },
        { name: 'Wallis And Futuna Islands' },
        { name: 'Western Sahara' },
        { name: 'Yemen' },
        { name: 'Yugoslavia' },
        { name: 'Zaire' },
        { name: 'Zambia' },
        { name: 'Zimbabwe' }
      ];
    // Public API
    factory.getCountries = function () {
      return countries;
    };
    return factory;
  }]);'use strict';
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