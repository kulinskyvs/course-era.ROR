(function () {
	'use strict';

	angular
	.module("LunchCheck", [])
	.controller("LunchCheckController", LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {

		$scope.lunchCheckValue = "";
		$scope.lunchCheckState = "";

		$scope.checkLunchMenu = function() {
			if (!$scope.lunchMenu || "" == $scope.lunchMenu) {
				$scope.lunchCheckValue = 'Please enter data first';
				$scope.lunchCheckState = 'notReady';
			} else {
				var menuItemsNumber = $scope.lunchMenu.split(",").filter(isCharNotEmpty).length;
				$scope.lunchCheckValue =  menuItemsNumber > 3 ? "Too much!" : "Enjoy!";
				$scope.lunchCheckState = 'ready';
			}

		};
	}  

	function isCharNotEmpty(value) {
		return value && value.trim() != "";
	}

})();