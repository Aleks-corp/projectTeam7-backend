import Jimp from 'jimp';

const JimpAvatar = async (avatarPath) => {
  try {
    const avatar = await Jimp.read(avatarPath);
    avatar.resize(250, 250).quality(60).write(avatarPath);
  } catch (err) {
    throw new Error(err);
  }
};
export default JimpAvatar;
