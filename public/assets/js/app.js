


  $('#scrapeArticles').on('click', function(){
      
    $.getJSON("/articles", function(data) {
        // For each one
        for (var i = 0; i < 30; i++) {
          // Display the apropos information on the page
        //   $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        var individualDivs = $('<div>');
        individualDivs.addClass("row individualDivs");
        var headlineDiv =$('<div>');
        headlineDiv.addClass('col-md-9 headlineDiv');
        var title = data[i].title;
        var link = data[i].link;
        var htag = $('<h4>');
        var ptag = $('<a href = ' + link + '>' +  '<p>'+ link + '</p></a>');
        // var atag = $('<a>').attr('href', data[i].link);
        // atag.attr('href', );
        // ptag.append(atag);
        htag.append(title);
        headlineDiv.append(htag);
        headlineDiv.append(ptag);
        $('#articles').prepend(individualDivs);
        var buttonDiv = $('<div>');
        buttonDiv.addClass('col-md-3 btnDivClass');
        var saveArticleButton = $('<button>' + "Save Article" + "</button>");
        saveArticleButton.addClass('btn btn-lg saveArtsBtn');
        buttonDiv.append(saveArticleButton);
        individualDivs.append(headlineDiv);
        individualDivs.append(buttonDiv);

        }
      });
  });

  $('.saveArtsBtn').on('click', function(){
      
    $.post('/saved',), function(data){
        console.log(data);
       };
  });