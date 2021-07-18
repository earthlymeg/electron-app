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
       
       
        const input = await app.client.$('#item');
        await input.setValue('test123')
        const output = await input.getValue();
        const button = await app.client.$('#add-item');
        await button.click();
        // const ul = await app.client.$(ul).then;
        await app.client.$('ul').then(val => console.log(val));

        //return assert.equal(output, 'test12345')

    
    
    });  



    // it('deletes a to-do', async () => {
           
    // });


});   