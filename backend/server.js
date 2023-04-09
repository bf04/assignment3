const app = require('./app');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://user1:4OvWFdoVXBJRK5hI@cluster0.lnx2ugr.mongodb.net/?retryWrites=true&w=majority');

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
