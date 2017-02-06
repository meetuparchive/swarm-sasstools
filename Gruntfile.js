module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sassdoc');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-preprocess');

	grunt.initConfig({

		package: grunt.file.readJSON('package.json'),

		'exec': {
			webpack: 'webpack',
			seldon: 'node node_modules/seldon/seldon.js seldon.config.json',
			index: 'cp ./docs/index.html ./docs/build/index.html'
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
				src: [
					'docs/build/index.html',
					'docs/build/seldon/doc.html'
				],
				options: {
					inline: true,
					context: {
						DEBUG: false,
						'VERSION': '<%= package.version %>',
						'FONT_URL': '//a248.e.akamai.net/secure.meetupstatic.com/s/fonts/402715706936963211631/graphik.css',
						'GITHUB_URL': '//github.com/meetup/swarm-sasstools',
						'CSS_PATH': './swarm-sasstools.css',
						'SQ2_URL': '//meetup.github.io/sassquatch2/bundle/sassquatch.css'
					}
				}
			}
		}
	});


	grunt.registerTask('default', [
		'clean:docs',   // cleans built docs
		'exec:webpack', // (webpack) compile Sass
		'sassdoc',      // generates sassdoc docs for Sass API
		'exec:seldon',  // generates seldon docs for CSS class API
		'exec:index',   // creates `index.html` landing page for built docs
		'preprocess',   // updates built docs with version and asset urls
		'clean:sassdoc' // rm extraneous build artifact from sassdoc (sassdoc bug)
	]);
	grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
