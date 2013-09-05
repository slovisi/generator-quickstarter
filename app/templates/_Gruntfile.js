// Generated on 2013-09-03 using generator-webapp 0.4.1
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  // configurable paths
  var yoConf = {
      dev: 'dev',
      dist: 'dist'
  };
      // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    quickConfig: yoConf,
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yoConf.dev)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yoConf.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
        dist: {
            files: [{
                dot: true,
                src: [
                    '.tmp',
                    '<%= quickConfig.dist %>/*',
                    '!<%= quickConfig.dist %>/.git*'
                ]
            }]
        },
        server: '.tmp'
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      }
    },
    compass: {
      otions: {
        config: 'config.rb'
      },
      dist: {
        options: {
          environment: 'production'
        }
      },
      dev: {
        options: {
          environment: 'development'
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'uglify',
    'compass',
    'connect',
    'open'
  ]);

  grunt.registerTask('default', [
    'clean',
    'uglify',
    'compass',
    'connect',
    'open'
  ]);

};
