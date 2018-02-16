$(document).ready(function() {
    $("#weatherSubmit").click(function(e) {
        e.preventDefault();
        var value = $("#weatherInput").val();
        var myurl= "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=43166ad42f6ea1536a3ec5df9175da56";
        $.ajax({
            url : myurl,
            dataType : "json",
            success : function(json) {
                console.log(json);
                var results = "";
                results += '<h2>Weather in ' + json.name + "</h2>";
                for (var i=0; i<json.weather.length; i++) {
                    results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
                }
                results += '<h2>' + json.main.temp + " &deg;F</h2>"
                results += "<p>"
                for (var i=0; i<json.weather.length; i++) {
                    results += json.weather[i].description
                    if (i !== json.weather.length - 1)
                    results += ", "
                }
                results += "</p>";
                results += "<ul>";
                results += "<li><b>Pressure:</b> " + json.main.pressure + " in</li>";
                results += "<li><b>Humidity:</b> " + json.main.humidity + "%</li>";
                results += "<li><b>Max:</b> " + json.main.temp_max + " &deg;F</li>";
                results += "<li><b>Min:</b> " + json.main.temp_min + " &deg;F</li></ul>";

                $("#weatherResults").html(results);
            }
        });
    });

    $("#stackOverflowSubmit").click((e) =>{
        e.preventDefault();
        var inputValue = $("#stackOverflowInput").val();
        var stackURL = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=" + inputValue;
        $.ajax({
            url: stackURL,
            responseType: 'json',
            success: (json) => {
                var results = "<h2>Stack Overflow Answers for: <em>'" + inputValue + "'</em> </h2><ul>";

                //Only display top 8 most relevant answers
                for (var i = 0; (i < 8 && i < json.items.length); i++){
                    results += "<li><a target='_blank' href='" + json.items[i].link + "'>" + json.items[i].title + "</a></li>";
                }
                results += "</ul>"
                $("#stackOverflowResults").html(results);
            }
        })
    });
});

$(document).ready(function() {
  $("#recipeSubmit").click(function(e) {
    e.preventDefault();
    var value = $("#recipeInput").val();
      console.log(value);

      var myurl= "http://api.yummly.com/v1/api/recipes?_app_id=1c15de65&_app_key=473327443e538d6ff92f89eeac912c70&q=" + value + "&requirePictures=true";

      $.ajax({
          url : myurl,
          dataType : "json",
          success : function(json) {
        console.log(json);
        var results = "";
        for (var i=0; i<json.matches.length; i++) {
        results += '<h5><br>' + json.matches[i].recipeName + '</h5>';
        results += "<h5>"
        results += '<img src="' + json.matches[i].smallImageUrls + '" />';
        results += "<img>"
        results += '<h4>'+ json.matches[i].ingredients  + '</h4>';
        results += "<h4> <hr>"

        }

        $("#recipeResults").html(results);

        }
      });
    });
})
