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

/* canvas_quizzes::events */
(function() {
  requirejs.config({
  "map": {
    "canvas_quizzes": {
      "lodash": "underscore",
      "node_modules-version-of-backbone": "symlink_to_node_modules/backbone/backbone",
      "backbone": "Backbone",
      "jquery/instructure_date_and_time": "jquery.instructure_date_and_time"
    },
    "canvas_quizzes/config": {
      "app": "canvas_quizzes/apps/events"
    }
  },
  "bundles": {
    "canvas_quizzes": [
      "canvas_quizzes/components/alert",
      "canvas_quizzes/components/dialog",
      "canvas_quizzes/components/icon",
      "canvas_quizzes/components/popup",
      "canvas_quizzes/components/screen_reader_content",
      "canvas_quizzes/components/sighted_user_content",
      "canvas_quizzes/components/spinner",
      "canvas_quizzes/components/text",
      "canvas_quizzes/config",
      "canvas_quizzes/constants",
      "canvas_quizzes/core/adapter",
      "canvas_quizzes/core/dispatcher",
      "canvas_quizzes/core/environment",
      "canvas_quizzes/core/store",
      "canvas_quizzes/models/common/from_jsonapi",
      "canvas_quizzes/models/common/pick_and_normalize",
      "canvas_quizzes/models/notification",
      "canvas_quizzes/models/progress",
      "canvas_quizzes/util/array_wrap",
      "canvas_quizzes/util/class_set",
      "canvas_quizzes/util/convert_case",
      "canvas_quizzes/util/date_time_helpers",
      "canvas_quizzes/util/i18n_interpolate",
      "canvas_quizzes/util/inflections",
      "canvas_quizzes/util/round",
      "canvas_quizzes/util/seconds_to_time",
      "canvas_quizzes/util/xhr_request",
      "rsvp",
      "qtip",
      "old_version_of_react_used_by_canvas_quizzes_client_apps",
      "old_version_of_react-router_used_by_canvas_quizzes_client_apps"
    ]
  }
});
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

define('canvas_quizzes/apps/events/config',['require','canvas_quizzes/config'],function(require) {
  var config = require('canvas_quizzes/config');
  return config;
});
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

define('canvas_quizzes/apps/events/config/initializers/rsvp',[ 'rsvp' ], function(RSVP) {
  RSVP.on('error', function(e) {
    console.error('RSVP error:', JSON.stringify(e));

    if (e && e.message) {
      console.error(e.message);
    }
    if (e && e.stack) {
      console.error(e.stack);
    }
  });

  return RSVP;
});
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

define('canvas_quizzes/apps/events/config/initializers/backbone',['require','../../config','canvas_quizzes/core/adapter','backbone'],function(require) {
  var config = require('../../config');
  var CoreAdapter = require('canvas_quizzes/core/adapter');
  var Adapter = new CoreAdapter(config);
  var Backbone = require('backbone');

  Backbone.ajax = function(options){
    return Adapter.request(options);
  };
});

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

define('canvas_quizzes/apps/events/config/initializer',['require','./initializers/rsvp','./initializers/backbone'],function(require) {
  var RSVP = require('./initializers/rsvp');
  var Backbone = require('./initializers/backbone');

  return function initializeApp() {
    return RSVP.resolve();
  };
});
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

define('canvas_quizzes/apps/events/core/dispatcher',['require','canvas_quizzes/core/dispatcher','../config'],function(require) {
  var CoreDispatcher = require('canvas_quizzes/core/dispatcher');
  var config = require("../config");

  singleton = new CoreDispatcher(config);
  return singleton;
});

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

define('canvas_quizzes/apps/events/constants',{
  EVT_SESSION_STARTED: 'session_started',
  EVT_PAGE_FOCUSED: 'page_focused',
  EVT_PAGE_BLURRED: 'page_blurred',
  EVT_QUESTION_VIEWED: 'question_viewed',
  EVT_QUESTION_FLAGGED: 'question_flagged',
  EVT_QUESTION_ANSWERED: 'question_answered',

  EVT_FLAG_WARNING: 'warning',
  EVT_FLAG_OK: 'ok',

  EVENT_ATTRS: [
    'id',
    'event_type',
    'event_data',
    'created_at',
  ],

  EVENT_DATA_ATTRS: [
    'quiz_question_id',
    'answer'
  ],

  SUBMISSION_ATTRS: [
    'id',
    'started_at',
    'attempt'
  ],

  QUESTION_ATTRS: [
    'id',
    'question_type',
    'question_text',
    'position',
    'answers',
    'matches'
  ],

  Q_CALCULATED: 'calculated_question',
  Q_ESSAY: 'essay_question',
  Q_FILE_UPLOAD: 'file_upload_question',
  Q_FILL_IN_MULTIPLE_BLANKS: 'fill_in_multiple_blanks_question',
  Q_MATCHING: 'matching_question',
  Q_MULTIPLE_ANSWERS: 'multiple_answers_question',
  Q_MULTIPLE_CHOICE: 'multiple_choice_question',
  Q_MULTIPLE_DROPDOWNS: 'multiple_dropdowns_question',
  Q_TRUE_FALSE: 'true_false_question',
  Q_NUMERICAL: 'numerical_question',
  Q_SHORT_ANSWER: 'short_answer_question',

  // Answer text longer than this will be truncated for questions of types
  // "essay" and other free-form input ones. This applies to the table view.
  MAX_VISIBLE_CHARS: 50
});

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

define('canvas_quizzes/apps/events/models/event',['require','backbone','canvas_quizzes/models/common/pick_and_normalize','canvas_quizzes/models/common/from_jsonapi','../constants'],function(require) {
  var Backbone = require('backbone');
  var pickAndNormalize = require('canvas_quizzes/models/common/pick_and_normalize');
  var fromJSONAPI = require('canvas_quizzes/models/common/from_jsonapi');
  var K = require('../constants');

  var QuizSubmissionEvent = Backbone.Model.extend({
    parse: function(payload) {
      var attrs;

      attrs = fromJSONAPI(payload, 'quiz_submission_events', true);
      attrs = pickAndNormalize(attrs, K.EVENT_ATTRS);
      attrs.type = attrs.eventType;
      attrs.data = attrs.eventData;

      delete attrs.eventType;
      delete attrs.eventData;

      if (attrs.type === K.EVT_QUESTION_ANSWERED) {
        attrs.data = attrs.data.map(function(record) {
          return pickAndNormalize(record, K.EVENT_DATA_ATTRS);
        });
      }

      if (attrs.type === K.EVT_PAGE_BLURRED) {
        attrs.flag = K.EVT_FLAG_WARNING;
      }
      else if (attrs.type === K.EVT_PAGE_FOCUSED) {
        attrs.flag = K.EVT_FLAG_OK;
      }

      return attrs;
    },
  });

  return QuizSubmissionEvent;
});
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

define('canvas_quizzes/apps/events/mixins/paginated_collection',['require','lodash'],function(require) {
  var _ = require('lodash');
  var find = _.find;
  var RE_EXTRACT_LINK = /<([^>]+)>; rel="([^"]+)",?\s*/g;
  var RE_EXTRACT_PP = /per_page=(\d+)/;

  // Extract pagination meta from a JSON-API payload inside the
  // "meta.pagination" set.
  var parseJsonApiPagination = function(respMeta, meta) {
    if (!meta) meta = {};

    meta.perPage = respMeta.per_page;
    meta.hasMore = !!respMeta.next;
    meta.nextPage = meta.hasMore ? respMeta.page + 1 : undefined;
    meta.count = respMeta.count;

    return meta;
  };

  // Extract pagination from the Link header.
  //
  // Here's a good reference:
  //   https://developer.github.com/guides/traversing-with-pagination/
  var parseLinkPagination = function(linkHeader, meta) {
    var match, nextLink, lastLink;
    var links = [];

    if (!meta) meta = {};

    while (match = RE_EXTRACT_LINK.exec(linkHeader)) {
      links.push({
        rel: match[2],
        href: match[1],
        page: parseInt(/page=(\d+)/.exec(match[1])[1], 10)
      });
    }

    nextLink = find(links, { rel: 'next' });
    lastLink = find(links, { rel: 'last' });

    meta.perPage = parseInt((RE_EXTRACT_PP.exec(linkHeader) || [])[1] || 0, 10);
    meta.hasMore = !!nextLink;
    meta.nextPage = meta.hasMore ? nextLink.page : undefined;

    // Link header does not provide us with an accurate count of objects, so
    // we'll estimate it if we know how many we get per page, and we know the
    // index of the last page:
    if (lastLink) {
      meta.count = meta.perPage * lastLink.page;
    }

    return meta;
  };

  /**
   * @class Events.Mixins.PaginatedCollection
   * @extends {Backbone.Collection}
   *
   * Adds support for utilizing JSON-API pagination meta-data to allow fetching
   * any page of a paginated API resource, or all pages at once.
   *
   * Usage example:
   *
   *     var Collection = Backbone.Collection.extend({
   *       // install the mixin
   *       constructor: function() {
   *         PaginatedCollection(this);
   *         return Backbone.Collection.apply(this, arguments);
   *       },
   *
   *       url: function() {
   *         return '/users';
   *       }
   *     });
   *
   *     var collection = new Collection();
   *
   *     collection.fetch(); // /users
   *     collection.length;  // 10
   *
   *     collection.fetchNext(); // /users?page=2
   *     collection.length;      // 20
   *
   *     // load all available users in one go:
   *     // /users?page=1
   *     // ...
   *     // /users?page=5
   *     collection.fetchAll().then(function() {
   *       collection.length; // 50
   *     });
   */
  var Mixin = {
    /**
     * Fetch the next page, if available.
     *
     * @param {Object} options
     *        Normal options you'd pass to Backbone.Collection#fetch().
     *
     * @param {Number} [options.page]
     *        If specified, exactly that page will be fetched, otherwise we'll
     *        use the current cursor (or 1).
     *
     * @return {Promise}
     *         Resolves when the page has been loaded and the pagination meta
     *         parsed.
     */
    fetchNext: function(options) {
      var meta = this._paginationMeta;

      if (!options) {
        options = {};
      }
      else if (options.hasOwnProperty('xhr')) {
        delete options.xhr;
      }

      if (!options.data) {
        options.data = {};
      }

      options.data.page = options.page || meta.nextPage;

      options.success = function(payload, statusText, xhr) {
        var header = xhr.getResponseHeader('Link');

        if (payload.meta && payload.meta.pagination) {
          parseJsonApiPagination(payload.meta.pagination, meta);
        }
        else if (header) {
          parseLinkPagination(header, meta);
        }

        this.add(payload, { parse: true /* always parse */ });
      }.bind(this);

      return this.sync('read', this, options);
    },

    /**
     * @return {Boolean}
     *         Whether there's more data (that we know of) to pull in from the
     *         server.
     */
    canLoadMore: function() {
      return !!this._paginationMeta.hasMore;
    },

    /**
     * Fetch all available pages.
     *
     * @param  {Object} options
     *         Options to pass to #fetchNext. "page" is not allowed here and
     *         will be ignored if specified.
     *
     * @return {Promise}
     *         Resolves when *all* pages have been loaded.
     */
    fetchAll: function(options) {
      var meta = this._paginationMeta;

      if (!options) {
        options = {};
      }
      else if (options.hasOwnProperty('page')) {
        console.warn(
          'You may not specify a page when fetching all pages. ' +
          'Resetting cursor to 1.'
        );

        delete options.page;
      }

      if (options.reset) {
        this.reset(null, { silent: true });
      }

      meta.nextPage = 1;

      return (function fetch(collection) {
        return collection.fetchNext(options).then(function() {
          if (meta.hasMore) {
            return fetch(collection);
          } else {
            return collection;
          }
        });
      })(this);
    },

    /** @private */
    _resetPaginationMeta: function() {
      this._paginationMeta = {};
    },

  };

  return function applyMixin(collection) {
    collection.fetchNext = Mixin.fetchNext;
    collection.fetchAll = Mixin.fetchAll;
    collection._resetPaginationMeta = Mixin._resetPaginationMeta;

    collection.on('reset', collection._resetPaginationMeta, collection);
    collection._resetPaginationMeta();
  };
});
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

