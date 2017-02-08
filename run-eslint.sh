#!/bin/bash
set -v
if [ "${CIRCLE_BRANCH}" != "master" ]; then
  # Circle-CI
  #
  echo gem install
  gem install --no-document checkstyle_filter-git saddler saddler-reporter-github

  echo git diff
  git diff --name-only origin/master

  echo file grep
  git diff --name-only origin/master \
   | grep '.*\.js$'

  echo eslint
  git diff --name-only origin/master \
   | grep '.*\.js$' \
   | xargs node_modules/eslint/bin/eslint -f node_modules/eslint/lib/formatters/checkstyle \

  echo checkstyle_filter-git
  git diff --name-only origin/master \
   | grep '.*\.js$' \
   | xargs node_modules/eslint/bin/eslint -f node_modules/eslint/lib/formatters/checkstyle
   | checkstyle_filter-git diff origin/master

  echo saddler
  git diff --name-only origin/master \
   | grep '.*\.js$' \
   | xargs node_modules/eslint/bin/eslint -f node_modules/eslint/lib/formatters/checkstyle
   | checkstyle_filter-git diff origin/master \
   | saddler report \
      --require saddler/reporter/github \
      --reporter Saddler::Reporter::Github::PullRequestReviewComment
fi

exit 0
