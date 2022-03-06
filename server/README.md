- JWT

Must be the minimal information for create an user, the ID will be the email (if is a real email, this will be unique), the password is stored in the database hashed with crypto-js, and the name is for displaying propose.
User schema {
	email: string, `miguel@debloat.us`
	password: string, `algosupersecreto`
	name: string, `miguel`
}


Movement schema {
	name: string, `Back Squat`
	body: string[], `['quads', 'lower back', 'glutes']`
	class: string, `multijoint`

}

TODOS:

- [ ] Register, Log, Delete
- [ ] Test for auth