define('canvas_quizzes/apps/events/collections/events',['require','backbone','../models/event','canvas_quizzes/models/common/from_jsonapi','../config','../mixins/paginated_collection'],function(require) {
  var Backbone = require('backbone');
  var Event = require('../models/event');
  var fromJSONAPI = require('canvas_quizzes/models/common/from_jsonapi');
  var config = require('../config');
  var PaginatedCollection = require('../mixins/paginated_collection');

  return Backbone.Collection.extend({
    model: Event,
    constructor: function() {
      PaginatedCollection(this);
      return Backbone.Collection.apply(this, arguments);
    },

    url: function() {
      return config.eventsUrl;
    },

    parse: function(payload) {
      return fromJSONAPI(payload, 'quiz_submission_events');
    }
  });
});
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

define('canvas_quizzes/apps/events/models/question',['require','backbone','canvas_quizzes/models/common/pick_and_normalize','canvas_quizzes/models/common/from_jsonapi','../constants','../config','canvas_quizzes/util/inflections'],function(require) {
  var Backbone = require('backbone');
  var pickAndNormalize = require('canvas_quizzes/models/common/pick_and_normalize');
  var fromJSONAPI = require('canvas_quizzes/models/common/from_jsonapi');
  var K = require('../constants');
  var config = require('../config');
  var inflections = require('canvas_quizzes/util/inflections');
  var camelize = inflections.camelize;

  return Backbone.Model.extend({
    parse: function(payload) {
      var attrs;

      attrs = fromJSONAPI(payload, 'quiz_questions', true);
      attrs = pickAndNormalize(attrs, K.QUESTION_ATTRS);
      attrs.id = ''+attrs.id;
      attrs.readableType = camelize(
        attrs.questionType
          .replace(/_question$/, '')
          .replace(/_/g, ' '),
        false
      );

      return attrs;
    }
  });
});
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

define('canvas_quizzes/apps/events/collections/questions',['require','backbone','../models/question','canvas_quizzes/models/common/from_jsonapi','../config','../mixins/paginated_collection'],function(require) {
  var Backbone = require('backbone');
  var Question = require('../models/question');
  var fromJSONAPI = require('canvas_quizzes/models/common/from_jsonapi');
  var config = require('../config');
  var PaginatedCollection = require('../mixins/paginated_collection');

  return Backbone.Collection.extend({
    model: Question,
    constructor: function() {
      PaginatedCollection(this);
      return Backbone.Collection.apply(this, arguments);
    },

    url: function() {
      return config.questionsUrl;
    },

    parse: function(payload) {
      return fromJSONAPI(payload, 'quiz_questions');
    }
  });
});
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

define('canvas_quizzes/apps/events/models/submission',['require','backbone','canvas_quizzes/models/common/pick_and_normalize','canvas_quizzes/models/common/from_jsonapi','../constants','../config'],function(require) {
  var Backbone = require('backbone');
  var pickAndNormalize = require('canvas_quizzes/models/common/pick_and_normalize');
  var fromJSONAPI = require('canvas_quizzes/models/common/from_jsonapi');
  var K = require('../constants');
  var config = require('../config');

  return Backbone.Model.extend({
    url: function() {
      return config.submissionUrl;
    },

    parse: function(payload) {
      var attrs;

      attrs = fromJSONAPI(payload, 'quiz_submissions', true);
      attrs = pickAndNormalize(attrs, K.SUBMISSION_ATTRS);

      return attrs;
    }
  });
});
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

define('canvas_quizzes/apps/events/models/question_answered_event_decorator',['require','lodash','../constants'],function(require) {
  var _ = require('lodash');
  var K = require('../constants');
  var findWhere = _.findWhere;
  var keys = Object.keys;
  var QuestionAnsweredEventDecorator = {};

  QuestionAnsweredEventDecorator.decorateAnswerRecord = function(question, record) {
    var answered = false;
    var answer = record.answer;
    var blank;

    switch(question.questionType) {
      case K.Q_NUMERICAL:
      case K.Q_CALCULATED:
      case K.Q_MULTIPLE_CHOICE:
      case K.Q_SHORT_ANSWER:
      case K.Q_ESSAY:
        answered = answer !== null;
        break;

      case K.Q_FILL_IN_MULTIPLE_BLANKS:
      case K.Q_MULTIPLE_DROPDOWNS:
        for (blank in answer) {
          if (answer.hasOwnProperty(blank)) {
            answered = answer[blank] !== null;
          }

          if (answered) {
            break;
          }
        }
        break;

      case K.Q_MATCHING:
        if (answer instanceof Array && answer.length > 0) {
          // watch out that at this point, the attributes are not normalized
          // and not camelCased:
          answered = answer.some(function(pair) {
            return pair.match_id !== null;
          });
        }

        break;
      case K.Q_MULTIPLE_ANSWERS:
      case K.Q_FILE_UPLOAD:
        answered = answer instanceof Array && answer.length > 0;
        break;

      default:
        answered = answer !== null;
    }

    record.answered = answered;
  };

  /**
   * Extend the raw event attributes as received from the API with some stuff
   * that we'll need when rendering the views.
   *
   * This "decoration" could be done once after the payload is received and it
   * is not necessary to re-perform them, unless the event answer data has been
   * mutated.
   *
   * The decorations are:
   *
   * 1. `answered`
   *    This is applied on the answer records inside the model's "data" attr.
   *    ---
   *    A boolean indicating whether an answer is present. This
   *    differs in semantics based on the question type and that's why we can't
   *    simply test for "answer" to be null or "".
   *
   * 2. `last`
   *    This is applied on the answer records inside the model's "data" attr.
   *    ---
   *    A boolean indicating whether this answer record is the final answer
   *    provided to the referenced question.
   *
   * @param  {Models.Event[]} events
   *         An array of Event instances of type EVT_QUESTION_ANSWERED.
   *
   * @param  {Object[]} questions
   *         An array of question data; this must contain all the questions
   *         referenced by the event set above.
   *
   * @return {null}
   *         Nothing is returned as the decoration is done in-place on the model
   *         attributes.
   */
  QuestionAnsweredEventDecorator.run = function(events, questions) {
    var finalAnswerEvents = {};

    events.forEach(function(event) {
      event.attributes.data.forEach(function(record) {
        var question = questions.filter(function(question) {
          return question.id === record.quizQuestionId;
        })[0];

        finalAnswerEvents[question.id] = event;

        QuestionAnsweredEventDecorator.decorateAnswerRecord(question, record);
      });
    });

    keys(finalAnswerEvents).forEach(function(quizQuestionId) {
      var event = finalAnswerEvents[quizQuestionId];

      findWhere(event.attributes.data, {
        quizQuestionId: quizQuestionId
      }).last = true;
    });

    finalAnswerEvents = null;
  };

  return QuestionAnsweredEventDecorator;
});
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

