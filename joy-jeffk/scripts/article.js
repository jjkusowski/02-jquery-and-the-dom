'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// It's a constructor function.  Their names are typically capitalized in order to differentiate from normal functions.  "this" refers to the object being created by this constructor.  rawDataObj refers to the object being passed into the constructor.

function Article (rawDataObj) {
  // DONE: Use the JS object that is passed in to complete this constructor function:
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // Cloning the existing template establishes the structure for us to place all the article data into.

  let $newArticle = $('article.template').clone();
  /* DONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  $('article').removeClass('template');


  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);

  /* DONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  $('address:last').children().text(this.author);
  $('address:last').children().attr('href', this.authorUrl);
  $('article:last').attr('data-category', this.category);
  $('article h1:last').text(this.title);
  $('.article-body:last').html(this.body);
  $('article:last').addClass('clearfix');

  // REVIEW: Display the date as a relative number of 'days ago'
  $('article:last').find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $('article:last').after('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// DONE: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(art) {
  articles.push(new Article(art));
});

articles.forEach(function(art){
  $('#articles').append(art.toHtml());
});
