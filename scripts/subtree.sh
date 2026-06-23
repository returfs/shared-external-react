#!/usr/bin/env bash

# Subtree helper script for the external monorepo
# Usage: ./scripts/subtree.sh <command> <name>
# Commands: push, split, status
#
# Mirrors internal/scripts/subtree.sh. External packages are the public,
# dev-facing tooling/libraries (scaffolding CLI + shared React/Laravel libs).
# Submitted dev extensions/handlers/services are pulled into extensions/,
# handlers/, services/ from their own GitHub repos by the deploy pipeline and
# are NOT managed by this script.

set -e

# Subtree mapping function (name -> repo)
get_repo() {
  case "$1" in
    # Scaffolding CLI (Yeoman generator + folded-in skeleton template)
    cli) echo "returfs/generator-returfs-package" ;;
    # Shared packages consumed by external devs
    shared-external-react) echo "returfs/shared-external-react" ;;
    shared-external-laravel) echo "returfs/shared-external-laravel" ;;
    *) echo "" ;;
  esac
}

# Get prefix for subtree (extension-packages/ or handler-packages/)
get_prefix() {
  case "$1" in
    cli) echo "extension-packages/cli" ;;
    shared-external-react) echo "extension-packages/shared-external-react" ;;
    shared-external-laravel) echo "handler-packages/shared-external-laravel" ;;
    *) echo "" ;;
  esac
}

# Branch to sync per subtree (most track main; shared-external-react is on
# split-be-fe until that work merges to main).
get_branch() {
  case "$1" in
    shared-external-react) echo "split-be-fe" ;;
    *) echo "main" ;;
  esac
}

# List of all subtrees
SUBTREES="cli shared-external-react shared-external-laravel"

COMMAND=${1:-"help"}
SUBTREE_NAME=${2:-""}

case $COMMAND in
  push)
    if [ -z "$SUBTREE_NAME" ]; then
      echo "Usage: ./scripts/subtree.sh push <name>"
      echo "Available: $SUBTREES"
      exit 1
    fi

    REPO=$(get_repo "$SUBTREE_NAME")
    PREFIX=$(get_prefix "$SUBTREE_NAME")
    BRANCH=$(get_branch "$SUBTREE_NAME")
    if [ -z "$REPO" ] || [ -z "$PREFIX" ]; then
      echo "Unknown: $SUBTREE_NAME"
      echo "Available: $SUBTREES"
      exit 1
    fi

    echo "Pushing $SUBTREE_NAME to $REPO ($BRANCH)..."

    # Add remote if not exists
    git remote add "$SUBTREE_NAME" "git@github.com:$REPO.git" 2>/dev/null || true

    # Try normal subtree push first
    if git subtree push --prefix="$PREFIX" "$SUBTREE_NAME" "$BRANCH"; then
      echo "✅ Successfully pushed $SUBTREE_NAME"
    else
      echo "Normal push failed, attempting force push..."
      git subtree split --prefix="$PREFIX" -b "${SUBTREE_NAME}-split"
      git push "$SUBTREE_NAME" "${SUBTREE_NAME}-split:${BRANCH}" --force
      git branch -D "${SUBTREE_NAME}-split"
      echo "✅ Force pushed $SUBTREE_NAME"
    fi
    ;;

  split)
    if [ -z "$SUBTREE_NAME" ]; then
      echo "Usage: ./scripts/subtree.sh split <name>"
      exit 1
    fi

    PREFIX=$(get_prefix "$SUBTREE_NAME")
    if [ -z "$PREFIX" ]; then
      echo "Unknown: $SUBTREE_NAME"
      exit 1
    fi

    echo "Splitting $SUBTREE_NAME to branch ${SUBTREE_NAME}-split..."
    git subtree split --prefix="$PREFIX" -b "${SUBTREE_NAME}-split"
    echo "✅ Created branch ${SUBTREE_NAME}-split"
    echo "You can now push with: git push <remote> ${SUBTREE_NAME}-split:$(get_branch "$SUBTREE_NAME")"
    ;;

  status)
    echo "Subtree Status"
    echo "=============="
    for name in $SUBTREES; do
      repo=$(get_repo "$name")
      prefix=$(get_prefix "$name")
      branch=$(get_branch "$name")
      echo ""
      echo "$name ($prefix) -> $repo [$branch]"
      if git remote | grep -q "^${name}$"; then
        echo "  Remote: ✅ configured"
      else
        echo "  Remote: ❌ not configured (run: git remote add $name git@github.com:$repo.git)"
      fi
    done
    ;;

  help|*)
    echo "Subtree Helper for External Monorepo"
    echo ""
    echo "Usage: ./scripts/subtree.sh <command> [name]"
    echo ""
    echo "Commands:"
    echo "  push <name>    Push subtree to its deployment repo"
    echo "  split <name>   Split subtree to a branch (for manual pushing)"
    echo "  status         Show all subtrees and their remote status"
    echo "  help           Show this help"
    echo ""
    echo "Available subtrees:"
    for name in $SUBTREES; do
      repo=$(get_repo "$name")
      prefix=$(get_prefix "$name")
      echo "  - $name ($prefix -> $repo)"
    done
    ;;
esac
