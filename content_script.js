var flairs = document.getElementsByTagName("span");
var count = 0;

$('.flair').each(function(i, flair) {
	//console.log("flair "+i);
	if(/.+heatware\.com.+/.test($(flair).html())){
		var heatwareURL = $(flair).html().replace("http://", "https://");
		//console.log(heatwareURL);

		$.ajax({
			url:heatwareURL,
			success:function(data){

				var parser=new DOMParser();
  				heatware = parser.parseFromString(data,"text/html");

				profile = {};
				profile.url = heatwareURL;
				profile.pos = getNum("Positive Evals", heatware);
				profile.neu = getNum("Neutral Evals", heatware);
				profile.neg = getNum("Negative Evals", heatware);
				replaceFlair(flair, profile);		
			}
		});
	}	
});

function replaceFlair(flair, profile){
	var hwstr = "Heatware: "+profile.pos+" / "+profile.neu+" / "+profile.neg;
	$(flair).html("<a style='font-size:100% !important;font-weight:normal !important;' href='"+profile.url+"'>"+hwstr+"</a>");
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


