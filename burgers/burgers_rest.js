const multer = require("multer");
const BURGERS_ACTIONS = require("./burgers_actions.js");


function BURGERS_ROUTER(router, db) {
  const collection = db.get("document");

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/usr/src/app/public/assets/img/')
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
  })
   
  const upload = multer({ storage: storage });

  this.handleRoutes(router, collection, db, upload);
}

BURGERS_ROUTER.prototype.handleRoutes = (router, collection, db, upload) => {

  router.get("/", (req, res) => {

    BURGERS_ACTIONS.prototype.get(collection, db, res);

  });

  router.post("/burgers", upload.single('img'), (req, res) => {
    
    const items = req.body;
    
    if (!items) {
        return res.json({error: true, message: 'Please make sure the burger has all required data...'});
    }

    BURGERS_ACTIONS.prototype.add(collection, db, res, items);

  });

  router.put("/burger/", (req, res) => {

  });

  router.delete("/burgers/", (req, res) => {

    const items = req.body;

    BURGERS_ACTIONS.prototype.delete(collection, db, res, items);
  });
};

module.exports = BURGERS_ROUTER;
   /* 
    const collection = db.get("document");
    collection
      .insert([{ a: 1 }, { a: 2 }, { a: 3 }])
      .then(docs => {
        // Inserted 3 documents into the document collection
      })
      .then(() => collection.update({ a: 2 }, { $set: { b: 1 } }))
      .then(result => {
        // Updated the document with the field a equal to 2
      })
      .then(() => collection.remove({ a: 3 }))
      .then(result => {
        // Deleted the document with the field a equal to 3
      })
      .then(() => {
        return collection.find();
      })
      .then(docs => {
        res.json(docs);
      })
      .then(() => db.close());
      */