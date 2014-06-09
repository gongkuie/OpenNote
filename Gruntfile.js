module.exports = function(grunt) {
	//Initializing the configuration object
	    grunt.initConfig({	
	    	//Style
				less: {
					devDark: {
					    options: {
					    	paths: ["assets/css"],
					    	modifyVars: {
						    	  offset: "#000000"
						    }
					    },
					    files: {
					    	"OpenNote/openNote/style/invert/dark/style.css": "OpenNote/openNote/style/invert/style.less",
					    	"OpenNote/openNote/style/invert/dark/note.css": "OpenNote/openNote/style/invert/note.less",
					    	"OpenNote/openNote/style/invert/dark/alertify.css": "OpenNote/openNote/style/invert/alertify.less"
					    }
				 	},
				 	devLight: {
					    options: {
					    	paths: ["assets/css"],
					    	modifyVars: {
						    	  offset: "#FFFFFF"
						    }
					    },
					    files: {
					    	"OpenNote/openNote/style/invert/light/style.css": "OpenNote/openNote/style/invert/style.less",
					    	"OpenNote/openNote/style/invert/light/note.css": "OpenNote/openNote/style/invert/note.less",
					    	"OpenNote/openNote/style/invert/light/alertify.css": "OpenNote/openNote/style/invert/alertify.less"
					    }
				 	},
				 	prodDark: {
					    options: {
							paths: ["assets/css"],
							cleancss: true,
							modifyVars: {
								offset: "#000000"
							}
					    },
					    files: {
					    	"OpenNote/openNote/style/invert/dark/style.css": "OpenNote/openNote/style/invert/style.less",
					    	"OpenNote/openNote/style/invert/dark/note.css": "OpenNote/openNote/style/invert/note.less",
					    	"OpenNote/openNote/style/invert/dark/alertify.css": "OpenNote/openNote/style/invert/alertify.less"
					    }
				 	},
				 	prodLight: {
					    options: {
							paths: ["assets/css"],
							cleancss: true,
							modifyVars: {
								offset: "#FFFFFF"
							}
					    },
					    files: {
					    	"OpenNote/openNote/style/invert/light/style.css": "OpenNote/openNote/style/invert/style.less",
					    	"OpenNote/openNote/style/invert/light/note.css": "OpenNote/openNote/style/invert/note.less",
					    	"OpenNote/openNote/style/invert/light/alertify.css": "OpenNote/openNote/style/invert/alertify.less"
					    }
				 	}
				},
	    	//Testing setup
			    karma: {
		            unit: {
		                configFile: "OpenNote.Test/karma.conf.js",
		                background: true
		            },
					travis: {
		                configFile: "OpenNote.Test/karma.conf.js",
		                singleRun: true,
		                browsers: ["PhantomJS"]//Override config browsers
		            }
		        },
		        watch: {
		            karma: {
		                files: ["src/**/*.js", "test/unit/**/*.js"],
		                tasks: ["karma:unit:run"]
		            }
		        },
		        shell: {                            
		            bowerInstall: {                      
		                command:  [	"cd OpenNote",
		                			"bower install" ].join("&&")
		            },
		            clean:{
		            	command:  [	"cd OpenNote",
		                			"rm -rf bower_components",
		                			"cd openNote/style/invert/",
		                			"rm -rf dark",
		                			"rm -rf light"].join("&&")
		            }
		        }
		});

	//Plugin loading
		grunt.loadNpmTasks("grunt-contrib-less");
		grunt.loadNpmTasks("grunt-contrib-watch");
	    grunt.loadNpmTasks("grunt-karma");
	    grunt.loadNpmTasks("grunt-shell");
	
	//Task definition
	    //css
		    grunt.registerTask("buildDevCSS", ["less:devDark","less:devLight"]);
		    grunt.registerTask("buildProdCSS", ["less:prodDark","less:prodLight"]);
		    
		//deployment
		    grunt.registerTask("clean", ["shell:clean"]);
		    grunt.registerTask("build", ["shell:bowerInstall", "buildDevCSS"]);
			grunt.registerTask("default", [""]);
			grunt.registerTask("deploy", ["clean", "buildProdCSS"]);
		
		//testing
			grunt.registerTask("devmode", ["karma:unit", "watch"]);
			grunt.registerTask("test", ["karma:travis"])
			grunt.registerTask("ci", ["shell:bowerInstall","karma:travis"])
};