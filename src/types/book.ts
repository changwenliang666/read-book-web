export interface bookProgressType {
    cfi: string;
    href: string;
}

export interface savebookProgress {
    progress:bookProgressType,
    bookId:number,
    updateTime:string
}