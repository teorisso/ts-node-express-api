import express from 'express';
import * as diaryServices from '../services/diaryServices';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diaryServices.getEntriesWhitoutSensitiveInfo());
});

router.get('/:id', (req, res) => {
    const diary = diaryServices.findById(Number(req.params.id));
    diary ? res.send(diary) : res.sendStatus(404);
});

router.post('/', (req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);
        

        const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry);
    
        res.json(addedDiaryEntry);
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send('An unknown error occurred');
        }
    }
});

export default router;
