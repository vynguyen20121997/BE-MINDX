const express = require('express');
const { req } = require('http');
const fs = require('fs');
const app = express();
const port = 3000;
var teachersList = require('./hehe.json');

// const result = JSON.parse(fs.readFileSync(path.join(__dirname, 'students.json')));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("hahahaha9128379182");
});


app.get("/teachers", (req, res) => {
    res.json({
        data: teachersList,
    })
})


app.get("/teachers/:id", (req, res) => {
    const { id } = req.params;
    const exsitingPost = teachersList.find((i) => i.id == id);
    if (!exsitingPost) {
        res.json({ message: "khong co" })
    }
    res.json({
        data: { exsitingPost },
    })
})


app.post("/teachers", (req, res) => {
    const { name, age, gender } = req.body;
    if (!name || !age || !gender) {
        res.json({ message: "thieu kia" });
        return
    }
    else {
        teachersList.push({
            id: Math.random(),
            name,
            age,
            gender,
        });

        res.json({
            data: teachersList,
        });
    }
});


app.put("/teachers/:id", (req, res) => {
    const { id } = req.params;
    const body = req.body;
        const result = teachersList.map((i)=>{
            if (i.id == id) {
                return { ...i, ...body};    
            }
            return i;
        })
   return res.json(result);
});

app.delete("/teachers/:id", (req, res) => {
        const { id } = req.params;
        const existingTeacher = teachersList.find((i) => i.id == id);
        if (existingTeacher === -1) {
            return res.status(400).json({
              message: "Post not found",
            });
          }
        
          teachersList.splice(existingTeacher, 1);
          return res.json({ data: "Delete successfully", data: teachersList });
        });





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})