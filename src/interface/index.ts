export interface NoteType {
    title: string;
    content: string;
}

export interface UserType {
    uid: string;
    name: string;
    email: string;
    isNewUser: boolean;
    imgURL: string;
    signInMethod: string;
    createdTime: string;
    lastSignInTime: string;
    phoneNumber?: number;
    isAnonymous?: boolean;
}

export interface NoteFormType {
    title: string;
    content: string;
}