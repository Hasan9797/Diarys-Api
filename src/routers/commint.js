const router = require('express').Router();

const { getByIdCommit, addCommit } = require('../controllers/commint');

const { verify } = require('../middleware/verify');

router.get('/by/:id', getByIdCommit);
router.post('/add/:diaryId', verify, addCommit);

module.exports = router;
