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
  var Emblem = require('jsx!./emblem');
  var I18n = require('i18n!quiz_log_auditing.table_view');

  /**
   * @class Events.Views.AnswerMatrix.Legend
   *
   * A legend that explains what each type of "answer circle" denotes.
   *
   * @seed
   *   {}
   */
  var Legend = React.createClass({displayName: 'Legend',
    shouldComponentUpdate: function(nextProps, nextState) {
      return false;
    },

    render: function() {
      return (
        React.DOM.dl({id: "ic-AnswerMatrix__Legend"}, 
          React.DOM.dt(null, 
            I18n.t('legend.empty_circle', 'Empty Circle')
          ), 
          React.DOM.dd(null, 
            Emblem(null), 
            I18n.t('legend.empty_circle_desc', 'An empty answer.')
          ), 

          React.DOM.dt(null, 
            I18n.t('legend.dotted_circle', 'Dotted Circle')
          ), 
          React.DOM.dd(null, 
            Emblem({answered: true}), 
            I18n.t('legend.dotted_circle_desc', 'An answer, regardless of correctness.')
          ), 

          React.DOM.dt(null, 
            I18n.t('legend.filled_circle', 'Filled Circle')
          ), 
          React.DOM.dd(null, 
            Emblem({answered: true, last: true}), 
            I18n.t('legend.filled_circle_desc', 'The final answer for the question, the one that counts.')
          )
        )
      );
    }
  });

  return Legend;
});