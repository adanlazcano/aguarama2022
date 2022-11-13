const Client = require("../models/Client.js");

// Get Participants (Clients)

 const getClients = async(req, res) => {
    try {
        const clients = await Client.find({});
        res.status(200).json(clients);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

// Participants register

const saveClient = async(req, res) => {
    try {
        const { nombre, cel } = req.body;
        const newClient = {
            nombre,
            cel
        }
        const client = new Client(newClient);
        await client.save();
        res.status(200).json(client);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

// Get participant per ID
const getClient = async(req, res) => {
    try {
        const client = await Client.findOne({ cel: req.params.cel });
        res.status(200).json(client);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

// Add Star to participant

 const addStar = async(req, res) => {
    try {

        let message = "";
        const id = req.body.id;
        const client = await Client.findById(id);

        if (client.stars === 4 ) {

            const random = Math.floor(100000 + Math.random() * 90000);

            message = `Folio: ${random} para rifa de Smart TV Samsung 43''`;
        }

        if (client.stars === 6) {

            const updateClientSeven = await Client.findByIdAndUpdate(id, { stars: 0 }, { new: true });
            return res.status(200).json({ body: updateClientSeven, message: "Ha ganado un llenado de garrafón gratis!" });

        }
        const updateClient = await Client.findByIdAndUpdate(id, { stars: client.stars + 1 }, { new: true });

        return res.status(200).json({ body: updateClient, message: message });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Remove Star to participant

 const removeStar = async(req, res) => {
    try {
        const id = req.body.id;
        const client = await Client.findById(id);
        const updateClient = await Client.findByIdAndUpdate(id, { stars: client.stars - 1 }, { new: true });

        return res.status(200).json({ body: updateClient, message: "" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Reset Starts to participants
 const resetStars = async(req, res) => {
    try {
        const id = req.body.id;
        const client = await Client.findOneAndUpdate(id, { stars: 0 }, { new: true });

        res.status(200).json(client);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getClients,
    getClient,
    saveClient,
    addStar,
    removeStar,
    resetStars
}