/**
 * Sanity Image
 */

export type SanityImage = {
	_type: 'image';
	asset: Asset;
} & Partial<CroppedImage>;

type Asset = {
	_ref: string;
	_type: string;
};

/**
 * Sanity Image Crop
 */

type CroppedImage = {
	_type: string;
	crop: Crop;
	hotspot: Hotspot;
	asset: Asset;
};

type Crop = {
	_type: string;
	top: number;
	left: number;
	bottom: number;
	right: number;
};

type Hotspot = {
	_type: string;
	height: number;
	width: number;
	x: number;
	y: number;
};
