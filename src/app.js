const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const path = require("path");
const hbs = require("hbs");
const request = require("postman-request");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// Tao path cho Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup directory
app.use(express.static(publicPath));

// Cac routes
app.get('', (req, res) => {
    res.render('index', {
        title: "WeatherApp",
        name: "Quan"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Quan"
    });
});

app.get('/tinhdiem', (req, res) => {
    res.render('tinhdiem', {
        title: "Trang tính điểm",
        name: "Quan"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        message: "Contact us for support!",
        name: "Quan"
    });
});

app.get('/help/*', (req, res) => {
    res.render("404page",{
        title: "Help article",
        errorMessage: "Help article not found!"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You need to provide an address!"
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.json({error});
            return console.log(error);
        }
        console.log("PositionStack:",{latitude, longitude, location});
        forecast({latitude, longitude, location}, (err, info) => {
            if (err) {
                res.json({error: err});
                return console.log(err);
            }
            return res.status(200).json({
                forecast: info.forecast,
                location: info.location,
                address: req.query.address
            });
        });
    });
})

app.get('*', (req, res) => {
    res.render("404page",{
        title: "404",
        name: "Quan",
        errorMessage: "404, Page not found!"
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on localhost:${port} 🔥`)
});