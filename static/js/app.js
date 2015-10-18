var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngResource']);

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('jobs', {
        url: "/",
        templateUrl: "static/partials/jobs.html"
      });
}]);

app.controller('JobsCtrl', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

    $scope.options = {
      ajax: {
        url: '/jobs',
        dataSrc: ''
      },
      order: [[2, 'asc']],
      responsive: true,
      columns: [
        { title: 'Name', data: 'name', className: 'all', render: function(data, type, full, meta) {
          return "<a href=\"#\" onclick=\"angular.element(this).scope().editJob('"+full.id+"')\">" + data + "</a>";
        } },
        { title: 'Trigger', data: 'trigger', className: 'desktop' },
        { title: 'Next Run', data: 'next_run_time', className: 'all'}

      ]
    };

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'yyyy-MM-dd';

    $scope.status = {
      opened: false
    };

    // Add job
    $scope.addJob = function () {
        // Clear the form
        $scope.title = 'Add Job';
        $scope.job = { };
        $scope.error = null;
        angular.element('#jobModal').modal('show');
    };

    $scope.editJob = function(job_id) {
        $scope.title = 'Edit Job';
        $http.get('/jobs/' + job_id).then(function(response) {
           $scope.job = response.data;
        });
        $scope.error = null;
        angular.element('#jobModal').modal('show');
    };

    // Save the form
    $scope.saveForm = function (job) {
        // Add validation
        if (job.id == undefined) {
            // Create a new user
            $http.post('/jobs', job).then(function(response) {
                angular.element('#jobModal').modal('hide');
            }, function(response) {
               $scope.error = response.data
            });
        } else {
            $http.put('/jobs/' + job.id, job).then(function(response) {
                console.log(response);
                angular.element('#jobModal').modal('hide');
            });
        }
        $http.get('/jobs').then(function(response) {
           $scope.options.data = response.data;
        })
    };

    $scope.deleteJob = function(job_id) {
      $http.delete('/jobs/' + job_id).then(function(response) {
          console.log("Job Deleted!");
          angular.element('#jobModal').modal('hide');
      });
      $http.get('/jobs').then(function(response) {
         $scope.options.data = response.data;
      })
    };
}]);

// TODO: Finish out the Job resource and use it instead of direct $HTTP calls
app.factory('Job', ['$resource', function($resource) {
  return $resource('/jobs/:id/');
}]);

app.directive('ngJobModal', function() {
  return {
       restrict: 'EA',
       transclude: true,
       replace: true,
       templateUrl: 'modalTemplate.html'
       //scope: {
       //    title: '@'
       //}
   };
});

app.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});

app.directive('myTable', function () {
    return {
        restrict: 'E, A, C',
        link: function (scope, element, attrs, controller) {
            var dataTable = element.dataTable(scope.options);

            scope.$watch('options.data', handleModelUpdates, true);

            function handleModelUpdates(newData) {
                var data = newData || null;
                if (data) {
                    dataTable.fnClearTable();
                    dataTable.fnAddData(data);
                }
            }
        },
        scope: {
            options: "="
        }
    };
});
