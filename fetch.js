'use strict';

const config = { host: 'localhost', port: 2222, username: 'user', password: 'pass' };
const SFTPClient = require('sftp-promises');
const sftp = new SFTPClient(config);

const streamBuffers = require('stream-buffers');
const XLSX = require('xlsx');

const bufferStream = new streamBuffers.WritableStreamBuffer();

sftp.getStream('/share/file.xlsx', bufferStream)
  .then(success => {
    const buffer = bufferStream.getContents();
    const workbook = XLSX.read(bufferToString(buffer), { type: 'binary' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const sheetValues = XLSX.utils.sheet_to_json(worksheet);
    console.log(JSON.stringify(sheetValues, null, 2));
  })
  .catch(e => console.log(e));

const bufferToString = function(buffer) {
  const arr = new Array();
  for (var i = 0; i != buffer.length; ++i) {
    arr[i] = String.fromCharCode(buffer[i]);
  }
  return arr.join("");
}

