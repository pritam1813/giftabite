const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Routes', () => {
    describe('GET /', () => {
        it('should render the home page', async () => {
            const res = await chai.request(app).get('/');
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('Giftabite | Home');
        });
    });

    describe('GET /about-us', () => {
        it('should render the about us page', async () => {
            const res = await chai.request(app).get('/about-us');
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('Giftabite | About Us');
        });
    });

    describe('404 Page', () => {
        it('should return a 404 page', async () => {
            const res = await chai.request(app).get('/not-a-real-page');
            expect(res).to.have.status(404);
            expect(res).to.be.html;
            expect(res.text).to.contain('404 Error');
        });
    });
});