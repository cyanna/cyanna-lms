/** @jsx React.DOM */
/*
 * Copyright (C) 2016 - present Instructure, Inc.
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
  var _ = require('lodash');
  var I18n = require('i18n!quiz_statistics.answers_tables');
  var UserListDialog = require('jsx!./../user_list_dialog');

  var AnswerRow = React.createClass({displayName: 'AnswerRow',
    propTypes: {
      datum: React.PropTypes.object.isRequired,
      globalSettings: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
      return {neverLoaded: true};
    },

    dialogBuilder: function(answer) {
      if (!_.isEmpty(answer.user_names)) {
        return(
          React.DOM.div(null, 
            UserListDialog({key: answer.id+answer.poolId, answer_id: answer.id, user_names: answer.user_names})
          )
        );
      }
      else if(answer.responses > 0){
        return(React.DOM.div(null, I18n.t('%{userCount} respondents',{userCount: answer.responses})));
      }
    },

    renderBarPlot: function() {
      var checkAltText = I18n.t('correct check icon');

      return (
        React.DOM.div({
          key: this.props.datum.id, 
          className: this.getBarClass(), 
          style: this.getBarStyles(), 
          alt: I18n.t('Graph bar'), 
          title: this.props.datum.correct ? I18n.t('Correct Answer') : I18n.t('Incorrect Answer')
        }, 
           this.props.datum.correct && React.DOM.i({className: "icon-check", alt: checkAltText})
        )

      );
    },

    componentDidMount: function() {
      this.setState({neverLoaded: false});
    },

    getScoreValueDescription: function(datum) {
      var string;
      switch (datum.id) {
        case "top":
          string = I18n.t("Answers which scored in the top 27%");
          break;
        case "middle":
          string = I18n.t("Answers which scored in the middle 46%");
          break;
        case "bottom":
          string = I18n.t("Answers which scored in the bottom 27%");
          break;
        case "ungraded":
          string = I18n.t("Ungraded answers");
          break;
        default:
          string = I18n.t("Unknown answers");
      }
      return string;
    },

    getBarStyles: function() {
      var width = this.props.globalSettings.xScale(this.props.datum.count) + this.props.globalSettings.visibilityThreshold + "px";
      // Hacky way to get initial state width animations
      if (this.state.neverLoaded) {
        width = "0px";
      }
      return {
        width: width,
        height: this.props.globalSettings.barHeight - 2 + "px"
      };
    },

    getBarClass: function() {
      var className = this.props.datum.correct ? 'bar bar-highlighted' : 'bar';
      return (this.props.datum.special ? className + " bar-striped" : className);
    },

    render: function() {
      var datum = this.props.datum;
      var answerText = this.props.globalSettings.useAnswerBuckets ? this.getScoreValueDescription(datum) : datum.answer.text;
      // describedby doesn't seem to be working so I'm simulating what it would be doing with an aria-label
      var answerLabel = this.props.datum.correct ? I18n.t("%{answer}, (Correct answer)", {answer: answerText}) : I18n.t("%{answer}, (Incorrect answer)", {answer: answerText})

      return (
        React.DOM.tr({className: datum.correct ? 'correct' : undefined}, 
          React.DOM.th({scope: "row", className: "answer-textfield"}, 
            React.DOM.span({className: "screenreader-only"}, answerLabel), 
            React.DOM.span({className: "answerText", 'aria-hidden': "true"}, answerText)
          ), 
          React.DOM.td({className: "respondent-link"}, 
            this.dialogBuilder(datum.answer)
          ), 
          React.DOM.td({className: "answer-ratio"}, 
            datum.answer.ratio, " ", React.DOM.sup(null, I18n.t('%'))
          ), 
          React.DOM.td({className: "answer-distribution-cell", 'aria-hidden': true, style: {width: this.props.globalSettings.maxWidth}}, 
            this.renderBarPlot()
          )
        )
      );
    },
  });

  return AnswerRow;
});
