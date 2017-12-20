'use strict';
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// Vars
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
var gulp        = require('gulp');
var argv        = require('yargs').argv;                // npm install --save-dev yargs
var concat      = require('gulp-concat');               // npm install --save-dev gulp-concat
var rename      = require('gulp-rename');               // npm install --save-dev gulp-rename
var injection   = require('gulp-inject');               // npm install --save-dev gulp-inject
var hb          = require('gulp-hb');                   // npm install --save-dev gulp-hb
var jsonConcat  = require("json-concat");               // npm install --save-dev json-concat
var runSequence = require('run-sequence');              // npm install --save-dev run-sequence
var replace     = require('gulp-replace');              // npm install --save-dev gulp-replace
var shell       = require('gulp-shell');                // npm install --save-dev gulp-shell
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// Install Project Commands
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

/*

npm init -y && npm install --save-dev gulp yargs gulp-concat gulp-rename gulp-inject gulp-hb json-concat run-sequence gulp-replace gulp-shell

*/

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// Sample Static Page Build Commands
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

/*

gulp HTML_5_dev -t template1 -p index
gulp HTML_5_dev -t template2 -p about
gulp HTML_5_dev -t http_status_code -p http_status_code_400
gulp HTML_5_dev -t http_status_code -p http_status_code_401
gulp HTML_5_dev -t http_status_code -p http_status_code_403
gulp HTML_5_dev -t http_status_code -p http_status_code_404
gulp HTML_5_dev -t http_status_code -p http_status_code_500

 */

/**
 * createPages --- Add your build command to this file for convenience or
 * use a single command as above.
 */
gulp.task('createPages', shell.task([
	'sh createPages.sh'
]));

/**
 * errorLog --- Future error reporting
 * @param error
 */
function errorLog (error) {
	console.error.bind(error);
	this.emit('end');
}
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// Environments
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
/**
 * HTML_5_dev
 */
gulp.task('HTML_5_dev',['jsonConcat'] ,function() {
	runSequence('HTML_5_handlebarsProcessDev','HTML_5_injectTemplateDev', function() {
		console.log('Dev complete');
	});
});

/**
 * HTML_5_stage
 */
gulp.task('HTML_5_stage' ,function() {
	runSequence('copyCSS','copyPages', function() {
		console.log('Stage complete');
	});
});

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// Tasking
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒


/**
 * HTML_5_handlebarsProcessDev --- Process all template files
 */
gulp.task('HTML_5_handlebarsProcessDev', function () {
	console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
	console.log('HTML_5_handlebarsProcessDev > Process all template files');
	console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
	console.log(getArg("-t") + " Selected");

	// Fall-thru based on choosen template
	// Build template from partials
	switch(getArg("-t")){
		case 'template1':
			// Build template from partials
			return gulp
				.src([
					'HTML_5_src/partials/head_MetasTitleLinks.handlebars',
					'HTML_5_src/partials/body_index.handlebars'
				])
				// Dynamically change page name and select the correct JSON object
				.pipe(replace('DYNAMIC_PAGE_NAME_HERE', getArg("-p")))
				.pipe(hb({
					data: 'dataCompiled/dataCompiled.json',
					helpers: [
						'HTML_5_src/templatesHelpers/handlebarsHelpers.js'
					]
				}))
				.pipe(gulp.dest('HTML_5_src/partialsProcessed/'));
			break;

		case 'template2':
			// Build template from partials
			return gulp
				.src([
					'HTML_5_src/partials/head_MetasTitleLinks.handlebars',
					'HTML_5_src/partials/body_partials1.handlebars'
			])
				// Dynamically change page name and select the correct JSON object
				.pipe(replace('DYNAMIC_PAGE_NAME_HERE', getArg("-p")))
				.pipe(hb({
					data: 'dataCompiled/dataCompiled.json',
					helpers: [
						'HTML_5_src/templatesHelpers/handlebarsHelpers.js'
					]
				}))
				.pipe(gulp.dest('HTML_5_src/partialsProcessed/'));
			break;

		case 'http_status_code':
			// Build template from partials
			return gulp
				.src([
					'HTML_5_src/partials/head_MetasTitleLinks.handlebars',
					'HTML_5_src/partials/body_http_status_code.handlebars'
				])
				// Dynamically change page name and select the correct JSON object
				.pipe(replace('DYNAMIC_PAGE_NAME_HERE', getArg("-p")))
				.pipe(hb({
					data: 'dataCompiled/dataCompiled.json',
					helpers: [
						'HTML_5_src/templatesHelpers/handlebarsHelpers.js'
					]
				}))
				.pipe(gulp.dest('HTML_5_src/partialsProcessed/'));
			break;

	}

});

