export enum USER_GENDER {
	MALE = 1,
	FEMALE
}

export enum USER_TYPE {
	INTERNSHIP = 0,
	COLLABORATORS = 1,
	STAFF = 2,
	PROBATIONARY_STAFF = 3,
	VENDOR = 5
}

export enum USER_STATUS {
	WORKING = 1,
	PAUSING,
	QUIT,
	MATERNITY_LEAVE
}

export enum USER_MESSAGE {
	CROP_AVATAR_FAIL = 'Image size is limited at 5MB, please choose a different image or continue to crop your image to reduce the file size'
}

export enum ALLOWED_FILE_SIZE {
	AVATAR = 5
}