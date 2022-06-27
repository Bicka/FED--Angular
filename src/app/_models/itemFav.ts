interface Image{
  id: string;
  url: string
}

export interface ItemFav {
    created_at: Date;
    id: number,
    image: Image
    sub_id: string;
    type: 'fav'
  }