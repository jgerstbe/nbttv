# NBTTV - no bonk ttv

![NBTTV Logo](/assets/logo.png)  

NBTTV is a simple extension to remove channels from the browsing views of our favorite streaming site.

Channels can be filtered by keywords which will be checked against the text in a channel preview like its title, channel name and tags.

Build using [vue](https://vuejs.org/), [tailwind](https://tailwindcss.com/) and [heroicons](https://heroicons.dev/).

## features
- remove channels by keyword
- replace the spot of the channel with any html content (*embeds*)
- redirect user to a different page if he visit certain channels

![Example](/assets/example.png)

## how to install
- download zip from release page
- visit `chrome://extensions/` / `brave://extensions/`
- enable developer mode
- drag and drop the zip to install
## filterlists
You can subscribe to public filter lists to keep up to date with content that should be filtered.

Filter lists have be publicly accessible via http get an support cors.

The required format is as follows:
```
{
  "name" : "<name>",
  "url": "<url>",
  "author": "<author>",
  "keywords": [<keyword>...],
  "embeds": [<html-string>...],
  "redirect": [
      "channelNames": [<channelName>, ...],
      "targets" : [<url>, ...]
  ]
}
```
