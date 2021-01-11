import { executeQuery } from "../database/database.js";
import { sqlAvgNum } from "./summaryService.js";

const report = async({request, response, session, render}) => {

  const body = request.body();
  const params = await body.value;

  const data = {
    username: (await session.get('user')).username,
    date: params.get('date'),
    sleepD: params.get('sleepD'),
    sleepQ: params.get('sleepQ'),
    mood: params.get('mood'),
    studies: params.get('studies'),
    sports: params.get('sports'),
    eating: params.get('eating'),
    userId: (await session.get('user')).id,
    error: ''
  }

  if (data.sleepD && data.sleepQ && data.mood && data.date) {
    const res = await executeQuery("SELECT * from morning_reports WHERE date = $1 AND user_id = $2;", data.date, data.userId )
    if (res.rowCount === 0) {
      await executeQuery("INSERT INTO morning_reports (sleep_duration, sleep_quality, user_id, date) VALUES ($1, $2, $3, $4);",data.sleepD, data.sleepQ, data.userId, data.date )
      await executeQuery("INSERT INTO moods (mood, user_id, date) VALUES ($1, $2, $3);",data.mood, data.userId, data.date )
      response.redirect('/report');
    } else {
      render('cheaters.ejs', { daytime: 'morning' });
    }
  }
  else if (data.studies && data.sports && data.eating && data.mood && data.date) {
    const res = await executeQuery("SELECT * from evening_reports WHERE date = $1 AND user_id = $2;", data.date, data.userId )
    if (res.rowCount === 0) {
      await executeQuery("INSERT INTO evening_reports (time_sports, time_studied, eating, user_id, date) VALUES ($1, $2, $3, $4, $5);",data.sports, data.studies, data.eating, data.userId, data.date )
      await executeQuery("INSERT INTO moods (mood, user_id, date) VALUES ($1, $2, $3);",data.mood, data.userId, data.date )
      response.redirect('/report');
    } else {
      render('cheaters.ejs', { daytime: 'evening' });
    }
  }
  else {
    data.error = 'Please fill in all the required fields.'
    render('report.ejs', data)
  }
}


const avgMoods = async() => {
  const data = {
    today: '',
    yesterday: ''
  }
  data.today = sqlAvgNum(await executeQuery("SELECT AVG(mood) from moods WHERE date = DATE(NOW());"));
  data.yesterday = sqlAvgNum(await executeQuery("SELECT AVG(mood) from moods WHERE date = (DATE(NOW())-1);"));
  return data;
}



export { report, avgMoods };
