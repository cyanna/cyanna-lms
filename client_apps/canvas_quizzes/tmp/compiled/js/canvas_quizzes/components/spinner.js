/** @jsx React.DOM */
/*
 * Copyright (C) 2014 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

define(function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var Spinner = React.createClass({displayName: 'Spinner',
    render: function() {
      return(
        React.DOM.div({className: "ic-Spinner"}, 
          React.DOM.div({className: "rect1"}), 
          React.DOM.div({className: "rect2"}), 
          React.DOM.div({className: "rect3"}), 
          React.DOM.div({className: "rect4"}), 
          React.DOM.div({className: "rect5"})
        )
      );
    }
  });

  return Spinner;
});