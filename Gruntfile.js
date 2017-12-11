module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sassdoc');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-browser-sync');

	var BUILD_PATH = './docs/build/',
		WATCH_PATHS = [
			'docs/index.html',
			'docs/templates/**/*.*',
			'scss/**/*.scss'
		];

	grunt.initConfig({

		package: grunt.file.readJSON('package.json'),

		'watch': {
			files: WATCH_PATHS,
			tasks: ['default'] // TODO: only call tasks needed for specific file type changes
		},
		'browserSync': {
			options: {
				watchTask: true,
				server: {
					baseDir: BUILD_PATH
				}
			},
			bsFiles: {
				src: [
					BUILD_PATH + '**/*.css',
					BUILD_PATH + '**/*.html'
				]
			}
		},
		'exec': {
			options: {
				shell: 'bash'
			},
			webpack: 'webpack',
			seldon: 'node node_modules/seldon/seldon.js seldon.config.json',
			docIndex: 'cp ./docs/index.html ./' + BUILD_PATH + 'index.html',
			cpExamples: 'cp -R ./docs/examples/ ' + BUILD_PATH + 'examples/'
		},
		'sassdoc': {
			default: {
				src: 'scss/utils/**/*.scss',
				options: {
					dest: BUILD_PATH + 'sassdoc/',
					theme: 'flippant',
					display: {
						access: ['public'],
						alias: true,
						watermark: false
					}
				}
			}
		},
		'clean': {
			sassdoc: ["./sassdoc/"],
			docs: [BUILD_PATH]
		},
		'gh-pages': {
			options: {
				base: BUILD_PATH
			},
			src: ['**']
		},
		'preprocess': {
			inline: {
				src: [
					BUILD_PATH + 'index.html',
					BUILD_PATH + 'seldon/doc.html',
					BUILD_PATH + 'examples/*.html'
				],
				options: {
					inline: true,
					context: {
						DEBUG: false,
						'VERSION': '<%= package.version %>',
						'FONT_URL': '//www.meetup.com/mu_static/en-US/graphik.c2ab8a6.css',
						'GITHUB_URL': '//github.com/meetup/swarm-sasstools',
						'CSS_PATH': './swarm-sasstools.css',
						'SQ2_URL': '//meetup.github.io/sassquatch2/bundle/sassquatch.css'
					}
				}
			}
		}
	});


	grunt.registerTask('default', [
		'clean:docs',      // cleans built docs
		'exec:webpack',    // (webpack) compile Sass
		'sassdoc',         // generates sassdoc docs for Sass API
		'exec:seldon',     // generates seldon docs for CSS class API
		'exec:docIndex',   // creates `index.html` landing page for built docs
		'exec:cpExamples', // creates `examples/*.html` pages for built docs
		'preprocess',      // updates built docs with version and asset urls
		'clean:sassdoc'    // rm extraneous build artifact from sassdoc (sassdoc bug)
	]);
	grunt.registerTask('serve', [
		'default',         // initial compile
		'browserSync',     // enable live reload
		'watch'            // rebuild on src changes
	]);
	grunt.registerTask('ghpages', ['default', 'gh-pages']);
};
