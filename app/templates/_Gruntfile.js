module.exports = function(grunt) {

grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  connect: {
    server: {
      options: {
        keepalive: true
      }
    }
  },
  compass: {
    dist: {
      options: {
        config: 'config.rb',
        environment: 'production'
      }
    },
    dev: {
      options: {
        config: 'config.rb',
        environment: 'development'
      }
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-compass');

grunt.registerTask('default', ['compass','connect']);
};