define('canvas_quizzes/apps/events/stores/events',['require','canvas_quizzes/core/store','../core/dispatcher','canvas_quizzes/core/environment','../config','../collections/events','../collections/questions','../models/submission','../models/question_answered_event_decorator','../constants','lodash'],function(require) {
  var Store = require('canvas_quizzes/core/store');
  var Dispatcher = require('../core/dispatcher');
  var Environment = require('canvas_quizzes/core/environment');
  var Config = require('../config');
  var EventCollection = require('../collections/events');
  var QuestionCollection = require('../collections/questions');
  var Submission = require('../models/submission');
  var QuestionAnsweredEventDecorator = require('../models/question_answered_event_decorator');
  var K = require('../constants');
  var _ = require('lodash');
  var range = _.range;

  /**
   * @class Events.Stores.Events
   */
  return new Store('events', {
    getInitialState: function() {
      var attempt = Config.attempt;
      var requestedAttempt = Environment.getQueryParameter('attempt');

      if (requestedAttempt) {
        attempt = parseInt(requestedAttempt, 10);
      }

      return {
        submission: new Submission(),
        events: new EventCollection(),
        questions: new QuestionCollection(),

        loading: false,

        attempt: attempt,

        /**
         * @property {Integer} latestAttempt
         *
         * Not necessarily the current attempt of the submission we're using,
         * but instead the latest attempt available.
         *
         * @see #loadInitialData.
         */
        latestAttempt: attempt
      }
    },

    /**
     * Alright, we need to query the submission for the first time ignoring
     * any specified attempt index so that we can tell how many attempts there
     * are.
     *
     * The API does not expose that piece of information.
     *
     * This needs to be called at most once per submission during the lifetime
     * of the app.
     */
    loadInitialData: function() {
      return this.state.submission.fetch().then(function(submission) {
        var newState = {};
        var latestAttempt = this.state.submission.get('attempt');

        if (!this.state.attempt || this.state.attempt > latestAttempt) {
          newState.attempt = latestAttempt;
        }

        newState.latestAttempt = latestAttempt;

        this.setState(newState);
      }.bind(this));
    },

    load: function() {
      this.setState({ loading: true });
      this.loadSubmission()
        .then(this.loadQuestions.bind(this))
        .then(this.loadEvents.bind(this))
        .finally(function() {
          this.setState({ loading: false });
        }.bind(this));
    },

    loadSubmission: function() {
      var data;

      if (this.state.attempt) {
        data = { attempt: this.state.attempt };
      }

      return this.state.submission.fetch({ data: data });
    },

    loadQuestions: function() {
      return this.state.questions.fetchAll({
        reset: true,
        data: {
          quiz_submission_id: this.state.submission.get('id'),
          quiz_submission_attempt: this.state.attempt
        }
      });
    },

    loadEvents: function() {
      var events = this.state.events;
      var questions = this.getQuestions();

      return events.fetchAll({
        reset: true,
        data: {
          attempt: this.state.attempt,
          per_page: 50
        }
      }).then(function decorateAnswerEvents(/*payload*/) {
        var answerEvents = events.filter(function(model) {
          return model.get('type') === K.EVT_QUESTION_ANSWERED;
        });

        QuestionAnsweredEventDecorator.run(answerEvents, questions);

        return events;
      }.bind(this));
    },

    isLoading: function() {
      return this.state.loading;
    },

    getAll: function() {
      return this.state.events.toJSON();
    },

    getQuestions: function() {
      return this.state.questions.toJSON();
    },

    getSubmission: function() {
      return this.state.submission.toJSON();
    },

    getAttempt: function() {
      return this.state.attempt;
    },

    getAvailableAttempts: function() {
      return range(1, Math.max(1, (this.state.latestAttempt || 0) + 1));
    },

    setActiveAttempt: function(_attempt) {
      var attempt = parseInt(_attempt, 10);

      if (this.getAvailableAttempts().indexOf(attempt) === -1) {
        throw new Error("Invalid attempt '" + attempt + "'");
      }
      else if (this.state.attempt !== attempt) {
        this.state.attempt = attempt;
        this.load();
      }
    }
  }, Dispatcher);
});

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

define('canvas_quizzes/apps/events/actions',['require','./core/dispatcher','./stores/events'],function(require) {
  var Dispatcher = require('./core/dispatcher');
  var EventStore = require('./stores/events');
  var Actions = {};

  Actions.dismissNotification = function(key) {
    return Dispatcher.dispatch('notifications:dismiss', key).promise;
  };

  Actions.reloadEvents = function() {
    EventStore.load();
  };

  Actions.setActiveAttempt = function(attempt) {
    EventStore.setActiveAttempt(attempt);
  };

  return Actions;
});



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

define('canvas_quizzes/apps/events/routes/app',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../actions','i18n!quiz_log_auditing'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var Actions = require('../actions');
  var I18n = require('i18n!quiz_log_auditing');

  var AppRoute = React.createClass({displayName: 'AppRoute',
    getInitialState: function() {
      return {
        isLoading: false
      };
    },

    componentDidUpdate: function(prevProps, prevState) {
      if (this.props.query.attempt) {
        Actions.setActiveAttempt(this.props.query.attempt);
      }
    },

    render: function() {
      return (
        React.DOM.div({id: "ic-QuizInspector"}, 
          this.state.isLoading && React.DOM.p(null, I18n.t('loading', 'Loading...')), 
          this.props.activeRouteHandler(this.state)
        )
      )
    }
  });

  return AppRoute;
});


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

