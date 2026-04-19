---
name: apify
description: Scrape data from social media platforms including Twitter/X, Instagram, LinkedIn, Facebook, TikTok, and YouTube. Use when user wants to analyze social media trends, sentiment, follower data, or gather content from social platforms.
allowed_tools:
  - apify
---

# Apify Integration Skill

Scrape data from social media platforms using Apify actors.

## Tool
- **apify_scrape**: Execute Apify actors for social media scraping
  - Platforms: Twitter/X, Instagram, LinkedIn, Facebook, TikTok, YouTube
  - Input: Platform-specific actors and parameters
  - Returns: Structured social media data

## Usage
Use when:
- Analyzing social media trends
- Gathering competitor social media data
- Sentiment analysis on social platforms
- Tracking influencer metrics
- Collecting content from social media for analysis

## Supported Platforms
- **Twitter/X**: Tweet extraction, user followers/following
- **Instagram**: Posts, comments, hashtags, profiles
- **LinkedIn**: Company pages, posts, profile data
- **Facebook**: Pages, posts, comments
- **TikTok**: Videos, hashtags, user profiles
- **YouTube**: Videos, comments, channels

## Note
Requires `APIFY_API_TOKEN` environment variable.
