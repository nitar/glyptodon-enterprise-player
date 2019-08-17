/*
 * Copyright (C) 2019 Glyptodon, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Directive which allows the user to manually select a file.
 */
angular.module('file').directive('glenFileChooser', [function glenFileChooser() {

    var config = {
        restrict : 'E',
        templateUrl : 'app/file/templates/fileChooser.html'
    };

    config.scope = {

        /**
         * The URL of the file chosen by the user.
         *
         * @type {String}
         */
        fileUrl : '='

    };

    config.controller = ['$scope', '$element', function glenFileChooserController($scope, $element) {

        // Update file URL when a new file is selected
        $element.find('.glen-file-chooser').on('change', function newRecordingSelected() {

            // Ignore attempts to select anything but exactly one file (should
            // not happen undern normal circumstances, as the input field is
            // limited to one file by default)
            var fileList = this.files;
            if (fileList.length !== 1)
                return;

            // Replace existing file URL with newly-generated URL
            $scope.$apply(function assignRecordingURL() {
                URL.revokeObjectURL($scope.fileUrl);
                $scope.fileUrl = URL.createObjectURL(fileList[0]);
            });

        });

    }];

    return config;

}]);
