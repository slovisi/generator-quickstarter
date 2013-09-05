'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var QuickstarterGenerator = module.exports = function QuickstarterGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(QuickstarterGenerator, yeoman.generators.Base);

QuickstarterGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  /*
  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];
  */
  var prompts = [{
    name: 'projectName',
    message: 'What\'s the name of the project ?'
  },
  {
    name: 'authorName',
    message: 'What\'s your name ?'
  },
  {
    name: 'useWebfont',
    type: 'confirm',
    default: true,
    message: 'Would you like to include an exemple Webfont ?'
  },
  {
    name: 'supportIE7',
    type: 'confirm',
    default: true,
    message: 'Would you like to include IE7 support ?'
  },
  {
    name: 'supportIE6',
    type: 'confirm',
    default: false,
    message: 'Would you like to include IE6 support ?'
  },
  {
    name: 'debugCSSOn',
    type: 'confirm',
    default: false,
    message: 'Would you like set CSS Debug On ?'
  }
  ];


  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.authorName = props.authorName;
    this.useWebfont = props.useWebfont;
    this.supportIE7 = props.supportIE7;
    this.supportIE6 = props.supportIE6;
    this.debugCSSOn = props.debugCSSOn;

    cb();
  }.bind(this));
};

QuickstarterGenerator.prototype.app = function app() {
  this.copy('index.html', 'index.html');
  this.copy('404.html', '404.html');
  this.copy('apple-touch-icon.png', 'apple-touch-icon.png');
  this.copy('apple-touch-icon-precomposed.png', 'apple-touch-icon-precomposed.png');
  this.copy('apple-touch-icon-72x72-precomposed.png', 'apple-touch-icon-72x72-precomposed.png');
  this.copy('apple-touch-icon-57x57-precomposed.png', 'apple-touch-icon-57x57-precomposed.png');
  this.copy('apple-touch-icon-114x114-precomposed.png', 'apple-touch-icon-114x114-precomposed.png');
  this.copy('CHANGELOG.md', 'CHANGELOG.md');
  this.copy('LICENSE.md', 'LICENSE.md');
  this.copy('README.md', 'README.md');
  this.copy('robots.txt', 'robots.txt');
  this.copy('crossdomain.xml', 'crossdomain.xml');
  this.template('_config.rb', 'config.rb');
  this.copy('favicon.ico', 'favicon.ico');

  this.mkdir("img");
  this.copy("img/spacer.gif", "img/spacer.gif");

  this.mkdir("scss");
  this.mkdir("scss/partials");
  this.template("scss/_screen.scss", "scss/screen.scss");
  this.template("scss/partials/_application.scss", "scss/partials/_application.scss");
  this.template("scss/partials/_boilerplate-defaults.scss", "scss/partials/_boilerplate-defaults.scss");
  this.template("scss/partials/_config.scss", "scss/partials/_config.scss");
  this.template("scss/partials/_debug.scss", "scss/partials/_debug.scss");
  this.template("scss/partials/_helpers.scss", "scss/partials/_helpers.scss");
  this.template("scss/partials/_normalize.scss", "scss/partials/_normalize.scss");
  this.template("scss/partials/_print.scss", "scss/partials/_print.scss");

  if (this.useWebfont) {
    this.mkdir("font");
    this.copy('font/Paratype_PT_Sans_Free_Font_License.txt', 'font/Paratype_PT_Sans_Free_Font_License.txt');
    this.copy('font/PTC55F-webfont.eot', 'font/PTC55F-webfont.eot');
    this.copy('font/PTC55F-webfont.svg', 'font/PTC55F-webfont.svg');
    this.copy('font/PTC55F-webfont.ttf', 'font/PTC55F-webfont.ttf');
    this.copy('font/PTC55F-webfont.woff', 'font/PTC55F-webfont.woff');
    this.copy('font/PTC75F-webfont.eot', 'font/PTC75F-webfont.eot');
    this.copy('font/PTC75F-webfont.svg', 'font/PTC75F-webfont.svg');
    this.copy('font/PTC75F-webfont.ttf', 'font/PTC75F-webfont.ttf');
    this.copy('font/PTC75F-webfont.woff', 'font/PTC75F-webfont.woff');
    this.copy('font/PTN57F-webfont.eot', 'font/PTN57F-webfont.eot');
    this.copy('font/PTN57F-webfont.svg', 'font/PTN57F-webfont.svg');
    this.copy('font/PTN57F-webfont.ttf', 'font/PTN57F-webfont.ttf');
    this.copy('font/PTN57F-webfont.woff', 'font/PTN57F-webfont.woff');
    this.copy('font/PTN77F-webfont.eot', 'font/PTN77F-webfont.eot');
    this.copy('font/PTN77F-webfont.svg', 'font/PTN77F-webfont.svg');
    this.copy('font/PTN77F-webfont.ttf', 'font/PTN77F-webfont.ttf');
    this.copy('font/PTN77F-webfont.woff', 'font/PTN77F-webfont.woff');
    this.copy('font/PTS55F-webfont.eot', 'font/PTS55F-webfont.eot');
    this.copy('font/PTS55F-webfont.svg', 'font/PTS55F-webfont.svg');
    this.copy('font/PTS55F-webfont.ttf', 'font/PTS55F-webfont.ttf');
    this.copy('font/PTS55F-webfont.woff', 'font/PTS55F-webfont.woff');
    this.copy('font/PTS56F-webfont.eot', 'font/PTS56F-webfont.eot');
    this.copy('font/PTS56F-webfont.svg', 'font/PTS56F-webfont.svg');
    this.copy('font/PTS56F-webfont.ttf', 'font/PTS56F-webfont.ttf');
    this.copy('font/PTS56F-webfont.woff', 'font/PTS56F-webfont.woff');
    this.copy('font/PTS75F-webfont.eot', 'font/PTS75F-webfont.eot');
    this.copy('font/PTS75F-webfont.svg', 'font/PTS75F-webfont.svg');
    this.copy('font/PTS75F-webfont.ttf', 'font/PTS75F-webfont.ttf');
    this.copy('font/PTS75F-webfont.woff', 'font/PTS75F-webfont.woff');
    this.copy('font/PTS76F-webfont.eot', 'font/PTS76F-webfont.eot');
    this.copy('font/PTS76F-webfont.svg', 'font/PTS76F-webfont.svg');
    this.copy('font/PTS76F-webfont.ttf', 'font/PTS76F-webfont.ttf');
    this.copy('font/PTS76F-webfont.woff', 'font/PTS76F-webfont.woff');
    this.mkdir('scss/optionnal');
    this.copy('scss/optionnal/_webfonts.scss', 'scss/optionnal/_webfonts.scss');
  }

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
};

QuickstarterGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
