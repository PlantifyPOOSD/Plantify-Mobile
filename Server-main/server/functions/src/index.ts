import * as functions from "firebase-functions"
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'
import axios from 'axios'
import * as moment from 'moment-timezone'


admin.initializeApp()
const db = admin.firestore()
const app = express()
app.use(cors({origin: true}))
const bucket = admin.storage().bucket("gs://plantify-d36ed.appspot.com/")

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

/* =================================
   =========== User APIs============ 
   ================================= */

// Create: Working properly
app.post('/registerUser', async(request, response) => {

  const {firstName, lastName, email, username, password} = request.body

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: username
    })

    await db.collection('users').doc(userRecord.uid).set({
      firstName,
      lastName,
      username,
      userId: userRecord.uid
    })

    response.json({token: userRecord, message: 'User registered successfully'})
  }
  catch(error){
    response.status(500).json({message: "Unable to register user", error })
  }
});

// STATUS: Working properly
app.post('/update_user', async (request, response) => {
  
    const {userId, firstName, lastName, username, bio} = request.body
  
    try {
      const userRef = db.collection('users').doc(userId)
  
      await userRef.update({
        firstName,
        lastName,
        username,
        bio
      })

      response.json({message: "Successfully updated"})
    }
    catch(error) {
      response.status(500).json({message: "Could not update", error})
    }
});

// Trigger: Needs to be reworked
app.post('/add_profile_pic', async(request, response) => {

  const {userId} = request.body

  try{
  
    const userRef = db.collection('users').doc(userId)
    
    if(!userRef)
      response.status(404).json({message : "Error, could not find user"})

    
    const pfp = (await userRef.get()).get('pfp_url')

    if(pfp) {
      
      const file = bucket.file(pfp)
      const file_exist = await file.exists()

      if(file_exist[0]) {
        file.delete()
        response.status(200).json({message : "Old was deleted and it is ready for a new pfp",pfp_url : pfp})

      }
      response.status(200).json({message : "Old pfp could not be found but it is ready for upload",pfp_url : pfp})
    }
    else {

      const pfp_url = `users/${userId}/profilePic/${userId}.jpg`
      userRef.update({
        pfp_url
      })

      response.status(200).json({message: "Successfully created pfp url", pfp_url})
    }
  }

  catch (error) {
    response.status(500).json({message : "Error adding/updating pfp", error})
  }
})

app.post('/get_user_data', async(request, response) => {

  const {userId} = request.body

  if(!userId){
    response.status(400).json({message: 'uid is empty'})
    return
  }
  try {
    if(userId) {
      const searchResult = await db.collection('users').doc(userId)
      const user = (await searchResult.get()).data()
      response.json({user})
    }
  }
  catch (error) {
    response.status(500).json({Message : "Couldn't retrieve user data" , error})
  }
})

/* =================================
   =========== PLANT APIs=========== 
   ================================= */

// CREATE: Working properly
app.post('/add_plant', async (request, response) => {
  const { plantname, species, description, userId } = request.body;
  const timezone = 'America/New York';
  const dateWatered = moment.tz(timezone);
  const daysBetweenWatering = await daysToWater(species);
  const nextWateringDate = dateWatered.clone().add(daysBetweenWatering, "d");

  try {
    const plantRef = await db.collection('users').doc(userId).collection('plants').add({ plantname, species, description, userId, 
      dateWatered, nextWateringDate, daysBetweenWatering });
    const plantUrl = `users/${userId}/plants/${plantRef.id}.jpg`;
    await plantRef.update({ plant_url: plantUrl });
    
    response.status(200).json({ message: "Successfully added plant", plantUrl });
  }
  catch (error) {
    response.status(500).json({ message: "Could not add plant", error });
  }
});

// READ: Working properly
app.post('/browsePlants', async(request, response) => {

  const {userId} = request.body

  try {
    const userRef = await db.collection('users').doc(userId).get()
    
    if(!userRef) {
      response.status(404).json("message: User not found")
      return
    }

    const plantsRef = await db.collection('users').doc(userId).collection('plants').get()

    const plants = plantsRef.docs.map(doc => ({plantId: doc.id, plantData: doc.data()}))

    response.status(200).json({plants})
  } 
  catch (error) {
    response.status(500).json({Message: "Error retrieving plants", error})
  }

});

