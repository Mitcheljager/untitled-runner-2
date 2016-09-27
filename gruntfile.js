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
	  }
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.registerTask('default',['watch']);
};
