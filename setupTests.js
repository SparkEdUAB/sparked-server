import child_process from "child_process";

beforeAll(async () => {
  await child_process.exec(`${process.env.PWD}/cleanCollections.sh`);
});
