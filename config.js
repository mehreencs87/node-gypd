var os = require('os');
var _ = require('lodash');
var path = require('path');

var config = module.exports = _.chain({
  PORT: 8080,
  CACHE_PATH: './.cache',
  NODE_PLATFORM: os.platform() + '-' + os.arch()
}).extend(process.env)
.pick(['PORT', 'CACHE_PATH', 'NODE_PLATFORM'])
.value();

config.CACHE_PATH = path.resolve(config.CACHE_PATH);