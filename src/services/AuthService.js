import axios from "axios";

const signIn = async (username, password) => {
  let signInResult = await axios
    .post("login/", {
      username,
      password,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));

  if (signInResult) {
    return { username, password };
  } else {
    return false;
  }
};

// async function reserveChargingLocation(id) {
//   fetch("endpoint/", {
//     method: "POST",
//     baseUrl,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       locationId: id,
//     }),
//   });
// }

export const authService = {
  signIn,
};