/**
 * HTML_5_injectTemplateDev --- Inject partials into template file
 */
gulp.task('HTML_5_injectTemplateDev',function(){
	console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
	console.log('HTML_5_injectTemplateDev > Inject partials into template file');
	console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
	console.log(getArg("-t") + " Selected");

	switch(getArg("-t")){

		case 'template1':
			gulp.src(['HTML_5_src/templates/template1.html'])
				.pipe(injection(gulp.src(['HTML_5_src/partialsProcessed/head_MetasTitleLinks.handlebars']), {
					starttag: '<!-- inject:head -->',
					transform: function (filePath, file) {return file.contents.toString('utf8')}
				}))
				.pipe(injection(gulp.src(['HTML_5_src/partialsProcessed/body_index.handlebars']), {
					starttag: '<!-- inject:body -->',
					transform: function (filePath, file) {return file.contents.toString('utf8')}
				}))
				.pipe(rename(getArg("-p")+'.html'))
				.pipe(gulp.dest('HTML_5_build'));
			break;

		case 'template2':
			// Build template from partials
			gulp.src(['HTML_5_src/templates/template2.html'])
				.pipe(injection(gulp.src(['HTML_5_src/partialsProcessed/head_MetasTitleLinks.handlebars']), {
					starttag: '<!-- inject:head -->',
					transform: function (filePath, file) {return file.contents.toString('utf8')}
				}))
				.pipe(injection(gulp.src(['HTML_5_src/partialsProcessed/body_partials1.handlebars']), {
					starttag: '<!-- inject:body -->',
					transform: function (filePath, file) {return file.contents.toString('utf8')}
				}))
				.pipe(rename(getArg("-p")+'.html'))
				.pipe(gulp.dest('HTML_5_build'));
			break;

		case 'http_status_code':
			// Build template from partials

			gulp.src(['HTML_5_src/templates/http_status_code.html'])
				.pipe(injection(gulp.src(['HTML_5_src/partialsProcessed/head_MetasTitleLinks.handlebars']), {
					starttag: '<!-- inject:head -->',
					transform: function (filePath, file) {return file.contents.toString('utf8')}
				}))
				.pipe(injection(gulp.src(['HTML_5_src/partialsProcessed/body_http_status_code.handlebars']), {
					starttag: '<!-- inject:body -->',
					transform: function (filePath, file) {return file.contents.toString('utf8')}
				}))
				.pipe(rename(getArg("-p")+'.html'))
				.pipe(gulp.dest('HTML_5_build'));
			break;
	}
});

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// Helper Methods
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
/***
 * copyCSS --- Move CSS minified files.
 *
 * */
gulp.task('copyCSS', function () {
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// copyCSS
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
	console.log('copyCSS');
	console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
	gulp.src(['HTML_5_src/css/main-min.css'])
		.pipe(gulp.dest('build/min-css/'));
});

/***
 * copyPages --- Move pages files.
 *
 * */
gulp.task('copyPages', function () {
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// copyPages
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
	console.log('copyPages');
	console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');

});

gulp.task('jsonConcat',function(){
	console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
	console.log('jsonConcat > Combine/concatenate all JSON files');
	console.log('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒');
	jsonConcat({
		src: ["data"],
		dest: "dataCompiled/dataCompiled.json"
	}, function (json) {});
});


// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// Grab Arguments
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// > gulp watch -t about
function getArg(key) {
	var index = process.argv.indexOf(key);
	var next = process.argv[index + 1];
	return (index < 0) ? null : (!next || next[0] === "-") ? true : next;
}

gulp.task('reportArgs', function() {
	console.log(getArg("-t"),getArg("-p"));
});
