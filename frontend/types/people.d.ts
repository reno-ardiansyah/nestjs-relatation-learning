export interface Person {
  id: number
  name: string
  dob: string | null // ISO date string
  idCardNumber: {
    id: number
    number: string
  }
  hobbies: {
    [key: string]: any
  } 
  created_at: string | null
  updated_at: string | null
}