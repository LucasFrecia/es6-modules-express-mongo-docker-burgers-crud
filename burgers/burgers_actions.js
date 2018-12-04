function BURGERS_ACTIONS() {}

BURGERS_ACTIONS.prototype.get = (collection, db, res, id = null) => {
  collection
    .find()
    .then(docs => {
      docs = docs.sort((a, b) => b.position - a.position);
      res.json(docs);
    })
    .then(() => db.close())
    .catch(function(rej) {
      console.log(rej);
    });
};

BURGERS_ACTIONS.prototype.add = (collection, db, res, doc = null) => {
  
  const insertItem = {
    img: doc.imgName,
    position: '',
    description: doc.description
  };

  collection
    .find()
    .then((result) => {
      insertItem.position = result.length + 1;
      collection.insert(insertItem);
    })
    .then(() => {
      return collection.find();
    })
    .then(docs => {
      docs = docs.sort((a, b) => b.position - a.position);

      res.json(docs);
    })
    .then(() => db.close())
    .catch(err => res.json(err));
};

BURGERS_ACTIONS.prototype.update = (collection, db, res, doc = null) => {
  collection
    .update(doc)
    .then(() => {
      return collection.find();
    })
    .then(docs => {
      docs = docs.sort((a, b) => b.position - a.position);
      res.json(docs);
    })
    .then(() => db.close())
    .catch(err => res.json(err));
};

BURGERS_ACTIONS.prototype.delete = (collection, db, res, doc = null) => {
  removeItems = doc ? doc : {};

  collection
    .remove(removeItems)
    .then(() => {
      return collection.find();
    })
    .then(docs => {
      docs = docs.sort((a, b) => b.position - a.position);
      res.json(docs);
    })
    .then(() => db.close())
    .catch(err => res.json(err));
};

module.exports = BURGERS_ACTIONS;
