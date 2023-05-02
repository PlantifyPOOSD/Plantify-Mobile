import { getStorage, ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';

export async function getUserImages(userId) {
  const storage = getStorage();
  const folderPath = `users/${userId}/plants`;
  const folderRef = ref(storage, folderPath); 
  const imageUrls = [];

  const pinSizes = ['small', 'medium', 'large'];

  const { items } = await listAll(folderRef);
  for (const item of items) {
    const url = await getDownloadURL(item);
    const metadata = await getMetadata(item);
    const otherMetadata = metadata.customMetadata;

    imageUrls.push({
        id: item.name,
        pinSize: otherMetadata.pinSize || 'medium',
        img: url,
        plantName: otherMetadata.plantName,
        species: otherMetadata.species,
        description: otherMetadata.description,
        lastWatered: otherMetadata.lastWatered ? new Date(otherMetadata.lastWatered) : null,
        // Add other metadata fields here
        
    });
  }
  return imageUrls;
}
