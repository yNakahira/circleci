#!/bin/bash
set -v
if [ "${CIRCLE_BRANCH}" != "master" ]; then
  # Circle-CI
  #
  echo gem install
  gem install --no-document checkstyle_filter-git saddler saddler-reporter-github

  echo saddler
  git diff --name-only origin/master \
   | grep '.*\.js$' \
   | xargs node_modules/eslint/bin/eslint.js -f node_modules/eslint/lib/formatters/checkstyle.js \
   | checkstyle_filter-git diff origin/master \
   | saddler report \
      --require saddler/reporter/github \
      --reporter Saddler::Reporter::Github::PullRequestReviewComment
fi

exit 0
