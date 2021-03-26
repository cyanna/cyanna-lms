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
  var ScreenReaderContent = require('jsx!./screen_reader_content');
  var SightedUserContent = require('jsx!./sighted_user_content');
  var Icon = React.createClass({displayName: 'Icon',
    getDefaultProps: function() {
      return {
        icon: '',
        alt: null
      };
    },

    render: function() {
      var isAccessible = !!this.props.alt;
      var className = 'ic-Icon ' + this.props.icon;

      if (isAccessible) {
        content = (
          React.DOM.span(null, 
            ScreenReaderContent(null, this.props.alt), 
            SightedUserContent({tagName: "i", className: className})
          )
        );
      }
      else {
        content = React.DOM.i({className: className});
      }

      return content;
    }
  });

  return Icon;
});