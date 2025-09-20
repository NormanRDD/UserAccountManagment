export interface UserAccount {
  id: number
  tags: string
  type: 'Локальная' | 'LDAP'
  login: string
  password: string
  showPassword?: boolean
  errors?: AccountErrors
}

export interface AccountErrors {
  tags?: string
  login?: string
  password?: string
}

export interface TagItem {
  text: string
}

export interface SavedAccount {
  id: number
  tags: TagItem[]
  type: 'Локальная' | 'LDAP'
  login: string
  password: string | null
}

export type AccountType = 'Локальная' | 'LDAP'