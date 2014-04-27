/*
 * Classname : nom.filters
 * Project   : icp-nom-web
 * Version   : $Id: filters.js 763 2013-08-08 16:08:06Z dkinley $
 * Purpose   : List of filters used in the app
 * 
 * Copyright (c) 2004-2013, MDA, All Rights Reserved
 * 
 * Author    Date        Issue#   Comments
 * --------- ----------- -------- -----------------------------------
 * dfaulus   01-may-2013 46649    Initial Implementatio
 * dfaulus   13-jun-2013 49814    Updated format filter to include priority
 */
'use strict';

/**
 * Filters module
 */
var filters = angular.module('myCity.filters', []);

filters.filter('startFrom', function() {
    return function(input, start) {
        if(input && start >= 0) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
