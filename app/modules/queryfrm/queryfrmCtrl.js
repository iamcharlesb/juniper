(function() {
    'use strict';

    QueryGenApp.controller('HomeCtrl', HomeCtrl);
    
    function HomeCtrl() {

        /** A better way reducing watches by avoid scope to improve performance */
        var _self = this;

        /** It will be later moved to Constants */
        _self.fields     = ["time", "source_vn","destination_vn","source_port","destination_port","traffic"];
        _self.operators  = ["=", "!="];
        _self.conditions = ["AND", "OR"];


        _self.generateQuery = function() {

            this.buldQuery = function() {

                var table           = {};
                var start_time      = (new Date).getTime();
                var selFields       = this.generateSelectFields();
                if( selFields.length == 0 ) {
                    alert('Please select a Field Name under "Select" section');
                    return;
                }
                var whereFields     = this.generateWhereFields();
                if( typeof whereFields == 'undefined' ) {
                    alert('Please create a proper WHERE Clause');
                    return;
                }
                var end_time      = (new Date).getTime();
                
                table.table_name    = 'traffic_table';
                table.start_time    = start_time;
                table.end_time      = end_time;
                table.select_fields = selFields;
                table.where_clause  = whereFields;

                angular.element( document.getElementById('section--result') ).html( JSON.stringify( table, undefined, 4) );
                
            }

            this.generateSelectFields = function() {

                /** Fetech Select Fields */
                var elmns = document.getElementsByClassName("select-fields");
                var count = 0;
                var elmnsLen = elmns.length;
                var selFields = [];
                while( count < elmnsLen ) {
                    var inpName = elmns[ count ].getElementsByTagName('input')[0].value;
                    if( typeof inpName != 'undefined' && inpName != 'Select' ) {
                        selFields.push( inpName );
                    }
                    count++;
                }

                return selFields;

            }

            this.generateWhereFields = function() {

                /** Fetech Where Criterias */
                var whereElmns  = document.getElementsByClassName("page-search--where-row");
                var count       = 0;
                var whereElmnsLen = whereElmns.length;
                var whereFields = [];
                var subArr      = [];
                while( count < whereElmnsLen ) {

                    var criteria = {};

                    var fieldVal   = whereElmns[count].getElementsByClassName('fields')[0].getElementsByTagName('input')[0].value;
                    var operVal    = whereElmns[count].getElementsByClassName('operators')[0].getElementsByTagName('input')[0].value;
                    var inpVal     = whereElmns[count].getElementsByClassName('input')[0].value;
                    var condVal    = whereElmns[count].getElementsByClassName('conditions')[0].getElementsByTagName('input')[0].value;

                    //If the rows are not properly structured then return
                    if( (fieldVal.toLowerCase().indexOf('select') > -1) ||  (operVal.toLowerCase().indexOf('select') > -1) || (inpVal.trim().length == 0) ) {
                        return;
                    }
                    
                    criteria.name       = fieldVal;
                    criteria.value      = inpVal;
                    criteria.operator   = operVal;
                    
                    subArr.push( criteria );

                    if( typeof condVal != 'undefined' && condVal.toUpperCase()  != 'AND' ){
                        subArr = (subArr.length > 0) ? subArr : criteria;
                        whereFields.push( subArr  );
                        subArr = [];
                    }
                    
                    count++;
                }
                return whereFields;
            }

            this.buldQuery();
            
        }

    }

})();