//UPDATE: Working properly
app.put('/edit_plant', async (request, response) => {
  const { plantId, plantname, species, description, dateWatered, userId, changingPhoto } = request.body;

  try {
    const plantRef = db.collection('users').doc(userId).collection('plants').doc(plantId);
    const updateData: Record<string, any> = {}

    if (plantname !== undefined && plantname !== "") {
      updateData.plantname = plantname;
    }
    if (species !== undefined && species !== "") {
      updateData.species = species;
    }
    if (description !== undefined && description !== "") {
      updateData.description = description;
    }
    if (dateWatered !== undefined && dateWatered !== "") {
      updateData.dateWatered = moment.tz(dateWatered, 'America/New_York');
      const plantDoc = await plantRef.get();
      console.log(plantDoc.data()?.daysBetweenWatering);
      updateData.nextWateringDate = moment.tz(dateWatered, 'America/New_York').clone().add((plantDoc.data()?.daysBetweenWatering), "d");
    }

    
    if (Object.keys(updateData).length > 0) {
      await plantRef.update(updateData);
    }

    if(changingPhoto) {
      const plantPhoto = bucket.file(`/users/${userId}/plants/${plantId}.jpg`);
      await plantPhoto.delete();
      response.status(200).json({message: "Successfully updated and photo deleted"});
    } else {
      response.status(200).json({message: "Successfully updated"});
    }

  }
  catch (error) {
    response.status(500).json({message: "Could not edit plant", error});
  }
});

// DELETE: Working properly.
app.delete('/del_plant', async (request, response) => {
  const {userId, plantId} = request.body

  try {
    const plantRef = db.collection('users').doc(userId).collection('plants').doc(plantId);
    const plantImageRef = bucket.file(`users/${userId}/plants/${plantRef.id}.jpg`)
    await plantRef.delete()
    await plantImageRef.delete();
    response.json({message: "Successfully deleted"})
  }
  catch(error) {
    response.json({message: "Could not delete", error})
  }
});

// Search external database for plant information
app.get('/search_plant/:plantQuery', async (request, response) => {
  // Search parameter must be passed in request URL
  const plantQuery = request.params.plantQuery;
  console.log(plantQuery);
  try {
    const res = await axios.get(`https://perenual.com/api/species-list?key=sk-QXa664054217e32a3108&q=${plantQuery}`);
    const json = res.data;
    const plant = json.data[0];
    const plantInfo = {
      plantId: plant.id,
      plantName: plant.common_name,
      scientificName: plant.scientific_name[0],
      plantCycle: plant.cycle,
      water: plant.watering,
      sunlight: plant.sunlight
    }

    response.status(200).json({plantInfo});
  }
  catch(error) {
    response.status(500).json({message: "Could not find plant species", error});
  }
});


/* =================================
   =========== OTHER APIs=========== 
   ================================= */


app.post('/search_users_or_plants', async(request, response) => {

  const {query, userId} = request.body

  if(!query){
    response.status(400).json({message: 'Search query is empty'})
    return
  }

  try {

    let searchResult = null

    
    searchResult = await Promise.all([
    db.collection('users').where('username', '>=', query).where('username', '<=', query + '\uf8ff').get(),
    db.collection(`users/${userId}/plants`).where('plantname', '>=', query).where('plantname', '<=', query + '\uf8ff').get(),
    db.collection(`users/${userId}/plants`).where('species', '>=', query).where('species', '<=', query + '\uf8ff').get(),
    ])

    let usersQuery = new Map()
    let plantsQuery = new Map()
    
    searchResult[0].docs.forEach((doc) => usersQuery.set(doc.id, doc.data()))
    searchResult[1].docs.forEach((doc) => plantsQuery.set(doc.id, doc.data()))
    searchResult[2].docs.forEach((doc) => plantsQuery.set(doc.id, doc.data()))

    const users = Array.from(usersQuery.values());
    const plants = Array.from(plantsQuery.values());

    response.json({users, plants})
  }
  catch(error) {
    response.status(500).json({message: "Error querying for users or plant species/name", error})
  }
});


/* =================================
   =========== FUNCTIONS =========== 
   ================================= */

async function daysToWater(species: string) {
  const res = await axios.get(`https://perenual.com/api/species-list?key=sk-QXa664054217e32a3108&q=${species}`);
  const json = res.data;
  const plant = json.data[0];
  const wateringFrequency = plant.watering;
  var daysBetween;
  if (wateringFrequency == "Frequent") {
    daysBetween = 3;
  }
  else if (wateringFrequency == "Minimal" || wateringFrequency == "Minimum") {
    daysBetween = 30;
  }
  else {
    daysBetween = 7;
  }
  return daysBetween;
}

export const server = functions.https.onRequest(app)