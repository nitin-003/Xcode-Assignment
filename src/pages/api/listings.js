let mockListings = [
  { id: 1, title: 'Honda City 2022', status: 'pending' },
  { id: 2, title: 'Tata Nexon EV', status: 'approved' },
  { id: 3, title: 'Maruti Swift 2021', status: 'rejected' },
];

export function getListings(){
  return mockListings;
}

export function updateListingStatus(id, newStatus){
  const index = mockListings.findIndex((l) => l.id === id);
  if(index !== -1){
    mockListings[index].status = newStatus;
    return mockListings[index];
  }
  return null;
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(mockListings);
  } 
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}



