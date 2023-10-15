const router = require('express').Router();

const {
	getAll,
	addDiary,
	getById,
	updateDiary,
	deleteDiary,
} = require('../controllers/diary');
const { verify } = require('../middleware/verify');
const { upload } = require('../middleware/fileUpload');
router.get('/', verify, getAll);
router.get('/by/:id', verify, getById);
router.post('/add', verify, upload.single('img'), addDiary);
router.put('/update/:diaryId', verify, updateDiary);
router.delete('/delete/:id', verify, deleteDiary);

module.exports = router;
