import Jimp from "jimp";

const JimpAvatar = async Path => {
  try {
    const avatar = await Jimp.read(Path);
    avatar.resize(400, 400).quality(80).write(Path);
  } catch (err) {
    throw new Error(err);
  }
};
export default JimpAvatar;