define('canvas_quizzes/components/icon',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','./screen_reader_content','./sighted_user_content'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var ScreenReaderContent = require('./screen_reader_content');
  var SightedUserContent = require('./sighted_user_content');
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

define('canvas_quizzes/apps/events/views/event_stream/event',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','canvas_quizzes/util/class_set','../../constants','canvas_quizzes/util/seconds_to_time','i18n!quiz_log_auditing.event_stream','canvas_quizzes/components/icon','canvas_quizzes/components/sighted_user_content','old_version_of_react-router_used_by_canvas_quizzes_client_apps'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var classSet = require('canvas_quizzes/util/class_set');
  var K = require('../../constants');
  var secondsToTime = require('canvas_quizzes/util/seconds_to_time');
  var I18n = require('i18n!quiz_log_auditing.event_stream');
  var Icon = require('canvas_quizzes/components/icon');
  var SightedUserContent = require('canvas_quizzes/components/sighted_user_content');
  var Router = require('old_version_of_react-router_used_by_canvas_quizzes_client_apps');
  var Link = Router.Link;


  var Event = React.createClass({displayName: 'Event',
    getDefaultProps: function() {
      return {
        startedAt: new Date()
      };
    },

    render: function() {
      var e = this.props;
      var className = classSet({
        'ic-ActionLog__Entry': true,
        'is-warning': e.flag === K.EVT_FLAG_WARNING,
        'is-ok': e.flag === K.EVT_FLAG_OK,
        'is-neutral': !e.flag
      });
      return (
        React.DOM.li({className: className, key: "event-"+e.id}, 
          this.renderRow(e)
        )
      );
    },

    renderRow: function(e) {
      var secondsSinceStart = (
        new Date(e.createdAt) - new Date(e.startedAt)
      ) / 1000;

      return (
        React.DOM.div(null, 
          React.DOM.span({className: "ic-ActionLog__EntryTimestamp"}, 
            secondsToTime(secondsSinceStart)
          ), 

          SightedUserContent({className: "ic-ActionLog__EntryFlag"}, 
            this.renderFlag(e.flag)
          ), 

          React.DOM.div({className: "ic-ActionLog__EntryDescription"}, 
            this.renderDescription(e)
          )
        )
      );
    },

    renderFlag: function(flag) {
      var content = null;

      if (flag === K.EVT_FLAG_WARNING) {
        content = Icon({icon: "icon-trouble"})
      }
      else if (flag === K.EVT_FLAG_OK) {
        content = Icon({icon: "icon-complete"})
      }
      else {
        content = Icon({icon: "icon-empty"})
      }

      return content;
    },

    renderDescription: function(event) {
      var description;
      var label;
      switch(event.type) {
        case K.EVT_SESSION_STARTED:
          description = I18n.t('session_started', 'Session started');
        break;

        case K.EVT_QUESTION_ANSWERED:
          var valid_answers = event.data.filter(function(i) {
            return (i.answer != null);
          })
          if(valid_answers.length == 0) {
            break;
          }
          label = I18n.t('question_answered', {
            one: 'Answered question:',
            other: 'Answered the following questions:'
          }, { count: valid_answers.length });

          description = (
            React.DOM.div(null, 
              label, 

              React.DOM.div({className: "ic-QuestionAnchors"}, 
                valid_answers.map(this.renderQuestionAnchor)
              )
            )
          );
        break;

        case K.EVT_QUESTION_VIEWED:
          label = I18n.t('question_viewed', {
            one: 'Viewed (and possibly read) question',
            other: 'Viewed (and possibly read) the following questions:'
          }, { count: event.data.length });

          description = (
            React.DOM.div(null, 
              label, 

              React.DOM.div({className: "ic-QuestionAnchors"}, 
                event.data.map(this.renderQuestionAnchor)
              )
            )
          );
        break;

        case K.EVT_PAGE_BLURRED:
          description = I18n.t('page_blurred',
            'Stopped viewing the Canvas quiz-taking page...');
        break;

        case K.EVT_PAGE_FOCUSED:
          description = I18n.t('page_focused', 'Resumed.');
        break;

        case K.EVT_QUESTION_FLAGGED:
          if (event.data.flagged) {
            label = I18n.t('question_flagged', 'Flagged question:');
          }
          else {
            label = I18n.t('question_unflagged', 'Unflagged question:');
          }

          description = (
            React.DOM.div(null, 
              label, 

              React.DOM.div({className: "ic-QuestionAnchors"}, 
                this.renderQuestionAnchor(event.data.questionId)
              )
            )
          );
        break;
      }

      return description;
    },

    renderQuestionAnchor: function(record) {
      var id;
      var question;
      var position;

      if (typeof record === 'object') {
        id = record.quizQuestionId;
      }
      else {
        id = record;
      }

      question = this.props.questions.filter(function(q) {
        return q.id === id;
      })[0];

      position = question && question.position

      return (
        Link({
          key: "question-anchor"+id, 
          to: "question", 
          params: {id: id}, 
          className: "ic-QuestionAnchors__Anchor", 
          query: { event: this.props.id, attempt: this.props.attempt}, 
          children: '#'+position})
      );
    }
  });

  return Event;
});


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

define('canvas_quizzes/apps/events/views/event_stream',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','lodash','../actions','i18n!quiz_log_auditing.event_stream','canvas_quizzes/components/screen_reader_content','./event_stream/event','../constants'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var _ = require('lodash');
  var Actions = require('../actions');
  var I18n = require('i18n!quiz_log_auditing.event_stream');
  var ScreenReaderContent = require('canvas_quizzes/components/screen_reader_content');
  var Event = require('./event_stream/event');
  var K = require('../constants');
  var visibleEventTypes = [
    K.EVT_SESSION_STARTED, K.EVT_QUESTION_ANSWERED, K.EVT_QUESTION_VIEWED,
    K.EVT_QUESTION_FLAGGED, K.EVT_PAGE_BLURRED, K.EVT_PAGE_FOCUSED
  ];

  var extend = _.extend;

  var EventStream = React.createClass({displayName: 'EventStream',
    getDefaultProps: function() {
      return {
        events: [],
        submission: {},
        questions: []
      };
    },

    render: function() {
      var visibleEvents = this.getVisibleEvents(this.props.events);
      return(
        React.DOM.div({id: "ic-EventStream"}, 
          React.DOM.h2(null, I18n.t('headers.action_log', 'Action Log')), 

          visibleEvents.length === 0 &&
            React.DOM.p(null, 
              I18n.t('notices.no_events_available',
                'There were no events logged during the quiz-taking session.'
              )
            ), 
          

          React.DOM.ol({id: "ic-EventStream__ActionLog"}, 
            visibleEvents.map(this.renderEvent)
          )
        )
      );
    },

    renderEvent: function(e) {
      var props = extend({}, e, {
        startedAt: this.props.submission.startedAt,
        questions: this.props.questions,
        attempt: this.props.attempt
      });

      return Event(props);
    },

    getVisibleEvents: function(events) {
      return events.filter(function(e) {
        if(visibleEventTypes.indexOf(e.type) == -1) {
          return false
        }
        if(e.type != K.EVT_QUESTION_ANSWERED) {
          return true;
        }
        return _.any(e.data, function(i) {
          return (i.answer != null);
        });
      });
    }

  });

  return EventStream;
});

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

define('canvas_quizzes/apps/events/components/button',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','canvas_quizzes/util/class_set'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var classSet = require('canvas_quizzes/util/class_set');

  /**
   * @class Events.Components.Button
   *
   * A wrapper for `<button type="button" />` that abstracts the bootstrap CSS
   * classes we need to specify for buttons.
   */
  var Button = React.createClass({displayName: 'Button',
    getDefaultProps: function() {
      return {
        type: 'default'
      };
    },

    render: function() {
      var className = {};
      var type = this.props.type;

      className['btn'] = true;
      className['btn-default'] = type === 'default';
      className['btn-danger'] = type === 'danger';
      className['btn-success'] = type === 'success';

      return(
        React.DOM.button({
          onClick: this.props.onClick, 
          type: "button", 
          className: classSet(className), 
          children: this.props.children})
      );
    }
  });

  return Button;
});

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

define('canvas_quizzes/apps/events/views/session',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','old_version_of_react-router_used_by_canvas_quizzes_client_apps','i18n!quiz_log_auditing','../components/button','canvas_quizzes/components/screen_reader_content','../actions','../config'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var ReactRouter = require('old_version_of_react-router_used_by_canvas_quizzes_client_apps');
  var I18n = require('i18n!quiz_log_auditing');
  var Button = require('../components/button');
  var ScreenReaderContent = require('canvas_quizzes/components/screen_reader_content');
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

define('canvas_quizzes/apps/events/routes/event_stream',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../views/event_stream','../views/session'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var EventStream = require('../views/event_stream');
  var Session = require('../views/session');

  var EventStreamRoute = React.createClass({displayName: 'EventStreamRoute',
    mixins: [],

    getDefaultProps: function() {
      return {
      };
    },

    render: function() {
      var props = this.props;

      return(
        React.DOM.div(null, 
          Session({
            submission: this.props.submission, 
            attempt: this.props.attempt, 
            availableAttempts: this.props.availableAttempts}), 

          EventStream({
            submission: this.props.submission, 
            events: this.props.events, 
            questions: this.props.questions, 
            attempt: this.props.attempt})
        )
      );
    }
  });

  return EventStreamRoute;
});

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

define('canvas_quizzes/apps/events/mixins/with_sidebar',['require','old_version_of_react_used_by_canvas_quizzes_client_apps'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  return {
    render: function() {
      return (
        React.DOM.div(null, 
          React.DOM.div({id: "not_right_side"}, 
            React.DOM.div({id: "content-wrapper"}, 
              React.DOM.div({id: "content", role: "main", className: "container-fluid"}, 
                this.renderContent()
              )
            )
          ), 

          React.DOM.div({id: "right-side-wrapper"}, 
            React.DOM.aside({id: "right-side", role: "complementary"}, 
              this.renderSidebar()
            )
          )
        )
      );
    }
  }
});

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

