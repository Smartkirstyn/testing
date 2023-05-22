

window.data = {
	
};

data.title = "Bony Orbit Anterior"
data.thumbNumber = "thumbLarge";

data.imageName = "fig1";

data.markerCount = 12;

data.zoomInc = 0.3;
data.currentZoom = data.zoomInc*3;
	
data.imageSize = [779,500];
	
data.markerPos = [
				 [275,49,"Frontal bone"],
				 [430,130,"Optic canal",70,135],
				 [359,198,"Lesser wing of sphenoid"],
                 [346,241,"Superior orbital fissure"],
                 [485,264,"Ethmoid bone"],
                 
                 [292,269,"Greater wing of<br>sphenoid bone"],
                 [612,294,"Lacrimal bone"],
                 [161,294,"Zygomatic bone"],
                 [654,331,"Lacrimal sac fossa"],
                 [301,373,"Inferior orbital fissure"],
                 
                 [461,403,"Maxillary bone"],
                 [420,430,"Infraorbital groove"]
                 
				 ];
	
	data.shape = [
				 [451,126,650,246],
				 [378,178,29,21],
				 [349,195,88,91],
                 [331,226,53,136],
                 [490,267,239,176],
                 
                 [280,247,121,290],
                 [607,319,137,208],
                 [243,285,480,426],
                 [634,336,109,174],
                 [291,381,59,82],
                 
                 [533,334,485,327],
                 [379,423,129,85]
                 
				 ];
    
    
    
                 
	data.randomize = [1,2,3,4,5,6,7,8,9,10,11];

    
    
    
    // Used like so
  //var arr = [2, 11, 37, 42];
  data.randomize = shuffle(data.randomize);
  
  data.randomize.unshift(0);
  
  
  console.log(data.randomize);

  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
    
    //data.randomize = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
    //data.randomize.unshift(0);
    
	data.firstTerm = data.markerPos[data.randomize[0]][2];			 
    
    
    
    
    
    
    
    
				 