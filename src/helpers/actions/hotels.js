export const fetchHotelsInfo = async () => {
    const response = await fetch("http://engine.hotellook.com/api/v2/lookup.json?query=yalta&lang=ru&lookFor=both&limit=5");
    return await response.json();
};

export const fetchHotelsPhotoId = async (hotelIds) => {
    const response = await fetch(`https://yasen.hotellook.com/photos/hotel_photos?id=${hotelIds}`);
    return await response.json();
};

export const getHotelsPhoto = async (id) => {
    const response = await fetch(`https://photo.hotellook.com/image_v2/limit/${id}/800/520.auto`);
    return response;
};
