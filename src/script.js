const modalWrapper = document.querySelector(".modal-wrapper");

//modal Add

const addModal = document.querySelector(".add-modal");

const addModalForm = document.querySelector(".add-modal .form");

//modal edit

const editModal = document.querySelector(".edit-modal");

const editModalForm = document.querySelector(".edit-modal .form");

const btnAdd = document.querySelector(".btn-add");

const tableUsers = document.querySelector(".table-users");

const renderUser = (doc) => {
  const tr = `
      <tr data-id=${doc.id}>
        <td>${doc.data().firstName}</td>
        <td>${doc.data().lastName}</td>
        <td>${doc.data().phone}</td>
        <td>${doc.data().email}</td>
        <td>
          <button class="btn btn-edit">Edit</button>
          <button class="btn btn-delete">Delete</button>
        </td>
      </tr>  
    `;
  tableUsers.insertAdjacentHTML("beforeend", tr);

  //Edit user

  const btnEdit = document.querySelector(`[data-id= '${doc.id}'] .btn-edit`);

  btnEdit.addEventListener("click", () => {
    editModal.classList.add("modal-show");
  });

  //Delete user
  const btnDelete = document.querySelector(
    `[data-id= '${doc.id}'] .btn-delete`
  );
  btnDelete.addEventListener("click", () => {
    db.collection("users")
      .doc(`${doc.id}`)
      .delete()
      .then(() => {
        console.log("Document successfully");
      })
      .catch((error) => console.log("Error removing document ", error));
  });
};

btnAdd.addEventListener("click", () => {
  addModal.classList.add("modal-show");
});

window.addEventListener("click", (e) => {
  if (e.target === addModal) {
    addModal.classList.remove("modal-show");
  }
});

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMxqmcoJEP0MrdJyTRIKjwMQ8IwDWqo6c",
  authDomain: "crud-js-1a558.firebaseapp.com",
  projectId: "crud-js-1a558",
  storageBucket: "crud-js-1a558.appspot.com",
  messagingSenderId: "811135139234",
  appId: "1:811135139234:web:c371c388f62371ebb3c6fb",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.collection("users")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      renderUser(doc);
    });
  });

addModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("users").add({
    firstName: addModalForm.firstName.value,
    lastName: addModalForm.lastName.value,
    phone: addModalForm.phone.value,
    email: addModalForm.email.value,
  });
  modalWrapper.classList.remove("modal-show");
});
