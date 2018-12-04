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

  router.put("/burger/", upload.single('img'), (req, res) => {
    
    const item = req.body;
    
    BURGERS_ACTIONS.prototype.update(collection, db, res, item);
  
  });

  router.delete("/burgers/", (req, res) => {

    const items = req.body;

    BURGERS_ACTIONS.prototype.delete(collection, db, res, items);

  });
};

module.exports = BURGERS_ROUTER;
