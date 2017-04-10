QueryGenApp.directive('junAddMore', function($compile) {

    return {
        restrict: 'A',
        scope: {
            parent: '@',
            remove: '@',
            controllerObj: '='
        },
        link: function(scope, element, attrs) {

            element.bind('click', function( event ){

                event.preventDefault();

                if(  document.getElementById(scope.parent) ) {
                    
                    if( scope.remove ) {
                        element.parent().remove();
                        return false;;
                    } else {

                        /** Preventing form controller objects getting affected. Kind of Obj.assign */
                        var ctrlObj = angular.copy( scope.controllerObj );
                        var wrapperElm = angular.element( document.getElementById(scope.parent) );
                        var tpl;

                        scope.fields = ctrlObj.fields;
                        scope.operators = ctrlObj.operators;
                        scope.conditions = ctrlObj.conditions;

                        tpl     = '<div class="page-search--where-row">';
                        tpl    += ' <jun-dropdown options="fields" class="fields"></jun-dropdown>';
                        tpl    += ' <jun-dropdown options="operators" class="operators"></jun-dropdown>';
                        tpl    += ' <input type="text" name="" value="" class="jun--inp input" />'
                        tpl    += ' <jun-dropdown options="conditions" class="conditions"></jun-dropdown>';
                        tpl    += ' <button class="jun--button page-search--where-add" jun-add-more parent="page-search--where" controller-obj="controllerObj"> + </button>'
                        tpl    += ' <button class="jun--button page-search--where-remove" jun-add-more parent="page-search--where" remove="true" controller-obj="controllerObj"> - </button>'
                        tpl    += '</div>';

                        var newDirective = angular.element( tpl );
                        wrapperElm.append(newDirective);
                        $compile(newDirective)(scope);
                    }

                }

            });

        }

    }
});