define('canvas_quizzes/apps/events/views/question_inspector/answers/multiple_choice',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../../../constants'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var K = require('../../../constants');

  var MultipleChoice = React.createClass({displayName: 'MultipleChoice',
    statics: {
      questionTypes: [ K.Q_MULTIPLE_CHOICE, K.Q_TRUE_FALSE ]
    },

    getDefaultProps: function() {
      return {
        answer: [],
        question: { answers: [] }
      };
    },

    render: function() {
      return (
        React.DOM.div({className: "ic-QuestionInspector__MultipleChoice"}, 
          this.props.question.answers.map(this.renderAnswer)
        )
      );
    },

    renderAnswer: function(answer) {
      var isSelected = this.props.answer.indexOf(''+answer.id) > -1;

      return (
        React.DOM.div({key: 'answer'+answer.id}, 
          React.DOM.input({
            type: "radio", 
            readOnly: true, 
            disabled: !isSelected, 
            checked: isSelected}), 

          answer.text
        )
      )
    }
  });

  return MultipleChoice;
});

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

define('canvas_quizzes/apps/events/views/question_inspector/answers/multiple_answers',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../../../constants'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var K = require('../../../constants');

  var MultipleAnswers = React.createClass({displayName: 'MultipleAnswers',
    statics: {
      questionTypes: [ K.Q_MULTIPLE_ANSWERS ]
    },

    getDefaultProps: function() {
      return {
        answer: [],
        question: { answers: [] }
      };
    },

    render: function() {
      return (
        React.DOM.div({className: "ic-QuestionInspector__MultipleAnswers"}, 
          this.props.question.answers.map(this.renderAnswer)
        )
      );
    },

    renderAnswer: function(answer) {
      var isSelected = this.props.answer.indexOf(''+answer.id) > -1;

      return (
        React.DOM.div({key: 'answer'+answer.id}, 
          React.DOM.input({
            type: "checkbox", 
            readOnly: true, 
            disabled: !isSelected, 
            checked: isSelected}), 

          answer.text
        )
      )
    }
  });

  return MultipleAnswers;
});

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

define('canvas_quizzes/apps/events/views/question_inspector/answers/no_answer',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','i18n!quiz_log_auditing'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var I18n = require('i18n!quiz_log_auditing');

  return (
    React.DOM.em({className: "ic-QuestionInspector__NoAnswer"}, 
      I18n.t('no_answer', 'No answer')
    )
  );
});

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

define('canvas_quizzes/apps/events/views/question_inspector/answers/multiple_dropdowns',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../../../constants','./no_answer'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var K = require('../../../constants');
  var NO_ANSWER = require('./no_answer');
  var keys = Object.keys;

  var MultipleDropdowns = React.createClass({displayName: 'MultipleDropdowns',
    statics: {
      questionTypes: [
        K.Q_MULTIPLE_DROPDOWNS
      ]
    },

    render: function() {
      var answer = this.props.answer;
      var question = this.props.question;
      var answers = this.props.question.answers;

      return (
        React.DOM.table(null, 
          
            keys(answer).map(function(blank) {
              var answerText = answers.filter(function(originalAnswer) {
                return ''+originalAnswer.id === answer[blank];
              })[0] || {};

              return (
                React.DOM.tr({key: 'blank'+blank}, 
                  React.DOM.th({scope: "row"}, blank), 
                  React.DOM.td(null, answerText.text || NO_ANSWER)
                )
              );
            })
          
        )
      );
    }
  });

  return MultipleDropdowns;
});


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

define('canvas_quizzes/apps/events/views/question_inspector/answers/essay',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../../../constants','../../../components/button','i18n!quiz_log_auditing.question_answers.essay'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var K = require('../../../constants');
  var Button = require('../../../components/button');
  var I18n = require('i18n!quiz_log_auditing.question_answers.essay');

  var Essay = React.createClass({displayName: 'Essay',
    statics: {
      questionTypes: [ K.Q_ESSAY ]
    },

    getDefaultProps: function() {
      return {
        answer: ''
      };
    },

    getInitialState: function() {
      return {
        htmlView: false
      };
    },

    render: function() {
      var content;

      if (this.state.htmlView) {
        content = (
          React.DOM.div({dangerouslySetInnerHTML: {__html: this.props.answer}})
        );
      }
      else {
        content = React.DOM.pre(null, this.props.answer);
      }

      return (
        React.DOM.div(null, 
          content, 

          Button({type: "default", onClick: this.toggleView}, 
            this.state.htmlView ?
              I18n.t('view_plain_answer', 'View Plain') :
              I18n.t('view_html_answer', 'View HTML')
            
          )
        )
      );
    },

    toggleView: function() {
      this.setState({ htmlView: !this.state.htmlView });
    }
  });

  return Essay;
});

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

define('canvas_quizzes/apps/events/views/question_inspector/answers/fill_in_multiple_blanks',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../../../constants','./no_answer'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var K = require('../../../constants');
  var NO_ANSWER = require('./no_answer');
  var keys = Object.keys;

  var FIMB = React.createClass({displayName: 'FIMB',
    statics: {
      questionTypes: [
        K.Q_FILL_IN_MULTIPLE_BLANKS
      ]
    },

    render: function() {
      var answer = this.props.answer;

      return (
        React.DOM.table(null, 
          
            keys(answer).map(function(blank) {
              return (
                React.DOM.tr({key: 'blank'+blank}, 
                  React.DOM.th({scope: "row"}, blank), 
                  React.DOM.td(null, answer[blank] || NO_ANSWER)
                )
              );
            })
          
        )
      );
    }
  });

  return FIMB;
});

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

define('canvas_quizzes/apps/events/views/question_inspector/answers/matching',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../../../constants','./no_answer'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var K = require('../../../constants');
  var NO_ANSWER = require('./no_answer');

  var Matching = React.createClass({displayName: 'Matching',
    statics: { questionTypes: [ K.Q_MATCHING ] },

    render: function() {
      var answer = this.props.answer;
      var question = this.props.question;

      return (
        React.DOM.table(null, 
          
            question.answers.map(function(questionAnswer) {
              var match;
              var answerRecord = answer.filter(function(record) {
                return record.answer_id === questionAnswer.id+'';
              })[0];

              if (answerRecord) {
                match = question.matches.filter(function(match) {
                  return (''+match.match_id) === ''+answerRecord.match_id;
                })[0];
              }

              return (
                React.DOM.tr({key: "answer-"+questionAnswer.id}, 
                  React.DOM.th({scope: "col"}, questionAnswer.left), 
                  React.DOM.td(null, match ? match.text : NO_ANSWER)
                )
              );
            })
          
        )
      );
    }
  });

  return Matching;
});

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

define('canvas_quizzes/apps/events/views/question_inspector/answer',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../../constants','i18n!quiz_log_auditing','canvas_quizzes/util/class_set','./answers/multiple_choice','./answers/multiple_answers','./answers/multiple_dropdowns','./answers/essay','./answers/fill_in_multiple_blanks','./answers/matching'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var K = require('../../constants');
  var I18n = require('i18n!quiz_log_auditing');
  var classSet = require('canvas_quizzes/util/class_set');
  var MultipleChoice = require('./answers/multiple_choice');
  var MultipleAnswers = require('./answers/multiple_answers');
  var MultipleDropdowns = require('./answers/multiple_dropdowns');
  var Essay = require('./answers/essay');
  var FIMB = require('./answers/fill_in_multiple_blanks');
  var Matching = require('./answers/matching');

  var Renderers;

  var GenericRenderer = React.createClass({displayName: 'GenericRenderer',
    render: function() {
      return React.DOM.div(null, ''+this.props.answer);
    }
  });

  var Renderers = [ FIMB, Matching, MultipleAnswers, MultipleChoice, MultipleDropdowns, Essay ];

  var getRenderer = function(questionType) {
    return Renderers.filter(function(entry) {
      if (entry.questionTypes.indexOf(questionType) > -1) {
        return true;
      }
    })[0] || GenericRenderer;
  };

  var Answer = React.createClass({displayName: 'Answer',
    render: function() {
      return getRenderer(this.props.question.questionType)(this.props);
    }
  });

  return Answer;
});

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

