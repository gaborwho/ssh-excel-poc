'use strict';

const config = { host: 'localhost', port: 2222, username: 'user', password: 'pass' };
const SFTPClient = require('sftp-promises');
const sftp = new SFTPClient(config);
     
sftp.getStream('/share/file.txt', process.stdout)
  .then(success => console.log('success:', success))
  .catch(e => console.log(e));

