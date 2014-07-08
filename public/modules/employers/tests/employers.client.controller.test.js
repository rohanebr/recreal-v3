'use strict';

(function() {
	// Employers Controller Spec
	describe('Employers Controller Tests', function() {
		// Initialize global variables
		var EmployersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Employers controller.
			EmployersController = $controller('EmployersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Employer object fetched from XHR', inject(function(Employers) {
			// Create sample Employer using the Employers service
			var sampleEmployer = new Employers({
				name: 'New Employer'
			});

			// Create a sample Employers array that includes the new Employer
			var sampleEmployers = [sampleEmployer];

			// Set GET response
			$httpBackend.expectGET('employers').respond(sampleEmployers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.employers).toEqualData(sampleEmployers);
		}));

		it('$scope.findOne() should create an array with one Employer object fetched from XHR using a employerId URL parameter', inject(function(Employers) {
			// Define a sample Employer object
			var sampleEmployer = new Employers({
				name: 'New Employer'
			});

			// Set the URL parameter
			$stateParams.employerId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/employers\/([0-9a-fA-F]{24})$/).respond(sampleEmployer);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.employer).toEqualData(sampleEmployer);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Employers) {
			// Create a sample Employer object
			var sampleEmployerPostData = new Employers({
				name: 'New Employer'
			});

			// Create a sample Employer response
			var sampleEmployerResponse = new Employers({
				_id: '525cf20451979dea2c000001',
				name: 'New Employer'
			});

			// Fixture mock form input values
			scope.name = 'New Employer';

			// Set POST response
			$httpBackend.expectPOST('employers', sampleEmployerPostData).respond(sampleEmployerResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Employer was created
			expect($location.path()).toBe('/employers/' + sampleEmployerResponse._id);
		}));

		it('$scope.update() should update a valid Employer', inject(function(Employers) {
			// Define a sample Employer put data
			var sampleEmployerPutData = new Employers({
				_id: '525cf20451979dea2c000001',
				name: 'New Employer'
			});

			// Mock Employer in scope
			scope.employer = sampleEmployerPutData;

			// Set PUT response
			$httpBackend.expectPUT(/employers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/employers/' + sampleEmployerPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid employerId and remove the Employer from the scope', inject(function(Employers) {
			// Create new Employer object
			var sampleEmployer = new Employers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Employers array and include the Employer
			scope.employers = [sampleEmployer];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/employers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEmployer);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.employers.length).toBe(0);
		}));
	});
}());