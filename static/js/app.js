var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngResource']);

app.constant("moment", moment);

app.config(['$stateProvider', '$urlRouterProvider', '$resourceProvider',
  function($stateProvider, $urlRouterProvider, $resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('jobs', {
        url: "/",
        templateUrl: "static/partials/jobs.html"
      })
      .state('about', {
        url: "/about",
        templateUrl: "static/partials/about.html"
      })

      ;
}]);

app.controller('JobsCtrl', ['$scope', '$http', '$compile', 'moment', 'Job', function($scope, $http, $compile, moment, Job) {
    $scope.options = {
      ajax: {
        url: '/api/jobs',
        dataSrc: ''
      },
      order: [[5, 'asc']],
      responsive: true,
      columns: [
        { title: 'Name', data: 'name', className: 'all', render: function(data, type, full, meta) {
          return "<a href=\"#\" onclick=\"angular.element(this).scope().editJob('"+full.id+"')\">" + data + "</a>";
        } },
        { title: 'Task Class', data: 'task_class', className: 'desktop' },
        { title: 'Trigger', data: 'trigger', visible: false, className: 'desktop' },
        { title: 'Start Date', data: 'start_date', className: 'desktop text-right', render: function(data) {
          return data ? moment(data).format('MM/DD/YYYY') : data
        } },
        { title: 'End Date', data: 'end_date', className: 'desktop text-right', render: function(data) {
          return data ? moment(data).format('MM/DD/YYYY') : data
        } },
        { title: 'Next Run', data: 'next_run_time', className: 'all text-right', type: 'date', render: function(data) {
          return data == null ? '<span class="text-muted">Inactive</span>' : '<span title="' + moment(data).format("LLLL") + '">' + moment(data).calendar() + '</span>';
        }}

      ]
    };

    //$scope.options.data = Job.query();

    $scope.start_open = function($event) {
      $scope.status.start_opened = true;
    };
    $scope.end_open = function($event) {
      $scope.status.end_opened = true;
    };

    $scope.format = 'MM/dd/yyyy';

    $scope.status = {
      start_opened: false,
      end_opened: false
    };

    // Add job
    $scope.addJob = function () {
        // Clear the form
        $scope.title = 'Add Job';
        $scope.job = new Job();
        $scope.error = null;
        angular.element('#jobModal').modal('show');
    };

    $scope.editJob = function(job_id) {
        $scope.title = 'Edit Job';
        $scope.job = Job.get({ id: job_id });
        $scope.error = null;
        angular.element('#jobModal').modal('show');
    };

    // Save the form
    $scope.saveForm = function (job) {
        // Add validation
        if (job.id == undefined) {
            // Create a new user
            $scope.job.$save().then(function(response) {
                angular.element('#jobModal').modal('hide');
                angular.element('#table').dataTable().api().ajax.reload();
            }, function(response) {
               $scope.error = response.data;
               return;
            });
        } else {
            $http.put('/api/jobs/' + job.id, job).then(function(response) {
                angular.element('#jobModal').modal('hide');
                angular.element('#table').dataTable().api().ajax.reload();
            }, function(response) {
               $scope.error = response.data;
               return;
            });
        }
    };

    $scope.deleteJob = function(job_id) {
      $http.delete('/jobs/' + job_id).then(function(response) {
          console.log("Job Deleted!");
          angular.element('#jobModal').modal('hide');
          angular.element('#table').dataTable().api().ajax.reload();
      });
    };
}]);

// TODO: Finish out the Job resource and use it instead of direct $HTTP calls
app.factory('Job', ['$resource', function($resource) {
  return $resource('/api/jobs/:id');
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