define('canvas_quizzes/apps/events/views/question_inspector',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','i18n!quiz_log_auditing','canvas_quizzes/util/class_set','../constants','old_version_of_react-router_used_by_canvas_quizzes_client_apps','./question_inspector/answer','./question_inspector/answers/no_answer'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var I18n = require('i18n!quiz_log_auditing');
  var classSet = require('canvas_quizzes/util/class_set');
  var K = require('../constants');
  var ReactRouter = require('old_version_of_react-router_used_by_canvas_quizzes_client_apps');
  var Answer = require('./question_inspector/answer');
  var NoAnswer = require('./question_inspector/answers/no_answer');

  var QuestionInspector = React.createClass({displayName: 'QuestionInspector',
    mixins: [ ReactRouter.Navigation ],

    getDefaultProps: function() {
      return {
        question: undefined,
        events: []
      };
    },

    componentDidMount: function() {
      $('body').addClass('with-right-side');
    },

    componentWillUnmount: function() {
      $('body').removeClass('with-right-side');
    },

    render: function() {
      return(
        React.DOM.div({id: "ic-QuizInspector__QuestionInspector"}, 
          this.props.question && this.renderQuestion(this.props.question)
        )
      );
    },

    renderQuestion: function(question) {
      var currentEventId = this.props.currentEventId;
      var answers = [];
      this.props.events.filter(function(event) {
        return event.type === K.EVT_QUESTION_ANSWERED &&
          event.data.some(function(record) {
            return record.quizQuestionId === question.id;
          });
      }).sort(function(a,b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }).map(function(event) {
        var records = event.data.filter(function(record) {
          return record.quizQuestionId === question.id;
        });

        records.map(function(record) {
          answers.push({
            active: event.id === currentEventId,
            value: record.answer,
            answered: record.answered
          });
        });
      });

      return (
        React.DOM.div(null, 
          React.DOM.h1({className: "ic-QuestionInspector__QuestionHeader"}, 
            I18n.t('question_header', 'Question #%{position}', {
              position: question.position
            }), 

            React.DOM.span({className: "ic-QuestionInspector__QuestionType"}, 
              I18n.t('question_type', '%{type}', { type: question.readableType })
            ), 

            React.DOM.span({className: "ic-QuestionInspector__QuestionId"}, 
              "(id: ", question.id, ")"
            )
          ), 

          React.DOM.div({
            className: "ic-QuestionInspector__QuestionText", 
            dangerouslySetInnerHTML: {__html: question.questionText}}), 

          React.DOM.hr(null), 

          React.DOM.p(null, 
            I18n.t('question_response_count', {
              zero: 'This question was never answered.',
              one: 'This question was answered once.',
              other: 'This question was answered %{count} times.'
            }, { count: answers.length })
          ), 

          React.DOM.ol({id: "ic-QuestionInspector__Answers"}, 
            answers.map(this.renderAnswer)
          )
        )
      );
    },

    renderAnswer: function(record, index) {
      var answer;
      var className = classSet({
        'ic-QuestionInspector__Answer': true,
        'ic-QuestionInspector__Answer--is-active': !!record.active,
      });

      if (record.answered) {
        answer = Answer({
          key: "answer-"+index,
          answer: record.value,
          isActive: record.active,
          question: this.props.question
        });
      }
      else {
        answer = NoAnswer;
      }

      return (
        React.DOM.li({key: "answer-"+index, className: className, children: answer})
      );
    },
  });

  return QuestionInspector;
});


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

define('canvas_quizzes/apps/events/views/question_listing',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','old_version_of_react-router_used_by_canvas_quizzes_client_apps','i18n!quiz_log_auditing.navigation'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var ReactRouter = require('old_version_of_react-router_used_by_canvas_quizzes_client_apps');
  var I18n = require('i18n!quiz_log_auditing.navigation');
  var Link = ReactRouter.Link;

  var QuestionListing = React.createClass({displayName: 'QuestionListing',
    getDefaultProps: function() {
      return {
        questions: [],
        activeQuestionId: undefined,
        activeEventId: undefined
      };
    },

    render: function() {
      return(
        React.DOM.div(null, 
          React.DOM.h2(null, I18n.t('questions', 'Questions')), 

          React.DOM.ol({id: "ic-QuizInspector__QuestionListing"}, 
            
              this.props.questions.sort(function(a,b) {
                return a.position > b.position;
              }).map(this.renderQuestion)
            
          ), 

          Link({className: "no-hover icon-arrow-left", to: "app", query: this.props.query}, 
            I18n.t('links.back_to_session_information', 'Back to Log')
          )
        )
      );
    },

    renderQuestion: function(question) {
      return (
        React.DOM.li({key: "question-"+question.id}, 
          Link({
            className: this.props.activeQuestionId === question.id ? 'active' : undefined, 
            to: "/questions/", 
            params: {id: question.id}, 
            query: this.props.query}, 
            I18n.t('links.question', 'Question %{position}', {
              position: question.position
            })
          )
        )
      );
    }
  });

  return QuestionListing;
});

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

define('canvas_quizzes/apps/events/routes/question',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../mixins/with_sidebar','../views/question_inspector','../views/question_listing'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var WithSidebar = require('../mixins/with_sidebar');
  var QuestionInspector = require('../views/question_inspector');
  var QuestionListing = require('../views/question_listing');

  var QuestionRoute = React.createClass({displayName: 'QuestionRoute',
    mixins: [ WithSidebar ],

    getDefaultProps: function() {
      return {
        questions: []
      };
    },

    renderContent: function() {
      var questionId = this.props.params.id;
      var question = this.props.questions.filter(function(question) {
        return question.id === questionId;
      })[0];

      return (
        QuestionInspector({
          loading: this.props.isLoading, 
          question: question, 
          currentEventId: this.props.query.event, 
          inspectedQuestionId: questionId, 
          events: this.props.events})
      );
    },

    renderSidebar: function() {
      return (
        QuestionListing({
          activeQuestionId: this.props.params.id, 
          activeEventId: this.props.query.event, 
          questions: this.props.questions, 
          query: this.props.query})
      );
    },
  });

  return QuestionRoute;
});


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

define('canvas_quizzes/apps/events/views/answer_matrix/emblem',['require','old_version_of_react_used_by_canvas_quizzes_client_apps'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');

  /**
   * @class Events.Views.AnswerMatrix.Emblem
   *
   * Woop.
   *
   * @seed An emblem for an empty answer.
   *  {}
   *
   * @seed An emblem for some answer.
   *  { "answered": true }
   *
   * @seed An emblem for the final answer.
   *  { "answered": true, "last": true }
   */
  var Emblem = React.createClass({displayName: 'Emblem',
    getDefaultProps: function() {
      return {};
    },

    shouldComponentUpdate: function(nextProps, nextState) {
      return false;
    },

    render: function() {
      var record = this.props;
      var className = 'ic-AnswerMatrix__Emblem';

      if (record.answered && record.last) {
        className += ' is-answered is-last';
      }
      else if (record.answered) {
        className += ' is-answered';
      }
      else {
        className += ' is-empty';
      }

      return React.DOM.i({className: className});
    }
  });

  return Emblem;
});

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

define('canvas_quizzes/apps/events/views/answer_matrix/legend',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','./emblem','i18n!quiz_log_auditing.table_view'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var Emblem = require('./emblem');
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

define('canvas_quizzes/apps/events/views/answer_matrix/option',['require','old_version_of_react_used_by_canvas_quizzes_client_apps'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var Option = React.createClass({displayName: 'Option',
    getDefaultProps: function() {
      return {
        checked: null
      };
    },

    render: function() {
      return (
        React.DOM.label(null, 
          React.DOM.input({
            type: "checkbox", 
            onChange: this.onChange, 
            checked: this.props.checked}), 

          this.props.label
        )
      );
    },

    onChange: function(e) {
      this.props.onChange(this.props.name, e.target.checked);
    }
  });


  return Option;
});

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

define('canvas_quizzes/apps/events/views/answer_matrix/cell',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','lodash','../../constants','./emblem'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var _ = require('lodash');
  var K = require('../../constants');
  var Emblem = require('./emblem');
  var findWhere = _.findWhere;

  // These questions types will have their answer cells truncated if it goes
  // over the character visibility threshold:
  var FREE_FORM_QUESTION_TYPES = [
    K.Q_ESSAY,
    K.Q_SHORT_ANSWER
  ];

  var MAX_VISIBLE_CHARS = K.MAX_VISIBLE_CHARS;

  /**
   * @class Cell
   * @memberOf Views.AnswerMatrix
   *
   * A table cell that renders an answer to a question, based on the question
   * type, the table options, and other things.
   */
  var Cell = React.createClass({displayName: 'Cell',
    getDefaultProps: function() {
      return {
        expanded: false,
        shouldTruncate: false,
        event: {},
        question: {}
      };
    },

    render: function() {
      var contents, formattedAnswer, answerSz, encodeAsJson;
      var props = this.props;
      var record = findWhere(props.event.data, {
        quizQuestionId: props.question.id
      });

      if (record) {
        formattedAnswer = record.answer;
        encodeAsJson = true;

        // show the answer only if the expandAll option is turned on, or the
        // current event is activated (i.e, the row was clicked):
        if (props.expanded) {
          if (FREE_FORM_QUESTION_TYPES.indexOf(props.question.questionType) > -1) {
            encodeAsJson = false;

            if (props.shouldTruncate) {
              formattedAnswer = record.answer || '';
              answerSz = formattedAnswer.length;

              if (answerSz > MAX_VISIBLE_CHARS) {
                formattedAnswer = formattedAnswer.substr(0, MAX_VISIBLE_CHARS);
                formattedAnswer += '...';
              }
            }
          }

          return (
            React.DOM.pre(null, 
              encodeAsJson ?
                JSON.stringify(formattedAnswer, null, 2) :
                formattedAnswer
              
            )
          );
        }
        else {
          return Emblem(record);
        }
      }

      return null;
    }
  });

  return Cell;
});

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

