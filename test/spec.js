const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path');

const app = new Application({
    path: electronPath,
    args: [path.join(__dirname, '..')],
});

describe('To Do List', function () {
    this.timeout(10000);

    beforeEach(() => {
        return app.start();
    });

    afterEach(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    xit('shows an initial window', async () => {
        const count = await app.client.getWindowCount();
        return assert.equal(count, 1);
    });
    xit('Title renders To-Do List', async () => {

        const title = await app.client.getTitle();
        return assert.equal(title, 'To-Do List');

    });

    //click add and window pops up
    // it('Can access menu', async () => {
    //     const app = await menuAddon.createApplication({ args: ['./'], path: electron }).start();
    //     menuAddon.clickMenu('Electron');
    //     await app.stop();
    //   });



});



// describe('Add Window', function () {


//     this.timeout(10000);

//     beforeEach(() => {
//         return app.start();
//     });

//     afterEach(() => {
//         if (app && app.isRunning()) {
//             return app.stop();
//         }
//     });


//     //shows a window

//     it('shows a window', async () => {
           
//     });

//     it('renders a new to-do', async () => {
           
//     });

//     it('deletes a to-do', async () => {
           
//     });


// });   