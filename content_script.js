var flairs = document.getElementsByTagName("span");
var count = 0;

//find every flair on the page
$('.flair').each(function(i, flair) {

	//get the reddit username
	var username = $(flair).parent().find(".author").first().html();

	//check flair for a heatware URL
	if(/.+heatware\.com.+/.test($(flair).html())){
		var heatwareURL = $(flair).html().replace("http://", "https://"); //switch all heatware urls to HTTPS

		//get the user's heatware page
		$.ajax({
			url:heatwareURL,
			success:function(data){

				var parser=new DOMParser();
  				$heatware = $("<div/>").html(data).contents();

				profile = {};
				profile.verify = false;
				profile.url = heatwareURL;
				
				//get # of pos/neu/neg evals
				profile.pos = $heatware.find('[title="Positive Evals"] .num1').text();
				profile.neu = $heatware.find('[title="Neutral Evals"] .num1').text();
				profile.neg = $heatware.find('[title="Negative Evals"] .num1').text();

				//check if reddit alias on heatware matches reddit username
				$heatware.find('.subhead:contains(Aliases)').each(function(i, elem){
					if($(elem).parent().find('strong:contains(Reddit)').first().parent().text().indexOf(username+" ") == 0){
						profile.verify = true;
					};					 
				});

				//replace flair with info
				var hwstr = "Heatware: "+profile.pos+" / "+profile.neu+" / "+profile.neg + " ("+(profile.verify ? "confirmed" : "unconfirmed")+")";
				$(flair).html("<a style='font-size:100% !important;font-weight:normal !important;' href='"+profile.url+"'>"+hwstr+"</a>");	
			}
		});
	}	
});
