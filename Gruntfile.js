module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sassdoc');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-preprocess');

	grunt.initConfig({

		// config variables -------------------------------------
		package: grunt.file.readJSON('package.json'),
		fontUrl: 'http://static2.meetupstatic.com/fonts/graphik.css',
		cssPath: './swarm-sasstools.css',
		sq2Url: 'http://meetup.github.io/sassquatch2/bundle/sassquatch.css', // TODO: remove this; use ad-hoc documentation css instead?
		// ------------------------------------------------------

		'exec': {
			webpack: 'webpack',
			seldon: 'node node_modules/seldon/seldon.js seldon.config.json'
		},
		'sassdoc': {
			default: {
				src: 'scss/utils/**/*.scss',
				options: {
					dest: './docs/build/sassdoc/',
					theme: 'flippant'
				}
			}
		},
		'clean': {
			sassdoc: ["./sassdoc/"],
			docs: ["./docs/build/"]
		},
		'gh-pages': {
			options: {
				base: 'docs/build/'
			},
			src: ['**']
		},
		'preprocess': {
			inline: {
				src: [ 'docs/buld/seldon/*.html' ],
				options: {
					inline: true,
					context: {
						DEBUG: false,
						'VERSION': '<%= package.version %>',
						'FONT_URL': '<%= fontUrl %>',
						'CSS_PATH': '<%= cssPath %>',
						'SQ2_URL': '<%= sq2Url %>'
					}
				}
			}
		}
	});


	grunt.registerTask('default', [
		'clean:docs',   // cleans built docs
		'exec:webpack', // (webpack) compile Sass, generates hologram CSS API docs
		'sassdoc',      // generates sassdoc docs for Sass API
		'exec:seldon',  // generates seldon docs for CSS class API
		'preprocess',   // updates built seldon docs with version and asset urls
		'clean:sassdoc' // rm extraneous build artifact from sassdoc (sassdoc bug)
	]);
	grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
