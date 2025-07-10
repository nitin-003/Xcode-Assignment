import { getListings } from '../../listings';

export default function handler(req, res){
  if(req.method === 'POST'){
    const { id } = req.query;
    const { title, status } = req.body;

    const listings = getListings();
    const index = listings.findIndex((l) => l.id === parseInt(id));

    if(index === -1){
      return res.status(404).json({ message: 'Listing not found' });
    }

    listings[index].title = title;
    listings[index].status = status;

    return res.status(200).json(listings[index]);
  } 
  else{
    res.status(405).json({ message: 'Method not allowed' });
  }
}




