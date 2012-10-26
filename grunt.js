/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-vows');

  // Project configuration.
  grunt.initConfig({
    lint: {
      app: ['grunt.js', 'app/**/*.js', 'config/**/*.js'],
      test: ['test/**/*.js']
    },
    vows: {
      all: {
        files: ['test/*.js'],
        reporter: 'spec'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      test: {
        options: {
          expr: true
        }
      }
    }
  });

  // Run tests using Mocha
  grunt.registerTask('test', 'vows');

  // Default task.
  grunt.registerTask('default', 'lint test');

};
