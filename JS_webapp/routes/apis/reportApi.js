import { sqlAvgNum, summaries, specificTime } from "../../services/summaryService.js";
import { executeQuery } from "../../database/database.js";


const lastweek = async({request}) => {
  request.respond({
    Sleep_duration: sqlAvgNum(await executeQuery("SELECT AVG(sleep_duration) from morning_reports WHERE date >= (DATE(NOW())-7) AND date < DATE(NOW());")),
    Sleep_quality: sqlAvgNum(await executeQuery("SELECT AVG(sleep_quality) from morning_reports WHERE date >= (DATE(NOW())-7) AND date < DATE(NOW());")),
    Mood: sqlAvgNum(await executeQuery("SELECT AVG(mood) from moods WHERE date >= (DATE(NOW())-7) AND date < DATE(NOW());")),
    Studied: sqlAvgNum(await executeQuery("SELECT AVG(time_studied) from evening_reports WHERE date >= (DATE(NOW())-7) AND date < DATE(NOW());")),
    sports: sqlAvgNum(await executeQuery("SELECT AVG(time_sports) from evening_reports WHERE date >= (DATE(NOW())-7) AND date < DATE(NOW());"))
  });
}

export { lastweek };
