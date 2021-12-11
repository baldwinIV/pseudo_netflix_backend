const express = require("express");
const { json } = require("express/lib/response");
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
router.get("/movie/postings", async (req, res, next) => {
    console.log(req.query.movie_id)
    let tmp = await getAllMoviePost(req.query.movie_id);
    res.send(tmp);
});
router.get("/user", async (req, res, next) => {

    let tmp = await findAllFrom("user");
    res.send(tmp);
});

router.get("/user/postings", async (req, res, next) => {
    console.log(req.query.uid)
    let tmp = await getAllUserPost(req.query.uid);
    res.send(tmp);
});

router.get("/confirmSession", async (req, res, next) => {
    let msg = { "email": "XXXX", "birth": "XXXX" }
    if (req.session.user) {
        console.log("로그인 성공(세션제작성공)")
        msg = req.session.user;
        console.log(msg)
    } res.send(msg);
});
router.get("/deleteSession", async (req, res, next) => {
    req.session.destroy();
    res.send("delete_complete")
    console.log(`session을 삭제하였습니다.`);
    // res.redirect(`/api/confirmSession`);
});


router.post("/register", async (req, res, next) => {
    //(Email, name, sex, birthyear, password) 
    registerID("ksanghun10@asdf.com", "Sexman", "male", "1998", "password123");
    res.send("register_complete")
    console.log(`회원가입이 되었습니다.`);
    // res.redirect(`/api/confirmSession`);
});

router.post("/post/register", async (req, res, next) => {
    console.log("Hello", req.body);
    await registerPost(req.body.post_user_id, req.body.post_description, req.body.post_title, req.body.post_movie_id, req.body.post_imagepath)
    res.send("register_complete")
    // res.redirect(`/api/confirmSession`);
});

router.get('/addSession', async (req, res) => {
    if (req.session.user) {
        console.log(`세션이 이미 존재합니다.`);
        res.send("alreadyloggined");
    }
    else {
        //받은 세션 리퀘스트와 db속에 저장되어 있는 아이디가 일치하는지 검사하고, true or false로 리턴한다.
        const email = req.query.email;
        const pw = req.query.password;
        var isValid = await examineLogin(email, pw);
        console.log("로그인성공여부", isValid)
        if (isValid.success == true) {
            req.session.user = isValid;
            req.session.save();
            console.log(`세션 저장 완료!`, req.session);
            res.send(isValid);
        } else {
            console.log("없는 아이디를 저장하려 들다니!")
            res.send("fail");
        }
    };
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

async function getAllUserPost(user_id) {
    console.log(user_id)
    const userposts = await models.post_table.findAll({
        include: [{
            model: models.user_table,
            where: { user_id: user_id }
        }]
    });
    return userposts;
}

async function getAllMoviePost(movie_id) {
    console.log(movie_id)
    const movieposts = await models.post_table.findAll({
        include: [{
            model: models.movie_table,
            where: { movie_id: movie_id }
        }]
    });
    console.log("-----", JSON.stringify(movieposts))
    return movieposts;
}

async function examineLogin(email, pw) {
    const validemail = await models.user_table.findOne({
        raw: true,
        attributes: ['user_email', 'user_birthyear', 'user_name', 'user_id'],
        where: {
            user_email: email,
            user_password: pw
        }
    });
    console.log("valid email is", validemail.length)
    if (validemail.length !== 0) {
        validemail.success = true;
        console.log("로그인 성공!")
        console.log(validemail.user_id)
    } else {
        validemail.success = false;
        console.log("로그인 실패!")
    }
    return validemail;

}

async function registerID(Email, name, sex, birthyear, password) {
    models.user_table.create({
        user_password: password,
        user_sex: sex,
        user_name: name,
        user_birthyear: birthyear,
        user_email: Email
    })
        .then((result) => {
            console.log("ID save complete: ", result);
        })
        .catch((err) => {
            console.log("save Error: ", err);
        });
}

async function registerPost(user_id, description, title, movie_id, post_imagepath) {
    models.post_table.create({
        post_imagepath: post_imagepath,
        post_user_id: user_id,
        post_title: title,
        post_description: description,
        post_movie_id: movie_id,
        post_viewcount: 0,
        post_recommendation: 0
    })
        .then((result) => {
            console.log("Post save complete: ", result);
        })
        .catch((err) => {
            console.log("save Error: ", err);
        });
}

module.exports = router;