import listings from "@/data/mockListings"; 

export default function handler(req, res) {
  const { id } = req.query;
  const index = listings.findIndex((l) => l.id === parseInt(id));

  if(index === -1) return res.status(404).json({ message: "Not found" });

  if(req.method === "PUT"){
    const { title, description, status } = req.body;
    listings[index] = {
      ...listings[index],
      title: title ?? listings[index].title,
      description: description ?? listings[index].description,
      status: status ?? listings[index].status,
    };
    return res.status(200).json(listings[index]);
  }

  res.status(405).end();
}



