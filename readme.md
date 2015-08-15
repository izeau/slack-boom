# :boom: slack-boom

[![npm version](https://img.shields.io/npm/v/slack-boom.svg)](https://www.npmjs.org/packages/slack-boom) [![Dependency Status](https://img.shields.io/david/izeau/slack-boom.svg)](https://david-dm.org/izeau/slack-boom)

A Slack bot to auto-kick an user when one of their messages has reached a threshold of negative reactions

  0. [Create a bot](https://my.slack.com/services/new/bot)
  0. Install globally with `npm install --global slack-boom`
  0. Run `slack-boom <token> <treshold> <reaction>`, e.g. `slack-boom <token> 3 boom` will kick users receiving 3 'boom' (:boom:) reactions to one of their messages

**NOTE**: no auto-kick at the time, but it will gladly send a kick command that you can copy/paste in seconds!

## License

slack-boom is distributed under the MIT license and bundles the MIT-licensed node-slack-client library by Slack Technologies, Inc, with modifications from [Joe Hildebrand](https://github.com/hildjj/node-slack-client).