define('canvas_quizzes/apps/events/views/answer_matrix/table',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','i18n!quiz_log_auditing.table_view','canvas_quizzes/util/seconds_to_time','./cell'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var I18n = require('i18n!quiz_log_auditing.table_view');
  var secondsToTime = require('canvas_quizzes/util/seconds_to_time');
  var Cell = require('./cell');

  /**
   * @class Events.Views.AnswerMatrix.Table
   *
   * A table displaying the sequence of answers the student has provided to all
   * the questions. The answer cells will variate in shape based on the presence
   * of the answer and its position.
   *
   * @see Events.Views.AnswerMatrix.Emblem
   *
   * @seed A table of 8 questions and 25 events.
   *   "apps/events/test/fixtures/loaded_table.json"
   */
  var Table = React.createClass({displayName: 'Table',
    getInitialState: function() {
      return {
        activeEventId: null
      };
    },

    getDefaultProps: function() {
      return {
        questions: [],
        events: [],
        submission: {}
      };
    },

    render: function() {
      return (
        React.DOM.table({className: "ic-AnswerMatrix__Table ic-Table ic-Table--hover-row  ic-Table--condensed"}, 
          React.DOM.thead(null, 
            React.DOM.tr({className: "ic-Table__row--bg-neutral"}, 
              React.DOM.th({key: "timestamp"}, 
                React.DOM.div(null, I18n.t('headers.timestamp', 'Timestamp'))
              ), 

              this.props.questions.map(this.renderHeaderCell)
            )
          ), 

          React.DOM.tbody(null, 
            this.props.events.map(this.renderContentRow)
          )
        )
      );
    },

    renderHeaderCell: function(question) {
      return (
        React.DOM.th({key: "question-"+question.id}, 
          React.DOM.div(null, 
            I18n.t('headers.question', 'Question %{position}', {
              position: question.position
            }), 

            React.DOM.small(null, "(", question.id, ")")
          )
        )
      )
    },

    renderContentRow: function(event) {
      var className;
      var expanded = this.props.expandAll || event.id === this.state.activeEventId;
      var shouldTruncate = this.props.shouldTruncate;
      var secondsSinceStart = (
        new Date(event.createdAt) - new Date(this.props.submission.startedAt)
      ) / 1000;

      if (this.props.activeEventId === event.id) {
        className = 'active';
      }

      return (
        React.DOM.tr({
          key: "event-"+event.id, 
          className: className, 
          onClick: this.toggleAnswerVisibility.bind(null, event)}, 
          React.DOM.td(null, secondsToTime(secondsSinceStart)), 

          this.props.questions.map(function(question) {
            return (
              React.DOM.td({key: [ 'q', question.id, 'e', event.id ].join('_')}, 
                Cell({
                  question: question,
                  event: event,
                  expanded: expanded,
                  shouldTruncate: shouldTruncate
                })
              )
            );
          })
        )
      );
    },

    toggleAnswerVisibility: function(event) {
      this.setState({
        activeEventId: event.id === this.state.activeEventId ? null : event.id
      });
    },
  });

  return Table;
});


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

define('canvas_quizzes/apps/events/views/answer_matrix/inverted_table',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','canvas_quizzes/util/seconds_to_time','i18n!quiz_log_auditing.inverted_table_view','./cell'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var secondsToTime = require('canvas_quizzes/util/seconds_to_time');
  var I18n = require('i18n!quiz_log_auditing.inverted_table_view');
  var Cell = require('./cell');

  /**
   * @class Events.Views.AnswerMatrix.InvertedTable
   *
   * A table displaying the event series on the X axis, and the questions
   * on the Y axis. This table is optimal for inspecting answer contents, while
   * the "normal" table is optimized for viewing the answer sequence.
   *
   * @seed A table of 8 questions and 25 events.
   *   "apps/events/test/fixtures/loaded_table.json"
   */
  var InvertedTable = React.createClass({displayName: 'InvertedTable',
    getInitialState: function() {
      return {
        activeQuestionId: null
      };
    },

    render: function() {
      window.table = this;

      return (
        React.DOM.table({className: "ic-AnswerMatrix__Table ic-Table ic-Table--hover-row ic-Table--striped"}, 
          React.DOM.thead(null, 
            React.DOM.tr({className: "ic-Table__row--bg-neutral"}, 
              React.DOM.th({key: "question"}, 
                I18n.t('Question')
              ), 

              this.props.events.map(this.renderHeaderCell)
            )
          ), 

          React.DOM.tbody(null, 
            this.props.questions.map(this.renderContentRow)
          )
        )
      );
    },

    renderHeaderCell: function(event) {
      var secondsSinceStart = (
        new Date(event.createdAt) - new Date(this.props.submission.startedAt)
      ) / 1000;

      return (
        React.DOM.th({key: "header-"+event.id}, 
          secondsToTime(secondsSinceStart)
        )
      );
    },

    renderContentRow: function(question) {
      var expanded = this.props.expandAll || question.id === this.state.activeQuestionId;
      var shouldTruncate = this.props.shouldTruncate;

      return (
        React.DOM.tr({key: "question-"+question.id, onClick: this.toggleAnswerVisibility.bind(null, question)}, 
          React.DOM.td({key: "question"}, question.id), 

          this.props.events.map(function(event) {
            return (
              React.DOM.td({key: [ 'q', question.id, 'e', event.id ].join('_')}, 
                Cell({
                  question: question,
                  event: event,
                  expanded: expanded,
                  shouldTruncate: shouldTruncate
                })
              )
            );
          })
        )
      );
    },

    toggleAnswerVisibility: function(question) {
      this.setState({
        activeQuestionId: question.id === this.state.activeQuestionId ? null : question.id
      });
    }
  });


  return InvertedTable;
});

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

define('canvas_quizzes/apps/events/views/answer_matrix',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','old_version_of_react-router_used_by_canvas_quizzes_client_apps','../constants','i18n!quiz_log_auditing.table_view','./answer_matrix/legend','./answer_matrix/emblem','./answer_matrix/option','./answer_matrix/table','./answer_matrix/inverted_table'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var ReactRouter = require('old_version_of_react-router_used_by_canvas_quizzes_client_apps');
  var K = require('../constants');
  var I18n = require('i18n!quiz_log_auditing.table_view');
  var Legend = require('./answer_matrix/legend');
  var Emblem = require('./answer_matrix/emblem');
  var Option = require('./answer_matrix/option');
  var Table = require('./answer_matrix/table');
  var InvertedTable = require('./answer_matrix/inverted_table');
  var Link = ReactRouter.Link;

  var AnswerMatrix = React.createClass({displayName: 'AnswerMatrix',
    getInitialState: function() {
      return {
        activeEventId: null,
        shouldTruncate: false,
        expandAll: false
      };
    },

    getDefaultProps: function() {
      return {
        questions: [],
        events: [],
        submission: {
          createdAt: (new Date()).toJSON()
        }
      };
    },

    render: function() {
      var events = this.props.events.filter(function(e) {
        return e.type === K.EVT_QUESTION_ANSWERED;
      });

      var className;

      if (this.state.expandAll) {
        className = 'expanded';
      }

      return(
        React.DOM.div({id: "ic-AnswerMatrix", className: className}, 
          React.DOM.h1({className: "ic-QuizInspector__Header"}, 
            I18n.t('Answer Sequence'), 

            React.DOM.div({className: "ic-QuizInspector__HeaderControls"}, 
              Option({
                onChange: this.setOption, 
                name: "shouldTruncate", 
                label: I18n.t('options.truncate', 'Truncate textual answers'), 
                checked: this.state.shouldTruncate}), 

              Option({
                onChange: this.setOption, 
                name: "expandAll", 
                label: I18n.t('options.expand_all', 'Expand all answers'), 
                checked: this.state.expandAll}), 

              Option({
                onChange: this.setOption, 
                name: "invert", 
                label: I18n.t('options.invert', 'Invert'), 
                checked: this.state.invert}), 

              Link({to: "app", className: "btn btn-default", query: this.props.query}, 
                I18n.t('buttons.go_to_stream', 'View Stream')
              )
            )
          ), 

          Legend(null), 

          React.DOM.div({className: "table-scroller"}, 
            this.state.invert ? this.renderInverted(events) : this.renderNormal(events)
          )
        )
      );
    },

    renderNormal: function(events) {
      return Table({
        events: events,
        questions: this.props.questions,
        submission: this.props.submission,
        expandAll: this.state.expandAll,
        shouldTruncate: this.state.shouldTruncate
      });
    },

    renderInverted: function(events) {
      return InvertedTable({
        events: events,
        questions: this.props.questions,
        submission: this.props.submission,
        expandAll: this.state.expandAll,
        shouldTruncate: this.state.shouldTruncate,
        activeEventId: this.state.activeEventId
      });
    },

    setOption: function(option, isChecked) {
      var newState = {};

      newState[option] = isChecked;

      this.setState(newState);
    }
  });

  return AnswerMatrix;
});

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

