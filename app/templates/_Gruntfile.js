module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yeoman: {
      // Configurable paths
      app: 'dev',
      dist: 'prod'
    },
    clean: {
      files: ['<%%=yeoman.dist%>',
              '<%%=yeoman.app%>/css',
              '<%%=yeoman.app%>/js']
    },
    compass: {
      dev: {
        options: {
          basePath: '<%%=yeoman.app%>/',
          config: '<%%=yeoman.app%>/config.rb',
          sourcemap: true
        }
      },
      prod: {
        options: {
          basePath: '<%%=yeoman.app%>/',
          config: '<%%=yeoman.app%>/config.rb',
          environment: 'production'
        }
      },
      preprod: {
        options: {
          basePath: '<%%=yeoman.app%>/',
          config: '<%%=yeoman.app%>/configpreprod.rb',
          environment: 'production'
        }
      }
    },
    assemble: {
      options: {
        flatten: true,
        layout: 'main.hbs',
        layoutdir: '<%%=yeoman.app%>/layouts/',
        partials: ['<%%=yeoman.app%>/partials/*.hbs'],
        data: ['<%%=yeoman.app%>/datas/*.json']
      },
      pages: {
        files: {
          '<%%=yeoman.dist%>/': ['<%%=yeoman.app%>/pages/*.hbs']
        }
      }
    },
    concat: {
      options: {
        separator: ';',
        stripBanners: true,
        banner: '/*! <%%= pkg.name %> - v<%%= pkg.version %> - ' +
                '<%%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> */',
      },
      appjs: {
        src: ['<%%=yeoman.app%>/src/plugins.js',
              '<%%=yeoman.app%>/src/plugins/*.js',
              '<%%=yeoman.app%>/src/main.js'],
        dest: '<%%=yeoman.app%>/js/app.js'
      }/*,
      total: {
        src: ['<%%=yeoman.app%>/bower_components/jquery/jquery.min.js',
              '<%%=yeoman.dist%>/js/app.js'],
        dest: '<%%=yeoman.dist%>/js/app.js'
      }*/
    },
    uglify: {
      minify: {
        files: [{
          expand: true,
          cwd: '<%%=yeoman.dist%>/js',
          src: ['*.js'],
          dest: '<%%=yeoman.dist%>/js',
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
            cwd: '<%%=yeoman.app%>/',
            src: ['*.{ico,png,txt,xml,html,htc}',
                  '.htaccess'],
            dest: '<%%=yeoman.dist%>/'
          }
        ]
      },
      font: {
        files: [{
          expand: true,
          cwd: '<%%=yeoman.app%>/font',
          src: ['*.{eot,woff,svg,ttf,txt}'],
          dest: '<%%=yeoman.dist%>/font/'
        }]
      },
      jquery: {
        files: [
          {
            expand: true,
            cwd: '<%%=yeoman.app%>/bower_components/jquery/dist',
            src: ['jquery.min.js','jquery.min.map'],
            dest: '<%%=yeoman.dist%>/js/vendor/jquery'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: '<%%=yeoman.app%>/js',
            src: ['*.js'],
            dest: '<%%=yeoman.dist%>/js/',
            ext: '.js'
          }
        ]
      },
      jscustom: {
        files: [
          {
            expand: true,
            cwd: '<%%=yeoman.app%>/src/custom',
            src: ['*.{js,swf}'],
            dest: '<%%=yeoman.dist%>/js/'
          }
        ]
      },
      css: {
        files: [
          {
            expand: true,
            cwd: '<%%=yeoman.app%>/css/',
            src: ['*.{css,map}'],
            dest: '<%%=yeoman.dist%>/css/'
          }
        ]
      },
      resources: {
        files: [
          {
            expand: true,
            cwd: '<%%=yeoman.app%>/img',
            src: ['**/*'],
            dest: '<%%=yeoman.dist%>/img/'
          }
        ]
      }
    },
    watch: {
      sass: {
        files: ['<%%=yeoman.app%>/scss/**/*.scss'],
        tasks: ['compass:dev']
      },
      html: {
        files: ['<%%=yeoman.app%>/**/*.{html,hbs,json}'],
        tasks: ['copy:html','assemble:pages']
      },
      css: {
        files: ['<%%=yeoman.app%>/css/*.css'],
        tasks: ['copy:css']
      },
      img: {
        files: ['<%%=yeoman.app%>/img/**/*'],
        tasks: ['copy:resources']
      },
      js: {
        files: ['<%%=yeoman.app%>/src/**/*.js'],
        tasks: ['jshint:use_defaults',
                'concat:appjs',
                'copy:js',
                'copy:jscustom'/*,
                'concat:total'*/]
      },
      livereload: {
        files: ['<%%=yeoman.app%>/**/*.{html,hbs,json}',
                '<%%=yeoman.app%>/css/*.css',
                '<%%=yeoman.app%>/img/*',
                '<%%=yeoman.app%>/src/**/*.js'],
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
          base: '<%%=yeoman.dist%>/'
        }
      }
    },
    modernizr: {
      dist: {
        devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
        outputFile: '<%%= yeoman.dist %>/js/vendor/modernizr/modernizr.min.js',
        files: {
            "src" : ['<%%= yeoman.dist %>/js/{,*/}*.js',
                     '<%%= yeoman.dist %>/css/{,*/}*.css',
                     '!<%%= yeoman.dist %>/js/vendor/modernizr/modernizer.min.js']
        },
        extra : {
          shiv : true,
          printshiv : false,
          load : true,
          mq : false,
          cssclasses : true
        },
        extensibility : {
          "addtest" : false,
          "prefixed" : false,
          "teststyles" : false,
          "testprops" : false,
          "testallprops" : false,
          "hasevents" : false,
          "prefixes" : false,
          "domprefixes" : false
        } ,
        "uglify" : true
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%%=yeoman.dist%>/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%%=yeoman.dist%>/img/'
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
      use_defaults: ['<%%=yeoman.app%>/src/main.js',
                     '<%%=yeoman.app%>/src/plugins.js',
                     '<%%=yeoman.app%>/src/custom/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('dev', [
    'clean',
    'compass:dev',
    'jshint:use_defaults',
    'copy:jquery',
    'concat:appjs',
    'copy:js',
    'copy:jscustom',
    /*'concat:total',*/
    'copy:html',
    'assemble:pages',
    'copy:css',
    'copy:font',
    'copy:resources',
    'modernizr:dist',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('production', [
    'clean',
    'compass:prod',
    'jshint:use_defaults',
    'copy:jquery',
    'concat:appjs',
    'copy:js',
    'copy:jscustom',
    'uglify:minify',
    /*'concat:total',*/
    'copy:jquery',
    'copy:css',
    'copy:font',
    'copy:html',
    'assemble:pages',
    'copy:resources',
    'modernizr:dist',
    'imagemin:dynamic'
  ]);

  grunt.registerTask('preprod', [
    'clean',
    'compass:preprod',
    'jshint:use_defaults',
    'copy:jquery',
    'concat:appjs',
    'copy:js',
    'copy:jscustom',
    /*'concat:total',*/
    'copy:css',
    'copy:font',
    'copy:html',
    'assemble:pages',
    'copy:resources',
    'modernizr:dist',
    'imagemin:dynamic'
  ]);

  grunt.registerTask('default', ['dev']);
  grunt.registerTask('prod', ['production']);

};
