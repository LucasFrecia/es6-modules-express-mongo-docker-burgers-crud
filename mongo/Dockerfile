FROM mongo
COPY init.json /init.json
CMD mongoimport --host mongo --db burgers --collection document --type json --file /init.json --jsonArray