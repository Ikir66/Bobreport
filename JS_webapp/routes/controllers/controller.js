import { report, avgMoods } from "../../services/reportService.js";
import { register, authenticate, logout} from "../../services/userService.js";
import { sqlAvgNum, summaries, specificTime } from "../../services/summaryService.js";
import { executeQuery } from "../../database/database.js";

const main = async({render, response, session}) => {
  if(await session.get('authenticated') == true) {
      response.redirect('/report')
  } else {
    render('root.ejs', await avgMoods())
  }
}

const reportPage = async({render, session, response}) => {
  if(await session.get('authenticated') == true) {
    var utc = new Date().toJSON().slice(0,10)
    const data = {
      username: (await session.get('user')).username,
      date: utc,
      sleepD: '',
      sleepQ: '',
      mood: '',
      studies: '',
      sports: '',
      eating: '',
      userId: '',
      error: ''
    }
    render('report.ejs', data);
  } else {
    response.redirect('/')
  }
}

const showForm = async({render}) => {
  render('register.ejs', {error: '', username: '' });
};

const showLoginForm = ({render}) => {
  render('login.ejs', { error: '' });
}


export { main, showForm, showLoginForm, register, authenticate, reportPage, report, logout, summaries, specificTime };
