var flairs = document.getElementsByTagName("span");
var count = 0;

//find every flair on the page
$('.flair').each(function(i, flair) {

	//get the reddit username
	var username = $(flair).parent().find(".author").first().html();

	//check flair for a heatware URL
	if(/.+heatware\.com.+/.test($(flair).html())){
		var heatwareURL = $(flair).html().replace("http://", "https://"); //switch all heatware urls to HTTPS
		heatwareURL = heatwareURL.replace("https://h", "https://www.h"); //www

		//get the user's heatware page
		$.ajax({
			url:heatwareURL,
			success:function(data){

				var parser=new DOMParser();
  				$heatware = $("<div/>").html(data).contents();

				var profile = {};
				profile.verify = false;
				profile.url = heatwareURL;
				
				//get # of pos/neu/neg evals
				profile.pos = $heatware.find('[title="Positive Feedback"]+.f-26').text();
				profile.neu = $heatware.find('[title="Neutral Feedback"]+.f-26').text();
				profile.neg = $heatware.find('[title="Negative Feedback"]+.f-26').text();

				//check if reddit alias on heatware matches reddit username
				var aliases = $heatware.find('.panel-heading:contains(Forum Aliases)').parent();
				
				aliases.find('.panel-body li:contains(on Reddit)').each(function(i, elem){
						if($(elem).text().indexOf(username+" ") == 0){
							profile.verify = true;
						}
				});

				aliases.find('.panel-body li:contains(on /r/hardwareswap)').each(function(i, elem){
						if($(elem).text().indexOf(username+" ") == 0){
							profile.verify = true;
						}
				});


				//replace flair with info
				var hwstr = "Heatware: "+profile.pos+" / "+profile.neu+" / "+profile.neg + " ("+(profile.verify ? "confirmed" : "unconfirmed")+")";
				$(flair).html("<a style='font-size:100% !important;font-weight:normal !important;' href='"+profile.url+"'>"+hwstr+"</a>");	
			}
		});
	}	
});
