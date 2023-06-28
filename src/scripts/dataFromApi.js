async function getDataFromApi(url) {
  try {
    const response = await fetch(url);
    if (response.status > 399) {
      throw console.error();
    }
    const data = await response.json();
    return data;
  } catch (err) {
    alert("Unable To Fetch Information");
    return null;
  }
}

export default getDataFromApi;