define('canvas_quizzes/apps/events/routes/answer_matrix',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','../views/answer_matrix','../config'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var AnswerMatrix = require('../views/answer_matrix');
  var Config = require('../config');

  var AnswerMatrixRoute = React.createClass({displayName: 'AnswerMatrixRoute',
    statics: {
      willTransitionTo: function(transition, params) {
        if (!Config.allowMatrixView) {
          transition.abort();
        }
      }
    },

    render: function() {
      return (
        AnswerMatrix({
          loading: this.props.isLoading, 
          questions: this.props.questions, 
          events: this.props.events, 
          submission: this.props.submission})
      );
    }
  });

  return AnswerMatrixRoute;
});

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

define('canvas_quizzes/apps/events/bundles/routes',['require','old_version_of_react-router_used_by_canvas_quizzes_client_apps','../routes/app','../routes/event_stream','../routes/question','../routes/answer_matrix'],function(require) {
  var ReactRouter = require('old_version_of_react-router_used_by_canvas_quizzes_client_apps');
  var AppRoute = require('../routes/app');
  var EventStreamRoute = require('../routes/event_stream');
  var QuestionRoute = require('../routes/question');
  var AnswerMatrixRoute = require('../routes/answer_matrix');

  var Route = ReactRouter.Route;
  var Routes = ReactRouter.Routes;
  var DefaultRoute = ReactRouter.DefaultRoute;
  var NotFoundRoute = ReactRouter.NotFoundRoute;

  var currentPath = window.location.pathname
    , re = new RegExp('\(.*\/log)')
    , matches = re.exec(currentPath)
    , baseUrl = "";

  if(matches) {
    baseUrl = matches[0];
  }

  return (
    Routes({location: "history"}, 
      Route({name: "app", path: baseUrl +'/?', handler: AppRoute}, 
        DefaultRoute({handler: EventStreamRoute}), 
        NotFoundRoute({handler: AppRoute}), 

        Route({
          addHandlerKey: true, 
          name: "question", 
          path: baseUrl + "/questions/:id", 
          handler: QuestionRoute}), 

        Route({
          addHandlerKey: true, 
          name: "answer_matrix", 
          path: baseUrl + "/answer_matrix", 
          handler: AnswerMatrixRoute})
      )
    )
  );
});
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

define('canvas_quizzes/apps/events/core/controller',['require','../stores/events','../config'],function(require) {
  var EventStore = require('../stores/events');
  var config = require('../config');
  var update;

  var onChange = function() {
    update({
      submission: EventStore.getSubmission(),
      questions: EventStore.getQuestions(),
      events: EventStore.getAll(),
      isLoading: EventStore.isLoading(),
      attempt: EventStore.getAttempt(),
      availableAttempts: EventStore.getAvailableAttempts(),
    });
  };

  /**
   * @class Events.Core.Controller
   * @private
   *
   * The controller is responsible for keeping the UI up-to-date with the
   * data layer.
   */
  var Controller = {

    /**
     * Start listening to data updates.
     *
     * @param {Function} onUpdate
     *        A callback to notify when new data comes in.
     *
     * @param {Object} onUpdate.props
     *        A set of props ready for injecting into the app layout.
     *
     * @param {Object} onUpdate.props.quizStatistics
     *        Quiz statistics.
     *        See Stores.Statistics#getQuizStatistics().
     *
     * @param {Object} onUpdate.props.quizReports
     *        Quiz reports.
     *        See Stores.Statistics#getQuizReports().
     */
    start: function(onUpdate) {
      update = onUpdate;
      EventStore.addChangeListener(onChange);

      if (config.loadOnStartup) {
        Controller.load();
      }
    },

    /**
     * Load initial application data; quiz statistics and reports.
     */
    load: function() {
      EventStore.loadInitialData().then(EventStore.load.bind(EventStore));
    },

    /**
     * Stop listening to data changes.
     */
    stop: function() {
      update = undefined;
    }
  };

  return Controller;
});
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

define('canvas_quizzes/apps/events/core/delegate',['require','old_version_of_react_used_by_canvas_quizzes_client_apps','lodash','../config','../config/initializer','../bundles/routes','./controller'],function(require) {
  var React = require('old_version_of_react_used_by_canvas_quizzes_client_apps');
  var _ = require('lodash');
  var config = require('../config');
  var initialize = require('../config/initializer');
  var Layout = require('../bundles/routes');
  var controller = require('./controller');
  var extend = _.extend;
  var container;
  var layout;

  /**
   * @class Events.Core.Delegate
   *
   * The client app delegate. This is the main interface that embedding
   * applications use to interact with the client app.
   */
  var exports = {};

  /**
   * Configure the application. See Config for the supported options.
   *
   * @param  {Object} options
   *         A set of options to override.
   */
  var configure = function(options) {
    extend(config, options);
  };

  /**
   * Start the app and perform any necessary data loading.
   *
   * @param  {HTMLElement} node
   *         The node to mount the app in.
   *
   * @param  {Object} [options={}]
   *         Options to configure the app with. See config.js
   *
   * @return {RSVP.Promise}
   *         Fulfilled when the app has been started and rendered.
   */
  var mount = function(node, options) {
    configure(options);
    container = node;

    return initialize().then(function() {
      layout = React.renderComponent(Layout, container);
      controller.start(update);
    });
  };

  var isMounted = function() {
    return !!layout;
  };

  var update = function(props) {
    layout.getActiveComponent().setState(props);
  };

  var reload = function() {
    controller.load();
  };

  var unmount = function() {
    if (isMounted()) {
      controller.stop();
      React.unmountComponentAtNode(container);
      container = undefined;
    }
  };

  exports.configure = configure;
  exports.mount = mount;
  exports.isMounted = isMounted;
  exports.update = update;
  exports.reload = reload;
  exports.unmount = unmount;

  return exports;
});
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

define('canvas_quizzes/apps/events/main',['require','./config','./core/delegate'],function(require) {
  var config = require('./config');
  var delegate = require('./core/delegate');
  var exports = {};

  exports.configure = delegate.configure;
  exports.mount = delegate.mount;
  exports.isMounted = delegate.isMounted;
  exports.update = delegate.update;
  exports.reload = delegate.reload;
  exports.unmount = delegate.unmount;
  exports.config = config;

  return exports;
});
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

define('canvas_quizzes/apps/events/config/environments/production',[], function() {
  /**
   * @class Events.Config
   */
  return {
    /**
     * @cfg {Function} ajax
     * An XHR request processor that has an API compatible with jQuery.ajax.
     */
    ajax: undefined,

    /**
     * @cfg {String} quizUrl
     * Canvas API endpoint for querying the current quiz.
     */
    quizUrl: undefined,

    /**
     * @cfg {String} submissionUrl
     * Canvas API endpoint for querying the current quiz submission.
     */
    submissionUrl: undefined,

    /**
     * @cfg {String} eventsUrl
     * Canvas API endpoint for querying the current quiz submission's events.
     */
    eventsUrl: undefined,

    /**
     * @cfg {String} questionsUrl
     * Canvas API endpoint for querying questions in the current quiz.
     */
    questionsUrl: undefined,

    attempt: undefined,

    /**
     * @cfg {Boolean} [loadOnStartup=true]
     *
     * Whether the app should query all the data it needs as soon as it is
     * mounted.
     *
     * You may disable this behavior if you want to manually inject the app
     * with data.
     */
    loadOnStartup: true,

    /**
     * @cfg {Boolean} [allowMatrixView=true]
     *
     * Turn this off if you don't want the user to be able to view the answer
     * matrix.
     */
    allowMatrixView: true,

    /**
     * Error emitter. Default behavior is to log the error message to the
     * console.
     *
     * Override this to handle errors from the app.
     *
     * @param  {String} message
     *         An explanation of the error.
     */
    onError: function(message) {
      console.error(message);
    }
  };
});

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

define("canvas_quizzes/apps/events", [ "canvas_quizzes/apps/events/main" ], function(boot) {
  return boot;
});

}());
