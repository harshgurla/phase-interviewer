#!/bin/bash
API_KEY=$(grep GEMINI_API_KEY .env | cut -d'=' -f2)
curl -s "https://generativelanguage.googleapis.com/v1beta/models?key=$API_KEY" | python3 -m json.tool | head -30
