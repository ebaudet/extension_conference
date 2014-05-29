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
		<div class=\"column conf\" style=\"width: 24%\">	\
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
			var tab = [];
			var semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

			title += "<h3>" + "Conférence(s) :" + "</h3>";
			for (var i = 0; i < max; i++)
			{
				var tab_date = $(tagazok[i]).find(".data .date span").text().trim().substr(0, 10).split("/");
				if (tab_date.length == 3)
					var heure = $(tagazok[i]).find(".data .date span").text().trim().split("-")[1].split("h")[0];
				var date_order = new Date(tab_date[2], tab_date[1] - 1, tab_date[0], heure, 0);
				var value = [date_order.getTime(), i];
				tab.push(value);
			}
			tab.sort();
			for (var j = 0; j < max; j++)
			{
				var i = tab[j][1];
				var date = $(tagazok[i]).find(".data .date span").text().trim().substr(0, 10).split("/");
				var date_conf = new Date(date[2], date[1] - 1, date[0], 0, 0);
				var jour_restant = Math.ceil((date_conf.getTime() - d.getTime()) / (3600000 * 24));
				if (date[2] < year || (date[2] == year && date[1] < month)
					|| (date[2] == year && date[1] == month && date[0] < day))
					continue ;
				var register = $(tagazok[i]).find(".eventzone .has-registered").hasClass("is-registered");
				places = $(tagazok[i]).find(".nb_registered").html();
				places_OK = $(tagazok[i]).find(".num .location .label").text().replace(" place(s) disponible(s))", "").split('(')[1];
				toscreen += '<div style=" \
								margin-bottom:10px; \
								box-shadow: 0px 0px 1px #2A2A2A; ';
				if (register)
					toscreen += 'background-color: #D8F6CE;';
				else if (places != places_OK)
					toscreen += 'background-color: #ffffff;';
				toscreen += ' padding: 5px; \
							">';
				if (register)
					color = "#01824A";
				else if (places == places_OK)
					color = "#F5634A";
				else
					color = "#000000";
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
				toscreen += semaine[date_conf.getDay() - 1] + $(tagazok[i]).find(".data .date span").last().html();
				if (register)
					toscreen += "<br/>-> Vous êtes <strong>inscrit</strong>, c'est bien !";
				if (places != places_OK)
					toscreen += "<br/>-> <strong>" + (places_OK - places) + " places</strong> disponibles !";
				else
					toscreen += "<br/>-> plus de place"
				toscreen += "<br/>-> Voir le <a href=\"https://intra.42.fr/module/2013/ADM-0-002/PAR-0-1/"
				+ $(tagazok[i]).find(".acti-title a").attr('href') + "\">résumé</a>";
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
				{
					toscreen += '<span style=" \
									background-color:#2A2A2A; \
									color: #ffffff; \
									padding: 1px 3px; \
									float: right; \
									display: block; \
								">';
					if (jour_restant > 1)
						toscreen += 'dans ' + jour_restant + ' jours'
					else
						toscreen += "demain"				
					toscreen += '</span>';
				}
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
