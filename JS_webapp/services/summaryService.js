import { executeQuery } from "../database/database.js";

const sqlAvgNum = (a) => {
  return Math.round(((Number((((a)).rowsOfObjects())[0].avg)) + Number.EPSILON) * 10) / 10;
}

const summaries = async({render, session, response}) => {
  if(await session.get('authenticated') == true) {
    const userId = (await session.get('user')).id;
    const data = {
      sleepDWeek: sqlAvgNum(await executeQuery("SELECT AVG(sleep_duration) from morning_reports WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      sleepQWeek: sqlAvgNum(await executeQuery("SELECT AVG(sleep_quality) from morning_reports WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      moodWeek: sqlAvgNum(await executeQuery("SELECT AVG(mood) from moods WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      studiesWeek: sqlAvgNum(await executeQuery("SELECT AVG(time_studied) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      sportsWeek: sqlAvgNum(await executeQuery("SELECT AVG(time_sports) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      eatingWeek: sqlAvgNum(await executeQuery("SELECT AVG(eating) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      sleepDMonth: sqlAvgNum(await executeQuery("SELECT AVG(sleep_duration) from morning_reports WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      sleepQMonth: sqlAvgNum(await executeQuery("SELECT AVG(sleep_quality) from morning_reports WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      moodMonth: sqlAvgNum(await executeQuery("SELECT AVG(mood) from moods WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      studiesMonth: sqlAvgNum(await executeQuery("SELECT AVG(time_studied) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      sportsMonth: sqlAvgNum(await executeQuery("SELECT AVG(time_sports) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      eatingMonth: sqlAvgNum(await executeQuery("SELECT AVG(eating) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      sleepD: '',
      sleepQ: '',
      mood: '',
      studies: '',
      sports: '',
      eat: ''
    }
    render('summary.ejs', data);
  } else {
    response.redirect('/')
  }
}

const specificTime = async({render, session, response, request}) => {
  if(await session.get('authenticated') == true) {
    const body = request.body();
    const params = await body.value;
    const userId = (await session.get('user')).id;
    const startDate = params.get('startdate');
    const endDate = params.get('enddate');
    if (startDate && endDate) {
    const data = {
      sleepDWeek: sqlAvgNum(await executeQuery("SELECT AVG(sleep_duration) from morning_reports WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      sleepQWeek: sqlAvgNum(await executeQuery("SELECT AVG(sleep_quality) from morning_reports WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      moodWeek: sqlAvgNum(await executeQuery("SELECT AVG(mood) from moods WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      studiesWeek: sqlAvgNum(await executeQuery("SELECT AVG(time_studied) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      sportsWeek: sqlAvgNum(await executeQuery("SELECT AVG(time_sports) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      eatingWeek: sqlAvgNum(await executeQuery("SELECT AVG(eating) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-7) AND date < DATE(NOW());", userId)),
      sleepDMonth: sqlAvgNum(await executeQuery("SELECT AVG(sleep_duration) from morning_reports WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      sleepQMonth: sqlAvgNum(await executeQuery("SELECT AVG(sleep_quality) from morning_reports WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      moodMonth: sqlAvgNum(await executeQuery("SELECT AVG(mood) from moods WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      studiesMonth: sqlAvgNum(await executeQuery("SELECT AVG(time_studied) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      sportsMonth: sqlAvgNum(await executeQuery("SELECT AVG(time_sports) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      eatingMonth: sqlAvgNum(await executeQuery("SELECT AVG(eating) from evening_reports WHERE user_id = $1 AND date >= (DATE(NOW())-30) AND date < DATE(NOW());", userId)),
      sleepD: sqlAvgNum(await executeQuery("SELECT AVG(sleep_duration) from morning_reports WHERE user_id = $1 AND date >= $2 AND date <= $3;", userId, startDate, endDate)),
      sleepQ: sqlAvgNum(await executeQuery("SELECT AVG(sleep_quality) from morning_reports WHERE user_id = $1 AND date >= $2 AND date <= $3;", userId, startDate, endDate)),
      mood: sqlAvgNum(await executeQuery("SELECT AVG(mood) from moods WHERE user_id = $1 AND date >= $2 AND date <= $3;", userId, startDate, endDate)),
      studies: sqlAvgNum(await executeQuery("SELECT AVG(time_studied) from evening_reports WHERE user_id = $1 AND date >= $2 AND date <= $3;", userId, startDate, endDate)),
      sports: sqlAvgNum(await executeQuery("SELECT AVG(time_sports) from evening_reports WHERE user_id = $1 AND date >= $2 AND date <= $3;", userId, startDate, endDate)),
      eat: sqlAvgNum(await executeQuery("SELECT AVG(eating) from evening_reports WHERE user_id = $1 AND date >= $2 AND date <= $3;", userId, startDate, endDate)),
      start: startDate,
      end: endDate
    }
    render('summary.ejs', data);
  } else{
    response.redirect('/summaries')
  }
  } else {
    response.redirect('/')
  }
}

export { sqlAvgNum, summaries, specificTime };
