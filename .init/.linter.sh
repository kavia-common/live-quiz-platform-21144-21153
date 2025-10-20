#!/bin/bash
cd /home/kavia/workspace/code-generation/live-quiz-platform-21144-21153/live_quiz_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

