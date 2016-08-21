(function(){
	'use strict';
	angular
		.module('apttus',[])
		.constant('directiveConfig',{
			"githubAPI":"api.github.com/users/"
		})
		.directive('gitProfile',['$http','directiveConfig',showProfile]);

	function showProfile ($http,directiveConfig){
		var directiveObj = {
			restrict:'E',
			replace:true,
			scope:{
				username:'@'
			},
			templateUrl:'templates/git-profile.html',
			controller:function getData ($scope){
				$http.get(directiveConfig.githubAPI + $scope.username)
					.then(function success(response){
						if(response.status == 200){
							$scope.success = true;
							var data = response.data;
							$scope.avatar = data.avatar_url;
							$scope.name = data.name;
							$scope.followers = data.followers;
							$scope.following = data.following;
						}
						else{
							$scope.success = false;
							$scope.message = response.statusText;
						}
					},function error(err){
						$scope.success = false;
						$scope.message = err.statusText;
					});
			}
		} 
		return directiveObj;
	};
})();