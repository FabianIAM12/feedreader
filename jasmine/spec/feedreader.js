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

        it('initial entry checker', function (done) {
            expect(entry_element).toBeDefined();
            done();
        });
    });

    describe('New Feed Selection', function() {
        beforeEach(function (done) {
            const feed = $('.feed');
            loadFeed(0, function () {
                first_entries = feed.find(allFeeds.url);
            });
            loadFeed(1, function () {
                last_entries = feed.find(allFeeds.url);
                done();
            });
        });

        it('new feed is different to old one', function (done) {
            expect(first_entries).not.toBe(last_entries);
            done();
        });
    });
}());
