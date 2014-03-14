/* ************************************************************************************ *
 *															 _________  ____     _   	*
 *	Extension pour afficher les dernières conférences en 	|__  | __ )|  _ \   / \   	*
 *	page d'accueil de l'intra - https://intra.42.fr 		  / /|  _ \| |_) | / _ \ 	*
 *															 / /_| |_) |  _ < / ___ \ 	*
 *	by: ebaudet <emilien.baudet@gmail.com> 					/____|____/|_| \_/_/   \_\	*
 *																						*
 * ************************************************************************************ */

$("#today-student").append(function(){
	$(this).append(" \
		<div class=\"column conf\"> \
			<span> \
				<span class=\"icon\" \
					style=\" \
						background:		url(https://intra.42.fr/static6669/img/icon-pack.png) no-repeat -55px -535px; \
						background-position: -191px -1181px; \
						display:		block; \
						width:			23px; \
						margin-top:		13px; \
						margin-left:	15px; \
						height:			24px; \
						float:			left; \
					\"> \
				</span> \
				<span class=\"title\" \"> \
				</span> \
			</span> \
			<div class=\"item\" style=\"margin-right: 0px\" \
			></div> \
		</div>");

	$.ajax({
		url: "https://intra.42.fr/module/2013/ADM-0-002/PAR-0-1/",
		dataType: "text",
		success: function(result)
		{
			var tagazok = $(result).find("ul.future li.future").toArray();
			var max = $(result).find("ul.future li.future").size();
			var toscreen = '';
			var places = '';
			var places_OK = '';
			var color = '';
			var title = '';
			var d = new Date();
			var day = d.getDate();
			var month = d.getMonth() + 1;
			var year = d.getFullYear();

			title += "<h3>" + "Conférence(s) :" + "</h3>";
			for (i = 0; i < max; i++)
			{
				var date = $(tagazok[i]).find(".data .date span").text().trim().substr(0, 10).split("/");
				var date_conf = new Date(date[2], date[1] - 1, date[0], 0, 0);
				var jour_restant = Math.ceil((date_conf.getTime() - d.getTime()) / (3600000 * 24));
				if (date[2] < year || (date[2] == year && date[1] < month)
					|| (date[2] == year && date[1] == month && date[0] < day))
					continue ;
				var register = $(tagazok[i]).find(".eventzone .has-registered").hasClass("is-registered");
				toscreen += '<div style=" \
								margin-bottom:10px; \
								box-shadow: 0px 0px 1px #2A2A2A; '
								+ (register ? 'background-color: #ffffff;' : '')
								+ ' padding: 5px; \
							">';
				places = $(tagazok[i]).find(".nb_registered").html();
				places_OK = $(tagazok[i]).find(".num .location .label").html().replace(" place(s) disponible(s))", "").split('(')[1];
				if (places != places_OK)
					color = "#01824A";
				else
					color = "#F5634A";
				toscreen += "<h4 style=\"color:" + color + ";\">";
				toscreen += '<span class="icon" \
								style=" \
									background:		url(https://intra.42.fr/static6669/img/icon-pack.png) no-repeat -502px -122px; \
									padding-lef:	10px; \
									float:			left; \
									margin:			4px 10px 0 0; \
									height:			9px; \
									width:			9px; \
									display:		inline-block \
								"> \
							</span>'
				toscreen += $(tagazok[i]).find(".acti-title a").html().replace("Conférence : ", "") + "</h4>";
				toscreen += "le " + $(tagazok[i]).find(".data .date span").last().html();
				if (register)
					toscreen += "<br/>-> Vous êtes <strong>inscrit</strong>, c'est bien !";
				toscreen += "<br/>-> Voir le <a href=\"https://intra.42.fr/module/2013/ADM-0-002/PAR-0-1/"
				+ $(tagazok[i]).find(".acti-title a").attr('href') + "\">résumé</a>";
				var test = 0.9;
				if (date[2] == year && date[1] == month && date[0] == day)
					toscreen += '<span style=" \
									background-color:#F3AF4D; \
									padding: 1px 3px; \
									float: right; \
									display: block; \
								">\
									aujourd\'hui\
								</span>';
				else
					toscreen += '<span style=" \
									background-color:#2A2A2A; \
									color: #ffffff; \
									padding: 1px 3px; \
									float: right; \
									display: block; \
								">\
									dans '
								+ jour_restant
								+ ' jour'
								+ (jour_restant > 1 ? 's' : '')
								+ '</span>';
				toscreen += '<div style="clear: both;"></div>';
				toscreen += "</div>";
			}

			if (max == 0 || toscreen == '')
				toscreen += "Pas de nouvelles conférences.";

			$("#today-student div.conf span.title").html(title);
			$("#today-student div.conf div.item").html(toscreen);
		},
		error: function() {
			var title = '';

			title += "<h3>" + "Conférence(s) :" + "</h3>";
			$("#today-student div.conf span.title").html(title);
			$("#today-student div.conf div.item").html("a pas trouvé");
		}
	});
});
