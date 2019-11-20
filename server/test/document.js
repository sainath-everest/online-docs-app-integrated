//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Document = require('../model/document');


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('Documents', () => {
    beforeEach((done) => { 
        Document.remove({}, (err) => { 
           done();           
        });        
    });
/*
   * Test the /api route
   */
  describe('/GET  All Document meta data', () => {
      it('it should GET all the meta data of doc tree', (done) => {
        chai.request(server)
            .get('/api')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
   });


/**
 * Test the POST route
 */
describe('/POST Document/Folder', () => {
  it('it should  POST a doc/folder', (done) => {
      let document = {
          title: "test1",
          type : "folder",
          data: "",
          parentId : "5dd12f431a20a5079ebe7a09"
      }
    chai.request(server)
        .post('/api/document')
        .send(document)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
          done();
        });
  });

});

describe('/GET Single Dcoument/Folder',() => {
  it('it should get single document from DB',(done) => {
    let document = new Document(
    {
      "title" : "sample-doc",
      "type"  :"doc",
      "parentId" : "100abc",
      "data"  : "sample tecxt"

    });

    document.save((err,res) => {
      chai.request(server)
        .get('/api/document/'+document.id)
        .send(document)
        .end((err,res) => {
          res.body.should.be.a('object');
                  res.body.should.have.property('title');
                  res.body.should.have.property('type');
                  res.body.should.have.property('parentId');
                  res.body.should.have.property('data');
                  res.body.should.have.property('_id').eql(document.id);
                  done();
          

        });
  });

    });
    

});

/**
 * Test the PUT route
 */
describe('Updating Document/Folder info', () => {
  it('it should  POST a doc/folder', (done) => {
       let document = new Document(
      {
        "title" : "sample-doc",
        "type"  :"doc",
        "parentId" : "100abc",
        "data"  : "sample text"

      });
      document.save((err,res) => {
        chai.request(server)
        .put('/api/document/'+document.id)
        .send({
           "title" : "sample-doc",
          "type"  :"doc",
          "parentId" : "100abc",
          "data"  : "sample text changed"
  
        })
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data').eql('sample text changed');
          done();
        });

      });
    
  });

});

/*
 * Test the /api/document:id route
 */
 describe('Delete Single Dcoument/Folder by id',() => {
  it('it should delete single document from DB',(done) => {
    let document = new Document(
      {
        "title" : "sample-doc",
        "type"  :"doc",
        "parentId" : "",
        "data"  : "sample text",
        "children" : []

      });
      document.save((err,document) => {
        chai.request(server)
        .delete('/api/document/'+document.id)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql('sample-doc');
          res.body.should.have.property('data').eql('sample text');
          done();
        });
  });

      });
   
  });

// });


});