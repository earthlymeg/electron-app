const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path');
var expect = require("chai").expect;

const app = new Application({
    path: electronPath,
    args: [path.join(__dirname, '..', 'addWindow.html')],
});


describe('Add Window', function () {


    this.timeout(10000);

    beforeEach(() => {
        return app.start();
    });

    afterEach(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });



    xit('shows a window', async () => {
        const count = await app.client.getWindowCount();
        return assert.equal(count, 1);
    });

    xit('Title renders To-Do List Item', async () => {

        const title = await app.client.getTitle();
        return assert.equal(title, 'Add To-Do List Item');

    });

    it('renders a new to-do', async () => {
       
       
            // return app.client
            //   .waitUntilWindowLoaded()
            //   .keys('Hello')
            //   .click('#add-item')
            //   .getText('ul')
            //   .then(text => expect(text).to.eq('Hello'))
            //   .catch(err => console.log(err))


    });  



    // it('deletes a to-do', async () => {
           
    // });


});   