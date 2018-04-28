"use strict";
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    // tests for feeds
    describe('RSS Feeds', function() {

        // test if allFeeds variable is defined and that it is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         // test if every entry in allFeeds has URL defined and is not empty
         describe('hasURL', function(){
           it('should have a URL defined and is not empty', function(){
             for (let feed of allFeeds) {
               expect(feed.url).toBeDefined();
               expect(feed.url).not.toBe('');
             }
           });
         });



         // test if every entry in allFeeds has name defined and is not empty
         describe('hasName', function(){
           it('should have a name defined and is not empty', function(){
             for (let feed of allFeeds) {
               expect(feed.name).toBeDefined();
               expect(feed.name).not.toBe('');
             }
           });
         });
    });


    // tests for the menu
    // test if the menu is hidden by default
    describe('The menu', function(){
       const body = $('body');

       // test if the menu is hidden by default
       it('should have the menu element hidden by default', function(){
         expect(body.hasClass('menu-hidden')).toBe(true);
       });

        // test if the menu changes visibility when menu icon is clicked
        it('should change visibility when menu icon is clicked', function (){
          const menuIcon = $('.menu-icon-link');
          let initialVisibility = body.hasClass('menu-hidden');
          menuIcon.click();
          expect(body.hasClass('menu-hidden')).toBe(!initialVisibility);
          initialVisibility = !initialVisibility;
          menuIcon.click();
          expect(body.hasClass('menu-hidden')).toBe(!initialVisibility);
        });
      });

      // test for initial entries
      describe('Initial Entries', function() {
         beforeEach(function(done) {
           loadFeed(0, done);
         });


         // test when loadFeed is called, there exists at least one entry in the feed container
         it('feed container should have at least one entry element when loadFeed is called', function(done) {
           const article = $('.feed .entry-link article');
           expect(article.hasClass('entry')).toBe(true);
           done();
         });
      });



      // test for new feed selection
      // First, beforeEach function is called, it will call loadFeed with id 0
      // and a callback function which will be called after the feed of id 0
      // is completely loaded. When field 0 is completely loaded, the callback
      // function will be called and a new oldFeed variable will be assigned the
      // current html of the feed and loadFeed will be called again with the
      // feed of id 1 and the done function as the callback function.
      // Then the oldFeed variable will be compared to the existing feed html
      // which should be the content of feed 1.
      describe('New Feed Selection', function(){
        let oldFeed;

         beforeEach(function(done){
           loadFeed(0, function(){
             oldFeed = document.querySelector('.feed').innerHTML;
             loadFeed(1, done);
           });
         });

         // test when a new feed is selected, content actually changes!
         it('content should change when a new feed is loaded by loadFeed()', function(done){
           const newFeed = document.querySelector('.feed').innerHTML;
           expect(newFeed).not.toBe(oldFeed);
           done();
         });
      });
}());
