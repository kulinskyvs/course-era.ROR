(function () {
	'use strict';

	angular
	.module("NarrowItDownApp", [])
	.controller("NarrowItDownController", NarrowItDownController)
	.service("MenuSearchService", MenuSearchService)
	.constant('menuBaseUrl', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var controller = this;
		
		controller.searchTerm = "";
		controller.found = [];

		controller.findMenuItems = function() {
            controller.found = [];			

            if (controller.searchTerm) {
            	controller.found = MenuSearchService
	            	.getMatchedMenuItems(controller.searchTerm)
	            	.then(function (foundItems) {
	                   controller.found = foundItems;
	            	});
            }
		}

    	controller.isFoundListEmpty = function() {
    		return controller.found.length <= 0;
    	}

		controller.isOdd = function(index) {
			return index % 2 != 0;
		}

		controller.isEven = function(index) {
			return index % 2 == 0;
		}

	}  

    MenuSearchService.$inject = ['$http', 'menuBaseUrl'];
	function MenuSearchService($http, menuBaseUrl) {
		var self = this;

		self.getMatchedMenuItems = function(searchTerm) {
			return  $http({
		      method: "GET",
		      url: (menuBaseUrl + "/menu_items.json")
		    }).then(function (response) {
                var foundItems = response.data.menu_items;
                return foundItems.filter(function (item) {
                	return item.description.includes(searchTerm);
                });
		    });
		}
	}  

})();