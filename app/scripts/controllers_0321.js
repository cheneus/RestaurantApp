'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory',
    function($scope, menuFactory) {
        // menuFactory is added so that the dependency from the service is added, remember that there is no $
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;

        $scope.dishes = menuFactory.getDishes();
        //function get the dishes

        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function(checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }
])

.controller('ContactController', ['$scope',
    function($scope) {

        $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };

        var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }
])

.controller('FeedbackController', ['$scope',
    function($scope) {

        $scope.sendFeedback = function() {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }
])

// .controller('DishDetailController', ['$scope', 'menuFactory',
//     function($scope, menuFactory) {

//         var dish = menuFactory.getDish();

//         $scope.dish = dish;
//     }
// ])

// .controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory) {

//     var dish = menuFactory.getDish(parseInt($routeParams.id, 10));
//     // .params.id means the parameter is used according to ID, the number is specifying how many id that are recognized. if it is 10, it means that anything after 9 is not recognized.  
//     $scope.dish = dish;
// }])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
    var dish = menuFactory.getDish(parseInt($stateParams.id, 10));
    $scope.dish = dish;
}])

.controller('DishCommentController', ['$scope',
    function($scope) {

        //Step 1: Create a JavaScript object to hold the comment from the form
        $scope.comment = { author: "", rating: "", comment: "", date: new Date().toISOString() };

        $scope.submitComment = function() {

            //Step 2: This is how you record the date
            // "The date property of your JavaScript object holding the comment" = new Date().toISOString();
            $scope.comment.date = new Date().toISOString();
            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push($scope.comment);
            // $scope.reset = function() {
            $scope.commentForm.$setPristine();
            $scope.commentForm.$setUntouched();
            $scope.comment = { author: "", rating: "5", comment: "", date: new Date().toISOString() }
                //Step 4: reset your form to pristine

            //Step 5: reset your JavaScript object that holds your comment
        }
    }
]);
