const express = require("express");
const app = express();

app.use(express.json());

app.post("/sum", function (req, res) { // Correct order: req, res
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    // Output
    res.json({
        answer: a + b,
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
