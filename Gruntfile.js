/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-vows');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    vows: {
      all: {
        files: {src: ['test/*.js']},
        reporter: 'spec'
      }
    },
    watch: {
      files: ['<%= jshint.app.src %>', '<%= jshint.test.src %>'],
      tasks: ['jshint', 'test']
    },
    jshint: {
      app: {
        src:['grunt.js', 'app/**/*.js', 'config/**/*.js']
      },
      test: {
        src:['test/**/*.js'],
        options: {
         expr: true
        }
      },
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
      }
    }
  });

  // Run tests using Mocha
  grunt.registerTask('test', 'vows');

  grunt.registerTask('lint', 'jshint');

  // Default task.
  grunt.registerTask('default', ['lint', 'test']);
};
