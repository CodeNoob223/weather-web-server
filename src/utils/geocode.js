const request = require("postman-request");

const geocode = (location, callBack) => {
    const mapUrl = `http://api.positionstack.com/v1/forward?access_key=68ba753e1e19d2304c59a35c9fbf10b7&query=${encodeURIComponent(location)}&limit=1`;
    request({url: mapUrl, json: true}, (err, res) => {
        if (err) {
            return callBack("Unable to connect to PositionStack!", undefined);    
        } else if (res.body.error) {
            return callBack("Unable to find location! Please try a diffirent location.", undefined);
        } else if (res.body.data.length === 0) {
            return callBack("Unable to find location! Please try a diffirent location.", undefined);
        }
        const {latitude, longitude, name: location} = res.body.data[0];
        const data = {
            latitude, 
            longitude,
            location            
        };
        callBack(undefined,data);
    })
}

module.exports = geocode;