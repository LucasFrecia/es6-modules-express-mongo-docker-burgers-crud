import * as express from "express";
import multer, { diskStorage } from "multer";
import { IMonkManager, ICollection } from "monk";

type MulterCallback = (
  error?: any,
  info?: Partial<Express.Multer.File>
) => void;

interface Model {
  _id: string;
  img?: string;
  position: string;
  description?: string;
}

/**
 * BurgersRouter set up
 * @param router
 * @param db
 * @author Lucas Frecia <frecialucas@gmail.com>
 */
export default class BurgersRouter {
  constructor(router: express.Router, db: IMonkManager) {
    const collection: ICollection = db.get("document");

    /** Set up multer to handle file uploads */
    const storage = diskStorage({
      // @ts-ignore
      destination: (
        req: Request,
        file: Express.Multer.File,
        callback: MulterCallback
      ) => {
        /** Set directory to save images to disk */
        // @ts-ignore
        callback(null, "/usr/src/app/public/assets/img/");
      },
      // @ts-ignore
      filename: (req, file, cb: MulterCallback) => {
        /** Validate file extension */
        if (!file.originalname.match(/\.(jpg|png|gif)$/)) {
          return cb(new Error("Only jpg, gif and png images are allowed..."));
        }
        // @ts-ignore
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage });
    router.get(
      "/",
      async (req: express.Request, res: express.Response): Promise<void> => {
        res.json(await this.all(collection));
        db.close(); // TODO Sure?
      }
    );
    router.post(
      "/burger",
      upload.single("img"),
      async (req: express.Request, res: express.Response): Promise<void> => {
        const item = req.body;
        if (!item) {
          res.json({
            error: true,
            message: "Please make sure the burger has all required data...",
          });
        }
        this.add(collection, db, res, item);
      }
    );
    router.put(
      "/burger",
      upload.single("img"),
      async (req: express.Request, res: express.Response): Promise<void> => {
        console.log("in put..........");
        const item = req.body;
        // if (item.length > 1) {
        //   item.map(it => {

        //   });
        // }

        if (!item) {
          res.json({
            error: true,
            message: "Please make sure the burger has all required data...",
          });
        }

        this.update(collection, db, res, item);
      }
    );

    router.delete(
      "/burgers/",
      (req: express.Request, res: express.Response) => {
        const items = req.body;
        this.drop(collection, db, res, items);
      }
    );
  }

  // async get(collection: ICollection, db: IMonkManager, res: express.Response, id = null) {
  //   collection
  //     .find()
  //     .then(docs => {
  //       docs = docs.sort((a, b) => b.position - a.position);
  //       res.json(docs);
  //     })
  //     .then(() => db.close())
  //     .catch(function(rej) {
  //       console.log(rej);
  //     });
  // };

  async all(collection: ICollection): Promise<void> {
    try {
      const docs = await collection.find();
      docs.sort((a, b) => b.position - a.position);
    } catch (err) {
      console.log(err);
    }
  }

  async add(
    collection: ICollection,
    db: IMonkManager,
    res: express.Response,
    doc: Model
  ) {
    const result = await collection.find();
    try {
      await collection.insert({
        // @ts-ignore
        img: doc.imgName,
        position: result.length + 1,
        description: doc.description,
      });
    } catch (err) {
      console.log(err);
    }
    return this.all(collection);
  }

  async update(
    collection: ICollection,
    db: IMonkManager,
    res: express.Response,
    doc: Model
  ) {
    try {
      await collection.update({ _id: doc._id }, doc);
    } catch (err) {
      console.log(err);
    }
    return this.all(collection);
  }

  async drop(
    collection: ICollection,
    db: IMonkManager,
    res: express.Response,
    doc = {}
  ) {
    try {
      await collection.remove(doc);
    } catch (err) {
      console.log(err);
    }
    return collection.find();
  }
}
