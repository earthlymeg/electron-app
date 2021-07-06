const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')


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

    it('shows an initial window', async () => {
        const count = await app.client.getWindowCount();
        return assert.equal(count, 1);
    });
    xit('has the correct title', async () => {
     
        // return assert.equal(title, 'To-Do List');

    });




});

