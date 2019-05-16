import child_process from "child_process";

afterAll(async () => {
  console.log("cleaning the db");
  await child_process.exec(`${process.env.PWD}/cleanCollections.sh`);
});
