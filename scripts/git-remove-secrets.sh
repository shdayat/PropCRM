#!/bin/bash
# Safe helper: shows recommended commands to remove `.env.local` from history using BFG
echo "This script only prints recommended commands. Do NOT run without understanding consequences."
echo
echo "1) Install BFG: https://rtyley.github.io/bfg-repo-cleaner/"
echo
echo "2) Run the following from repo root:" 
echo "  bfg --delete-files .env.local"
echo "  git reflog expire --expire=now --all"
echo "  git gc --prune=now --aggressive"
echo "  git push --force"

echo
echo "Alternatively use git-filter-repo for more advanced filtering."
