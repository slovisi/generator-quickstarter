module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  // Configuration goes here
  grunt.initConfig({

        // Supprime le répertoire target
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
        files: [
          {
            expand: true,
            cwd: 'dev/font',
            src: ['*.eot'],
            dest: 'prod/font/',
            ext: '.eot'
          },
          {
            expand: true,
            cwd: 'dev/font',
            src: ['*.svg'],
            dest: 'prod/font/',
            ext: '.svg'
          },
          {
            expand: true,
            cwd: 'dev/font',
            src: ['*.ttf'],
            dest: 'prod/font/',
            ext: '.ttf'
          },
          {
            expand: true,
            cwd: 'dev/font',
            src: ['*.woff'],
            dest: 'prod/font/',
            ext: '.woff'
          },
          {
            expand: true,
            cwd: 'dev/font',
            src: ['*.txt'],
            dest: 'prod/font/',
            ext: '.txt'
          }
        ]
      },
      // Copie les fichiers JS vers target
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
      // Copie les fichiers CSS vers target
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

      // Copie les resources
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
      /* watch our files for change, reload */
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

      // [REQUIRED] Path to the build you're using for development.
      "devFile" : "bower_components//modernizr/modernizr.js",

      // [REQUIRED] Path to save out the built file.
      "outputFile" : "prod/js/modernizr.min.js",

      // Based on default settings on http://modernizr.com/download/
      "extra" : {
          "shiv" : true,
          "printshiv" : false,
          "load" : true,
          "mq" : false,
          "cssclasses" : true
      },

      // Based on default settings on http://modernizr.com/download/
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

      // By default, source is uglified before saving
      "uglify" : true,

      // Define any tests you want to impliticly include.
      "tests" : [],

      // By default, this task will crawl your project for references to Modernizr tests.
      // Set to false to disable.
      "parseFiles" : true,

      // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
      // You can override this by defining a "files" array below.
      // "files" : [],

      // When parseFiles = true, matchCommunityTests = true will attempt to
      // match user-contributed tests.
      "matchCommunityTests" : false,

      // Have custom Modernizr tests? Add paths to their location here.
      "customTests" : []
    },
    prompt: {
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
    },
    template: {
      options: {
        data : {
          'appName': pkg.fullname,
          'gAnalytics': pkg.analytics
        }
      },
      process: {
        files: [{expand: true,
            cwd: 'prod/',
            src: ['*.html'],
            dest: 'prod/',
            ext: '.html'}]
      }
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'prod/img/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'prod/img/'                  // Destination path prefix
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
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('assemble');
  // Dev : copy, compile, lance le serveur
  grunt.registerTask('dev', [
    'clean',
    'prompt:prep',
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
  ])
  // Prod : copy, compile, minify
  grunt.registerTask('production', [
    'clean',
    'prompt:prep',
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
