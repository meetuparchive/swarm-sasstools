module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-sassdoc');
	grunt.loadNpmTasks('grunt-gh-pages');

	grunt.initConfig({

		// config variables -------------------------------------
		package: grunt.file.readJSON('package.json'),
		// ------------------------------------------------------

		'sassdoc': {
			default: {
				src: 'scss/utils/**/*.scss',
				options: {
					theme: 'flippant'
				}
			}
		},
		'sass': {
			dist: {
				files: {
					'sassdoc/assets/css/utils.css': 'scss/utils/all.scss',
					'sassdoc/assets/css/reset.css': 'scss/reset/all.scss',
					'sassdoc/assets/css/modifiers.css': 'scss/modifierClasses/all.scss',
				}
			},
			options: {
				sourceMaps: true
			}
		},
		'gh-pages': {
			options: {
				base: 'sassdoc/'
			},
			src: ['**']
		}
	});

	grunt.registerTask('default', ['sassdoc', 'sass']);
	grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
