import { PrismaClient } from "@prisma/client";

import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// // Creating users
// /////////////////////////////////////////////

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBH2EuC6SUTpiMKOmmu1jjLfR_WvYU_Nlg",
//   authDomain: "fbla2023-b4b37.firebaseapp.com",
//   projectId: "fbla2023-b4b37",
//   storageBucket: "fbla2023-b4b37.appspot.com",
//   messagingSenderId: "387194083926",
//   appId: "1:387194083926:web:04887a53ab26793fc079f7",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig, "default");
// export const tempApp = initializeApp(firebaseConfig, "tempApp");

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

// for (let i = 0; i < 4; i++) {
//   const email = faker.internet.email();
//   const password =
//     email.split("@")[0] +
//     "0".repeat(Math.max(0, 6 - email.split("@")[0].length));

//   var id;

//   const userCredential = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );
//   const user = userCredential.user;
//   id = user.uid;
//   auth.signOut();

//   const result = await prisma.student.create({
//     data: {
//       id: id,
//       firstName: faker.name.firstName(),
//       middleName: faker.name.middleName(),
//       lastName: faker.name.lastName(),
//     },
//   });
//   console.log(result);
// }

// const result = await prisma.event.deleteMany({});

/////////////////////////////////////////////

// for (let i = 0; i < 10; i++) {
//   let start = faker.date.between(
//     "2023-20-14T00:00:00.000Z",
//     "2023-01-25T00:00:00.000Z"
//   );

//   let end = new Date(start);
//   end.setHours(end.getHours() + randInt(1, 3));

//   const result = await prisma.event.create({
//     data: {
//       start: start,
//       end: end,
//       description: faker.lorem.sentences(2),
//       image: faker.image.imageUrl(640, 480, "people", true),
//       location: `Room: ${faker.address.buildingNumber()}`,
//       title: faker.music.songName(),
//       points: randInt(0, 100),
//       type: ["Sports", "Social", "Band", "Academic"][randInt(0, 3)],
//     },
//   });
//   console.log(result);
// }

const result = await prisma.news.deleteMany({});

for (let i = 0; i < 10; i++) {
  let datetime = faker.date.between(
    "2023-20-14T00:00:00.000Z",
    "2023-01-25T00:00:00.000Z"
  );

  const result = await prisma.news.create({
    data: {
      name: faker.git.commitMessage(),
      description: faker.lorem.sentences(10),
      datetime: datetime,
    },
  });
  console.log(result);
}
