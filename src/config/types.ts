export interface getCategory {
    id: number, 
    title: string,
    image: string,
    children: []
}

export interface getSubCategory {
    id: string, 
    title: string,
    image: string,
    parent: {
        id: number,
        title: string
    }
}

export interface getBanner {
    description: string,
    image: {
        file: string
    },
    title: string,
}