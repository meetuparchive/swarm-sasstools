module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-preprocess');

	var DIR_DOC_SRC = 'docs/',
		DIR_BUILD = DIR_DOC_SRC + 'build/';

	grunt.initConfig({

		// config variables -------------------------------------
		package: grunt.file.readJSON('package.json'),
		fontUrl: 'http://static2.meetupstatic.com/fonts/graphik.css',
		sassquatchCSSPath: 'bundle/sassquatch.css',
		// ------------------------------------------------------

		'exec': {
			webpack: 'webpack',
			sassdocjs: [
				'sassdocjs sass/',
				'-v <%= package.verson %>',
			].join(' ')
		},
		'hologram': {
			generate: {
				options: {
					config: DIR_DOC_SRC+'/config.yml'
				}
			}
		},
		'gh-pages': {
			options: {
				base: DIR_BUILD
			},
			src: ['**']
		},
		'clean': {
			docs: [DIR_BUILD],
			css: [DIR_DOC_SRC + 'templates/css/sassquatch.css']
		},
		'preprocess': {
			inline: {
				src: [ 'docs/build/*.html', 'docs/build/pages/*.html' ],
				options: {
					inline: true,
					context: {
						DEBUG: false,
						'FONT_URL': '<%= fontUrl %>',
						'SASSQUATCH_CSS': '<%= sassquatchCSSPath %>',
					}
				}
			}
		}
	});

	grunt.registerTask('default', ['clean', 'exec', 'hologram', 'preprocess']);
	grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
