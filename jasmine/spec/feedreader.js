/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('url and name is not empty', function() {
            for(let feed in allFeeds){
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].name).toBeDefined();
            }
        });
    });

    describe('The menu', function() {
        it('menu hidden by default', function() {
            expect(document.getElementsByTagName("body")[0].className).toContain('menu-hidden');
        });

        it('menu changes', function() {
            let link = $('.menu-icon-link');
            let body = $('body');

            link.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            link.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function (done) {
            loadFeed(0, function () {
                entry_element = $('.feed').find('entry');
                done();
            });
        });

        it('initial load feed works', function (done) {
            expect(entry_element).toBeDefined();
            done();
        });
    });

    describe('New Feed Selection', function() {
        beforeEach(function (done) {
            let feed = $('.feed');

            feed.empty();

            loadFeed(0, function () {
                first_entry = feed.find(allFeeds.url);
                done();
            });
            loadFeed(1, function () {
                second_entry = feed.find(allFeeds.url);
                done();
            });
        });

        it('initial load feed works', function (done) {
            expect(first_entry).not.toBe(second_entry);
            done()
        });
    });
}());
