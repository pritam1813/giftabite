const chai = require('chai');
const expect = chai.expect;
const environment = require('../../config/environment');

describe('Environment configuration', () => {
  it('should have a valid MongoDB URI', () => {
    expect(environment.mongodb_uri).to.be.a('string').and.not.to.be.empty;
  });

  it('should have a valid session cookie key', () => {
    expect(environment.session_cookie_key).to.be.a('string').and.not.to.be.empty;
  });

  it('should have a valid geoname ID', () => {
    expect(environment.geoname_id).to.be.a('string').and.not.to.be.empty;
  });

  it('should have a valid geonames username', () => {
    expect(environment.geonames_username).to.be.a('string').and.not.to.be.empty;
  });
});
