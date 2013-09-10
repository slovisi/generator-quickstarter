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
  var prompts = [{
    name: 'projectName',
    message: 'Name of the project :'
  },
  {
    name: 'authorName',
    message: 'Developer\'s name'
  },
  {
    name: 'gAnalytics',
    default: 'UA-XXXXX-X',
    message: 'Google Analytics account ? If no account leave blank :'
  },
  {
    name: 'features',
    message: 'Select the options :',
    type: 'checkbox',
    choices: [{
      name: 'Webfont Usage example',
      value: 'useWebfont',
      checked: true
    }, {
      name: 'Normalize IE7 support',
      value: 'supportIE7',
      checked: true
    }, {
      name: 'Normalize IE6 support',
      value: 'supportIE6',
      checked: false
    }, {
      name: 'Debug Stylesheet ON',
      value: 'debugCSSOn',
      checked: false
    }]
  }];


  this.prompt(prompts, function (props) {

    var features = props.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    this.projectName = props.projectName;
    this.authorName = props.authorName;
    this.gAnalytics = props.gAnalytics;
    this.useWebfont = hasFeature('useWebfont');
    this.supportIE7 = hasFeature('props.supportIE7');
    this.supportIE6 = hasFeature('props.supportIE6');
    this.debugCSSOn = hasFeature('props.debugCSSOn');


    cb();
  }.bind(this));
};

QuickstarterGenerator.prototype.app = function app() {
  this.mkdir('dev');
  this.mkdir('dev/css');
  this.template('index.html', 'dev/index.html');
  this.copy('404.html', 'dev/404.html');
  this.copy('apple-touch-icon-precomposed.png', 'dev/apple-touch-icon-precomposed.png');
  this.copy('CHANGELOG.md', 'dev/CHANGELOG.md');
  this.copy('LICENSE.md', 'dev/LICENSE.md');
  this.copy('README.md', 'dev/README.md');
  this.copy('robots.txt', 'dev/robots.txt');
  this.copy('crossdomain.xml', 'dev/crossdomain.xml');
  this.template('_config.rb', 'dev/config.rb');
  this.copy('favicon.ico', 'dev/favicon.ico');

  this.mkdir('dev/js');
  this.mkdir('dev/src');
  this.template("js/plugins.js", "dev/src/plugins.js");
  this.template("js/main.js", "dev/src/main.js");

  this.mkdir("dev/img");
  this.copy("img/spacer.gif", "dev/img/spacer.gif");

  this.mkdir("dev/scss");
  this.mkdir("dev/scss/partials");
  this.template("scss/_screen.scss", "dev/scss/screen.scss");
  this.template("scss/partials/_application.scss", "dev/scss/partials/_application.scss");
  this.template("scss/partials/_boilerplate-defaults.scss", "dev/scss/partials/_boilerplate-defaults.scss");
  this.template("scss/partials/_config.scss", "dev/scss/partials/_config.scss");
  this.template("scss/partials/_debug.scss", "dev/scss/partials/_debug.scss");
  this.template("scss/partials/_helpers.scss", "dev/scss/partials/_helpers.scss");
  this.template("scss/partials/_normalize.scss", "dev/scss/partials/_normalize.scss");
  this.template("scss/partials/_print.scss", "dev/scss/partials/_print.scss");

  if (this.useWebfont) {
    this.mkdir("dev/font");
    this.copy('font/Paratype_PT_Sans_Free_Font_License.txt', 'dev/font/Paratype_PT_Sans_Free_Font_License.txt');
    this.copy('font/PTC55F-webfont.eot', 'dev/font/PTC55F-webfont.eot');
    this.copy('font/PTC55F-webfont.svg', 'dev/font/PTC55F-webfont.svg');
    this.copy('font/PTC55F-webfont.ttf', 'dev/font/PTC55F-webfont.ttf');
    this.copy('font/PTC55F-webfont.woff', 'dev/font/PTC55F-webfont.woff');
    this.copy('font/PTC75F-webfont.eot', 'dev/font/PTC75F-webfont.eot');
    this.copy('font/PTC75F-webfont.svg', 'dev/font/PTC75F-webfont.svg');
    this.copy('font/PTC75F-webfont.ttf', 'dev/font/PTC75F-webfont.ttf');
    this.copy('font/PTC75F-webfont.woff', 'dev/font/PTC75F-webfont.woff');
    this.copy('font/PTN57F-webfont.eot', 'dev/font/PTN57F-webfont.eot');
    this.copy('font/PTN57F-webfont.svg', 'dev/font/PTN57F-webfont.svg');
    this.copy('font/PTN57F-webfont.ttf', 'dev/font/PTN57F-webfont.ttf');
    this.copy('font/PTN57F-webfont.woff', 'dev/font/PTN57F-webfont.woff');
    this.copy('font/PTN77F-webfont.eot', 'dev/font/PTN77F-webfont.eot');
    this.copy('font/PTN77F-webfont.svg', 'dev/font/PTN77F-webfont.svg');
    this.copy('font/PTN77F-webfont.ttf', 'dev/font/PTN77F-webfont.ttf');
    this.copy('font/PTN77F-webfont.woff', 'dev/font/PTN77F-webfont.woff');
    this.copy('font/PTS55F-webfont.eot', 'dev/font/PTS55F-webfont.eot');
    this.copy('font/PTS55F-webfont.svg', 'dev/font/PTS55F-webfont.svg');
    this.copy('font/PTS55F-webfont.ttf', 'dev/font/PTS55F-webfont.ttf');
    this.copy('font/PTS55F-webfont.woff', 'dev/font/PTS55F-webfont.woff');
    this.copy('font/PTS56F-webfont.eot', 'dev/font/PTS56F-webfont.eot');
    this.copy('font/PTS56F-webfont.svg', 'dev/font/PTS56F-webfont.svg');
    this.copy('font/PTS56F-webfont.ttf', 'dev/font/PTS56F-webfont.ttf');
    this.copy('font/PTS56F-webfont.woff', 'dev/font/PTS56F-webfont.woff');
    this.copy('font/PTS75F-webfont.eot', 'dev/font/PTS75F-webfont.eot');
    this.copy('font/PTS75F-webfont.svg', 'dev/font/PTS75F-webfont.svg');
    this.copy('font/PTS75F-webfont.ttf', 'dev/font/PTS75F-webfont.ttf');
    this.copy('font/PTS75F-webfont.woff', 'dev/font/PTS75F-webfont.woff');
    this.copy('font/PTS76F-webfont.eot', 'dev/font/PTS76F-webfont.eot');
    this.copy('font/PTS76F-webfont.svg', 'dev/font/PTS76F-webfont.svg');
    this.copy('font/PTS76F-webfont.ttf', 'dev/font/PTS76F-webfont.ttf');
    this.copy('font/PTS76F-webfont.woff', 'dev/font/PTS76F-webfont.woff');
    this.mkdir('dev/scss/optionnal');
    this.copy('scss/optionnal/_webfonts.scss', 'dev/scss/optionnal/_webfonts.scss');
  }

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
};

QuickstarterGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
