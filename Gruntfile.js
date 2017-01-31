module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean');
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
					dest: './docs/build/sassdoc/',
					theme: 'flippant'
				}
			}
		},
		'sass': {
			dist: {
				files: {
					'docs/build/sassdoc/assets/css/utils.css': 'scss/utils/all.scss',
					'docs/build/sassdoc/assets/css/reset.css': 'scss/reset/all.scss',
					'docs/build/sassdoc/assets/css/modifiers.css': 'scss/modifierClasses/all.scss',
				}
			},
			options: {
				sourceMaps: true
			}
		},
		'clean': [
			// sassdoc has a bug where it builds to both `dest` and `./sassdoc`.
			// for now, just clean this every build
			"./sassdoc/"
		],
		'gh-pages': {
			options: {
				base: 'docs/build/'
			},
			src: ['**']
		}
	});

	grunt.registerTask('default', ['sassdoc', 'clean', 'sass']);
	grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
