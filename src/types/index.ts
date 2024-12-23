
export type User ={
  name:string,
  email:string,
  handle:string,
  description:string,
  image:string,
  links:string
}

export type UserHandle = Pick<User, 'name' | 'description' | 'handle' | 'image' | 'links'>

export type registerForm = Pick<User, 'name' | 'email' | 'handle'> & {
  password:string,
  password_confirmation:string
}

export type loginForm = Pick<User, 'email'> & {
  password:string
}

export type profileForm = Pick<User, 'handle' | 'description'>&{}

export type SocialNetworks = {
  id: number,
  url: string,
  name: string,
  enabled: boolean
}

export type linkTree = Pick<SocialNetworks, 'name' | 'url' | 'enabled'>