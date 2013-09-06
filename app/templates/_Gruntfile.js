module.exports = function(grunt) {

  // Configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
        // Supprime le répertoire target
    clean: {
      files: ['prod']
    },
    compass: {
      dev: {
        options: {
          basePath: 'dev/',
          config: 'dev/config.rb'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      appjs: {
        src: ['dev/js/plugins.js', 'dev/js/main.js'],
        dest: 'prod/js/app.js',
      },
      total: {
        src: ['bower_components/jquery/jquery.min.js', 'prod/js/app.js'],
        dest: 'prod/js/app.js',
      }
    },
    uglify: {
      minify: {
        files: [
          {
            'prod/js/app.js': ['prod/js/app.js']
          }
        ]
      }
    },
    copy: {
      // Copie les fichiers HTML vers target
      html: {
        files: [
          {
            expand: true,
            cwd: 'dev/',
            src: ['*.html'],
            dest: 'prod/',
            ext: '.html'
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
      css: {
        files: ['dev/css/*.css'],
        tasks: ['copy:css']
      },
      /* watch our files for change, reload */
      livereload: {
        files: ['*.html', 'dev/css/*.css', 'dev/img/*', 'dev/js/{plugins.js, main.js}'],
        options: {
          livereload: true
        }
      },
    },
    connect: {
      server: {
        options: {
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

  // Dev : copy, compile, lance le serveur
  grunt.registerTask('dev', [
    'clean',
    'compass:dev',
    'modernizr',
    'concat:appjs',
    'concat:total',
    'copy:html',
    'copy:css',
    'copy:resources',
    'connect:server',
    'watch'
  ])
  // Prod : copy, compile, minify
  grunt.registerTask('production', [
    'clean',
    'compass:dev',
    'modernizr',
    'concat:appjs',
    'uglify:minify',
    'concat:total',
    'compass:dev',
    'copy:css',
    'copy:html',
    'copy:resources'
  ]);

  grunt.registerTask('default', ['dev']);

};
