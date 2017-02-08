#!/bin/bash
set -v
if [ "${CIRCLE_BRANCH}" != "master" ]; then
  # Circle-CI
  #
  echo gem install
  gem install --no-document checkstyle_filter-git saddler saddler-reporter-github

  echo "********************"
  echo "* select reporter  *"
  echo "********************"

  if [ -z "${CI_PULL_REQUEST}" ]; then
      # when not pull request
      REPORTER=Saddler::Reporter::Github::CommitReviewComment
  else
      REPORTER=Saddler::Reporter::Github::PullRequestReviewComment
  fi

  echo saddler
  git diff --name-only origin/master \
   | grep '.*\.js$' \
   | xargs node_modules/eslint/bin/eslint.js -f checkstyle \
   | checkstyle_filter-git diff origin/master \
   | saddler report --require saddler/reporter/github --reporter $REPORTER

fi
