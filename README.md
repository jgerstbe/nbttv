# NBTTV - no bonk ttv

![NBTTV Logo](/assets/logo.png)  

NBTTV is a simple extension to remove channels from the browsing views of our favorite streaming site.

Channels can be filtered by keywords which will be checked against the text in a channel preview like its title, channel name and tags.

## features
- remove channels by keyword
- replace the spot of the channel with any html content (*embeds*)
- redirect user to a different page if he visit certain channels

![Example](/assets/example.png)

## filterlists - *coming soon*
You can subscribe to public filterlists to keep up to date with content that should be filtered.

These lists have to implement the following format:
```
{
  "name" : "<name>",
  "url": "<url>",
  "author": "<author>",
  "keywods": [<keyword>...],
  "embeds": [<html-string>...],
  "redirect": [
      "channelNames": [<channelName>, ...],
      "targets" : [<url>, ...]
  ]
}
```
