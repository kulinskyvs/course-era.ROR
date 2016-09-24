(function () {
	'use strict';

	angular
	.module("ShoppingListCheckOff", [])
	.controller("ToBuyShoppingController", ToBuyShoppingController)
	.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
	.provider('shoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
	.config(ShoppingListCheckOffConfig);

    //reminder the name of injected attribute must be equal to the name
    //which was was to register the prover + 'Provider' appendix !!!
	ShoppingListCheckOffConfig.$inject = ['shoppingListCheckOffServiceProvider'];
	function ShoppingListCheckOffConfig(shoppingListCheckOffServiceProvider) {
		
		//initializing default items to be bought
		shoppingListCheckOffServiceProvider.defaults.itemsToBuy = [
		{
			name : "apples",
			quantity : 5
		},
		{
			name : "oranges",
			quantity : 15
		},
		{
			name : "bananas",
			quantity : 3
		},
		{
			name : "peaches",
			quantity :7
		},
		{
			name : "melons",
			quantity : 6
		}
		];

		//default bought items
		shoppingListCheckOffServiceProvider.defaults.boughtItems = [];
	}


    //the provider alwasys returns the same instance of shopping list check off service
    function ShoppingListCheckOffServiceProvider() {
    	var provider = this;

    	provider.defaults = {
    		itemsToBuy: [],
    		boughtItems: []
    	};

    	provider.$get = function () {
    		if (provider.singletonService === undefined) {
    			provider.singletonService = new ShoppingListCheckOffService(
    				provider.defaults.itemsToBuy, 
    				provider.defaults.boughtItems);
    		}
    		return provider.singletonService;
    	};
    }


    // ### to buy controller ####
    ToBuyShoppingController.$inject = ['shoppingListCheckOffService'];
    function ToBuyShoppingController(shoppingListCheckOffService) {
    	var toByList = this;

    	toByList.getItems = shoppingListCheckOffService.getItemsToBuy;

    	toByList.buy = function(itemIndex) {
    		shoppingListCheckOffService.buy(itemIndex);
    	}

    	toByList.isEmpty = function() {
    		return toByList.getItems().length <= 0;
    	}
    }  


    // ### already bought items controller ####
    AlreadyBoughtShoppingController.$inject = ['shoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(shoppingListCheckOffService) {
    	var boughtList = this;

    	boughtList.getItems = shoppingListCheckOffService.getBougthItems;

    	boughtList.isEmpty = function() {
    		return  boughtList.getItems().length <= 0;
    	}

    }  

    function ShoppingListCheckOffService(defaultItemsToBuy, defaultBoughtItems) {
    	var self = this;

    	var itemsToBuy = defaultItemsToBuy || [];
    	var boughtItems = defaultBoughtItems || [];

    	self.getItemsToBuy = function () {
    		return itemsToBuy;
    	}

    	self.getBougthItems = function() {
    		return boughtItems;
    	}

    	self.buy = function(itemIndex) {
    		if (itemIndex < itemsToBuy.length) {
    			boughtItems.push(itemsToBuy[itemIndex]);
    			itemsToBuy.splice(itemIndex, 1);
    		}
    	}

    }

})();