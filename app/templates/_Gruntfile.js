module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    clean: {
      files: ['prod','dev/css']
    },
    compass: {
      dev: {
        options: {
          basePath: 'dev/',
          config: 'dev/config.rb'
        }
      },
      prod: {
        options: {
          basePath: 'dev/',
          config: 'dev/config.rb',
          environment: 'production'
        }
      }
    },
    assemble: {
      options: {
        flatten: true,
        layout: 'main.html',
        layoutdir: 'dev/layouts/',
        partials: ['dev/partials/*.html'],
        data: ['dev/datas/*.json']
      },
      pages: {
        files: {
          'prod/': ['dev/pages/*.html']
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      appjs: {
        src: ['dev/src/plugins.js', 'dev/src/main.js'],
        dest: 'dev/js/app.js',
      },
      total: {
        src: ['bower_components/jquery/jquery.min.js', 'prod/js/app.js'],
        dest: 'prod/js/app.js',
      }
    },
    uglify: {
      minify: {
        files: [{
          expand: true,
          cwd: 'prod/js',
          src: ['*.js'],
          dest: 'prod/js',
          ext: '.js'
        }]
      }
    },
    copy: {
      // Copie les fichiers HTML vers target
      html: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'dev/',
            src: ['*.{ico,png,txt,xml,html}',
                  '.htaccess'],
            dest: 'prod/'
          }
        ]
      },
      font: {
        files: [{
          expand: true,
          cwd: 'dev/font',
          src: ['*.{eot,woff,svg,ttf,txt}'],
          dest: 'prod/font/'
        }]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: 'dev/js',
            src: ['*.js'],
            dest: 'prod/js/',
            ext: '.js'
          }
        ]
      },
      jscustom: {
        files: [
          {
            expand: true,
            cwd: 'dev/src/custom',
            src: ['*.js'],
            dest: 'prod/js/',
            ext: '.js'
          }
        ]
      },
      css: {
        files: [
          {
            expand: true,
            cwd: 'dev/css/',
            src: ['*.css'],
            dest: 'prod/css/',
            ext: '.css'
          }
        ]
      },
      resources: {
        files: [
          {
            expand: true,
            cwd: 'dev/img',
            src: ['**/*'],
            dest: 'prod/img/'
          }
        ]
      }
    },
    watch: {
      sass: {
        files: ['dev/scss/**/*.scss'],
        tasks: ['compass:dev']
      },
      html: {
        files: ['dev/**/*.{html,json}'],
        tasks: ['copy:html','assemble:pages']
      },
      css: {
        files: ['dev/css/*.css'],
        tasks: ['copy:css']
      },
      js: {
        files: ['dev/src/**/*.js'],
        tasks: ['jshint:use_defaults',
                'concat:appjs','copy:js',
                'copy:jscustom',
                'concat:total']
      },
      livereload: {
        files: ['dev/**/*.{html,json}', 'dev/css/*.css', 'dev/img/*', 'dev/src/**/*.js'],
        options: {
          livereload: true
        }
      },
    },
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 9001,
          base: 'prod/'
        }
      }
    },
    modernizr: {
      "devFile" : "bower_components//modernizr/modernizr.js",
      "outputFile" : "prod/js/modernizr.min.js",
      "extra" : {
          "shiv" : true,
          "printshiv" : false,
          "load" : true,
          "mq" : false,
          "cssclasses" : true
      },
      "extensibility" : {
          "addtest" : false,
          "prefixed" : false,
          "teststyles" : false,
          "testprops" : false,
          "testallprops" : false,
          "hasevents" : false,
          "prefixes" : false,
          "domprefixes" : false
      },
      "uglify" : true,
      "tests" : [],
      "parseFiles" : true,
      "matchCommunityTests" : false,
      "customTests" : []
    },
    /*prompt: {
      prep: {
        options: {
          questions: [
            {
              config: 'template.options.data.gAnalytics',
              type: 'input', // list, checkbox, confirm, input, password
              message: 'Would you like to set the Google Analytics account',
              default: pkg.analytics, // default value if nothing is entered
            }
          ]
        }
      },
    },*/
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'prod/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'prod/img/'
        }]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      use_defaults: ['dev/src/*.js'],
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('dev', [
    'clean',
    /*'prompt:prep',*/
    'compass:dev',
    'modernizr',
    'jshint:use_defaults',
    'concat:appjs',
    'copy:js',
    'copy:jscustom',
    'concat:total',
    'copy:html',
    'assemble:pages',
    'copy:css',
    'copy:font',
    'copy:resources',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('production', [
    'clean',
    /*'prompt:prep',*/
    'compass:prod',
    'jshint:use_defaults',
    'concat:appjs',
    'copy:js',
    'copy:jscustom',
    'uglify:minify',
    'modernizr',
    'concat:total',
    'copy:css',
    'copy:font',
    'copy:html',
    'assemble:pages',
    'copy:resources',
    'imagemin:dynamic'
  ]);

  grunt.registerTask('default', ['dev']);

};
