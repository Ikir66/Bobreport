import { Router } from "../deps.js";
import { main, showForm, showLoginForm, authenticate, register, reportPage, report, logout, summaries, specificTime } from "./controllers/controller.js";
import { lastweek } from "./apis/reportApi.js";
const router = new Router();

router.get('/', main);
router.get('/report', reportPage);
router.post('/report', report);
router.get('/summaries', summaries);
router.post('/summaries', specificTime);

router.get('/auth/login', showLoginForm);
router.post('/auth/login', authenticate);
router.get('/auth/register', showForm);
router.post('/auth/register', register);
router.get('/out', logout);


export { router };
