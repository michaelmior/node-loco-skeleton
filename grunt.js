/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Project configuration.
  grunt.initConfig({
    lint: {
      app: ['grunt.js', 'app/**/*.js', 'config/**/*.js'],
      test: ['test/**/*.js']
    },
    mocha: {
      all: {
        src: ['test/**/*.js'],
        options: {
          reporter: 'spec'
        }
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
        globals: {
          describe: true,
          it: true
        }
      }
    }
  });

  // Run tests using Mocha
  grunt.registerTask('test', 'mocha');

  // Default task.
  grunt.registerTask('default', 'lint test');

};
