'use strict';

angular.module('short-list').controller('messageController', ['$scope', 'user', '$http', 'message', 'shortlist.Candidates', 'subject',
	function($scope, user, $http, message, shortlist.Candidates, subject) {

		$scope.sms = {shortlist.Candidates: '{{shortlist.candidate.displayName}}',subject:'',message:'' };
	    $scope.openSmsModal = function(thread) {
	      var modalInstance;
	      modalInstance = $modal.open({
	        templateUrl: '/modules/short-list/views/message-partials/sms.html',
	        controller: 'messageController',
	        // resolve: {
	        //   sms: function() {
	        //     return angular.copy(sms);
	        //   }
	        // }
	    	})
	      .controller('messageController', [
  '$scope', '$modalInstance', 'sms', function($scope, $modalInstance,sms) {

    $scope.sms =sms ;

	$scope.ok = function (action) {
	$modalInstance.close({ action: action, sms: $scope.sms });
	};

	$scope.cancel = function () {
	$modalInstance.dismiss('cancel');

	};
  }
]);
}
}