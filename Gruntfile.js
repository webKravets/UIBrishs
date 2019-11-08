module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      dev: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2,
          strictImports: true,
          sourceMap: true,
          sourceMapFilename: 'pub/css/style.css.map', // where file is generated and located
          sourceMapURL: 'style.css.map', // the complete url and filename put in the compiled css file
          sourceMapBasepath: 'pub', // Sets sourcemap base path, defaults to current working directory.
          sourceMapRootpath: '/', // adds this path onto the sourcemap filename and less file paths
        },
        files: {
          "pub/css/style.css": "assets/dist/less/style.less"
        }
      },
      prod: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2,
          strictImports: true
        },
        files: {
          "assets/dist/css/style.css": "assets/dist/less/style.less"
        }
      }
    },

    cssmin: {
      options: {
        sourceMap: true,
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'pub/css/main.css': [
            'assets/dist/plagins/slick/slick.css',
            'assets/dist/plagins/slick/slick-theme.css',
            'assets/dist/css/style-processed.css'
          ]
        }
      }
    },

    postcss: {
      dev: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({
              overrideBrowserslist: ['last 2 versions', 'ie 11']
            })
          ]
        },
        src: 'pub/css/style.css',
        dest: 'pub/css/main.css'
      },

      prod: {
        options: {
          processors: [
            require('autoprefixer')({
              overrideBrowserslist: ['last 2 versions', 'ie 11']
            })
          ]
        },
        src: 'assets/dist/css/style.css',
        dest: 'assets/dist/css/style-processed.css'
      }
    },


    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'assets/dist/img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'pub/img'
        }]
      }
    },

    concat: {
      dist: {
        src: [
          'assets/dist/js/all.js',
          'assets/dist/js/jquery-3.4.1.min.js',
          'assets/dist/js/slick.min.js',
          'assets/dist/js/main.js'
        ],
        dest: 'pub/js/main.js'
      }
    },

    watch: {
      less: {
        files: ['assets/dist/less/**/*.less'],
        tasks: ['less:dev', 'postcss:dev']
      },

      css: {
        files: ['pub/css/*.css'],
        options: {
          livereload: true,
        }
      },

      imagemin: {
        files: 'assets/dist/img/**/*.{png,jpg,gif,svg}',
        tasks: ['imagemin']
      },

    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['less:prod', 'postcss:prod', 'cssmin', 'imagemin', 'concat']);
  grunt.registerTask('dev', ['less:dev', 'postcss:dev', 'imagemin', 'watch'])
};