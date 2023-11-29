const API_ENDPOINT = 'http://skunkworks.ignitesol.com:8000/';

export const getBooksByCategory = async (category) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/books?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const openBookInBrowser = (book) => {
  const preferredFormats = ['text/html', 'text/pdf', 'text/plain'];

  for (const format of preferredFormats) {
    console.log(format)
    if (book.formats[format]) {
      
      // Use window.open or other methods to open the book in a new tab
      window.open(book.formats[format], '_blank');
      return; // Break out of the loop once a format is found
    }
  }

  // If none of the preferred formats are available, display an error alert
  alert('No viewable version available');
};