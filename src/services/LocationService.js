import axios from "axios";

async function getAllAvailableChargingUnits() {
  return axios.get("charging-units/available/").then((response) => {
    data = response.data;
    const returnData = data.map((elem) => {
      let location = elem.location.replace(/'/g, '"');
      const loc = JSON.parse(location);
      return { ...elem, ...loc };
    });

    console.log("DEBUG returnData,", returnData);
    return returnData;
  });
}

async function reserveChargingLocation(id) {
  fetch("endpoint/", {
    method: "POST",
    baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationId: id,
    }),
  });
}

export { getAllAvailableChargingUnits, reserveChargingLocation };
