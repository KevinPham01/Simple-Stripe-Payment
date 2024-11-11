    var app = angular.module('orderApp', []);
    app.controller('OrderController', ['$scope', '$http', function($scope, $http) {
        $scope.items = [
            { id: 1, name: 'Item 1', price: 10.00 },
            { id: 2, name: 'Item 2', price: 20.00 },
            { id: 3, name: 'Item 3', price: 30.00 }
        ];

        $scope.order = {};
        $scope.order.items = [];
        $scope.selectedItem = $scope.items[0];
        $scope.order.Ids = {};
        $scope.order.Ids.orderId = null;  // Variable to store the Order ID
        $scope.order.Ids.affiliateId = null;  // Variable to store the Affiliate ID
        $scope.order.Ids.businessId = null;  // Variable to store the Business ID
        $scope.order.Ids.nestiqId = null;  // Variable to store the Nestiq ID

        $scope.addItemToOrder = function() {
            if ($scope.order.length < 3) {
                $scope.order.items.push($scope.selectedItem);
            } else {
                alert("You can only add up to 3 items.");
            }
        };

        $scope.orderTotal = function() {
            return $scope.order.reduce(function(total, item) {
                return total + item.price;
            }, 0).toFixed(2);
        };

        $scope.submitOrder = function() {
            // Generate new IDs each time the order is submitted
            $scope.order.Ids.affiliateId = generateAffiliateId();
            $scope.order.Ids.businessId = generateBusinessId();
            $scope.order.Ids.nestiqId = generateNestiqId();

            var orderData = {
                orderId: new Date().getTime(),
                items: $scope.order,
                total: $scope.orderTotal(),
                affiliateId: $scope.order.Ids.affiliateId,
                businessId: $scope.order.Ids.businessId,
                nestiqId: $scope.order.Ids.nestiqId
            };

            // Save the order ID to display
            $scope.orderId = orderData.orderId;

            // Send orderData to the server (Node.js) for Stripe processing
            $http.post('/submit-order', orderData)
                .then(function(response) {
                    alert('Order submitted successfully!');
                })
                .catch(function(error) {
                    console.error('Error submitting order:', error);
                });
        };

        // Function to generate a unique affiliate ID
        function generateAffiliateId() {
            const prefix = 'AFF-';
            const randomString = Math.random().toString(36).substr(2, 9).toUpperCase();
            return prefix + randomString;
        }

        // Function to generate a unique business ID
        function generateBusinessId() {
            const prefix = 'BUS-';
            const randomString = Math.random().toString(36).substr(2, 9).toUpperCase();
            return prefix + randomString;
        }

        // Function to generate a unique nestiq ID
        function generateNestiqId() {
            const prefix = 'NES-';
            const randomString = Math.random().toString(36).substr(2, 9).toUpperCase();
            return prefix + randomString;
        }
    }]);
