// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWIOHvH9VoVgG7WvEfo3FIX_2LHM9in1I",
  authDomain: "renalfd.firebaseapp.com",
  databaseURL: "https://renalfd-default-rtdb.firebaseio.com",
  projectId: "renalfd",
  storageBucket: "renalfd.appspot.com",
  messagingSenderId: "550250205126",
  appId: "1:550250205126:web:481e4b6757e0574df86cc7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function

function register() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  username = document.getElementById("username").value;

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        username: username,

        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // DOne
      alert("User Created!!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("loginemail").value;
  password = document.getElementById("loginpassword").value;
  console.log(auth.currentUser);
  console.log(email, password);

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;
      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);

      // DOne
      if (user) {
        window.location = "index.html";
        alert("User Logged In!!");
      }
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

auth.onAuthStateChanged((user) => {
  console.log(user);
});
