const express = require('express');
const router = express.Router();
router.use(express.json());

let db = new Map();
let dbIndex = 1;

//전체 조회, 개별 생성
router
    .route('/')
    .get((req, res) => {
        let { userId } = req.body;
        let posts = [];
        if (db.size && userId) {
            db.forEach((v, k) => {
                if (v.userId === userId) posts.push(v);
            });

            if (posts.length) {
                res.status(200).json(posts);
            } else {
                notFoundpost(res);
            }
        } else {
            notFoundpost(res);
        }
    })
    .post((req, res) => {
        if (req.body.postTitle) {
            let post = req.body;
            db.set(dbIndex++, post);

            res.status(201).json({
                message: `${post.postTitle} 게시글을 생성하였습니다.`,
            });
        } else {
            res.status(400).json({
                message: '요청 값을 제대로 보내주세요',
            });
        }
    });

//개별 조회, 개별 수정, 개별 삭제
router
    .route('/:id')
    .get((req, res) => {
        let { id } = req.params;
        id = parseInt(id);

        let post = db.get(id);
        if (post) {
            res.status(200).json(post);
        } else {
            notFoundpost(res);
        }
    })
    .put((req, res) => {
        let { id } = req.params;
        id = parseInt(id);

        let post = db.get(id);
        let oldTitle = post.postTitle;
        if (post) {
            let newTitle = req.body.postTitle;

            post.postTitle = newTitle;
            db.set(id, post);

            res.json({ message: `게시글이 정상적으로 수정되었습니다. 기존 ${oldTitle} -> 수정 ${newTitle}` });
        } else {
            notFoundpost(res);
        }
    })
    .delete((req, res) => {
        let { id } = req.params;
        id = parseInt(id);

        let post = db.get(id);
        if (post) {
            db.delete(id);

            res.status(200).json({ message: `${post.postTitle}이 정상적으로 삭제되었습니다.` });
        } else {
            notFoundpost(res);
        }
    });

function notFoundpost(res) {
    res.status(404).json({ message: '게시글 정보를 찾을 수 없습니다.' });
}

module.exports = router;
