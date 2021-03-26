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
  var I18n = require('i18n!quiz_statistics.summary');
  var secondsToTime = require('canvas_quizzes/util/seconds_to_time');
  var round = require('canvas_quizzes/util/round');
  var formatNumber = require('../util/format_number');
  var ScorePercentileChart = require('jsx!./summary/score_percentile_chart');
  var Report = require('jsx!./summary/report');
  var SightedUserContent = require('jsx!canvas_quizzes/components/sighted_user_content');
  var ScreenReaderContent = require('jsx!canvas_quizzes/components/screen_reader_content');
  var Spinner = require('jsx!canvas_quizzes/components/spinner');
  var NA_LABEL = I18n.t('not_available_abbrev', 'N/A');
  var SectionSelect = require('jsx!./summary/section_select');

  var Column = React.createClass({displayName: 'Column',
    render: function() {
      return (
        React.DOM.th({scope: "col"}, 
          SightedUserContent({tagName: "i", className: this.props.icon + ' inline'}), 
          ' ', 
          this.props.label
        )
      );
    }
  });

  var Summary = React.createClass({displayName: 'Summary',
    getDefaultProps: function() {
      return {
        quizReports: [],
        pointsPossible: 0,
        scoreAverage: 0,
        scoreHigh: 0,
        scoreLow: 0,
        scoreStdev: 0,
        durationAverage: 0,
        scores: {}
      };
    },

    ratioFor: function(score) {
      var quizPoints = parseFloat(this.props.pointsPossible);

      if (quizPoints > 0) {
        return round(score / quizPoints * 100.0, 0, 0);
      }
      else {
        return 0;
      }
    },

    render: function() {
      var isLoading = this.props.loading;

      return(
        React.DOM.div({id: "summary-statistics", className: isLoading ? 'loading' : undefined}, 
          React.DOM.header({className: "padded"}, 
            React.DOM.h2({className: "section-title inline"}, 
              I18n.t('quiz_summary', 'Quiz Summary')
            ), 

            isLoading && Spinner(null), 

            React.DOM.div({className: "pull-right inline"}, 
              SectionSelect(null), 
              this.props.quizReports.map(this.renderReport)
            )
          ), 

          React.DOM.table({className: "text-left"}, 
            ScreenReaderContent({tagName: "caption", forceSentenceDelimiter: true}, 
              I18n.t('table_description',
                'Summary statistics for all turned in submissions')
              
            ), 

            React.DOM.thead(null, 
              React.DOM.tr(null, 
                Column({
                  icon: "icon-quiz-stats-avg", 
                  label: I18n.t('mean', 'Average Score')}), 
                Column({
                  icon: "icon-quiz-stats-high", 
                  label: I18n.t('high_score', 'High Score')}), 
                Column({
                  icon: "icon-quiz-stats-low", 
                  label: I18n.t('low_score', 'Low Score')}), 
                Column({
                  icon: "icon-quiz-stats-deviation", 
                  label: I18n.t('stdev', 'Standard Deviation')}), 
                Column({
                  icon: "icon-quiz-stats-time", 
                  label: I18n.t('avg_time', 'Average Time')})
              )
            ), 

            React.DOM.tbody(null, 
              React.DOM.tr(null, 
                React.DOM.td({className: "emphasized"}, 
                  isLoading ? NA_LABEL : (this.ratioFor(this.props.scoreAverage) + '%')
                ), 
                React.DOM.td(null, isLoading ? NA_LABEL : (this.ratioFor(this.props.scoreHigh) + '%')), 
                React.DOM.td(null, isLoading ? NA_LABEL : (this.ratioFor(this.props.scoreLow) + '%')), 
                React.DOM.td(null, isLoading ? NA_LABEL : formatNumber(round(this.props.scoreStdev, 2), 2)), 
                isLoading ?
                  React.DOM.td({key: "duration"}, NA_LABEL) :
                  React.DOM.td({key: "duration"}, 
                    ScreenReaderContent({forceSentenceDelimiter: true}, 
                      secondsToTime.toReadableString(this.props.durationAverage)
                    ), 
                    /*
                      try to hide the [HH:]MM:SS timestamp from SR users because
                      it's not really useful, however this doesn't work in all
                      modes such as the Speak-All mode (at least on VoiceOver)
                    */
                    SightedUserContent(null, 
                      secondsToTime(this.props.durationAverage)
                    )
                  )
                
              )
            )
          ), 

          ScorePercentileChart({
            key: "chart", 
            scores: this.props.scores, 
            scoreAverage: this.props.scoreAverage, 
            pointsPossible: this.props.pointsPossible})
        )
      );
    },

    renderReport: function(reportProps) {
      reportProps.key = 'report-' + reportProps.id;
      return Report(reportProps);
    },
  });

  return Summary;
});
