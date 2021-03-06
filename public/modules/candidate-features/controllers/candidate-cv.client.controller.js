'use strict';

angular.module('candidate-features').controller('CandidateCvController', ['$scope','Industries','Countries', '$http', 'Authentication', 'Candidates', '$location', '$modal',
  function($scope, Industries,Countries, $http, Authentication, Candidates, $location, $modal) {
    $scope.user = Authentication.user;
    $scope.isEditing = false;
    $scope.industries = Industries.getIndustries();
    Countries.getCountries(function(countries){
      $scope.countries = countries;
    });
    // If user is not signed in then redirect back home
    if (!$scope.user) $location.path('/signin');

    $scope.candidate = Candidates.get({ 
      candidateId: $scope.user.candidate
    }, function(candidate){

      if(!candidate.skills){
        $scope.candidate.skills =  [{title: ''}];
      }

      if(!candidate.educations){
        $scope.candidate.educations =  [{degree: ''}];
      }
      if(candidate.target_industries.length < 1){
        $scope.candidate.target_industries =  [{name: ''}];
      }
      if(candidate.target_locations.length < 1){
        $scope.candidate.target_locations =  [{name: ''}];
      }
    }); 

    // Update existing Candidate
    $scope.update = function() {
      var candidate = $scope.candidate ;

      candidate.$update(function() {
        $location.path('candidates/' + candidate._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    
    //Skills
      $scope.addSkill = function() {
        $scope.candidate.skills.push({
          title: ''
        });
      };

      $scope.removeSkill = function(index) {
        $scope.candidate.skills.splice(index, 1);
      };

      //Education
       $scope.addEducation = function() {
        $scope.candidate.educations.push({
          title: ''
        });
      };

      $scope.removeEducation = function(index) {
        $scope.candidate.educations.splice(index, 1);
      };

      //Experience
       $scope.addExperience = function() {
        $scope.candidate.positions.push({
          title: ''
        });
      };

      $scope.removeExperience = function(index) {
        $scope.candidate.positions.splice(index, 1);
      };

      //Projects
       $scope.addProject = function() {
        $scope.candidate.projects.push({
          title: ''
        });
      };

      $scope.removeProject = function(index) {
        $scope.candidate.projects.splice(index, 1);
      };

      //Languages
       $scope.addLanguage = function() {
        $scope.candidate.languages.push({
          title: ''
        });
      };

      $scope.removeLanguage = function(index) {
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
$scope.newProject={name:'',company:'',description:''};

// cuntino to open new modal
$scope.openProjectModal=function(project)
{
 var modalInstance;
        modalInstance = $modal.open({
          templateUrl: '/modules/candidate-features/views/cv-partials/project-partial.html',
          controller: 'ProjectModalCtrl',
          
          // passes the project to the modal : in case of "add" passes newProject
          resolve: {
            project: function() {
              return angular.copy(project);
            }
          }
        });

            //  when modal is closed with updated values result is return that contains the updated values
              modalInstance.result.then(function(result) {
                    var project = result.project;

                    
                     // if delete was clicked to close the modal
                    if (result.action === 'delete') {
                      angular.forEach($scope.candidate.projects, function(cProject){
                          if(cProject._id === project._id ){
                                   $scope.candidate.projects.splice($scope.candidate.projects.indexOf(cProject), 1);

                      $http.put('/candidates/deleteProject/'+$scope.candidate._id, cProject).success(function(response) {
                      }).error(function(response) {
                        $scope.error = response.message;
                    });



                          }
                        });


                    // else if save was clicked to close the modal : produces two cases: new or update  
                  } else {
                      project.name= project.name.trim();
                      
                      // position has an id means its updating an existing position i.e edit
                      if (project._id !== undefined) {
                        angular.forEach($scope.candidate.projects, function(cProject){
                          if(cProject._id === project._id )
                            {
                            cProject.name = project.name;
                            cProject.company=project.company;

                            cProject.description=project.description;
                            cProject.start_date=project.start_date;
                            cProject.end_date=project.end_date;

                            
                          $http.put('/candidates/updateProject/'+$scope.candidate._id, cProject).success(function(response) {
                                        }).error(function(response) {
                                      $scope.error = response.message;
                                      });
                            }
                        });
                      }

                      // else project does not have an id means its creating a new project i.e add
                       else {
                        $scope.candidate.projects.push(project);
                        $http.put('/candidates/addProject/'+ $scope.candidate._id,project).success(function(response) {
                      // reinitialize the attributes of newProject : in case the user wants to add more projectss
                      $scope.newProject={name:'',company:'',description:''};

                      }).error(function(response) {
                    $scope.error = response.message;
                  });

                           }
                  }
                  }, function() {
                    // $log.info('Modal dismissed at: ' + new Date());
                  });


};


 // initialize new certificate for to pass to the modal when add clicked
$scope.newCertificate={name:''};

// cuntino to open new modal
$scope.openCertificateModal=function(certificate)
{
 var modalInstance;
        modalInstance = $modal.open({
          templateUrl: '/modules/candidate-features/views/cv-partials/certificates-partial.html',
          controller: 'CertificateModalCtrl',
          
          // passes the certificate to the modal : in case of "add" passes newCertificate
          resolve: {
            certificate: function() {
              return angular.copy(certificate);
            }
          }
        });

            //  when modal is closed with updated values result is return that contains the updated values
              modalInstance.result.then(function(result) {
                    var certificate = result.certificate;

                    
                     // if delete was clicked to close the modal
                    if (result.action === 'delete') {
                      angular.forEach($scope.candidate.certificates, function(cCertificate){
                          if(cCertificate._id ===certificate._id ){
                                   $scope.candidate.certificates.splice($scope.candidate.certificates.indexOf(cCertificate), 1);

                      $http.put('/candidates/deleteCertificate/'+$scope.candidate._id, cCertificate).success(function(response) {
                      }).error(function(response) {
                        $scope.error = response.message;
                    });



                          }
                        });


                    // else if save was clicked to close the modal : produces two cases: new or update  
                  } else {
                      certificate.name=  certificate.name.trim();
                      
                      // Certificate has an id means its updating an existing certificate i.e edit
                      if (certificate._id !== undefined) {
                        angular.forEach($scope.candidate.certificates, function(cCertificate){
                          if(cCertificate._id === certificate._id )
                            {
                            cCertificate.name = certificate.name;
                                                                                    
                          $http.put('/candidates/updateCertificate/'+$scope.candidate._id, cCertificate).success(function(response) {
                                        }).error(function(response) {
                                      $scope.error = response.message;
                                      });
                            }
                        });
                      }

                      // else certificate does not have an id means its creating a new certificate i.e add
                       else {
                        $scope.candidate.certificates.push(certificate);
                        $http.put('/candidates/addCertificate/'+ $scope.candidate._id,certificate).success(function(response) {
                      // reinitialize the attributes of newCertificate : in case the user wants to add more certificates
                      $scope.newCertificate={name:''};

                      }).error(function(response) {
                    $scope.error = response.message;
                  });

                           }
                  }
                  }, function() {
                    // $log.info('Modal dismissed at: ' + new Date());
                  });


};



 // initialize new language for to pass to the modal when add clicked
$scope.newLanguage={name:'',proficiency:''};

// cuntino to open new modal
$scope.openLanguageModal=function(language)
{
 var modalInstance;
        modalInstance = $modal.open({
          templateUrl: '/modules/candidate-features/views/cv-partials/language-partial.html',
          controller: 'LanguageModalCtrl',
          
          // passes the language to the modal : in case of "add" passes newLanguage
          resolve: {
            language: function() {
              return angular.copy(language);
            }
          }
        });

            //  when modal is closed with updated values result is return that contains the updated values
              modalInstance.result.then(function(result) {
                    var language = result.language;

                    
                     // if delete was clicked to close the modal
                    if (result.action === 'delete') {
                      angular.forEach($scope.candidate.languages, function(cLanguages){
                          if(cLanguages._id === language._id ){
                                   $scope.candidate.languages.splice($scope.candidate.languages.indexOf(cLanguages), 1);

                      $http.put('/candidates/deleteLanguage/'+$scope.candidate._id, cLanguages).success(function(response) {
                      }).error(function(response) {
                        $scope.error = response.message;
                    });



                          }
                        });


                    // else if save was clicked to close the modal : produces two cases: new or update  
                  } else {
                      language.name=  language.name.trim();
                      
                      // Language has an id means its updating an existing position i.e edit
                      if (language._id !== undefined) {
                        angular.forEach($scope.candidate.languages, function(cLanguages){
                          if(cLanguages._id === language._id )
                            {
                            cLanguages.name = language.name;
                            cLanguages.proficiency=language.proficiency;
                                                        
                          $http.put('/candidates/updateLanguage/'+$scope.candidate._id, cLanguages).success(function(response) {
                                        }).error(function(response) {
                                      $scope.error = response.message;
                                      });
                            }
                        });
                      }

                      // else language does not have an id means its creating a new language i.e add
                       else {
                        $scope.candidate.languages.push(language);
                        $http.put('/candidates/addLanguage/'+ $scope.candidate._id,language).success(function(response) {
                      // reinitialize the attributes of newLanguage : in case the user wants to add more languages
                      $scope.newLanguage={name:'',proficiency:''};

                      }).error(function(response) {
                    $scope.error = response.message;
                  });

                           }
                  }
                  }, function() {
                    // $log.info('Modal dismissed at: ' + new Date());
                  });


};




  // initialize new education for to pass to the modal when add clicked
$scope.newEducation={degree:'',study_feild:'',institute:'',notes:''};

// cuntino to open new modal
$scope.openEducationModal=function(education)
{
 var modalInstance;
        modalInstance = $modal.open({
          templateUrl: '/modules/candidate-features/views/cv-partials/education-partial.html',
          controller: 'EducationModalCtrl',
          
          // passes the project to the modal : in case of "add" passes newProject
          resolve: {
            education: function() {
              return angular.copy(education);
            }
          }
        });

            //  when modal is closed with updated values result is return that contains the updated values
              modalInstance.result.then(function(result) {
                    var education = result.education;

                    
                     // if delete was clicked to close the modal
                    if (result.action === 'delete') {
                      angular.forEach($scope.candidate.educations, function(cEducation){
                          if(cEducation._id === education._id ){
                                   $scope.candidate.educations.splice($scope.candidate.educations.indexOf(cEducation), 1);

                      $http.put('/candidates/deleteEducation/'+$scope.candidate._id, cEducation).success(function(response) {
                      }).error(function(response) {
                        $scope.error = response.message;
                    });



                          }
                        });


                    // else if save was clicked to close the modal : produces two cases: new or update  
                  } else {
                      education.degree =  education.degree.trim();
                      
                      // Education has an id means its updating an existing position i.e edit
                      if (education._id !== undefined) {
                        angular.forEach($scope.candidate.educations, function(cEducation){
                          if(cEducation._id === education._id )
                            {
                            cEducation.degree = education.degree;
                            cEducation.study_feild=education.study_feild;
                            cEducation.institute=education.institute;
                            cEducation.notes=education.notes;
                            cEducation.start_date=education.start_date;
                            cEducation.end_date=education.end_date;
                            
                            
                          $http.put('/candidates/updateEducation/'+$scope.candidate._id, cEducation).success(function(response) {
                                        }).error(function(response) {
                                      $scope.error = response.message;
                                      });
                            }
                        });
                      }

                      // else education does not have an id means its creating a new education i.e add
                       else {
                        $scope.candidate.educations.push(education);
                        $http.put('/candidates/addEducation/'+ $scope.candidate._id,education).success(function(response) {
                      // reinitialize the attributes of newEducation : in case the user wants to add more educations
                      $scope.newEducation={degree:'',study_feild:'',institute:'',notes:''};

                      }).error(function(response) {
                    $scope.error = response.message;
                  });

                           }
                  }
                  }, function() {
                    // $log.info('Modal dismissed at: ' + new Date());
                  });


};



      $scope.newSkill = { title: '', experience: 1, level: 'Beginner' };
      $scope.openSkillModal = function(skill) {
      console.log("OPENSKILLMODAL RUNNING");
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: '/modules/candidate-features/views/cv-partials/skill-partial.html',
          controller: 'SkillModalCtrl',
          resolve: {
            skill: function() {
              return angular.copy(skill);
            }
          }
        });

        modalInstance.result.then(function(result) {
          var skill = result.skill;
          if (result.action === 'delete') {
            angular.forEach($scope.candidate.skills, function(cSkill){
                if(cSkill._id === skill._id ){


            $http.put('/candidates/deleteSkill/'+$scope.candidate._id, cSkill).success(function(response) {
              //If successful we assign the response to the global user model
              // $scope.authentication.user = response;

              alert(response);

              //And redirect to the index page
              // $location.path('/');

            }).error(function(response) {
              $scope.error = response.message;
            });

                  $scope.candidate.skills.splice($scope.candidate.skills.indexOf(cSkill), 1);

                }
              });
        } else {
            skill.title = skill.title.trim();
            if (skill._id !== undefined) {
              angular.forEach($scope.candidate.skills, function(cSkill){
                if(cSkill._id === skill._id )
                  {
                  cSkill.title = skill.title;
                  cSkill.level=skill.level;
                  cSkill.experience=skill.experience;
                  cSkill.last_used=skill.last_used;

                  $http.put('/candidates/updateSkill/'+$scope.candidate._id, cSkill).success(function(response) {
                                                                          //alert(response);
                                    }).error(function(response) {
                                      $scope.error = response.message;
                                    });



                  }
              });
            } else {
          console.log("addskill clicked");
          $scope.candidate.skills.push(skill);
              $http.put('/candidates/addSkill/'+$scope.candidate._id,skill).success(function(response) {

                                                    $scope.newSkill = { title: '', experience: 1, level: 'Beginner' };                                      //alert(response);
                                                      }).error(function(response) {
                                                        $scope.error = response.message;
                                                      });




                    }
        }
        }, function() {
          // $log.info('Modal dismissed at: ' + new Date());
        });
      };


      $scope.openCandidatePictureModal = function() {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: '/modules/candidate-features/views/cv-partials/picture-partial.html',
          controller: 'PictureModalCtrl',
        });
        modalInstance.result.then(function(result) {
           $scope.candidate.picture_url = result.picture_url;
        }, function() {

        });
      };



      // initialize new exp for to pass to the modal when add clicked
    $scope.newExperience={company_name:'',title:'',summary:'',company_location:'',company_industry:'',is_current:false};
      
    // cuntino to open new modal
      $scope.openExperienceModal = function(position){
      var modalInstance;
      modalInstance=$modal.open({
       templateUrl: '/modules/candidate-features/views/cv-partials/experience-partial.html',
         controller: 'ExperienceModalCtrl',

          // passes the position to the modal : in case of "add" passes newExperience
            resolve: {
                    position: function() {
                      return angular.copy(position);
                    }
                  }

      });



      //  when modal is closed with updated values result is return that contains the updated values
        modalInstance.result.then(function(result) {
          var position = result.position;

          // if delete was clicked to close the modal
          if (result.action === 'delete') {
            angular.forEach($scope.candidate.positions, function(cPosition){
                if(cPosition._id === position._id ){
                        $scope.candidate.positions.splice($scope.candidate.positions.indexOf(cPosition), 1);

            $http.put('/candidates/deleteExperience/'+$scope.candidate._id, cPosition).success(function(response) {
            }).error(function(response) {
              $scope.error = response.message;
            });
                }
            });


        // else if save was clicked to close the modal : produces two cases: new or update
        } else {
            position.company_name= position.company_name.trim();

            // position has an id means its updating an existing position i.e edit
            if (position._id !== undefined) {
                angular.forEach($scope.candidate.positions, function(cPosition){
                if(cPosition._id === position._id )
                  {
                  cPosition.company_name = position.company_name;
                  cPosition.company_industry=position.company_industry;
                  cPosition.company_location=position.company_location;
                  cPosition.start_date=position.start_date;
                  cPosition.end_date=position.end_date;
                  cPosition.is_current=position.is_current;
                  cPosition.summary=position.summary;
                  cPosition.title=position.title;
                  
                    $http.put('/candidates/updateExperience/'+$scope.candidate._id, cPosition).success(function(response) {
                            }).error(function(response) {
                              $scope.error = response.message;
                            });
                  }
                });
            } 

          // else position does not have an id means its creating a new position i.e add
            else {
              $scope.candidate.positions.push(position);
                $http.put('/candidates/addExperience/'+ $scope.candidate._id,position).success(function(response) {
                // reinitialize the attributes of newExperience : in case the user wants to add more skills
                $scope.newExperience={company_name:'',title:'',summary:'',company_location:'',company_industry:'',start_date:'0-0-0',end_date:'0-0-0',is_current:false};
                  }).error(function(response) {
            $scope.error = response.message;
          });
                }
            }
    }, function() {
    // $log.info('Modal dismissed at: ' + new Date());
    });



      };



  }
]).controller('SkillModalCtrl', [
     '$scope', '$modalInstance', 'skill', function($scope, $modalInstance, skill) {

       $scope.skill = skill;

    $scope.ok = function (action) {
    $modalInstance.close({ action: action, skill: $scope.skill });
    };

    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');

    };
     }
   ]).controller('LanguageModalCtrl', [
  '$scope', '$modalInstance','language', function($scope, $modalInstance,language) {

    $scope.language = language;

  $scope.ok = function (action) {
  $modalInstance.close({ action: action,language:$scope.language});
  };

  $scope.cancel = function () {
  $modalInstance.dismiss('cancel');

  };
  }
]).controller('CertificateModalCtrl', [
  '$scope', '$modalInstance','certificate', function($scope, $modalInstance,certificate) {

    $scope.certificate = certificate;

  $scope.ok = function (action) {
  $modalInstance.close({ action: action,certificate:$scope.certificate});
  };

  $scope.cancel = function () {
  $modalInstance.dismiss('cancel');

  };
  }
]).controller('EducationModalCtrl', [
  '$scope', '$modalInstance','education', function($scope, $modalInstance,education) {

    $scope.education = education;

  $scope.ok = function (action) {
  $modalInstance.close({ action: action,education:$scope.education});
  };

  $scope.cancel = function () {
  $modalInstance.dismiss('cancel');

  };
  }
]).controller('ProjectModalCtrl', [
  '$scope', '$modalInstance','project', function($scope, $modalInstance,project) {

    $scope.project = project;

  $scope.ok = function (action) {
  $modalInstance.close({ action: action,project:$scope.project});
  };
 
  $scope.cancel = function () {
  $modalInstance.dismiss('cancel');

  };
  }
]).controller('ExperienceModalCtrl', [
    '$scope', '$modalInstance','position',function($scope, $modalInstance,position) {


     $scope.position = position;

    $scope.ok = function (action) {
  $modalInstance.close({ action: action, position: $scope.position });
    };

    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');

    };
    }
  ]);