angular.module('orderApp', [])
.controller('OrderController', ['$scope', function($scope) {
    // Sample items to select
    $scope.items = [
        { name: 'Item 1', price: 10 },
        { name: 'Item 2', price: 20 },
        { name: 'Item 3', price: 30 },
        { name: 'Item 4', price: 15 },
        { name: 'Item 5', price: 25 }
    ];

    $scope.order = [];
    $scope.selectedItem = null;
    $scope.ids = {}; // Container for generated IDs

    // Add selected item to the order list
    $scope.addItemToOrder = function() {
        if ($scope.selectedItem) {
            $scope.order.push($scope.selectedItem);
            $scope.selectedItem = null; // Reset selection
        }
    };

    // Calculate total order cost
    $scope.orderTotal = function() {
        return $scope.order.reduce((total, item) => total + item.price, 0);
    };

    // Generate a random ID (alphanumeric string)
    function generateRandomId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Submit order and generate random IDs for each type
    $scope.submitOrder = function() {
        if ($scope.order.length > 0) {
            // Generate random IDs
            $scope.ids.orderId = generateRandomId();
            $scope.ids.affiliateId = generateRandomId();
            $scope.ids.businessId = generateRandomId();
            $scope.ids.nestiqId = generateRandomId();

            alert('Order submitted successfully!');
        } else {
            alert('Please add items to your order before submitting.');
        }
    };
}]);
