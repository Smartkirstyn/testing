function initUserData(){
    
    
    var url = 
    'https://script.google.com/macros/s/AKfycbyGEYZLg9ueItaTjlPJurjLwtPczT47MQ3iZMWXJhfAOa9flJNV/exec';
    
    var sectionNumber = "S7";
    var activityNumber = "9_2";
    
    var userRating = ""; //1-5
    var userComments = ""; //comments
    
    
	fct.userData = function() {
        
        
        
		function generateUserID(){
            
            
            
            //console.log("generateUserID");
            
            //"AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax"
            // path=/Main/;
            if (!document.cookie){
                document.cookie = "name="+Math.round(1000000 - (Math.random()) * 1000000)+"; SameSite=Strict";
            }
            
            var output = document.cookie;
            
            //console.log(document.cookie);
            
            return output;
            
        }
        
        
        function postPageView(){
            
            //console.log("postPageView");
            
            eventHappened();//page loaded
            
        }
        
        
        function eventHappened(){
            
            //console.log("eventHappened");
            
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var timeStamp = date+' '+time;
            
            
            
            ////// JQUERY //////////
            
            
            
            
            var jqxhr = $.ajax({
                url: url,
                method: "GET",
                dataType: "json",
                data:   ""+sectionNumber+"=true"+
                        "&UserID="+document.cookie+
                        "&TimeStamp="+timeStamp+
                        "&"+activityNumber+"=1"
            });
            
            
            
            /*
            var jqxhr = $.ajax({
                url: url,
                method: "GET",
                dataType: "json",
                data:   "BCSC2="+a + "=newColumn"
            });
            */
            
            
            //console.log(a, timeStamp, b, c);
            
            
            /////////////////////////
            
        }
    
    
	return{
		generateUserID,
        postPageView
	}
    
    
    
	}();


} //END: initUserData()




