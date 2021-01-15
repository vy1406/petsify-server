const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

passport.serializeUser(function(user, done) {
	/*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
	//  done(null, user.id)
	console.log('?');
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	/*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
	/*
		User.findById(id, function(err, user) {
			done(err, user)
		});
	*/
	console.log('findById');
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL
		},
		function(accessToken, refreshToken, profile, done) {
			/*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
			/* for example
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return done(err, user);
			})
		*/
			console.log('findOrCreate');
			return done(null, profile);
		}
	)
);
