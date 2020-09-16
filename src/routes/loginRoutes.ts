import { NextFunction, Router } from "express";
import { Request, Response } from "express";

interface ReqBody extends Request {
	body: { [key: string]: string | undefined };
}

function AuthGuard(req: Request, res: Response, next: NextFunction) {
	if (req.session && req.session.loggedIn) {
		next();
		return;
	} else {
		res.status(403);
		res.send('Not permitted');
	}
}

const router = Router();

router.get("/login", (req: Request, res: Response) => {
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
});

router.post('/login', (req: ReqBody, res: Response) => {
	const { email, password } = req.body;

	if (email && password && email == 'hi@hi.com' && password == '123abc') {
		req.session = { loggedIn: true };
		res.redirect('/');
	}

	res.send('invalid email or password');
});

router.get('/', (req: Request, res: Response) => {
	if (req.session && req.session.loggedIn) {
		res.send(`
			<div>
				<div>You are logged in</div>
				<a href="/logout">Logout</a>
			</div>
		`)
	} else {
		res.send(`
			<div>
				<div>You are not logged in</div>
				<a href="/login">Login</a>
			</div>
		`)
	}
});

router.get('/logout', (req: Request, res: Response) => {
	if (req.session) req.session = null;
	res.redirect('/');
})

router.get('/protected', AuthGuard, (req: Request, res: Response) => {
	res.send('Welcome to pretected route, User!')
});

export { router };
