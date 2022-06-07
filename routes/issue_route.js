const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/auth")
const Issue = require("../models/issue");
const Book = require("../models/book");
const Return = require("../models/Datatime");

const Renew = require("../models/Renew")
const moment = require("moment");
const issue = require("../models/issue");






router.post("/issueRequest", async(req, res) => {


        const { accession_no, title, author, publisher, year, userId, bookId, userBranch, userName, isRecom, copies } = req.body;
        console.log("issue req")
        console.log(req.body)
        const Modbook = await Book.findOne({ _id: bookId })
        Modbook.copies -= 1;
        await Modbook.save();

        const book = await new Issue({
            accession_no,
            title,
            author,
            publisher,
            year,
            userId,
            bookId,
            userBranch,
            userName,
            isRecom,
            copies
        })
        await book.save();
        const datas = await Issue.find({});
        res.json(datas);

    })
    //newly
router.get("/getList", (req, res) => {
    Datatime.find()
        .then((lists) => {
            res.json(lists);
        })
        .catch((err) => {
            console.log(err);
        });

})

router.get("/issuedBook", requireLogin, (req, res) => {
    console.log("rjnbtgrj");
    Issue.find({ userId: req.user._id })
        .then((admins) => {
            res.json(admins);
        })
        .catch((err) => {
            console.log(err);
        });
})

router.get("/allIssuedBook", (req, res) => {

    setTimeout(async() => {
        const issues = await issue.find({});

        res.json(issues);
    }, 1000);
})


router.get("/allIssueRequest", (req, res) => {

    Issue.find()
        .then(admins => {
            res.json(admins);
        })
        .catch((err) => {
            console.log(err);
        });
})


router.post("/issuedBookDelete", async(req, res) => {



    const { postId } = req.body;

    try {
        //await Issue.findOneAndDelete({ bookId: req.body.postId });
        const book = await Issue.findOne({ bookId: postId });
        // const date=await Date.findOne({issuedAt:book.issuedAt.slice(0,10)});
        // if(date)

        book.isRecom = true;
        await book.save();
        res.send("you successfully return the book")

    } catch (error) {
        console.log(error);
    }


})

router.put("/issueRenewedByAdmin", async(req, res) => {
    try {

        //const issue = await Issue.findOne({ bookId: req.body.bookId, userId: req.body.userId });
        //console.log(issue);

        console.log("renew")


        const date = new Date();
        const issue = await Issue.findOne({ bookId: req.body.bookId, userId: req.body.userId });

        const { accession_no, title, author, publisher, year, userId, bookId, userBranch, userName, isRecom, copies } = issue;


        const issu = await new Renew({
            accession_no,
            title,
            author,
            publisher,
            year,
            userId,
            bookId,
            userBranch,
            userName,
            isRecom,
            copies
        })
        await issu.save();
        issue.createdAt = date;
        issue.return_Count += 1;
        await issue.save();

        const datas = await Issue.find({});
        res.json(datas);
    } catch (error) {
        console.log(error.message)
    }

})



router.post("/issuedReqAccept", async(req, res) => {
    // const date=await Date.find({});
    // if(date==null){


    // }

    const { bookId, postId } = req.body;

    try {
        const issue = await Issue.findOne({ _id: bookId })
        const book = await Book.findOne({ _id: postId })
        const data = await Datatime.findOne({ date: moment(issue.createdAt).format("YYYY-MM-DD") });
        console.log("hari");
        console.log(data);
        if (data == null) {
            const datas = Datatime({
                date: moment(issue.createdAt).format("YYYY-MM-DD"),
                issued: 1,
                returned: 0
            });
            datas.save();
        } else {
            console.log(data.issued);
            data.issued += 1;
            data.save();
        }

        // book.copies -= 1;
        // book.copies += 1;
        await book.save();
        issue.isIssue = true
        await issue.save()
        res.send('issue Delivered Successfully')
    } catch (error) {

        return res.status(400).json({ message: error });

    }

});

router.post("/issueReqDelete", async(req, res) => {

    try {
        const issue = await Issue.findOne({ _id: req.body.postId });
        // const date = await Datetime.findOne({ date: issue.issuedAt.slice(0, 10) });
        // if (date != null) {
        //     date.returned += 1;
        //     await date.save()
        // } else {
        //     const dates = new Datetime({
        //         date: issue.issuedAt.slice(0, 10),
        //         issue: 1,
        //         returned: 1
        //     });
        //     await dates.save();
        // }
        // const date=await 
        if (issue) {
            if (req.body.key) {
                const data = await Datatime.findOne({ date: moment(issue.createdAt).format("YYYY-MM-DD") });
                if (data == null) {
                    const datas = {
                        date: moment(issue.createdAt).format("YYYY-MM-DD"),
                        issued: 0,
                        returned: 1,
                    }
                    datas.save();
                } else {
                    data.returned += 1;
                    data.save();
                }

            }


        }
        // const data = await Datatime.findOne({ date: moment(issue.createdAt).format("YYYY-MM-DD") });
        // if (data == null) {
        //     const datas = {
        //         date: moment(issue.createdAt).format("YYYY-MM-DD"),
        //         issued: 0,
        //         returned: 1,
        //     }
        //     datas.save();
        // } else {
        //     data.returned += 1;
        //     data.save();
        // }
        const book = await Book.findOne({ _id: req.body.bookId })

        console.log(book);
        if (issue) {
            book.copies += 1;
            book.save();

        }
        await Issue.findOneAndDelete({ _id: req.body.postId });



        res.send("you successfully return the book")

    } catch (error) {
        console.log(error);
    }


})

router.post("/issueReturnedAdmin", async(req, res) => {
    try {

        const issue = await Issue.findOne({ bookId: req.body.bookId, userId: req.body.userId });
        console.log(issue);

        const { accession_no, title, author, publisher, year, userId, bookId, userBranch, userName, isRecom, copies } = issue;


        const issu = await new Return({
            accession_no,
            title,
            author,
            publisher,
            year,
            userId,
            bookId,
            userBranch,
            userName,
            isRecom,
            copies
        })
        await issu.save();

        // const
        await Issue.findOneAndDelete({ bookId: req.body.bookId, userId: req.body.userId });
        const book = await Book.findOne({ _id: req.body.bookId })
        book.copies += 1;
        await book.save()


        const datas = await Issue.find({});
        res.json(datas);
    } catch (error) {
        console.log(error.message);
    }
})




router.post("/issuedBook", async(req, res) => {

    const postId = req.body.postId
    try {
        const book = await Book.findOne({ _id: postId })
        console.log(book)
        book.isIssue = true
        await book.save()
        res.send('book issued Successfully')
    } catch (error) {

        return res.status(400).json({ message: error });

    }

});

router.post("/singleIssuedBook", async(req, res) => {

    const postId = req.body.postId

    try {
        const book = await Book.findOne({ _id: postId });

        console.log(book);
        res.json(book)

    } catch (error) {

        return res.status(400).json({ message: error });

    }

});

router.get("/getReturns", async(req, res) => {

    await Return.find({}, (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            res.status(400).json({ message: err });
        }
    })
})

router.get("/getRenews", async(req, res) => {

    await Renew.find({}, (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            res.status(400).json({ message: err });
        }
    })
})



module.exports = router;