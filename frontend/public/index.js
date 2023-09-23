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

auth.onAuthStateChanged((user) => {
  console.log(user);
});

const predict = () => {
  const White_Blood_Cell = document.getElementById("White_Blood_Cell").value;
  const Blood_Urea = document.getElementById("Blood_Urea").value;
  const Blood_Glucose_Random = document.getElementById(
    "Blood_Glucose_Random"
  ).value;
  const Serum_creatine = document.getElementById("Serum_creatine").value;
  const Packed_cell_volume =
    document.getElementById("Packed_cell_volume").value;
  const Albumin = document.getElementById("Albumin").value;
  const Haemoglobin = document.getElementById("Haemoglobin").value;
  const Age = document.getElementById("Age").value;
  const Sugar = document.getElementById("Sugar").value;
  const Hypertension = document.getElementById("Hypertension").value;

  const url = `http://127.0.0.1:5000/prediction?White_Blood_Cell=${White_Blood_Cell}&Blood_Urea=${Blood_Urea}&Blood_Glucose_Random=${Blood_Glucose_Random}&Serum_creatine=${Serum_creatine}&Packed_cell_volume=${Packed_cell_volume}&Albumin=${Albumin}&Haemoglobin=${Haemoglobin}&Age=${Age}&Sugar=${Sugar}&Hypertension=${Hypertension}`;
  fetch(url)
    .then((response) => response.text())
    .then((result) => {
      console.log("Here are your results")
      console.log(result.predicted);
      alert(result);
      if (result.predicted == 1) {
        document.getElementById(
          "result"
        ).innerHTML = `<h1 style="color:green;">Your renal health is good</h1>`;
      } else {
        document.getElementById(
          "result"
        ).innerHTML = `<h1 style="color:red;">Your renal health is bad</h1>`;
      }
    })
    .catch((error) => console.log("error", error));
    console.log("Happy?")
};
