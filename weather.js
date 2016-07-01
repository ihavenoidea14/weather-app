window.onload = function() {

	document.getElementById("zipinput").onkeyup = function() {
		if(this.value.length === 5) {
			var zip = this.value;
			var apikey = encodeURIComponent("[api key]");
			var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&appid=" + apikey;
			var request = new XMLHttpRequest();

			request.onreadystatechange = function() {
				if(request.readyState == 4 && request.status == 200) {
					var response = JSON.parse(request.responseText);
					document.getElementById("city").innerHTML = response.name;
					var degK = response.main.temp;
					var degF = Math.floor((degK * (9/5)) - 459.67);
					document.getElementById("temp").innerHTML = degF;
					var weather = response.weather[0].main;
					switch(weather) {
						case "Clear":
							document.getElementById("sunshine").style.display = "block";
							break;
						case "Rain":
							createRain();
							break;
						case "Haze":
							document.getElementById("clouds").style.display = "block";
							break;
						case "Clouds":
							document.getElementById("sunshine").style.display = "block";
							break;
						case "Snow":
							createSnow();
							break;
						case "Mist":
							createRain();
							break;
						case "Thunderstorm":
							createRain();
							//setInterval(lightning, Math.floor(Math.random() * 4000));
							break;
					}
				}
			}
			request.open("GET", url, true);
			request.send();
		}
	}

	document.getElementById("cOrF").onclick = function() {
		var tempChange = document.getElementById("cOrF");
		var toChange = document.getElementById("temp");
		if(tempChange.innerHTML.charAt(1) == "F") {
			var deg = Math.round((toChange.innerHTML - 32) * (5 / 9));
			toChange.innerHTML = deg;
			tempChange.innerHTML = "&degC";
		} else {
			var deg = Math.round((toChange.innerHTML * (9 / 5)) + 32);
			toChange.innerHTML = deg;
			tempChange.innerHTML = "&degF";
		}
	}

	// Create rain function
	function createRain() {

		var nbDrop = 900;

		function randRange(minNum, maxNum) {
			return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
		}

		for (i = 1; i < nbDrop; i++) {
			var dropLeft = randRange(0, 2000);
			var dropTop = randRange(-1000, 1400);

			$('.rain').append('<div class="drop" id="drop' + i + '"></div>');
			$('#drop' + i).css('left', dropLeft);
			$('#drop' + i).css('top', dropTop);
		}

		document.getElementById("rain").style.display = "block";
	}

	// Create snow function
	function createSnow() {

		var flakes = 900;

		function randRange(minNum, maxNum) {
			return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
		}

		for (i = 1; i < flakes; i++) {
			var dropLeft = randRange(0, 2000);
			var dropTop = randRange(-1000, 1400);

			$('.snow').append('<div class="flake" id="snow' + i + '"></div>');
			$('#snow' + i).css('left', dropLeft);
			$('#snow' + i).css('top', dropTop);
		}
		document.getElementById("snow").style.display = "block";
	}

	// Creates flashes
	function lightning() {
		$("#rain").toggleClass("lightning");
	}
}