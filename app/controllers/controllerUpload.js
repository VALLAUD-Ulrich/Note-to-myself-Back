const path = require('path');

const controllerUpload = {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */

  uploadImage: (req, res) => {
    const public = path.join(__dirname, '..', '..', 'public', 'uploads');
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;
    const split = file.name.split('.');
    const fileExtension = split[split.length - 1];
    const fileName = file.name.replace(/\W+/, '');
    const fileNameBis = fileName.replace(/[.].*$/, '');
    const newfileName = `${fileNameBis}-${Date.now()}.${fileExtension}`;

    file.mv(`${public}/${newfileName}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.status(200).json({
        fileName: newfileName,
        filePath: `/uploads/${newfileName}`,

      });
    });
  },
};

module.exports = controllerUpload;
