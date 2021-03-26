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
  var ReactRouter = require('old_version_of_react-router_used_by_canvas_quizzes_client_apps');
  var I18n = require('i18n!quiz_log_auditing');
  var Button = require('jsx!../components/button');
  var ScreenReaderContent = require('jsx!canvas_quizzes/components/screen_reader_content');
  var Actions = require('../actions');
  var Config = require('../config');

  var Link = ReactRouter.Link;

  var Session = React.createClass({displayName: 'Session',
    getDefaultProps: function() {
      return {
        submission: {},
        availableAttempts: []
      };
    },

    getInitialState: function() {
      return {accessibilityWarningFocused: false};
    },

    toggleViewable: function(e) {
      this.setState({accessibilityWarningFocused: !this.state.accessibilityWarningFocused});
    },

    render: function() {
      var accessibilityWarningClasses = "ic-QuizInspector__accessibility-warning"
      if (!this.state.accessibilityWarningFocused) {
        accessibilityWarningClasses += " screenreader-only";
      }

      var warningMessage = I18n.t('links.log_accessibility_warning',
        'Warning: For improved accessibility when using Quiz Logs, please remain in the current Stream View.');

      return(
        React.DOM.div({id: "ic-QuizInspector__Session"}, 
          React.DOM.div({className: "ic-QuizInspector__Header"}, 
            React.DOM.h1(null, I18n.t('page_header', 'Session Information')), 

            React.DOM.div({className: "ic-QuizInspector__HeaderControls"}, 
              Button({onClick: Actions.reloadEvents}, 
                ScreenReaderContent(null, I18n.t('buttons.reload_events', 'Reload')), 
                React.DOM.i({className: "icon-refresh"})
              ), 

              ' ', 

              Config.allowMatrixView &&
                React.DOM.span(null, 
                  React.DOM.span({
                    id: "refreshButtonDescription", tabIndex: "0", className: accessibilityWarningClasses, 
                    onFocus: this.toggleViewable, onBlur: this.toggleViewable, 'aria-label': warningMessage
                  }, 
                    warningMessage
                  ), 
                  Link({to: "answer_matrix", className: "btn btn-default", query: this.props.query, 'aria-describedby': "refreshButtonDescription"}, 
                    I18n.t('buttons.table_view', 'View Table')
                  )
                )
              
            )
          ), 

          React.DOM.table(null, 
            React.DOM.tr(null, 
              React.DOM.th({scope: "row"}, 
                I18n.t('session_table_headers.started_at', 'Started at')
              ), 
              React.DOM.td(null, (new Date(this.props.submission.startedAt)).toString())
            ), 

            React.DOM.tr(null, 
              React.DOM.th({scope: "row"}, 
                I18n.t('session_table_headers.attempt', 'Attempt')
              ), 
              React.DOM.td(null, 
                React.DOM.div({id: "ic-QuizInspector__AttemptController"}, 
                  this.props.availableAttempts.map(this.renderAttemptLink)
                )
              )
            )
          )
        )
      );
    },

    renderAttemptLink: function(attempt) {
      var className = 'ic-AttemptController__Attempt';
      var query = { attempt: attempt };

      if (attempt === this.props.attempt) {
        className += ' ic-AttemptController__Attempt--is-active';
        return (
          React.DOM.div({className: className, key: "attempt-"+attempt}, 
            attempt
          )
        )
      } else {
        return (
          Link({
            to: "app", 
            query: query, 
            key: "attempt-"+attempt, 
            className: className, 
            children: attempt})
        );
      }
    }
  });

  return Session;
});
