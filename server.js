const express = require('express');
const app = express();
const url = require('url');


// tell express where your views are going to be
app.set("views", "views");
// telling express you are using ejs
app.set("view engine", "ejs");

app.use(express.static('public'));

app.get("/", handleRoot);
app.get("/home", handleHome);
app.get("/home-service", function (req, res) {
    const username = "khellbusch";
    const email = "rob16016@byui.edu";

    // collecting all the variables you might want on the page.  You don't have to do this.
    const params = {
        user: username,
        email: email
    }

    // this will just return a params JSON object
    res.json(params);
})
app.get("/math-form", function (req, res) {
    res.render("math-form");
});
app.get("/math", function (req, res) {
    let inputs = url.parse(req.url, true);
    let first = inputs.query.firstNumber;
    let second = inputs.query.secondNumber;
    let operation = inputs.query.operation;

    console.log("first: " + first + ", second: " + second + ", operation: " + operation);

    let answer = getAnswer(first, second, operation);

    const params = {
        answer: answer
    }

    res.render("results", params);
})
app.get("/math_service", function (req, res) {
    let inputs = url.parse(req.url, true);
    let first = inputs.query.firstNumber;
    let second = inputs.query.secondNumber;
    let operation = inputs.query.operation;
    let answer = getAnswer(first, second, operation);

    const params = {
        answer: answer,
        firstNumber: first,
        secondNumber: second,
        operation: operation
    }

    res.json(params);
})

app.listen(5000, function () {
    console.log("Server listening...");
});

function getAnswer(first, second, operation) {
    let answer;
    switch (operation) {
        case "add":
            answer = +first + +second;
            break;
        case "subtract":
            answer = +first - +second;
            break;
        case "multiply":
            answer = +first * +second;
            break;
        case "divide":
            answer = +first / +second;
            break;
    }
    console.log("answer: " + answer);
    return answer;
}


function handleRoot(req, res) {
    console.log("Received a request for the root...");

    res.write("This is the root");
    res.end();
}

function handleHome(req, res) {
    console.log("Received a request for home");

    const username = "khellbusch";
    const email = "rob16016@byui.edu";

    // collecting all the variables you might want on the page.  You don't have to do this.
    const params = {
        user: username,
        email: email
    }

    // you don't have to put the file path becuase earlier, we told express we are using EJS
    res.render("home", params);
}