import { Request, Response } from 'express';
import { bodyValidator, controller, get, post } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
    	<form method="post">
    		<div>
    			<label>Email</label>
    			<input name="email">
			</div>
			<div>
    			<label>Password</label>
    			<input name="password">
			</div>
			<button type="submit">Login</button>
		</form>
	`);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (email == 'hi@hi.com' && password == '123abc') {
      req.session = { loggedIn: true };
      res.redirect('/');
    }

    res.send('invalid email or password');
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    if (req.session) req.session = null;
    res.redirect('/');
  }
}
