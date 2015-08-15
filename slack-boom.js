#!/usr/bin/env node

'use strict';

require('array.prototype.find');

var Slack    = require('slack-client');
var Message  = require('slack-client/src/message');
var token    = process.argv[2];
var treshold = Number(process.argv[3]);
var reaction = process.argv[4];

if (!token || isNaN(treshold)) {
  console.error([
    'Usage: slack-boom <token> <treshold> <reaction>',
    null,
    'To generate a token, create a bot at http://my.slack.com/services/new/bot'
  ].join('\n'));
  process.exit(1);
}

var slack = new Slack(token);

slack.on('reaction_added', function (update) {
  if (update.reaction !== reaction) {
    return;
  }

  var message = new Message(slack, update.item);
  var channel = slack.getChannelGroupOrDMByID(message.channel);

  message.getReactions(function (response) {
    var reactions = response.message.reactions;
    var count     = reactions.find(reactionMatches).count;
    var sender    = slack.getUserByID(response.message.user);

    if (count < treshold) {
      return;
    }

    channel.send([
      ':' + reaction + ': \u00d7 ' + count,
      ':point_right:',
      '`/kick ' + sender.name + '`',
      '\n',
      getMessageURL(channel, message)
    ].join(' '));
  });
});

slack.on('error', function (err) {
  if (err === 'invalid_auth') {
    console.error('Invalid token, go grab a valid one!')
    process.exit(1);
  }

  console.error(err);
});

slack.login();

function reactionMatches (emoji) {
  return emoji.name === reaction;
}

function getMessageURL(channel, message) {
  return [
    'https://' + slack.team.domain + '.slack.com',
    '/archives/',
    channel.is_im ? channel.id : channel.name,
    '/p' + String(message.ts).replace('.', '')
  ].join('');
};
