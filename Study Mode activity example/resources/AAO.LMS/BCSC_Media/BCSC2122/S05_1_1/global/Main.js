



window.onload = function() {
    
    window.fct = {};
    
    
    initEmpty();
    
    o = fct.empty.log();
    
    
    
    
    
    var gameMode = true;

	var animatedScore = true;
	
    var timerSec = 130 * data.markerCount; //100

    var currentTime;
    var correctScore;
    var incorrectScore;
    var quizComplete;
    var started;

    var currentScore;
    var currentTerm;
	var termCounter = 0;
	
	var termOrigX = 20;
    var termOrigY = 20;
	
	var coverAll = false;
	
	var lineCounter = -1;
	
	var currentShape;
	
	var answerArray = [];
	
    document.getElementById("termText").innerHTML = data.firstTerm;
    //console.log(data.firstTerm);

    for (var i = 0; i < data.markerCount; i++) {

        var newMarker = document.createElement('div');
        newMarker.className = "marker";
        document.getElementById("imageContainer").appendChild(newMarker);

        var newShape = document.createElement('div');
        newShape.className = "shape";
        document.getElementById("imageContainer").appendChild(newShape);

        newLabel = document.createElement('div');
        newLabel.className = "label";
        newMarker.appendChild(newLabel);

    }
	
	init();// <-- should only happen once:

	var resetted = false;
	var timeCountdown;
	var countingDown = false;

    // EVENTS
    //////////////////////////////////////////////////////////////////////////////

    document.getElementById("studyButton").addEventListener("click", function() {
        document.getElementById("instructionsBG").style.display = "none";
        document.getElementById("instructionsContainer").style.display = "none";
        document.getElementById("termText").innerHTML = data.firstTerm;
        gameMode = false;
        resetAll();
		resetted = true;
    });

    document.getElementById("gameButton").addEventListener("click", function() {
        document.getElementById("mainContainer").scrollTop = 0;
        document.getElementById("mainContainer").scrollLeft = 0;
        document.getElementById("instructionsBG").style.display = "none";
        document.getElementById("instructionsContainer").style.display = "none";
        document.getElementById("termText").innerHTML = data.firstTerm;
        started = true;
        gameMode = true;
        resetAll();
		resetted = true;
    });


    document.getElementById("seeAnswers").addEventListener("click", function() {
        document.getElementById("instructionsBG").style.display = "none";
        document.getElementById("instructionsContainer").style.display = "none";
        document.getElementById("termText").innerHTML = data.firstTerm;
		document.getElementById("bottomBar").style.display = "block";
        gameMode = false;
		seeAnswers = true;
        resetAll(1);
		resetted = true;
    });
	
	document.getElementById("tryAgain").addEventListener("click", function() {
        document.getElementById("mainContainer").scrollTop = 0;
        document.getElementById("mainContainer").scrollLeft = 0;
        document.getElementById("instructionsBG").style.display = "none";
        document.getElementById("instructionsContainer").style.display = "none";
        document.getElementById("termText").innerHTML = data.firstTerm;
		document.getElementById("bottomBar").style.display = "block";
		document.getElementById("timerNum").innerHTML = 60;
        started = true;
        gameMode = true;
        resetAll();
		resetted = true;
    });
	
	document.getElementById("giveFeedback").addEventListener("click", function() {
        document.getElementById("feedbackContainerBG").style.display = "block";
		document.getElementById("feedbackContainer").style.display = "block";
		document.getElementById("feedbackSet1").style.display = "block";
		document.getElementById("feedbackSet2").style.display = "none";
    });
	
	document.getElementById("feedbackSubmit").addEventListener("click", function() {
		document.getElementById("feedbackSet1").style.display = "none";
		document.getElementById("feedbackSet2").style.display = "block";
    });
	
	document.getElementById("feedbackExit").addEventListener("click", function() {
        document.getElementById("feedbackContainerBG").style.display = "none";
		document.getElementById("feedbackContainer").style.display = "none";
    });
	
	document.getElementById("feedbackContainerBG").addEventListener("click", function() {
        document.getElementById("feedbackContainerBG").style.display = "none";
		document.getElementById("feedbackContainer").style.display = "none";
    });

	document.getElementById("homeButton").addEventListener("click", function() {
		seeAnswers = false;
		if (countingDown){
			window.clearInterval(timeCountdown);
		}
        document.getElementById("instructionsBG").style.display = "block";
        document.getElementById("instructionsContainer").style.display = "block";
		document.getElementById("timer").style.display = "none";
		document.getElementById("timerNum").innerHTML = 60;
		document.getElementById("score").style.display = "none";
    });


    // functions
    //////////////////////////////////////////////////////////////////////////////
    function resetAll(a) {
		
		
        currentTime = -1;
        correctScore = 0;
        incorrectScore = 0;
        quizComplete = false;

        currentScore = 0;
        currentTerm = 0;
		termCounter = 0;

        tempScore = 0;
		coverAll = false;
        //markerCount = document.getElementsByClassName("marker").length;

        // ALL STYLING, VARS, TEXT RESET HERE ////////////

        coverAllComplete = false;
        document.getElementById("coverAllComplete").style.display = "none";
        document.getElementById("endScreen").style.display = "none";
        document.getElementById("winStar").style.display = "none";
        //document.getElementById("timer").style.display = "block";
        //document.getElementById("score").style.display = "block";
        //document.getElementById("scoreTitle").style.display = "block";
        document.getElementById("score").innerHTML = currentScore;
        //document.getElementById("score").innerHTML = "0";
        //... to be continued
		
        ////////////////////////////////////////////////////////////////////
		
		// game mode reset//
        if (gameMode) {
						
            for (var i = 0; i < data.markerCount; i++) {
                document.getElementsByClassName("marker")[i].style.display = "block";
            }
            document.getElementById("lineContainer").style.display = "block";
					
					
			for (var i = 0; i < data.markerCount; i++) {
            	document.getElementsByClassName("label")[i].style.display = "none";
            	document.getElementsByClassName("shape")[i].style.display = "none";
				document.getElementsByClassName("marker")[i].style.width = markerWidth + "px"
                document.getElementsByClassName("marker")[i].style.height = markerWidth + "px"
                document.getElementsByClassName("marker")[i].style.left = data.markerPos[i][0] * data.currentZoom - markerCenter + "px";
                document.getElementsByClassName("marker")[i].style.top = data.markerPos[i][1] * data.currentZoom - markerCenter + "px";
            }
            document.getElementById("term").style.cursor = "pointer";
            document.getElementById("term").style.left = termOrigX + "px";
            document.getElementById("term").style.top = termOrigY + "px";
			document.getElementById("coverAll").style.display = "none";

            document.getElementById("timer").style.display = "block";
            document.getElementById("score").style.display = "block";
            document.getElementById("scoreTitle").style.display = "block";
            document.getElementById("termContainer").style.display = "block";
            document.getElementById("markerToggle").style.display = "none";
            for (var i = 0; i < data.markerCount; i++) {
                document.getElementsByClassName("marker")[i].style.backgroundColor = "#FF0";
				document.getElementsByClassName("marker")[i].style.cursor = "auto";
            }

            document.getElementById("termText").innerHTML = data.firstTerm;
            timer();
			
			if (a!==1){
				for (var i = 0; i < data.markerCount; i++){
					answerArray[i] = 0;
					document.getElementsByClassName("marker")[i].style.backgroundColor = "#FF0";
				}
			}
			
		// Study mode reset//
        } else {
			
			markers = true;
			
            document.getElementById("markerToggleIcon").style.backgroundImage = "url(../global/pin.svg)";
            for (var i = 0; i < data.markerCount; i++) {
                document.getElementsByClassName("marker")[i].style.display = "block";
            }
            if (currentShape !== undefined) {
                document.getElementsByClassName("shape")[currentShape].style.display = "block";
            }
            document.getElementById("lineContainer").style.display = "block";
			
			document.getElementById("timer").style.display = "none";
            document.getElementById("score").style.display = "none";
            document.getElementById("scoreTitle").style.display = "none";
			document.getElementById("markerToggle").style.display = "block";
			for (var i = 0; i < data.markerCount; i++) {
            	document.getElementsByClassName("label")[i].style.display = "none";
            	document.getElementsByClassName("shape")[i].style.display = "none";
            }
			document.getElementById("term").style.left = 1e9 + "px";
			document.getElementById("coverAll").style.display = "none";
			for (var i = 0; i < data.markerCount; i++) {
				document.getElementsByClassName("marker")[i].style.backgroundColor = "#0F0";
				if (answerArray[i]===1){
					document.getElementsByClassName("marker")[i].style.backgroundColor = "#F00";
				}
            	document.getElementsByClassName("marker")[i].style.cursor = "pointer";
			}
			timer();
			
			if (a!==1){
				for (var i = 0; i < data.markerCount; i++){
					answerArray[i] = 0;
					document.getElementsByClassName("marker")[i].style.backgroundColor = "#FFF";
				}
			}
		
		}//END: else
		
		for (var i = 0; i < 3; i++){
			document.getElementsByClassName("endLabel")[i].style.opacity = 0.1;
			document.getElementsByClassName("endLabelScore")[i].style.opacity = 0.1;
			document.getElementsByClassName("endLabelScore")[i].innerHTML = 0;
		}
		
		document.getElementById("fractionTop").innerHTML = 0;
		//document.getElementById("endBlock1").innerHTML = "0%";//<--old DOM element
		//document.getElementById("endBlock1").style.opacity = 0.1;
		
		document.getElementById("tryAgain").style.display = "none";
		document.getElementById("seeAnswers").style.display = "none";
		//document.getElementById("giveFeedback").style.display = "none";
		
        //init();
		
		
		document.getElementById("endBlockNewPercent").innerHTML = " ";
		
		


    } //resetAll()

    ///////////////////////////////////////////////////////////////////////////



    function timer() {
		
        var sliceCount = 60;
        currentTime = -1;
		var currentTimeNum = 60;
		
		if (!resetted){
        	for (var i = 0; i < sliceCount; i++) {
            	var newSlice = document.createElement('div');
            	newSlice.className = "slice";
            	newSlice.id = "slice" + i;
            	document.getElementById("timerSlices").appendChild(newSlice);
            	var newDegree = 6 * i;
           	 	// make sure to add this for all browsers...
           	 	newSlice.style.webkitTransformOrigin = "0% 100%";
           	 	newSlice.style.webkitTransform = "rotate(" + newDegree + "deg)";
				newSlice.style.transformOrigin = "0% 100%";
           	 	newSlice.style.transform = "rotate(" + newDegree + "deg)";
        	}
		}
		
		if (gameMode){
		for (var i = 0; i < sliceCount; i++) {
			document.getElementById("slice" + i).style.display = "block";
		}
		

        timeCountdown = setInterval(function() {
			countingDown = true;
            //console.log(currentTime);

            if (started) {
                currentTime++;
				currentTimeNum--;
				document.getElementById("timerNum").innerHTML = currentTimeNum;
            }

            //hello(currentTime);

            if (currentTime > 59) {
				countingDown = false;
                window.clearInterval(timeCountdown);
                //currentTime = 0;

                coverAllComplete = true;
                if (!quizComplete) {
                    quizComplete = true;
					dragging = false;
                    endScreen();
					
                }

            } else {
                if (started) {
                    document.getElementById("slice" + currentTime).style.display = "none";
                }
            }

            //document.getElementById("timer").innerHTML = currentTime;

        }, timerSec);
		}// END: if gameMode for timer



    }

	
	var markerWidth;
	var markerCenter;
	
	var seeAnswers;


    function init() {

        var markers = true;

        markerWidth = 25;
        markerCenter = markerWidth / 2;

        var imgH = 500;
        var imgW = imgH * (data.imageSize[0] / data.imageSize[1]);

        document.getElementById("modeMenuThumb").style.backgroundImage = "url(" + data.thumbNumber + ".png)";
        document.getElementById("modeMenuTitle").innerHTML = data.title;
        document.getElementById("imageContainer").style.backgroundImage = "url(" + data.imageName + ".png)";

        document.getElementById("imageContainer").style.width = imgW + "px";

        var currentShape;

		for (var i = 0; i < data.markerCount; i++) {
			answerArray[i] = 0;
		}
		
        for (var i = 0; i < data.markerCount; i++) {
            document.getElementsByClassName("shape")[i].style.left = data.shape[i][0] * data.currentZoom - data.shape[i][2] / 2 * data.currentZoom + "px";
            document.getElementsByClassName("shape")[i].style.top = data.shape[i][1] * data.currentZoom - data.shape[i][3] / 2 * data.currentZoom + "px";
            document.getElementsByClassName("shape")[i].style.width = data.shape[i][2] * data.currentZoom + "px";
            document.getElementsByClassName("shape")[i].style.height = data.shape[i][3] * data.currentZoom + "px";
            document.getElementsByClassName("shape")[i].style.backgroundImage = "url(shapes/shape" + i + ".svg)";
        }

        for (var i = 0; i < data.markerCount; i++) {
            document.getElementsByClassName("marker")[i].id = "marker" + i;
            document.getElementsByClassName("label")[i].id = "label" + i;
            document.getElementsByClassName("shape")[i].id = "shape" + i;
            document.getElementsByClassName("marker")[i].style.left = data.markerPos[i][0] - markerCenter + "px";
            document.getElementsByClassName("marker")[i].style.top = data.markerPos[i][1] - markerCenter + "px";


            // ENABLE MARKER CLICKS (Study mode) ////////////////////////////////////
            //if (!gameMode) {
				
				//console.log("Study mode");
				
                //document.getElementsByClassName("marker")[i].style.cursor = "pointer";

                document.getElementsByClassName("marker")[i].addEventListener("click", function() {
					if (!gameMode) {
                    for (var i = 0; i < data.markerCount; i++) {
                        document.getElementsByClassName("label")[i].style.display = "none";
                        document.getElementsByClassName("marker")[i].style.zIndex = 2000;
						if (seeAnswers){
                        	document.getElementsByClassName("marker")[i].style.backgroundColor = "#0F0";
						} else {
                        	document.getElementsByClassName("marker")[i].style.backgroundColor = "#FFF";
						}
						
						if (answerArray[i]===1){
							document.getElementsByClassName("marker")[i].style.backgroundColor = "#F00";
						}
                        document.getElementsByClassName("shape")[i].style.display = "none";
                    }
                    document.getElementById("label" + this.id.substring(6, 8)).style.display = "block";
                    document.getElementById("marker" + this.id.substring(6, 8)).style.zIndex = 3000;
                    document.getElementById("shape" + this.id.substring(6, 8)).style.display = "block";
                    currentShape = this.id.substring(6, 8);
					}
                });
            //}

        }

        for (var i = 0; i < data.markerCount; i++) {
            data.markerPos[i][2] = data.markerPos[i][2].replace(/ /g, "&nbsp;");
            document.getElementsByClassName("label")[i].innerHTML = data.markerPos[i][2];
            document.getElementsByClassName("label")[i].style.display = "none";
        }

        // TERM DRAG ///////////////////////////////////////////////////////////////////////
        dragging = false;
        var cursorX = 0;
        var cursorY = 0;

        var okayToExecuteMouseUpStuff = false;

        document.getElementById("term").addEventListener("mousedown", function() {
            userDown();
        });

        document.getElementById("term").addEventListener("touchstart", function() {
            var touch = event.touches[0];
            cursorX = touch.pageX;
            cursorY = touch.pageY;
            pointerX = cursorX - 148;
            pointerY = cursorY - 29;
            event.preventDefault();
            userDown();
        });

        function userDown() {

            dragging = true;

            document.getElementById("mainContainer").style.overflow = "hidden";

            requestAnimationFrame(drag);
			
            function drag() {

                if (dragging) {
                    document.getElementById("termPointer").style.display = "block";
                    document.getElementById("term").style.cursor = "none";
                    document.getElementById("term").style.left = cursorX - 10 + "px";//was 140
                    document.getElementById("term").style.top = cursorY - 20 + "px";
                    //document.getElementById("term").style.borderColor = "#000";
                    //document.getElementById("term").style.backgroundColor = "#FFF";
                    document.getElementById("testPoint").style.left = pointerX + "px";
                    document.getElementById("testPoint").style.top = pointerY + "px";
                    for (var i = 0; i < data.markerCount; i++) {
                        if (pointerX > data.markerPos[i][0] * data.currentZoom - markerCenter * 2 - document.getElementById("mainContainer").scrollLeft &&
                            pointerX < data.markerPos[i][0] * data.currentZoom + markerCenter * 2 - document.getElementById("mainContainer").scrollLeft &&
                            pointerY > data.markerPos[i][1] * data.currentZoom - markerCenter * 2 - document.getElementById("mainContainer").scrollTop &&
                            pointerY < data.markerPos[i][1] * data.currentZoom + markerCenter * 2 - document.getElementById("mainContainer").scrollTop
                        ) {
                            // MARKER GROW
                            document.getElementsByClassName("marker")[i].style.width = markerWidth * 2 + "px"
                            document.getElementsByClassName("marker")[i].style.height = markerWidth * 2 + "px"
                            document.getElementsByClassName("marker")[i].style.left = data.markerPos[i][0] * data.currentZoom - markerWidth + "px";
                            document.getElementsByClassName("marker")[i].style.top = data.markerPos[i][1] * data.currentZoom - markerWidth + "px";
                            document.getElementsByClassName("shape")[i].style.display = "block";
                        } else {

                            // MARKER SHRINK
                            document.getElementsByClassName("marker")[i].style.width = markerWidth + "px"
                            document.getElementsByClassName("marker")[i].style.height = markerWidth + "px"
                            document.getElementsByClassName("marker")[i].style.left = data.markerPos[i][0] * data.currentZoom - markerCenter + "px";
                            document.getElementsByClassName("marker")[i].style.top = data.markerPos[i][1] * data.currentZoom - markerCenter + "px";
                            document.getElementsByClassName("shape")[i].style.display = "none";

                        }
                    }

                    requestAnimationFrame(drag);
                } else {
                    okayToExecuteMouseUpStuff = true;
                }
            }

        }; // END: mousedown

        //var currentTerm = 0;

        var chosenTerm = 0;

        document.getElementById("term").addEventListener("mouseup", function() {
            userUp();
        });
        document.getElementById("term").addEventListener("touchend", function() {
            userUp();
        });

        function userUp() {
			
			// second time around, doesn't know where things are...
			// 
            cursorX = termOrigX;
            cursorY = termOrigY;

            document.getElementById("mainContainer").style.overflow = "scroll";

            if (!coverAll) {
                dragging = false;

                for (var i = 0; i < data.markerCount; i++) {
                    if (pointerX > data.markerPos[i][0] * data.currentZoom - markerCenter * 2 - document.getElementById("mainContainer").scrollLeft &&
                        pointerX < data.markerPos[i][0] * data.currentZoom + markerCenter * 2 - document.getElementById("mainContainer").scrollLeft &&
                        pointerY > data.markerPos[i][1] * data.currentZoom - markerCenter * 2 - document.getElementById("mainContainer").scrollTop &&
                        pointerY < data.markerPos[i][1] * data.currentZoom + markerCenter * 2 - document.getElementById("mainContainer").scrollTop
                    ) {
                        // CHECK ANSWER HERE /////////////////////////
						
                        if (i === currentTerm) {
							console.log("marker = " + i, "label = " + currentTerm);
                            answerCorrect = true;


                        } else {
							console.log("marker = " + i, "label = " + currentTerm);
                            chosenTerm = i;
                            answerCorrect = false;
                            //document.getElementsByClassName("marker")[i].style.backgroundColor = "#F00";

                        }
						
						//if (!quizComplete){
							addScore();
						//}

                        requestAnimationFrame(checkForBlah);

                        function checkForBlah() {
                            if (okayToExecuteMouseUpStuff) {
                                runWinAnimation();
                            } else {
                                requestAnimationFrame(checkForBlah);
                            }
                        }




                        document.getElementById("termText").innerHTML = data.markerPos[currentTerm][2];

                        document.getElementsByClassName("marker")[i].style.width = markerWidth + "px"
                        document.getElementsByClassName("marker")[i].style.height = markerWidth + "px"
                        document.getElementsByClassName("marker")[i].style.left = data.markerPos[i][0] * data.currentZoom - markerCenter + "px";
                        document.getElementsByClassName("marker")[i].style.top = data.markerPos[i][1] * data.currentZoom - markerCenter + "px";
                        document.getElementsByClassName("shape")[i].style.display = "none";

                        //////////////////////////////////////////////
                    } else {
                        document.getElementById("term").style.cursor = "pointer";
                        document.getElementById("term").style.left = termOrigX + "px";
                        document.getElementById("term").style.top = termOrigY + "px";
                        //document.getElementById("termPointer").style.display = "none";
                        document.getElementsByClassName("marker")[i].style.width = markerWidth + "px"
                        document.getElementsByClassName("marker")[i].style.height = markerWidth + "px"
                        document.getElementsByClassName("marker")[i].style.left = data.markerPos[i][0] * data.currentZoom - markerCenter + "px";
                        document.getElementsByClassName("marker")[i].style.top = data.markerPos[i][1] * data.currentZoom - markerCenter + "px";
                    } // END: if over marker, else if outside of marker
                } // END: for (var i = 0; i < data.markerCount; i++){
            } // END: if !coverall
        }; // END: mouseup

        var coverAllComplete = false;

        var answerCorrect = false;

        function runWinAnimation() {

            coverAll = true;
            document.getElementById("coverAll").style.display = "block";

            var ct;
            if (answerCorrect) {
                ct = currentTerm;
                document.getElementsByClassName("marker")[ct].style.backgroundColor = "#0F0";
                document.getElementById("term").style.backgroundColor = "#0F0";
                document.getElementById("termPointer").style.backgroundImage = "url(../global/termPointCorrect.svg)";
                document.getElementById("star").style.backgroundImage = "url(../global/termStarCorrect.svg)";
                document.getElementById("starNum").style.color = "#FFF";
                document.getElementById("starNum").innerHTML = "+1";
            } else {
                ct = chosenTerm;
                document.getElementsByClassName("marker")[ct].style.backgroundColor = "#F00";
                document.getElementById("term").style.backgroundColor = "#F00";
                document.getElementById("termPointer").style.backgroundImage = "url(../global/termPointIncorrect.svg)";
                document.getElementById("star").style.backgroundImage = "url(../global/termStarIncorrect.svg)";
                document.getElementById("starNum").style.color = "#000";
                document.getElementById("starNum").innerHTML = "-1";
            }
            document.getElementsByClassName("marker")[ct].style.width = markerWidth * 2 + "px"
            document.getElementsByClassName("marker")[ct].style.height = markerWidth * 2 + "px"
            document.getElementsByClassName("marker")[ct].style.left = data.markerPos[ct][0] * data.currentZoom - markerWidth + "px";
            document.getElementsByClassName("marker")[ct].style.top = data.markerPos[ct][1] * data.currentZoom - markerWidth + "px";
            document.getElementsByClassName("shape")[ct].style.display = "block";

            document.getElementById("term").style.left = data.markerPos[ct][0] * data.currentZoom + 8 + -document.getElementById("mainContainer").scrollLeft + "px";
            document.getElementById("term").style.top = data.markerPos[ct][1] * data.currentZoom + 8 + -document.getElementById("mainContainer").scrollTop + "px";
            document.getElementById("termPointer").style.display = "block";

            var starPosition = 60;
            var starOpacity = 1;

            requestAnimationFrame(floatingScore);

            function floatingScore() {
                starPosition -= 10;
                document.getElementById("scoreAnimation").style.display = "block";
                document.getElementById("scoreAnimation").style.left = data.markerPos[ct][0] * data.currentZoom + 80 + "px";
                document.getElementById("scoreAnimation").style.top = data.markerPos[ct][1] * data.currentZoom - 130 + starPosition + "px";
                if (starPosition > 0) {
                    requestAnimationFrame(floatingScore);
                } else {
                    var starTimer = setTimeout(function() {

                        requestAnimationFrame(floatingScore2);

                    }, 1000);


                }
            }

            function floatingScore2() {
                starPosition -= 15;
                starOpacity -= 0.1;
                document.getElementById("scoreAnimation").style.left = data.markerPos[ct][0] * data.currentZoom + 80 + "px";
                document.getElementById("scoreAnimation").style.top = data.markerPos[ct][1] * data.currentZoom - 130 + starPosition + "px";
                document.getElementById("scoreAnimation").style.opacity = starOpacity;
                document.getElementById("term").style.opacity = starOpacity;
                if (starPosition > -100) {
                    requestAnimationFrame(floatingScore2);
                } else {
                    document.getElementById("term").style.opacity = 1;
                    document.getElementById("scoreAnimation").style.display = "none";
                    document.getElementsByClassName("shape")[ct].style.display = "none";

                   // addScore();//<end screen can start before this is executed

                    var termSlideX = -350;

                    document.getElementById("term").style.cursor = "pointer";
                    document.getElementById("term").style.left = termOrigX + termSlideX + "px";
                    document.getElementById("term").style.top = termOrigY + "px";
                    document.getElementById("term").style.backgroundColor = "#FF0";
                    //document.getElementById("termPointer").style.display = "none";
                    document.getElementById("termPointer").style.backgroundImage = "url(../global/termPoint.svg)";
                    document.getElementsByClassName("marker")[ct].style.width = markerWidth + "px"
                    document.getElementsByClassName("marker")[ct].style.height = markerWidth + "px"
                    document.getElementsByClassName("marker")[ct].style.left = data.markerPos[ct][0] * data.currentZoom - markerCenter + "px";
                    document.getElementsByClassName("marker")[ct].style.top = data.markerPos[ct][1] * data.currentZoom - markerCenter + "px";
                    document.getElementById("scoreAnimation").style.opacity = 1;
					
                    termCounter++;
					currentTerm = data.randomize[termCounter];
					//0,1,2,3,4,5,6,7,8,9,10.....
					

					// HERE TERM
                    if (currentTerm < data.markerCount) {

                        document.getElementById("termText").innerHTML = data.markerPos[currentTerm][2];

                        requestAnimationFrame(termSlide);

                        function termSlide() {

                            termSlideX += 20;

                            document.getElementById("term").style.left = termOrigX + termSlideX + "px";

                            if (termSlideX < termOrigX - 20) {

                                requestAnimationFrame(termSlide);
                            } else {

                                document.getElementById("term").style.left = termOrigX + "px";
                                document.getElementById("coverAll").style.display = "none";
                                coverAll = false;

                            }
                        }

                    } else {
                        //console.log("that was the last term");

                        //document.getElementById("coverAllComplete").style.display = "block";
                        coverAllComplete = true;

                        if (!quizComplete) {
                            quizComplete = true;
							window.clearInterval(timeCountdown);
                            endScreen();
                        }

                    } //END: if currentTerm < data.markerCount else

                } //END: if star score animation complete
            }

            // AT END OF ANIMATION....
            //if (currentTerm < 17){
            //	currentTerm++;
            //}
            //document.getElementById("termText").innerHTML = data.markerPos[currentTerm][2];

        }



        var pointerX;
        var pointerY;

        document.body.addEventListener("mousemove", function(event) {
            cursorX = event.clientX;
            cursorY = event.clientY;
            pointerX = cursorX - 18;//was 148
            pointerY = cursorY - 29;
        });
        document.body.addEventListener("touchmove", function(event) {
            var touch = event.touches[0];
            cursorX = touch.pageX;
            cursorY = touch.pageY;
            pointerX = cursorX - 18;//was 148
            pointerY = cursorY - 29;
        });

        // TOGGLE MARKER ///////////////////////////////////////////////////////////////////////
        //if (!gameMode) {
            document.getElementById("markerToggle").addEventListener("click", function() {
                if (markers) {
                    markers = false;
                    document.getElementById("markerToggleIcon").style.backgroundImage = "url(../global/pinOff.svg)";
                    for (var i = 0; i < data.markerCount; i++) {
                        document.getElementsByClassName("marker")[i].style.display = "none";
                        document.getElementsByClassName("shape")[i].style.display = "none";
                    }
                    document.getElementById("lineContainer").style.display = "none";
                } else {
                    markers = true;
                    document.getElementById("markerToggleIcon").style.backgroundImage = "url(../global/pin.svg)";
                    for (var i = 0; i < data.markerCount; i++) {
                        document.getElementsByClassName("marker")[i].style.display = "block";
                    }
                    if (currentShape !== undefined) {
                        document.getElementsByClassName("shape")[currentShape].style.display = "block";
                    }
                    document.getElementById("lineContainer").style.display = "block";
                }
            });
        //}
        resizeElements();



        // ZOOM IN ////////////////////////////////////////////////////////////////////////////
        document.getElementById("zoomIn").addEventListener("click", function() {

            document.getElementById("lineContainer").innerHTML = "";
            data.currentZoom = data.currentZoom + data.zoomInc;
            resizeElements();
        });


        // ZOOM OUT ////////////////////////////////////////////////////////////////////////////
        document.getElementById("zoomOut").addEventListener("click", function() {

            document.getElementById("lineContainer").innerHTML = "";
            if (data.currentZoom > data.zoomInc) {
                data.currentZoom = data.currentZoom - data.zoomInc;
            }
            resizeElements();

        });


        function resizeElements() {
			
			lineCounter = -1;
			
            document.getElementById("zoomNum").innerHTML = Math.round(data.currentZoom * 100) + "%";

            document.getElementById("imageContainer").style.width = imgW * data.currentZoom + "px";
            document.getElementById("imageContainer").style.height = imgH * data.currentZoom + "px";
            for (var i = 0; i < data.markerCount; i++) {

                document.getElementsByClassName("marker")[i].style.left = data.markerPos[i][0] * data.currentZoom - markerCenter + "px";
                document.getElementsByClassName("marker")[i].style.top = data.markerPos[i][1] * data.currentZoom - markerCenter + "px";
                document.getElementsByClassName("shape")[i].style.left = data.shape[i][0] * data.currentZoom - data.shape[i][2] / 2 * data.currentZoom + "px";
                document.getElementsByClassName("shape")[i].style.top = data.shape[i][1] * data.currentZoom - data.shape[i][3] / 2 * data.currentZoom + "px";
                document.getElementsByClassName("shape")[i].style.width = data.shape[i][2] * data.currentZoom + "px";
                document.getElementsByClassName("shape")[i].style.height = data.shape[i][3] * data.currentZoom + "px";

                if (data.markerPos[i].length > 3) {
					
                    linedraw(data.markerPos[i][0] * data.currentZoom, data.markerPos[i][1] * data.currentZoom, data.markerPos[i][3] * data.currentZoom, data.markerPos[i][4]);
                }
            }
			
        }
		
		
		
        function linedraw(markerX, markerY, lineLength, lineAngle) {
            
			lineCounter++;
			
            document.getElementById("lineContainer").innerHTML += "<div class='line'></div>";
			
			var currentLine = document.getElementsByClassName("line")[lineCounter].style;

			currentLine.top = markerY + "px";
			currentLine.left = markerX + "px";
			currentLine.width = lineLength + "px";
			currentLine.webkitTransform = "rotate("+lineAngle+"deg)";
			currentLine.transform = "rotate("+lineAngle+"deg)";
        }
		
        currentScore = 0;

        currentTerm = 0;
		termCounter = 0;
		

        function addScore() {
            if (answerCorrect) {
                currentScore++;
                correctScore++;

            } else {
				answerArray[currentTerm] = 1;
                currentScore--;
                incorrectScore++;
            }
            document.getElementById("score").innerHTML = currentScore;
        }

	
    }; //END: init()
	
	
	
	




    function endScreen() {
		
		//if (currentTerm < data.markerCount){
			for (var i = currentTerm; i < data.markerCount; i++){
				answerArray[i] = 1;
			}
		//}
		//console.log("currentTerm = " + currentTerm);
		
		//console.log("markerCount = " + data.markerCount);
		document.getElementById("bottomBar").style.display = "none";
		
        document.getElementById("timer").style.display = "none";
        document.getElementById("score").style.display = "none";
        document.getElementById("scoreTitle").style.display = "none";

        document.getElementById("coverAllComplete").style.display = "block";
        document.getElementById("endScreen").style.display = "block";


        ////////////////////////////////////////////////////////////////////
		
        var timeBonus = Math.round((60 - currentTime) / 10);
		var fractionTop = correctScore - incorrectScore + timeBonus;
		var fractionBottom = data.markerCount;
		
		document.getElementById("fractionBottom").innerHTML = fractionBottom;
		
		
		// IMMEDIATE SCORE ///////////////////////////////////////////////////////
		if (!animatedScore){
		document.getElementsByClassName("endLabelScore")[0].innerHTML = correctScore;
		document.getElementsByClassName("endLabelScore")[1].innerHTML = incorrectScore;
		document.getElementsByClassName("endLabelScore")[2].innerHTML = timeBonus;
		
		document.getElementById("fractionTop").innerHTML = fractionTop;
		
		document.getElementsByClassName("endBlock")[1].innerHTML = Math.round(fractionTop/fractionBottom*100)+"%";
		
		document.getElementById("tryAgain").style.display = "block";
		document.getElementById("seeAnswers").style.display = "block";
		//document.getElementById("giveFeedback").style.display = "block";
		
		} else {
		
		
		// ANIMATED SCORE ///////////////////////////////////////////////////////
        setTimeout(function(){
			var tempScore = 0;
        	var cu = setInterval(function(){
        		if (tempScore < correctScore){
        		tempScore++;
        		document.getElementsByClassName("endLabelScore")[0].innerHTML = tempScore;
        		document.getElementById("fractionTop").innerHTML = tempScore;
				//document.getElementById("endBlockNewSingleNum").innerHTML = tempScore;
        		} else {
        			window.clearInterval(cu);
        			tempScore = 0;
        		}
        		
        	},50);
        	
			//document.getElementById("endBlockNewSingleTitle").innerHTML = "Correct";
			document.getElementsByClassName("endLabel")[0].style.opacity = 1;
			document.getElementsByClassName("endLabelScore")[0].style.opacity = 1;
        	
        },1000);
		
        setTimeout(function(){
        	var tempScore = 0;
        	var cu = setInterval(function(){
        		if (tempScore < incorrectScore){
        		tempScore++;
        		document.getElementsByClassName("endLabelScore")[1].innerHTML = "-"+tempScore;
        		document.getElementById("fractionTop").innerHTML = correctScore - tempScore;
				//document.getElementById("endBlockNewSingleNum").innerHTML = correctScore - tempScore;
				
				} else {
        			window.clearInterval(cu);
        			tempScore = 0;
        		}
        		
        	},50);
			
			//document.getElementById("endBlockNewSingleTitle").innerHTML = "Incorrect";
			document.getElementsByClassName("endLabel")[1].style.opacity = 1;
			document.getElementsByClassName("endLabelScore")[1].style.opacity = 1;
        	
        },2000);
		
        setTimeout(function(){
        	var tempScore = 0;	
        	var cu = setInterval(function(){
        		if (tempScore < timeBonus){
        		tempScore++;
        		document.getElementsByClassName("endLabelScore")[2].innerHTML = "+"+tempScore;
        		document.getElementById("fractionTop").innerHTML = correctScore - incorrectScore + tempScore;
        		//document.getElementById("endBlockNewSingleNum").innerHTML = "+"+tempScore;
				} else {
        			window.clearInterval(cu);
        			tempScore = 0;
        		}
        		
        	},50);
			
        	//document.getElementById("endBlockNewSingleTitle").innerHTML = "Time Bonus";
			document.getElementsByClassName("endLabel")[2].style.opacity = 1;
			document.getElementsByClassName("endLabelScore")[2].style.opacity = 1;
        	
        },3000);
	
        setTimeout(function(){
        	var tempScore = 0;
        	var finalScore = Math.round((fractionTop)/data.markerCount*100);
        	var cu = setInterval(function(){
				
        		if (finalScore <= 0){
        			if (tempScore > finalScore){
        				tempScore--;
        				document.getElementsByClassName("endBlock")[1].innerHTML = tempScore + "%";
        			} else {
        				window.clearInterval(cu);
        				tempScore = 0;
        				setTimeout(function(){
        					document.getElementById("tryAgain").style.display = "block";
							document.getElementById("seeAnswers").style.display = "block";
							//document.getElementById("giveFeedback").style.display = "block";
        				},1500);
        			}
        		} else {
        			if (tempScore < finalScore){
        				tempScore++;
        				document.getElementsByClassName("endBlock")[1].innerHTML = tempScore + "%";
        				document.getElementById("endBlockNewPercent").innerHTML = tempScore + "%";
        			} else {
        				window.clearInterval(cu);
        				tempScore = 0;
        				setTimeout(function(){
        					document.getElementById("tryAgain").style.display = "block";
							document.getElementById("seeAnswers").style.display = "block";
							//document.getElementById("giveFeedback").style.display = "block";
        					tempScore = 0;
        				},1500);
        			}
        		}
        			
        		if (tempScore===100){// disabled star animation
        			//document.getElementsByClassName("endBlock")[1].style.color = "#FFF";
        			//requestAnimationFrame(starAnim);
        		}
        		
        	},20);
			
			document.getElementById("endBlock1").style.opacity = 1;
        	
        },4000);
	
        var winStarScale = 0.5;
	
        function starAnim(){
        	
        	document.getElementById("winStar").style.display = "block";
        	winStarScale+=0.7;
        	document.getElementById("winStar").style.transform = "scale("+winStarScale+")";
        	
        	if (winStarScale < 8){
        		requestAnimationFrame(starAnim);
        	} else {
        		winStarScale-=1;
        		document.getElementById("winStar").style.transform = "scale("+winStarScale+")";
        	}
        	
        }
		
		}// END: (animatedScore)


    }; //END: endScreen()

    //var tempScore;
    var dragging;

    var logger = setInterval(function() {
        document.getElementsByClassName("logLine")[0].innerHTML = dragging;

    }, 50);
	
	
	//var testInt = setInterval(function(){
		
	//	console.log(document.getElementById("endBlockNewPercent").innerHTML);
		
	//},30);
	
	
	
	

}; // END on load