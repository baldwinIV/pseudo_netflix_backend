const express = require("express");
const { Op, models } = require('./sequelizer');
const router = express.Router();
console.log("on routing")

// client send backend server to the login info object, this function examine the info from DB and return true or false
router.get("/login", async (req, res, next) => {
    console.log(req.query.id);
    // if (req.query.id == undefined) {
    //     res.send('undefind');
    // }
    let tmp = await findAllFrom("post");
    res.send(tmp);
});

router.get("/post", async (req, res, next) => {
    console.log(req.query.id);
    // if (req.query.id == undefined) {
    //     res.send('undefind');
    // }
    let tmp = await findAllFrom("post");
    res.send(tmp);
});

router.get("/movie", async (req, res, next) => {

    let tmp = await findAllFrom("movie");
    res.send(tmp);
});
router.get("/user", async (req, res, next) => {

    let tmp = await findAllFrom("user");
    res.send(tmp);
});
router.get("/confirmSession", async (req, res, next) => {
    console.log('세션을 확인해보자!!');
    let msg = `세션이 존재하지 않습니다.`
    if (req.session.user) {
        msg = `${req.session.user.email}님의 로그인`;
        console.log(msg)
    } res.send(msg);

});
router.get("/deleteSession", async (req, res, next) => {
    req.session.destroy();
    console.log(`session을 삭제하였습니다.`);
    res.redirect(`/api/confirmSession`);
});

router.get('/addSession', async (req, res) => {
    console.log('루트접속');
    if (req.session.user) {
        console.log(`세션이 이미 존재합니다.`);
        //redirect to homepage!
    }
    else {
        //받은 세션 리퀘스트와 db속에 저장되어 있는 아이디가 일치하는지 검사하고, true or false로 리턴한다.
        const email = req.query.email;
        const pw = req.query.password;
        var isValid = await examineLogin(email, pw);
        console.log("로그인성공여부", isValid)
        if (isValid == true) {
            req.session.user = { "email": email, "password": pw }
            console.log(`세션 저장 완료!`, req.session);
            req.session.save();
        } else {
            console.log("없는 아이디를 저장하려 들다니!")
        }
    } res.redirect(`/api/confirmSession`);
})



async function findAllFrom(input) {
    if (input === "post") {
        const product = await models.post_table.findAll({
        });
        const json = JSON.stringify(product);
        return json
    }
    if (input === "movie") {
        const product = await models.movie_table.findAll({
        });
        const json = JSON.stringify(product);
        return json
    }
    if (input === "user") {
        const product = await models.user_table.findAll({
        });
        const json = JSON.stringify(product);
        return json
    }
}

async function examineLogin(email, pw) {
    const validemail = await models.user_table.findAll({
        raw: true,
        attributes: ['user_name', 'user_birthyear'],
        where: {
            user_email: email,
            user_password: pw
        }
    });
    console.log("valid email is", validemail.length)
    if (validemail.length !== 0) {
        console.log("로그인 성공!")
        return true;
    } else {
        console.log("로그인 실패!")
        return false;
    }

}

module.exports = router;