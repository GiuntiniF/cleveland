const sass = require('node-sass');

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sourcemap: "none",
        sass: {
            dist: {
                options: {
                    implementation: sass,
                    sourceMap: false
                },
                files: {
                    '../dist/css/app.css': 'app.scss'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                    'js/app.js',
                ],
                dest: '../dist/js/app.js',
            },
        },
        copy: {
            dist: {
                files: [
                    {expand: true, src: ['fonts/*'], dest: '../dist/', filter: 'isFile'}
                ]
            }
        }
    });

    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('dist', ['sass', 'concat', 'copy']);

}