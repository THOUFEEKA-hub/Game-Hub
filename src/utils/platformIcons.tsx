import type { ReactNode } from 'react';
import {
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from 'react-icons/fa';
import { MdPhoneIphone } from 'react-icons/md';

const iconStyles = { opacity: 0.9 };

export const platformIconMap: Record<string, ReactNode> = {
  pc: <FaWindows style={iconStyles} />,
  playstation: <FaPlaystation style={iconStyles} />,
  xbox: <FaXbox style={iconStyles} />,
  ios: <MdPhoneIphone style={iconStyles} />,
  android: <FaAndroid style={iconStyles} />,
  mac: <FaApple style={iconStyles} />,
  macintosh: <FaApple style={iconStyles} />,
  linux: <FaLinux style={iconStyles} />,
};
