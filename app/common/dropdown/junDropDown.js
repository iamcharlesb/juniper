QueryGenApp.directive('junDropdown', function($compile) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            options: '=',
            append: '@',
            removeSelected: '@',
            default: '@'
        },
        template: '<div class="jun-dropdown"><input type="hidden" value="{{default}}"  /><a tabindex="0">{{default}}<i class="jun-dropdown--right-arrow-down"> </i></a><ul tabindex="0"><li ng-repeat="option in options" ng-click="createNewElm( option )">{{option}}</li></ul></div>',
        link: function(scope, element, attrs) {

            scope.default = scope.default || "Select";
            var createdNewElm = false;

            scope.createNewElm = function( selected ) {

                scope.default = selected;
                if( !scope.append )
                    return false;
                var index;
                scope.data = angular.copy( scope.options );

                /** If Remove Selected is enabled then the selected will be removed */
                if( scope.removeSelected ) {
                    index = scope.data.indexOf(selected);
                    scope.data.splice(index, 1);
                }
                
                /** Create New Dropdown only if any data is available */
                if( scope.data.length > 0 && !createdNewElm ) {
                    createdNewElm = true;
                    var newDirective = angular.element('<jun-dropdown options="data" append="true" remove-selected="true" class="select-fields"></jun-dropdown>');
                    element.parent().append(newDirective);
                    $compile(newDirective)(scope);
                }
            }

        }

    }
});