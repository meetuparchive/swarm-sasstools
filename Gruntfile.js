module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sassdoc');
	grunt.loadNpmTasks('grunt-gh-pages');

	grunt.initConfig({

		// config variables -------------------------------------
		package: grunt.file.readJSON('package.json'),
		// ------------------------------------------------------

		'exec': {
			webpack: 'webpack'
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
		}
	});


	grunt.registerTask('default', [
		'clean:docs',   // cleans built docs
		'exec',         // (webpack) compile Sass, generates hologram CSS API docs
		'sassdoc',      // generates sassdoc docs for Sass API
		'clean:sassdoc' // rm extraneous build artifact from sassdoc (sassdoc bug)
	]);
	grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
