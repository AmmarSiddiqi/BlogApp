import { Profile, validate } from "../models/profile.js";
import { User } from "../models/user.js";
import asyncMiddleware from "../middleware/async.js";
import { fileSizeFormatter } from "../helpers/fileData.js";
import _ from "lodash";

const getProfile = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  // const id = req.user.id;
  if (id) {
    const profile = await Profile.findOne({ _id: id }).populate(
      "user",
      "name email -_id"
    );
    if (!profile) return res.status(400).send("Invalid User");
    res.status(200).send(profile);
  }
});

const addProfile = asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User");

  const file = {
    fileName: req.file.filename,
    filePath: req.file.path,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2),
  };

  const { phone, status } = req.body;

  let profile = new Profile({
    phone,
    status,
    user: req.body.userId,
    file,
  });

  profile = await profile.save();
  res.status(200).send(_.pick(profile, ["phone", "status", "user", "file"]));
});

const updateProfile = asyncMiddleware(async (req, res) => {
  const { phone, status } = req.body;
  const file = {
    fileName: req.file.filename,
    filePath: req.file.path,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2),
  };
  const profile = await Profile.findByIdAndUpdate(
    req.params.id,
    { phone, status, file },
    { new: true }
  );
  if (!profile) return res.status(400).send("Invalid ID");
  return res.status(200).send(profile);
});

const deleteProfile = asyncMiddleware(async (req, res) => {
  const profile = await Profile.findByIdAndDelete(req.params.id);
  if (!profile) return res.status(400).send("Invalid ID");
  return res.status(400).send(profile);
});

export { getProfile, addProfile, updateProfile, deleteProfile };
