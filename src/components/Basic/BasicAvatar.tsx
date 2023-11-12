import { Avatar } from "@mui/material";
import { FC } from "react";
import { CSS } from "styled-components/dist/types";

type BasicAvatarProps = {
	alt?: string;
	src?: string;
	style?: CSS.Properties;
	children?: any;
};

const BasicAvatar: FC<BasicAvatarProps> = ({ alt, src, style, children }) => {
	return (
		<Avatar
			alt={alt}
			src={src}
			sx={{ width: 24, height: 24, borderRadius: "6px", ...style }}
		>
			{children}
		</Avatar>
	);
};

export default BasicAvatar;
