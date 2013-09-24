'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

var PageGenerator = module.exports = function PageGenerator(args, options, config) {

  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
  console.log('You called the page subgenerator with the argument ' + this.name + '.');
};

util.inherits(PageGenerator, yeoman.generators.NamedBase);

PageGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  var prompts = [{
    name: 'specificJS',
    type: 'confirm',
    default: true,
    message: 'Would you like to add a specific JS ?'
  }];

  this.prompt(prompts, function (props) {
    this.specificJS = props.specificJS;
    cb();
  }.bind(this));
};


PageGenerator.prototype.files = function files() {
  this.template('_page.html', 'dev/pages/' + this._.slugify(this.name) + '.html');
  this.template('_page.json', 'dev/datas/' + this._.slugify(this.name) + '.json');
  if (this.specificJS) {
    this.mkdir('dev/src/custom')
    this.template('_page.js', 'dev/src/custom/' + this._.slugify(this.name) + '.js');
  }
};
