var flairs = document.getElementsByTagName("span");
var count = 0;

var profiles = {};

for(var i = 0; i < flairs.length; i++){
	if(flairs[i].className.indexOf("flair") == 0 && /.+heatware\.com.+/.test(flairs[i].innerHTML)){
		
		var heatwareURL = flairs[i].innerHTML;
		if(!profiles[heatwareURL]){
			var heatware = httpGet(heatwareURL);
			profiles[heatwareURL] = {};
			profiles[heatwareURL].pos = getNum("Positive Evals", heatware);
			profiles[heatwareURL].neu = getNum("Neutral Evals", heatware);
			profiles[heatwareURL].neg = getNum("Negative Evals", heatware);
		} 
		
		var hwstr = "Heatware: "+profiles[heatwareURL].pos+" / "+profiles[heatwareURL].neu+" / "+profiles[heatwareURL].neg;
		flairs[i].innerHTML = "<a style='font-size:100% !important;font-weight:normal !important;' href='"+heatwareURL+"'>"+hwstr+"</a>";
		
		count++;
	}
	
}


function httpGet(url)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    
    var parser=new DOMParser();
  	xmlDoc = parser.parseFromString(xmlHttp.responseText,"text/html");
	return xmlDoc;
}


function getNum(name, hw){
	var nums = hw.getElementsByClassName("num");
	for(var i = 0; i < nums.length; i++){
		if(nums[i].title == name){
			var num = nums[i].getElementsByClassName("num2")[0].innerHTML;
			return num;
		}
	}
	
	return 0;
}


