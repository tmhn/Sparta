var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect    = require('chai').expect;

chai.use(chaiHttp);

// Give the test suite a name ( collection of tests )
describe('Posts', function() {


  // describe a test for INDEX
  it('should list ALL posts on / GET', function(done) {
        
        // create a request manager that uses our app
        var request = chai.request(server);
        
        // send a request
        request
          .get('/')
          .end(function(err, res){
    
              // check we got a 200 response
              res.should.have.status(200);
      
              // and that it's html
              res.should.be.html;
      
              // finish the test ( don't forget this! )
              done();
            
          });
  });

  // describe a test for SHOW
  it('should list a SINGLE post on /<id> GET', function(done) {
    chai.request(server)
      .get('/0')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;

        // does the page have the correct post title on it somewhere
        // regex matching
        res.text.should.match(/Post 1/);

        done();
      });
  });

  // describe a test for POST
  it('should add a SINGLE post on / POST' , function(done){
      var request = chai.request(server);

      request.post('/')
          .set('content-type', 'application/x-www-form-urlencoded') // set the form encoding type
          .send({'title': 'Test Post', 'body': 'Body Text'}) // the data to be posted
          .end(function(err, res){

            res.should.have.status(200);
            res.should.be.html;

            // we should end up back on the homepage
            res.text.should.match(/Welcome to the homepage/);

            // make another request to make sure it was created
            request
              .get('/3')
              .end(function(err, res){

                  res.should.have.status(200);
                  res.should.be.html;

                  // was the post correctly created
                  res.text.should.match(/Test Post/);
                  res.text.should.match(/Body Text/);

                  done();
              });
            
          });

  });

  // describe a test for PUT
  it('should update a SINGLE post on /<id> PUT' , function(done){

    var request = chai.request(server);

    request.put('/2')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({'title': 'Updated Post', 'body': 'Updated Text'})
        .end(function(err, res){

          res.should.have.status(200);
          res.should.be.html;
          res.text.should.match(/Welcome to the homepage/);

          request
            .get('/2')
            .end(function(err, res){

                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Updated Post/);
                res.text.should.match(/Updated Text/);

                done();
            });
          
        });

  });


  it('should delete a SINGLE post on /<id> DELETE' , function(done) {

    var request = chai.request(server);

    request.delete('/3')
        .end(function(err, res){

          res.should.have.status(200);
          res.should.be.html;
          res.text.should.match(/Welcome to the homepage/);

          request
            .get('/3')
            .end(function(err, res){

                res.should.have.status(404);
                done();

            });
          
        });

  });

});