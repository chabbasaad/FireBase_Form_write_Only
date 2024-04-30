
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDU8xlHeNbZP9WkEiPd2IFmpZzDglfsc4s",
    authDomain: "contact-form-a1996.firebaseapp.com",
    databaseURL: "https://contact-form-a1996-default-rtdb.firebaseio.com",
    projectId: "contact-form-a1996",
    storageBucket: "contact-form-a1996.appspot.com",
    messagingSenderId: "83879165136",
    appId: "1:83879165136:web:cda9d3a3b60673582e32d5"
  };



// initialize firebase
  firebase.initializeApp(firebaseConfig);

  // reference your database
  var contactFormDB = firebase.database().ref("contactForm");

  document.getElementById("contactForm").addEventListener("submit", submitForm);

  function submitForm(e) {
    e.preventDefault();


    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");
    var date = getElementVal("date");


    //date = new Date();

    console.log(date);

    saveMessages(name, emailid, msgContent,date);

    //   enable alert
    document.querySelector(".alert").style.display = "block";

    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);

    //   reset the form
    document.getElementById("contactForm").reset();
  }

  const saveMessages = (name, emailid, msgContent,date) => {
    var newContactForm = contactFormDB.push();

    newContactForm.set({
      name: name,
      emailid: emailid,
      msgContent: msgContent,
      date: date
    });
  };

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
