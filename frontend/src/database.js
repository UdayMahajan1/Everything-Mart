import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { database } from './firebase'

const shopkeeperCollection = collection(database, 'shopkeepers')

export const addShopkeeper = async (name, email) => { 
  return addDoc(shopkeeperCollection, {Name: name, Email: email})  
}

export const getShopkeeperName = async (email) => {

  const q = query(shopkeeperCollection, where('Email', '==', email));
  try {
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const name = querySnapshot.docs[0].data().Name;
      return name;
    } else {
      console.log('No user found with the given email');
    }
  } catch (err) {
    console.log(err);
  }

};
