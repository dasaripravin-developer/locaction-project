const axios = require('axios');
const xlsx = require('xlsx');
const async = require('async');
const host = 'http://13.232.37.194'

// Testing of insert pincode api
async function addPincode(pincode) {
  try {
    const response = await axios.post(`${host}/locations`, {
      pincode,
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message,
    );
  }
}

// Testing of get location data based on pincode
async function getLocationDetails(pincode) {
  try {
    const response = await axios.get(
      `${host}/locations/${pincode}`,
    );
    console.log('Response:', response.data);
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message,
    );
  }
}

// Read excel file and call insert location data data for each pincode
async function readExcelFile(filePath) {
  try {
    const fileData = xlsx.readFile(filePath);
    const data = xlsx.utils.sheet_to_json(
      fileData.Sheets[fileData.SheetNames[0]],
    );
    const funArray = data.map((row) => {
      return function (cb) {
        (async() => {
          await addPincode(row.Pincode);

          cb();
        })()
      };
    });
    console.log('length ==> ', funArray.length);

    async function recursive(start, limit) {
      let batch;
      if (funArray.length > limit)
        batch = funArray.splice(start, start + limit);
      else batch = funArray.splice(start, funArray.length - 1);

      await async.parallel(batch);
      console.log(`batch ====> `, batch.length);
      // if (!funArray.length)
      //   setTimeout(() => recursive(start + limit, limit), 2000); // Uncomment this line to insert all pincode locaction data in batch
    }

    recursive(0, 100);
  } catch (err) {
    console.log(`read excel file -Error => ${err.message}`);
  }
}

(async () => {
  await addPincode("110002");
  await getLocationDetails("121003");
  // readExcelFile('../src/data/Pincode.xlsx');
})();
