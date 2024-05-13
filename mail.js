
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



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Store the current editing message's Firebase key
var currentEditingId = null;

// Reference to the 'contactForm' node in Firebase Database
var contactFormDB = firebase.database().ref("contactForm");

// Fetch and display messages
function fetchMessages() {
    contactFormDB.on('value', function(snapshot) {
        document.getElementById('messagesList').innerHTML = '<tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th><th>Actions</th></tr>';
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            document.getElementById('messagesList').innerHTML += `<tr id="${childKey}">
                <td>${childData.name}</td>
                <td>${childData.emailid}</td>
                <td>${childData.msgContent}</td>
                <td>${childData.date}</td>
                <td>
                    <button onclick="deleteMessage('${childKey}')">Delete</button>
                    <button onclick="editMessage('${childKey}', '${childData.name}', '${childData.emailid}', '${childData.msgContent}')">Edit</button>
                </td>
            </tr>`;
        });
    });
}

// Delete a message from Firebase
function deleteMessage(id) {
    contactFormDB.child(id).remove();
}

// Populate form with message data for editing
function editMessage(id, name, email, message) {
    document.getElementById('name').value = name;
    document.getElementById('emailid').value = email;
    document.getElementById('msgContent').value = message;
    var updatedMessage = document.getElementById('date').value;
    currentEditingId = id; // Set current editing ID to enable update functionality
}


// Update an existing message in Firebase
function updateMessage(id) {
    var updatedName = document.getElementById('name').value;
    var updatedEmail = document.getElementById('emailid').value;
    var updatedMessage = document.getElementById('msgContent').value;
    var updatedMessage = document.getElementById('date').value;
    contactFormDB.child(id).update({
        name: updatedName,
        emailid: updatedEmail,
        msgContent: updatedMessage
    });
    clearForm(); // Clear form after update
}


// Clear form fields and reset editing state
function clearForm() {
    document.getElementById("name").value = '';
    document.getElementById("emailid").value = '';
    document.getElementById("msgContent").value = '';
    document.getElementById("date").value = '';
    currentEditingId = null; // Reset to "add new" mode
}


// Handle form submission for new or updated messages
document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault(); // Prevent default form submission

    var name = document.getElementById("name").value;
    var emailid = document.getElementById("emailid").value;
    var msgContent = document.getElementById("msgContent").value;
    var date = document.getElementById("date").value;

    // Check if we're updating an existing message or adding a new one
    if (currentEditingId) {
        updateMessage(currentEditingId, name, emailid, msgContent, date);
    } else {
        saveMessages(name, emailid, msgContent, date);
    }
}

// Save a new message to Firebase
function saveMessages(name, emailid, msgContent, date) {
    var newContactForm = contactFormDB.push();
    newContactForm.set({
        name: name,
        emailid: emailid,
        msgContent: msgContent,
        date: date
    });
}

// Fetch messages initially
fetchMessages();