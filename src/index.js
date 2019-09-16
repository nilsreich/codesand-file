import "./style.css";

let fileHandle;
let butOpenFile = document.getElementById("butOpenFile");
let textArea = document.getElementsByTagName("textarea")[0];
butOpenFile.addEventListener("click", async e => {
  fileHandle = await getFileHandle();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  textArea.value = contents;
});

let savebtn = document.getElementById("save");
savebtn.addEventListener("click", async e => {
  const contents = textArea.value;
  writeFile(fileHandle, contents);
});

function getFileHandle() {
  const handle = window.chooseFileSystemEntries();
  return handle;
}

async function writeFile(fileHandle, contents) {
  // Create a writer
  const writer = await fileHandle.createWriter();
  // Make sure we start with an empty file
  await writer.truncate(0);
  // Write the full length of the contents
  await writer.write(0, contents);
  // Close the file and write the contents to disk
  await writer.close();
}
console.log("test");
