const multer = require("multer");
const BURGERS_ACTIONS = require("./burgers_actions.js");

/**
 * BURGERS_ROUTER set up
 * @param router 
 * @param db 
 * @author Lucas Frecia <frecialucas@gmail.com>
 */
function BURGERS_ROUTER(router, db) {
  const collection = db.get("document");

  /** Set up multer to handle file uploads */
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /** Set directory to save images to disk */
      cb(null, '/usr/src/app/public/assets/img/')
    },
    filename: (req, file, cb) => {
      /** Validate file extension */
      if(!file.originalname.match(/\.(jpg|png|gif)$/)) {
        return cb(new Error('Only jpg, gif and png images are allowed...'), false);
      }
      cb(null, file.originalname);
    }
  })
   
  const upload = multer({ storage: storage });

  this.handleRoutes(router, collection, db, upload);
}

/**
 * handleRoutes contains all possible routing operations and handles them accordingly
 * @param router 
 * @param collection - monk middleware object to handle db operations
 * @param db - database connection object
 * @param upload - multer object to handle file uploads
 */
BURGERS_ROUTER.prototype.handleRoutes = (router, collection, db, upload) => {

  router.get("/", (req, res) => {

    BURGERS_ACTIONS.prototype.get(collection, db, res);

  });

  router.post("/burger", upload.single('img'), (req, res) => {
    
    const item = req.body;
    
    if (!item) {
        return res.json({error: true, message: 'Please make sure the burger has all required data...'});
    }

    BURGERS_ACTIONS.prototype.add(collection, db, res, item);

  });

  router.put("/burger", upload.single('img'), (req, res) => {
    console.log('in put..........');

    const item = req.body;

    if (!item) {
      return res.json({error: true, message: 'Please make sure the burger has all required data...'});
    }

    BURGERS_ACTIONS.prototype.update(collection, db, res, item);
  
  });

  router.delete("/burgers/", (req, res) => {

    const items = req.body;

    BURGERS_ACTIONS.prototype.delete(collection, db, res, items);

  });
};

module.exports = BURGERS_ROUTER;
