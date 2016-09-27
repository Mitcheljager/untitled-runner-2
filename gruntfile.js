module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'public/css/layout.css' : 'scss/base.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'autoprefixer']
			},
			js: {
				files: '**/*.js',
				tasks: ['concat']
			}
		},
		autoprefixer: {
			options: {
	      browsers: ['last 10 versions', 'ie 8', 'ie 9', '> 1%']
	    },
	    main: {
        expand: true,
        flatten: true,
        src: 'public/css/*.css',
        dest: 'public/css/'
	    }
	  },
		concat: {
	    options: {
	      separator: ';',
	    },
	    dist: {
	      src: ['js/*.js'],
	      dest: 'public/js/app.js',
	    },
	  }
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default',['watch']);
};
