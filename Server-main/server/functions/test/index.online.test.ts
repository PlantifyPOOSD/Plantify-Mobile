import axios from 'axios';
import 'jest';

const url = "https://us-central1-plantify-d36ed.cloudfunctions.net/server"
const userId = "PaSecnXnKjScaoDnbhRWvETDkck2"
const plantId = "G1BacUAEDi1Qn1JTlDBF"

describe('User API', () => {
  it('registers a new user', async () => {
    const response = await axios.post(url + "/registerUser", {
        firstName: 'John312',
        lastName: 'Doe132',
        email: 'johndoe132@example.com',
        username: 'johndoe1212',
        password: 'password12132',
    });

    expect(response.status).toBe(200);
    expect(response.data.message).toBe('User registered successfully');
  });
  
  it('Updates existing user', async () => {
    const response = await axios.post(url + "/update_user", {
        userId: userId, 
        firstName : "Nick",
        lastName : "Gonzalez",
        username : "nike1052", 
        bio : "Test"
    });

    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Successfully updated');
  });

  it('Get existing user data', async () => {
    const response = await axios.post(url + "/get_user_data", {
        userId: userId, 
    });

    expect(response.status).toBe(200);
    expect(response.data.user).toEqual({
        userId: "PaSecnXnKjScaoDnbhRWvETDkck2",
        username: "nike1052",
        firstName: "Nick",
        lastName: "Gonzalez",
        bio: "Test",
        pfp_url: "users/PaSecnXnKjScaoDnbhRWvETDkck2/profilePic/PaSecnXnKjScaoDnbhRWvETDkck2.jpg"
    });
  });
});

describe('Plant API', () => {
    it('Adds new plant to user', async () => {
      const response = await axios.post(url + "/add_plant", {
        plantname: "testplant", 
        species: "silver", 
        description: "some silver plant", 
        userId: userId
        })

        expect(response.status).toBe(200);
        expect(response.data.message).toBe('Successfully added plant');
    });

    it('Browses users plants', async () => {
        const response = await axios.post(url + "/browsePlants", {
          userId: userId
          })
  
          expect(response.status).toBe(200);
    });
    
    it('edit users plants', async () => {
        const response = await axios.put(url + "/edit_plant", {
          userId: userId,
          plantId: plantId,
          description: "test"
          })
  
          expect(response.status).toBe(200);
          expect(response.data.message).toBe('Successfully updated');
    });
});