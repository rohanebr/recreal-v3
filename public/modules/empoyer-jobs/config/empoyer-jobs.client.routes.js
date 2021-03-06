'use strict';

//Setting up route
angular.module('empoyer-jobs').config(['$stateProvider',
	function($stateProvider) {
		// Empoyer jobs state routing   /jobs/:jobId
		$stateProvider.
		state('expired-jobs', {
			url: '/expired-jobs',
			templateUrl: 'modules/empoyer-jobs/views/expired-jobs.client.view.html'
		}).
		state('draft-jobs', {
			url: '/draft-jobs',
			templateUrl: 'modules/empoyer-jobs/views/draft-jobs.client.view.html'
		}).
		state('emp-job-post-three', {
			url: '/emp-job-post-three',
			templateUrl: 'modules/empoyer-jobs/views/emp-job-post-three.client.view.html'
		}).
		state('emp-job-post-two', {
			url: '/emp-job-post-two/:jobId',
			templateUrl: 'modules/empoyer-jobs/views/emp-job-post-two.client.view.html'
		}).
		state('emp-job-post-one', {
			url: '/emp-job-post-one',
			templateUrl: 'modules/empoyer-jobs/views/emp-job-post-one.client.view.html'
		}).
		state('emp-job-post-one-edit', {
			url: '/emp-job-post-one-edit/:jobId',
			templateUrl: 'modules/empoyer-jobs/views/emp-job-post-one.edit.client.view.html'
		}).
		// state('employer-job-candidates', {
		// 	url: '/employer-job-candidates/:jobId',
		// 	templateUrl: 'modules/empoyer-jobs/views/employer-job-candidates.client.view.html'
		// }).
		state('company-open-jobs', {
			url: '/company-open-jobs',
			templateUrl: 'modules/empoyer-jobs/views/company-open-jobs.client.view.html'
		}).
		state('post-job', {
			url: '/post-job',
			templateUrl: 'modules/empoyer-jobs/views/post-job.client.view.html'
		});
	}
]);