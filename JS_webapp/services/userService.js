import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { executeQuery } from "../database/database.js";


const register = async({request, response, session, render}) => {
  const body = request.body();
  const params = await body.value;

  const username = params.get('username');
  const password = params.get('password');
  const verification = params.get('verification');


  if (password !== verification) {
    render('register.ejs', { error: 'The entered passwords did not match', username: username });
    return;
  }

  if (password.length < 4) {
    render('register.ejs', { error: 'Password must be at least 4 characters.', username: username });
    return;
  }

  if (username.length < 4) {
    render('register.ejs', { error: 'Username must be at least 4 characters.', username: '' });
    return;
  }

  const existingUsers = await executeQuery("SELECT * FROM users1 WHERE username = $1", username);
  if (existingUsers.rowCount > 0) {
    render('register.ejs', { error: 'The username is already reserved.', username: '' });
    return;
  }

  const hash = await bcrypt.hash(password);
  await executeQuery("INSERT INTO users1 (username, password) VALUES ($1, $2);", username, hash);
  response.redirect('/auth/login');
};

const showLoginForm = ({render}) => {
  render('login.ejs');
}

const authenticate = async({request, response, session, render}) => {
  const body = request.body();
  const params = await body.value;

  const username = params.get('username');
  const password = params.get('password');

  const res = await executeQuery("SELECT * FROM users1 WHERE username = $1;", username);
  if (res.rowCount === 0) {
      render('login.ejs', { error: 'Data you provided was not correct.' });
      return;
  }

  const userObj = res.rowsOfObjects()[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
      render('login.ejs', { error: 'Data you provided was not correct.' });
      return;
  }

  await session.set('authenticated', true);
  await session.set('user', {
      id: userObj.id,
      username: userObj.username
  });
  response.redirect('/report');
}

const logout = async({response, session}) => {
    await session.set('authenticated', false);
    response.redirect('/');
}

export { authenticate, register, logout};
